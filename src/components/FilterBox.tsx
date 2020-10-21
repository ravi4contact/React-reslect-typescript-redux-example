import React, { useEffect, useMemo } from "react";
import Select from 'react-select'

interface FilterBoxProps{
    data:any;
    handleFilterData:any;
    handleTableData:any;
}

const FilterBox:React.FC<FilterBoxProps> =({data, handleFilterData, handleTableData})=>{
    /*const dataField = useMemo(()=>{
     return data.map((d: any) => {
       return {...d}
  
      })
    },[data])*/
console.log(data,".....*******...")
    return(
       <>
            <Select options={data} 
                onChange={(e: any)=>{
                
                    handleFilterData(e)
                    handleTableData(e)

                }} 
                
                isSearchable ={true}
                />
    </>
    )
}

export default FilterBox;