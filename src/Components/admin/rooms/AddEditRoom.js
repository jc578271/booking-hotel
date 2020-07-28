import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AdminLayout from '../../../Hoc/AdminLayout'

import FormField from '../../ui/formFields'
import { validate } from '../../ui/misc'
import { startAddRoom, startEditRoom, startRemoveRoom } from '../../../actions/rooms'
import { removeBooking } from '../../../actions/bookings'

const style = {
    margin: '5px 5px 0 0'
}

export const AddEditRoom = (props) => {
    const [formType, setFormType] = useState('Add room')
    const [formError, setFormError] = useState(false)
    const [formSuccess, setFormSuccess] = useState('')
    const [formdata, setFormdata] = useState({
        number: {
            element: 'input',
            value: '',
            config: {
                label: 'Room\'s number',
                type: 'number'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        level: {
            element: 'input',
            value: '',
            config: {
                label: 'Room\'s floor',
                type: 'number'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        type: {
            element: 'select',
            value: '',
            config: {
                label: 'Room\'s type',
                type: 'select',
                options: [
                    {key: 'Single', value: 'Single'},
                    {key: 'Twin', value: 'Twin'},
                    {key: 'Triple', value: 'Triple'},
                    {key: 'Family', value: 'Family'},
                    {key: 'Apartment', value: 'Apartment'}
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        owner: {
            value: '',
            valid: true,
            validation: {}
        },
        services: {
            value: '',
            config: {
                options: []
            },
            valid: true,
            validation: {}
        },
        isEmpty: {
            value: true,
            valid: true,
            validation: {}
        },
        price: {
            value: '',
            valid: true,
            validation: {}
        },
        date: {
            value: [],
            valid: true,
            validation: {}
        },
        linkBooking: {
            value: '',
            valid: true,
            validation: {}
        },
        isCleaned: {
            value: true,
            valid: true,
            validation: {}
        }
    })

    const updateField = (room, formType) => {
        const newFormdata = { ...formdata }

        for(let key in newFormdata) {
            if(room) {
                newFormdata[key].value = room[key] ? room[key] : []
                newFormdata[key].valid = true
            }
            
        }

        setFormType(formType)
        setFormdata(newFormdata)
    }

    // get data
    useEffect(() => {
        const roomId = props.match.params.id

        if(!roomId) {
            // ADD_ROOM
            setFormType('Add room')
        } else {
            // EDIT_ROOM
            updateField(props.room, 'Edit room')
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
            if(formType === 'Edit room') {
                // EDIT ROOM
                props.editRoom(props.room.id, dataToSubmit)
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

    const removeHandler = () => {
        props.removeRoom({ id: props.room.id }).then(() => {
            props.history.push('/room')
        })
    }
    
    return (
        <AdminLayout>
            <div className="container" style={{padding:'70px 0 100px 0'}}>
                <h2>{formType}</h2>
                <form style={{width: '300px'}}>

                    <FormField
                        id={'number'}
                        formdata={formdata.number}
                        change={(element) => updateForm(element)}
                    />

                    <FormField
                        id={'level'}
                        formdata={formdata.level}
                        change={(element) => updateForm(element)}
                    />

                    <FormField
                        id={'type'}
                        formdata={formdata.type}
                        change={(element) => updateForm(element)}
                    />

                    <div className="text-success"><strong>{formSuccess}</strong></div>
                    {
                        formError ?
                            <div className="text-danger"><strong>Something is wrong</strong></div>
                        : ''
                    }

                    <button style={style} className="btn btn-primary" onClick={(event) => submitForm(event)}>
                        {formType}
                    </button>

                </form>
                {
                    formType === 'Edit room' ?
                        <button style={style} className="btn btn-danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) removeHandler() }}>Remove</button>
                    : null
                }
                

            </div>
        </AdminLayout>
    )
    
}

const mapStateToProps = (state, props) => ({
    room: state.rooms.find(room => room.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    addRoom: (room) => dispatch(startAddRoom(room)),
    editRoom: (id, updates) => dispatch(startEditRoom(id, updates)),
    removeRoom: (data) => dispatch(startRemoveRoom(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditRoom)
