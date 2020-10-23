import React, { useEffect, useMemo } from "react";
import Select from 'react-select'
import RowCom from './RowCom'

interface TableComProps{
    data:any;
    handleFilterDataTable :any;
    handleTableDataTable :any;
    handleCheckBox: any;
    handleValueTextBox :any;
    rowModeisEditable: boolean;
}

const TableCom:React.FC<TableComProps> =({data, handleFilterDataTable, handleTableDataTable, handleCheckBox,handleValueTextBox , rowModeisEditable})=>{

    return(
       <>
            <table>
                <thead>
                    <tr>
                        <th>Context</th>
                        <th>Value</th>
                        <th>isKey</th>
                        <th>Mandatory</th>
                        <th>Recommended</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {data?.map((val: any,ind: any)=>{
                     return <RowCom 
                     data={val} 
                     key={val.id}
                     handleFilterDataTable ={handleFilterDataTable}
                     handleTableDataTable = {handleTableDataTable}
                     handleCheckBox = {handleCheckBox}
                     handleValueTextBox = {handleValueTextBox}
                     rowModeisEditable = {rowModeisEditable}
                     />
                })}
                {data && data.length === 0 && (<tr><td colSpan = {6} style={{textAlign :"center"}}>No data found</td></tr>)}
                </tbody> 
            </table>
    </>
    )
}

export default TableCom;