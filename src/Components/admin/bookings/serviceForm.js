import React, {useState, useEffect} from 'react'
import FormField from '../../ui/formFields'

import ReactDataGrid from 'react-data-grid'

const ServiceForm = ({ mainFormdata, setMainFormdata, booking }) => {
    const [selectedIndexes, setSelectedIndexes] = useState([])
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
            showPlaceholder: true
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
            showPlaceholder: true
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
            showPlaceholder: true
        },
        sum: {
            value: [],
            validation: {},
            valid: true
        }
    })

    useEffect(() => {
        if(booking) {
            const newFormdata = {...formdata}
            newFormdata.sum.value = booking.service ? booking.service : []
            setFormdata(newFormdata)
        }
    }, [])

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

//===================
// Datasheet
//==================
    const columns = [
        { key: "service", name: "Service", editable: true, width: 300 },
        { key: "amount", name: "Amount", editable: true, width: 100 },
        { key: "price", name: "Price", editable: true, width: 223}
    ]

    const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        const newFormdata = {...formdata}
        const rows = newFormdata.sum.value.slice()
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated }
        }
        newFormdata.sum.value = rows
        setFormdata(newFormdata)

        // set on mainFormdata
        const newMainFormdata = {...mainFormdata}
        newMainFormdata.service = newFormdata.sum
        setMainFormdata(newMainFormdata)
    }

    const deleleService = (e) => {
        e.preventDefault()
        const newFormdata = {...formdata}
        
        newFormdata.sum.value = newFormdata.sum.value.filter((i, index) => {
            console.log(selectedIndexes.indexOf(index) === -1)
            return selectedIndexes.indexOf(index) === -1
        })
        
        setFormdata(newFormdata)
    }

    const onRowsSelected = rows => {
        setSelectedIndexes(selectedIndexes.concat(rows.map(r => r.rowIdx)))
    }

    const onRowsDeselected = rows => {
        let rowIndexes = rows.map(r => r.rowIdx)
        setSelectedIndexes(selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1))
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
                
                <button style={{height: '37px', marginRight:'5px'}} className="btn btn-success " onClick={(event) => addService(event)}>+</button>
                <button style={{height: '37px'}} className="btn btn-danger " onClick={deleleService}>-</button>
            </div>

            <ReactDataGrid
                columns={columns}
                rowGetter={i => formdata.sum.value[i]}
                rowsCount={formdata.sum.value.length}
                onGridRowsUpdated={onGridRowsUpdated}
                minHeight={150}
                minWidth={700}
                enableCellSelect={true}
                rowSelection={{
                    showCheckbox: true,
                    enableShiftSelect: false,
                    onRowsSelected: onRowsSelected,
                    onRowsDeselected: onRowsDeselected,
                    selectBy: {
                        indexes: selectedIndexes,
                    }
                }}
            />

        </div>
        
    )
}

export default ServiceForm
