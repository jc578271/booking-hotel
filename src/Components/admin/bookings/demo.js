import React, {useState} from 'react'
import FormField from '../../ui/formFields'

import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const ServiceForm = ({ mainFormdata, setMainFormdata }) => {
    const [formdata, setFormdata] = useState({
        service:{
            element: 'input',
            value: '',
            config: {
                label: 'Service',
                type: 'text'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        amount: {
            element: 'input',
            value: '',
            config: {
                label: 'Amount',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        price: {
            element: 'input',
            value: '',
            config: {
                label: 'price',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        sum: {
            value: [],
            validation: {},
            valid: true
        }
    })

    const updateForm = (element) => {
        const newFormdata = {...formdata}
        const newElement = {...newFormdata[element.id]}

        newElement.value = element.event.target.value
        newFormdata[element.id] = newElement

        setFormdata(newFormdata)
    }

    const addService = (event) => {
        event.preventDefault()

        const newFormdata = {...formdata}
        newFormdata.sum.value.push(
            [{ value: formdata.service.value }, { value: formdata.amount.value }, { value: formdata.price.value }]
        )
        setFormdata(newFormdata)

        // set on mainFormdata
        const newMainFormdata = {...mainFormdata}
        newMainFormdata.service = newFormdata.sum
        setMainFormdata(newMainFormdata)

        newFormdata.service.value = ''
        newFormdata.amount.value = ''
        newFormdata.price.value = ''

        console.log(newFormdata)
    }

//===================
// Datasheet
//==================
    const onCellsChanged = (changes) => {
        const newFormdata = {...formdata}
        const grid = newFormdata.sum.value

        changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
        })
        setFormdata(newFormdata)

        // set on mainFormdata
        const newMainFormdata = {...mainFormdata}
        newMainFormdata.service = newFormdata.sum
        setMainFormdata(newMainFormdata)
    }

    const sheetRenderer = (props) => (
        <Paper style={{width:'50vw'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.children}
                </TableBody>
            </Table>
        </Paper>
    )

    const rowRenderer = (props) => (
        <TableRow>
            {props.children}
        </TableRow>
    )

    return (
        <div>

            <div style={{display:'flex', flexDirection: 'row'}}>
                <FormField
                    id={'service'}
                    formdata={formdata.service}
                    change={(element) => updateForm(element)}
                />

                <FormField
                    id={'amount'}
                    formdata={formdata.amount}
                    change={(element) => updateForm(element)}
                />

                <FormField
                    id={'price'}
                    formdata={formdata.price}
                    change={(element) => updateForm(element)}
                />

                <button onClick={(event) => addService(event)}>+</button>
            </div>

            <ReactDataSheet
                data={formdata.sum.value}
                valueRenderer={cell => cell.value}
                onCellsChanged={onCellsChanged}
                sheetRenderer={sheetRenderer}
                rowRenderer={rowRenderer}
                // onContextMenu={onContextMenu}
            />

        </div>
        
    )
}

export default ServiceForm
