import React, { useEffect, useState , useRef} from "react";
import { connect } from "react-redux";
import styled from "styled-components";


import { ApplicationState } from "../../store";
import { Inventory } from "../../store/inventory/types";
import { fetchRequest } from "../../store/inventory/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import FilterBox from "../FilterBox"
import TableCom from '../TableCom'


const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: auto;

  .footerBtn{
    margin-top: 20px;
    margin-left: 5px;
  }
  .disableDleteRow{
    opacity:.2;
  }
  .eableDleteRow{
    opacity:1;
  }
  table{
	font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
	border-collapse: collapse;
	width: 100%;
  margin-top: 20px;
	  tr{
		  &:nth-child(even){background-color: #f2f2f2;}
		  &:hover {background-color: #ddd;}
		  td{
			border: 1px solid #ddd;
			padding: 8px;
		  }
		  th{
			padding-top: 12px;
			padding-bottom: 12px;
			text-align: left;
			background-color: #005ce6;
			color: white;
			border: 1px solid #ddd;
			padding: 8px;
		  }
	  }
  }
`;

const ProductListItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface PropsFromState {
  loading: boolean;
  data: Inventory[];
  errors?: string;
}

interface propsFromDispatch {
  fetchRequest: () => any;
}

type AllProps = PropsFromState & propsFromDispatch;

const HomePage: React.FC<AllProps> = ({
  loading,
  errors,
  data,
  fetchRequest
}) => {
  const [myData,setMyData] = useState<any>([]);
  const [filterData, setFilterdata] = useState<any>([]);
  const [filterEditedData, setFilterEditedData] = useState<any>([]);
  const [rowModeisEditable, setRowModeisEditable] = useState<any>(false);

  const [disableFooterBtn, setDisableFooterBtn] = useState<any>(true);


  useEffect(() => {
    fetchRequest();

  }, []);
  useEffect(() => {
    setMyData(data || []);

  }, [data]);

  useEffect(() => {
    setDisableFooterBtn((filterData.length >0 )? false:true);

  }, [filterData]);
  
  

  
  const handleFilterData = (obj: any) => {
    const {id} = obj;
    const selectedOpt = myData.filter((value: any)=>value.id != id);
    setMyData(selectedOpt)
  } 
  const handleTableData = (obj: any) => {
    const tableDataClone = [...filterData,obj];
    setFilterdata(tableDataClone);
  } 


  const handleFilterDataTable = (obj: any) => {
    const {id} = obj;
    const selectedOpt = filterData.filter((value: any)=>value.id != id);
    setFilterdata(selectedOpt)
  } 
  const handleTableDataTable = (obj: any) => {
    const tableDataClone = [...myData,obj];
    setMyData(tableDataClone);
  } 

  const clickHanler = (e: any) => {
    const {id} = e.target;
    let val = (id === 'edit')? true:false;
    setRowModeisEditable(val);
    if (id === 'edit'){
      setFilterEditedData(filterData);
    }else if(id === 'save'){
      setFilterdata(filterEditedData)
    }
  
  } 

  const handleValueTextBox = (key: string, id: string, e:any) => {

    const re = /^[0-9\b]+$/;
    let tValue = e.target.value ;
    if(tValue === '' || re.test(tValue)) {

        const valueChanged = filterEditedData.map((value: any)=>{
          if(value.id === id){
            return {...value,[key]: tValue }
          }
          return value;
        
        });
        setFilterEditedData(valueChanged)
    }
    

  } 
  const handleCheckBox = (key: string, id: string) => {
    if(key != "recommended"){
		  const checkOptionStatus = filterEditedData.map((value: any)=>{
			if(value.id === id){
				return {...value,[key]:!value[key], recommended:false}
			}
			return value;
		
		});
		setFilterEditedData(checkOptionStatus)
    }else{
      const checkOptionStatus = filterEditedData.map((value: any)=>{
        if(value.id === id){
          return {...value,[key]:!value[key],isKey:false,mandatory:false}
        }
        return value;
      
      });
      setFilterEditedData(checkOptionStatus)
    }
  } 

  return (
    <Container>
      <FilterBox 
      data={myData}
      handleFilterData ={handleFilterData}
      handleTableData = {handleTableData}
      disableDropdown ={rowModeisEditable}
      
      />
      <TableCom 
      data={ (rowModeisEditable)? filterEditedData : filterData}
      handleFilterDataTable ={handleFilterDataTable}
      handleTableDataTable = {handleTableDataTable}
      handleCheckBox = {handleCheckBox}
      handleValueTextBox = {handleValueTextBox}
      rowModeisEditable = {rowModeisEditable}
      />
      <div className ="footer">
      <button className ="footerBtn" disabled={disableFooterBtn || rowModeisEditable} id ="edit"onClick = {(e)=>{clickHanler(e); }}>Edit</button>
      <button className ="footerBtn" disabled={disableFooterBtn || !rowModeisEditable}  id ="save" onClick = {(e)=>{clickHanler(e); }}>Save</button>
      <button className ="footerBtn" disabled={disableFooterBtn || !rowModeisEditable} id ="cancel" onClick = {(e)=>{clickHanler(e);}}>Cancel</button>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ inventory }: ApplicationState) => ({
  loading: inventory.loading,
  errors: inventory.errors,
  data: inventory.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchRequest: () => {
      dispatch(fetchRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
