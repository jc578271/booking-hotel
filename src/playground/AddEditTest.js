import React, {useState} from 'react'
import AdminLayout from '../../../Hoc/AdminLayout'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import FormField from '../../../Components/ui/formFields'
import { validate } from '../../../Components/ui/misc'

const AddEditTest = () => {
    const [bookingId, setBookingId] = useState('')
    const [formType, setFormType] = useState('Check In')
    const [formError, setFormError] = useState(false)
    const [formSuccess, setFormSuccess] = useState('')
    const [formdata, setFormdata] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                label: 'Customer\'s name',
                type: 'text'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        roomType: {
            element: 'select',
            value: '',
            config: {
                label: 'Type of room',
                type: 'select',
                options: [
                    {key: 'Single', value: 'Single'},
                    {key: 'Twin', value: 'Twin'},
                    {key: 'Triple', value: 'Triple'},
                    {key: 'Family', value: 'Family'},
                    {key: 'Apartmnet', value: 'Apartmnet'}
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        room: {
            element: 'select',
            value: '',
            config: {
                label: 'Type of room',
                type: 'select',
                options: []
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        startDate: {
            element: 'date_range',
            value: '',
            config: {
                label: 'Start date',
                type: 'date',
                datePicker: true
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        endDate: {
            element: 'input',
            value: '',
            config: {
                label: 'End date',
                type: 'date',
                datePicker: true
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        price: {
            element: 'input',
            value: '',
            config: {
                label: 'Price',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        }
    })

    const updateForm = (element) => {
        const newFormdata = {...formdata}
        const newElement = {...newFormdata[element.id]}

        newElement.value = element.event.target.value

        let validData = validate(newElement)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement

        setFormError(false)
        setFormdata(newFormdata)
    }

    const successForm = (message) => {
            setFormSuccess(message)
        setTimeout(() => {
            setFormSuccess('')
        }, 2000)
    }

    const submitForm = (event) => {
        event.preventDefault()

        let dataToSubmit = {}
        let formValid = true

        for(let key in formdata) {
            dataToSubmit[key] = formdata[key].value
            formValid = formdata[key].valid && formValid
        }

        if(formValid) {
            if(formType === 'Edit booking') {
                // EDIT BOOKING
                successForm('Updated correctly')
            } else {
                // ADD BOOKING
                successForm('Added correctly')
            }
        } else {
            setFormError(true)
        }
    }

    return (
        <AdminLayout>
            <div>
                    <h2>{formType}</h2>
                    <div>
                        <form onSubmit={(event) => submitForm(event)}>
                            
                            <FormField
                                id={'name'}
                                formdata={formdata.name}
                                change={(element) => updateForm(element)}
                            />

                            <FormField
                                id={'roomType'}
                                formdata={formdata.roomType}
                                change={(element) => updateForm(element)}
                            />

                            <FormField
                                id={'room'}
                                formdata={formdata.room}
                                change={(element) => updateForm(element)}
                            />

                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div>
                                    
                                            <div>
                                                {formdata.startDate.config.label}
                                            </div>
                                    
                                    <DatePicker
                                        selected={formdata.startDate.value}
                                        onChange={date => setFormdata({
                                            ...formdata, 
                                            startDate:{
                                                ...formdata.startDate,
                                                value: date 
                                            } 
                                        })}
                                        selectsStart
                                        startDate={formdata.startDate.value}
                                        endDate={formdata.endDate.value}
                                        isClearable
                                        placeholderText="I have been cleared!"
                                    />
                                </div>
                                
                                <div>
                                    
                                            <div>
                                                {formdata.endDate.config.label}
                                            </div>
                                        
                                    <DatePicker
                                        selected={formdata.endDate.value}
                                        onChange={date => setFormdata({ 
                                            ...formdata,
                                            endDate:{
                                                ...formdata.endDate,
                                                value: date 
                                            } 
                                        })}
                                        selectsEnd
                                        startDate={formdata.startDate.value}
                                        endDate={formdata.endDate.value}
                                        minDate={formdata.startDate.value}
                                        isClearable
                                        placeholderText="I have been cleared!"
                                    />
                                </div>
                                

                            </div>

                            <FormField
                                id={'price'}
                                formdata={formdata.price}
                                change={(element) => updateForm(element)}
                            />

                            <div>{formSuccess}</div>
                            {
                                formError ?
                                    <div>Something is wrong</div>
                                : ''
                            }

                            <button onClick={(event) => submitForm(event)}>
                                {formType}
                            </button>

                        </form>
                    </div>
                </div>
        </AdminLayout>
    )
}

export default AddEditTest

