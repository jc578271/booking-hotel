import React, {useState, useEffect} from 'react'
import Adminlayout from '../../../Hoc/AdminLayout'
import FormField from '../../ui/formFields'
import { validate }from '../../ui/misc'

const ServiceRoom = () => {
    const [formType, setFormType] = useState('')
    const [formError, setFormError] = useState(false)
    const [formSuccess, setFormSuccess] = useState('')
    const [formdata, setFormdata] = useState({
        description: {
            element: 'input',
            value: '',
            config:{
                label: 'Description',
                type:'text'
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
            config:{
                label: 'Price',
                type:'number'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        }
    })

    const updateForm = (element) => {
        const newFormdata = {...formdata}
        const newElement = {...newElement[element.id]}

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
            formValid = dataToSubmit[key].valid && formValid

            let validData = validate(formdata[key])
            formdata[key].valid = validData[0]
            formdata[key].validationMessage = validData[1]
        }

        if(formValid) {
            if(formType === 'Edit service') {
                // EDIT ROOM
                props.editService(props.room.id, dataToSubmit)
                successForm('Updated correctly')
            } else {
                // ADD ROOM
                props.addRoom(dataToSubmit)
                props.history.push('/')
                successForm('Added correctly')
            }
        } else {
            setFormError(true)
        }
    }

    return (
        <Adminlayout>
            <div>
                <h2>{formType}</h2>
                <form>
                    <FormField
                        id={'description'}
                        formdata={formdata.description}
                        change={(element) => updateChange(element)}
                    />

                    <FormField
                        id={'description'}
                        formdata={formdata.description}
                        change={(element) => updateChange(element)}
                    />

                    <button onClick={(event) => submitForm(event)}>{formType}</button>
                </form>
                {
                    formType === 'Add service'?
                        <button onClick={removeForm}>Remove</button>
                    :null
                }
                
            </div>
        </Adminlayout>
    )
}

export default ServiceRoom
