import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "./globalfilter"; 
import { format } from "date-fns";


const Table = tw.table`
  text-base
  text-gray-900
  border-gray-500
  border-solid
  border-4
`;

const TableHead = tw.thead`
bg-green-300
p-0
`;

const TableRow = tw.tr`
border
border-gray-500
`;

const TableHeader = tw.th`

border-4
border
border-blue-500
p-2
`;

const TableBody = tw.tbody`
bg-gray-300
p-0
`;

const TableData = tw.td`
p-0
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-blue-300
  hover:bg-green-200
  transition-colors
`;

const DisplayData = ({optionname}) =>{

    console.log("OptionNames",optionname)

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    
    const queryparams=`?discom=${optionname.optiondiscom}&zone=${optionname.optionzone}&circle=${optionname.optioncircle}&division=${optionname.optiondivision}&subdivision=${optionname.optionsubdivision}&lastread=${optionname.optionlastread}&lastcomm=${optionname.optionlastcommdate}&optiondate=${optionname.optiondate}&optiondate1=${optionname.optiondate1}`;
    const response = await axios
      .get(`http://localhost:5000/table/tabb${queryparams}`)
      .catch((err) => console.log(err));

       if (response) {

       // const products = response.data;
        
       const products = response.data.map((product) => ({
        
       ...product,
        
         creation_date: format(new Date(product.creation_date), "dd-MM-yyyy"),//give the format of date here
        
       }));
        
        
        console.log("Products: ", products);
        
      setProducts(products);
        
        }
  };
  //const productsData = useMemo(()=> [...products], [products]);
  const productsData = useMemo(

     () =>
    
    products.map((product) => ({
    
   ...product,
    
   date: product.creation_date,
    
    })),
    
    [products]
    
    );

    const productsColumns = useMemo(

      () =>
      
     products[0]
      
     ? Object.keys(products[0])
      
     .filter((key) => key !== "date" ) // add the column hich you need to hide
      
     .map((key)=>{
      return {Header: key.toUpperCase().replace('_',' '), accessor: key,}
       }): [], [products]);
    
    
    const tableInstance = useTable(
      {columns: productsColumns, data: productsData},
      useGlobalFilter,
      useSortBy,usePagination);
    
    const { getTableProps, getTableBodyProps, headerGroups, page,nextPage,previousPage, prepareRow, preGlobalFilteredRows, setGlobalFilter, state }=tableInstance;
    
    useEffect(()=>{
      fetchProducts(optionname);
    },[optionname]);
    
    return (
    <>
     <div className="table">
    <GlobalFilter  preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.GlobalFilter}/>
    <Table {...getTableProps()}>
      <TableHead>
          {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header") }
                        {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                        </TableHeader>
                  ))}
                  </TableRow>
          ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
                    {page.map((row)=>{
                      prepareRow(row);
    
                      return (
                      <TableRow {...row.getRowProps()}>
                      {row.cells.map((cell, idx) =>(
                        <TableData {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableData>
                      ))}
                      </TableRow>
                      );
                    })}
    
      </TableBody>
    </Table>
    <div align="center">
      <Button onClick={()=> previousPage()}>Previous</Button>
      <Button onClick={()=>nextPage()}>Next</Button>
    </div>
    </div>
    </>
    )
    }

export default DisplayData;