import React, { useState, useEffect } from 'react'
import FormField from '../../ui/formFields'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const TableRoom = ({ typeRoom, formdata, updateForm, price, idPrice, idRoom }) => {

    const options = []

    formdata.config.options.forEach(room => {
        options.push({
            label: room.key,
            value: room.value
        })
        
    })

    return (
        <TableRow>
            <TableCell>{typeRoom.value}</TableCell>
            <TableCell>
                <FormField
                    id={idRoom}
                    roomOptions={options}
                    formdata={formdata}
                    change={(element) => updateForm(element)}
                    style={{width: '200px'}}
                />
            </TableCell>
            <TableCell><p className="text-center">{options.length}</p></TableCell>
            <TableCell style={{width:'100px'}}>
                <p className="text-center">{formdata.value.length}</p>
            </TableCell>
            <TableCell>
                <FormField
                    id={idPrice}
                    formdata={price}
                    change={(element) => updateForm(element)}
                    className='form-group'
                    inputClassName='form-control'
                    style={{margin: '2px 0 2px 0'}}
                />
            </TableCell>
        </TableRow>
    )
}

export default TableRoom
