import React, {useState, useMemo} from 'react'
import FormField from '../../ui/formFields'

import { EditableTable } from '../../ui/table'

const ServiceForm = ({ mainFormdata, setMainFormdata }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Service',
                accessor: 'service'
            },
            {
                Header: 'Amount',
                accessor: 'amount'
            },
            {
                Header: 'Price',
                accessor: 'price'
            }
        ]
    )
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
        newFormdata.sum.value.push({
            service: formdata.service.value,
            amount: formdata.amount.value,
            price: formdata.price.value
        })
        setFormdata(newFormdata)

        // set on mainFormdata
        const newMainFormdata = {...mainFormdata}
        newMainFormdata.service = newFormdata.sum
        setMainFormdata(newMainFormdata)

        newFormdata.service.value = ''
        newFormdata.amount.value = ''
        newFormdata.price.value = ''
    }

    const updateMyData = (rowIndex, columnId, value) => {
        const newFormdata = {...formdata}

        newFormdata.sum.value.map((row, index) => {
            console.log(row)
            if (index === rowIndex) {
                return {
                    ...newFormdata.sum.value[rowIndex],
                    [columnId]: value
                }
            }
            return row
        })

        setFormdata(newFormdata)
    }

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

            <EditableTable
                columns={columns}
                data={formdata.sum.value}
                updateMyData={updateMyData}
            />

        </div>
        
    )
}

export default ServiceForm
