import { Checkbox } from "@chakra-ui/core";
import React, { useEffect, useMemo } from "react";
import Select from 'react-select'
import DeleteIcon from "./deleteIcon.jpeg";


interface RowComProps{
    data:any;
    handleFilterDataTable :any;
    handleTableDataTable :any;
    handleCheckBox: any;
    handleValueTextBox: any;
    rowModeisEditable: boolean;
}

const RowCom:React.FC<RowComProps> =({data, handleFilterDataTable, handleTableDataTable, handleCheckBox, handleValueTextBox,rowModeisEditable})=>{
const {label,value,isKey,mandatory,recommended,id} = data;

    return(
       <>
           <tr>
               <td>{label}</td>
               {(!rowModeisEditable)?(<td>{value}</td>):(<td><input type="text" value ={value} defaultValue={value} onChange = {(e)=>{handleValueTextBox('value',id,e); }}/></td>)}
               <td><input type="checkbox" disabled ={!rowModeisEditable} checked={isKey} onChange = {()=>{
                   handleCheckBox('isKey',id);
                   
               }}/><label>isKey</label></td>
               <td><input type="checkbox" disabled ={!rowModeisEditable} checked={mandatory} onChange = {()=>{
                handleCheckBox('mandatory',id);
                
            }}/><label>mandatory</label></td>
               <td><input type="checkbox" disabled ={!rowModeisEditable} checked={recommended} onChange = {()=>{
                handleCheckBox('recommended',id);
                
            }}/><label>recommended</label></td>
               <td>
               <img 
               className={(rowModeisEditable)? "disableDleteRow":"enableDleteRow" }
               src={DeleteIcon}
               alt={"Delete" }
               width ={"20px"}
               height ={"20px"}
                    onClick = {()=>{
                       if(!rowModeisEditable){
                            handleFilterDataTable(data);
                            handleTableDataTable(data);
                       }
               }} /></td>
           </tr>
    </>
    )
}

export default RowCom;