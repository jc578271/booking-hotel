import React, {useState, useEffect} from 'react'
import { useTable } from 'react-table'

const EditableCell = ({ value: initialValue, row: { index }, column: { id } , updateMyData}) => {
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <input 
            value={value} 
            onChange={event => setValue(event.target.value)} 
            onBlur={() => updateMyData(index, id, value)}
        />
    )
}

const defaultColumn = { Cell: EditableCell }

export const EditableTable = ({ columns, data, updateMyData }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows
    } = useTable({ columns, data, defaultColumn, updateMyData })

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            );
                            })}
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}