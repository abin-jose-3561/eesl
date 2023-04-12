import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "./globalfilter"; 


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

const DisplayData = ({recent,option}) =>{

    console.log("recent table",recent,option)

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get(`http://localhost:5000/table/${option}/${recent}`)
      .catch((err) => console.log(err));

    if (response) {
      const products = response.data;
      console.log("Products: ", products);
      setProducts(products);
    }
  };
  const productsData = useMemo(()=> [...products], [products]);

  const productsColumns = useMemo(
      () =>
        products[0]
          ? Object.keys(products[0])
              .filter((key) => key !== "rating")
              .map((key)=>{
                  return {Header: key.toUpperCase().replace('_',' '), accessor: key,}
                }): [], [products]);
    
    
    const tableInstance = useTable(
      {columns: productsColumns, data: productsData},
      useGlobalFilter,
      useSortBy,usePagination);
    
    const { getTableProps, getTableBodyProps, headerGroups, page,nextPage,previousPage, prepareRow, preGlobalFilteredRows, setGlobalFilter, state }=tableInstance;
    
    useEffect(()=>{
      fetchProducts();
    },[]);
    
    return (
    <>
  
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
    </>
    )
    }

export default DisplayData;