import React, { useEffect, useMemo } from "react";
import Select from 'react-select'

interface FilterBoxProps{
    data:any;
    handleFilterData:any;
    handleTableData:any;
    disableDropdown: boolean;
}

const FilterBox:React.FC<FilterBoxProps> =({data, handleFilterData, handleTableData,disableDropdown})=>{
    /*const dataField = useMemo(()=>{
     return data.map((d: any) => {
       return {...d}
  
      })
    },[data])*/
    return(
       <>
            <Select options={data} 
                onChange={(e: any)=>{
                
                    handleFilterData(e)
                    handleTableData(e)

                }} 
                
                isSearchable ={true}
                isDisabled ={disableDropdown}
                />
    </>
    )
}

export default FilterBox;