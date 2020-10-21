import { Checkbox } from "@chakra-ui/core";
import React, { useEffect, useMemo } from "react";
import Select from 'react-select'
import DeleteIcon from "./deleteIcon.jpeg";


interface RowComProps{
    data:any;
    handleFilterDataTable :any;
    handleTableDataTable :any;
    handleCheckBox: any;
}

const RowCom:React.FC<RowComProps> =({data, handleFilterDataTable, handleTableDataTable, handleCheckBox})=>{
const {label,value,isKey,mandatory,recommended,id} = data;

    return(
       <>
           <tr>
               <td>{label}</td>
               <td>{value}</td>
               <td><input type="checkbox" checked={isKey} onChange = {()=>{
                   handleCheckBox('isKey',id);
                   
               }}/><label>isKey</label></td>
               <td><input type="checkbox" checked={mandatory} onChange = {()=>{
                handleCheckBox('mandatory',id);
                
            }}/><label>mandatory</label></td>
               <td><input type="checkbox" checked={recommended} onChange = {()=>{
                handleCheckBox('recommended',id);
                
            }}/><label>recommended</label></td>
               <td>
               <img 
               src={DeleteIcon}
               alt={"Delete" }
               width ={"20px"}
               height ={"20px"}
                    onClick = {()=>{
                   handleFilterDataTable(data);
                   handleTableDataTable(data);
               }} /></td>
           </tr>
    </>
    )
}

export default RowCom;