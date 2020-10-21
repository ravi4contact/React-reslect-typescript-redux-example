import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    fetchRequest();

  }, []);
  useEffect(() => {
    setMyData(data || []);

  }, [data]);

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
  const handleCheckBox = (key: string, id: string) => {
    if(key != "recommended"){
		const checkOptionStatus = filterData.map((value: any)=>{
			if(value.id === id){
				return {...value,[key]:!value[key], recommended:false}
			}
			return value;
		
		});
		setFilterdata(checkOptionStatus)
	}else{
		const checkOptionStatus = filterData.map((value: any)=>{
			if(value.id === id){
				return {...value,[key]:!value[key],isKey:false,mandatory:false}
			}
			return value;
		
		});
		setFilterdata(checkOptionStatus)
	}
  } 

  return (
    <Container>
      <FilterBox 
      data={myData}
      handleFilterData ={handleFilterData}
      handleTableData = {handleTableData}
      
      />
      <TableCom 
      data={filterData}
      handleFilterDataTable ={handleFilterDataTable}
	  handleTableDataTable = {handleTableDataTable}
	  handleCheckBox = {handleCheckBox}
      />
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
