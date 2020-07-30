import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Adminlayout from '../../../Hoc/AdminLayout'
import FormField from '../../ui/formFields'
import { validate }from '../../ui/misc'
import { startAddService, startEditService, startRemoveService } from '../../../actions/services'

import ServiceList from './service-list'

const ServiceRoom = (props) => {
    const [formType, setFormType] = useState('Add service')
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
            showPlaceholder: true
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
            showPlaceholder: true
        }
    })

    const updateField = (service, formType) => {
        const newFormdata = { ...formdata }

        for(let key in newFormdata) {
            if(service) {
                newFormdata[key].value = service[key]
                newFormdata[key].valid = true
            }
            
        }

        setFormType(formType)
        setFormdata(newFormdata)
    }

    // get data
    useEffect(() => {
        const serviceId = props.match.params.id

        if(!serviceId) {
            // ADD_SERVICE
            setFormType('Add service')
        } else {
            // EDIT_SERVICE
            updateField(props.service, 'Edit service')
        }
    }, [])

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

            let validData = validate(formdata[key])
            formdata[key].valid = validData[0]
            formdata[key].validationMessage = validData[1]
        }

        if(formValid) {
            if(formType === 'Edit service') {
                // EDIT SERVICE
                props.editService(props.service.id, dataToSubmit).then(() => {
                    props.history.push('/service')
                })
                successForm('Updated correctly')
            } else {
                // ADD SERVICE
                props.addService(dataToSubmit).then(() => {
                    props.history.push('/service')
                })
                successForm('Added correctly')
                console.log(dataToSubmit)
            }
        } else {
            setFormError(true)
        }
    }

    const removeHandler = () => {
        props.removeService({ id: props.service.id }).then(() => {
            props.history.push('/service')
        })
    }

    return (
        <Adminlayout>
            <div className="container" style={{padding:'70px 0 100px 0'}}>
                <h2>{formType}</h2>
                <div className="row">
                    <div className="col-5">
                        <form>
                            <FormField
                                id={'description'}
                                formdata={formdata.description}
                                change={(element) => updateForm(element)}
                            />

                            <FormField
                                id={'price'}
                                formdata={formdata.price}
                                change={(element) => updateForm(element)}
                            />

                            <div className="text-success"><strong>{formSuccess}</strong></div>
                            {
                                formError ?
                                    <div className="text-danger"><strong>Something is wrong</strong></div>
                                : ''
                            }

                            <button className="btn btn-primary" onClick={(event) => submitForm(event)}>{formType}</button>

                        </form>
                        {
                            formType === 'Edit service'?
                                <button className="btn btn-danger" onClick={removeHandler}>Remove</button>
                            :null
                        }
                    </div>
                    
                    <div className="col-5">
                        <ServiceList
                            services={props.services}
                        />
                    </div>
                </div>
                

            </div>
        </Adminlayout>
    )
}

const mapStateToProps = (state, props) => ({
    services: state.services,
    service: state.services.find(service => service.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    addService: (service) => dispatch(startAddService(service)),
    editService: (id, updates) => dispatch(startEditService(id, updates)),
    removeService: (data) => dispatch(startRemoveService(data))    
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRoom)
