import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { uuid } from 'uuidv4'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../Hoc/AdminLayout'

import { startAddBooking, startEditBooking, startRemoveBooking } from '../../../actions/bookings'
import { startEditRoom } from '../../../actions/rooms'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import FormField from '../../../Components/ui/formFields'
import { validate } from '../../../Components/ui/misc'
import TableForm from './tableRoom'
import ServiceForm from './serviceForm'

import moment from 'moment';
import { extendMoment } from 'moment-range';
const momentRange = extendMoment(moment);

const style = {
    margin: '0 5px 5px 0'
}

const AddEditBooking = (props) => {
    const [formType, setFormType] = useState('Add booking')
    const [formError, setFormError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [formSuccess, setFormSuccess] = useState('')
    const [isCheckedIn, setIsCheckedIn] = useState(false)
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
        passport: {
            element: 'input',
            value: '',
            config: {
                label: 'Customer\'s passport or ID',
                type: 'text'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        singleRoom: {
            element: 'multi_select',
            value: [],
            config: {
                label: 'Room\'s NO.',
                type: 'select',
                options: []
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        twinRoom: {
            element: 'multi_select',
            value: [],
            config: {
                label: 'Room\'s NO.',
                type: 'select',
                options: []
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        tripleRoom: {
            element: 'multi_select',
            value: [],
            config: {
                label: 'Room\'s NO.',
                type: 'select',
                options: []
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        familyRoom: {
            element: 'multi_select',
            value: [],
            config: {
                label: 'Room\'s NO.',
                type: 'select',
                options: []
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        apartmentRoom: {
            element: 'multi_select',
            value: [],
            config: {
                label: 'Room\'s NO.',
                type: 'select',
                options: []
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        totalRooms:{
            value: [],
            validation: {
                required: true
            },
            valid: false,
            validationMessage: ''
        },
        startDate: {
            element: 'date',
            value: moment().startOf('day').valueOf(),
            config: {
                label: 'Start date'
            },
            validation: {
                required: true
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        endDate: {
            element: 'date',
            value: moment().startOf('day').add(0.5, 'hours').valueOf(),
            config: {
                label: 'End date'
            },
            validation: {
                required: true
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        company: {
            element: 'input',
            value: '',
            config: {
                label: 'Company',
                type: 'text'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        note: {
            element: 'textarea',
            value: '',
            config: {
                label: 'Note',
                type: 'text'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        singlePrice: {
            element: 'input',
            value: '',
            config: {
                label: 'Price',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        twinPrice: {
            element: 'input',
            value: '',
            config: {
                label: 'Price',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        triplePrice: {
            element: 'input',
            value: '',
            config: {
                label: 'Price',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        familyPrice: {
            element: 'input',
            value: '',
            config: {
                label: 'Price',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        apartmentPrice: {
            element: 'input',
            value: '',
            config: {
                label: 'Price',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: false
        },
        checked: {
            value: 'not checked in',
            validation: {},
            valid: true
        },
        id:{
            value: '',
            valid: true,
            validation:  {}
        },
        service: {
            value: [],
            validation: {},
            valid: true
        },
        totalPrice:{
            value:'',
            validation:{},
            valid: true
        },
        deposit:{
            element: 'input',
            value: '',
            config: {
                label: 'Customer\'s deposit',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        },
        phone:{
            element: 'input',
            value: '',
            config: {
                label: 'Customer\'s phone number',
                type: 'number'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showLabel: true
        }
        
    })

    const typeRoomOptions= [
        {key: 'Single', value: 'Single'},
        {key: 'Twin', value: 'Twin'},
        {key: 'Triple', value: 'Triple'},
        {key: 'Family', value: 'Family'},
        {key: 'Apartment', value: 'Apartment'}
    ]

//=============
// updateField
//=============
    const updateField = (booking, singleRoomOptions, twinRoomOptions, tripleRoomOptions, familyRoomOptions, apartmentRoomOptions) => {
        const newFormdata = { ...formdata }
        

        for(let key in newFormdata) {
            if(booking) {
                if(typeof booking[key] === 'string') {
                    newFormdata[key].value = booking[key] ? booking[key] : ''
                } else {
                    newFormdata[key].value = booking[key] ? booking[key] : []
                }
                newFormdata[key].valid = true
            }
            
            if(key === 'singleRoom') {
                newFormdata[key].config.options = singleRoomOptions 
            }
            if(key === 'twinRoom') {
                newFormdata[key].config.options = twinRoomOptions 
            }
            if(key === 'tripleRoom') {
                newFormdata[key].config.options = tripleRoomOptions 
            }
            if(key === 'familyRoom') {
                newFormdata[key].config.options = familyRoomOptions 
            }
            if(key === 'apartmentRoom') {
                newFormdata[key].config.options = apartmentRoomOptions 
            }
        }
        
        setFormdata(newFormdata)
    }

//================
// getRooms
//================
    const getRooms = (booking, data) => {
        const singleRoomOptions = []
        const twinRoomOptions = []
        const tripleRoomOptions = []
        const familyRoomOptions = []
        const apartmentRoomOptions = []

        props.rooms.forEach((room) => {
            let valid = true

            room.date = room.date ? room.date : []
            room.date.forEach(date => {
                valid = valid && (
                    date.endDate <= data.startDate.value ||
                    date.startDate >= data.endDate.value
                ) || date.bookingid === (props.booking ? props.booking.id : data.id.value)  
            })
            

            if(room.type === 'Single' && (valid || room.date.length === 0)){
                singleRoomOptions.push({
                    key: room.number,
                    value: room.number
                })
            }
            if(room.type === 'Twin' && (valid || room.date.length === 0)){
                twinRoomOptions.push({
                    key: room.number,
                    value: room.number
                })
            }
            if(room.type === 'Triple' && (valid || room.date.length === 0)){
                tripleRoomOptions.push({
                    key: room.number,
                    value: room.number
                })
            }
            if(room.type === 'Family' && (valid || room.date.length === 0)){
                familyRoomOptions.push({
                    key: room.number,
                    value: room.number
                })
            }
            if(room.type === 'Apartment' && (valid || room.date.length === 0)){
                apartmentRoomOptions.push({
                    key: room.number,
                    value: room.number
                })
            }
        })
        updateField(booking, singleRoomOptions, twinRoomOptions, tripleRoomOptions, familyRoomOptions, apartmentRoomOptions)
    }


// get data
//============
// useEffect
//============
    useEffect(() => {
        const bookingId = props.match.params.id
        
        if(!bookingId) {
            // ADD_BOOKING

            //set id
            const newFormdata = {...formdata}
            newFormdata.id.value = uuid()
            setFormdata(newFormdata)

            setFormType('Add booking')
            getRooms(false, formdata)
        } else {
            // EDIT_BOOKING
            setFormType('Edit booking')
            getRooms(props.booking, formdata)
        }
    }, [])

//============
// updateForm
//============
    const updateForm = (element) => {
        const newFormdata = {...formdata}
        const newElement = {...newFormdata[element.id]} 

        // update input value
        if (element.id === 'startDate') {
            newElement.value = element.date !== null ? moment(element.date).startOf('day').valueOf() : ''
            if (newElement.value !== '') {
                newFormdata.endDate.value = newFormdata.endDate.value <= newElement.value ? newElement.value + 1800000 : newFormdata.endDate.value
            }
        } else if(element.id === 'endDate') {
            newElement.value = element.date !== null ? moment(element.date).startOf('day').valueOf() : ''
            if(newElement.value !== '') {
                newElement.value = newFormdata.startDate.value === newElement.value ? newElement.value + 1800000 : newElement.value
            }
        } else if( element.id === 'singleRoom' 
                || element.id === 'twinRoom' 
                || element.id === 'tripleRoom' 
                || element.id === 'familyRoom'
                || element.id === 'apartmentRoom') {
            newElement.value = element.event
        } else {
            newElement.value = element.event.target.value
        }
        
        // set validation input
        let validData = validate(newElement)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement

        // set totalRooms
        newFormdata.totalRooms.value = newFormdata.singleRoom.value.concat(newFormdata.twinRoom.value, newFormdata.tripleRoom.value, newFormdata.familyRoom.value, newFormdata.apartmentRoom.value)
        newFormdata.totalRooms.valid = newFormdata.totalRooms.value.length !== 0

        //set totalPrice
        newFormdata.totalPrice.value = handleTotalPrice(newFormdata)

        getRooms(false, newFormdata)
        setFormError(false)
        setFormdata(newFormdata)
        
        
    }

//==============
// successForm
//==============
    const successForm = (message) => {
            setFormSuccess(message)
        setTimeout(() => {
            setFormSuccess('')
        }, 2000)
    }

//==============
// submitForm
//==============
    const submitForm = (event) => {
        event.preventDefault()

        let dataToSubmit = {}
        let formValid = true

        for(let key in formdata) {
            dataToSubmit[key] = formdata[key].value
            formValid = formdata[key].valid && formValid

            // set validation data before submit
            let validData = validate(formdata[key])
            formdata[key].valid = validData[0]
            formdata[key].validationMessage = validData[1]

            // set validate totalRooms
            formdata.totalRooms.valid = formdata.totalRooms.value.length !== 0
            if (!formdata.totalRooms.valid) {
                formdata.totalRooms.validationMessage = 'Must select at least one room'
            } else {
                formdata.totalRooms.validationMessage = ''
            }

            // set validation roomOptions
            if(!!formdata[key].config && typeof formdata[key].value === 'object' && formdata[key].element === 'multi_select') {
                let valid = true
                const roomOptionValues = formdata[key].config.options.map(option => option.key)
                formdata[key].value.forEach(value => {
                    valid = valid && roomOptionValues.includes(value.label)
                })
                formdata[key].valid = valid
                formdata[key].validationMessage = formdata[key].valid ? '' : 'Room is unvailable'
            }
        }

        if(formValid) {
            if(formdata.checked.value !== 'checked out') {
                reserveBookingHandler(formdata)
            }

            if(formType === 'Edit booking') {
                // EDIT BOOKING
                props.editBooking(props.match.params.id, dataToSubmit)
                successForm('Updated correctly')

                if(formdata.checked.value === 'checked in') {
                    checkinHandler(formdata)
                }
            } else {
                // ADD BOOKING
                props.addBooking(dataToSubmit)
                setTimeout(() => {
                    props.history.push('/booking/add_booking')
                }, 500)
                
                
                successForm('Added correctly')
            }
        } else {
            setErrorMessage('Some thing wrong')
            setFormError(true)
        }
        
        return formValid
    }

//===================
// handleTotalPrice
//===================
    const handleTotalPrice = (data) => {
        let days = momentRange.range(data.startDate.value ,data.endDate.value).snapTo('days').diff('days')
        days = days !== 0 ? days : 1
        const price =  data.singlePrice.value * data.singleRoom.value.length
                    + data.twinPrice.value * data.twinRoom.value.length
                    + data.triplePrice.value * data.tripleRoom.value.length
                    + data.familyPrice.value * data.familyRoom.value.length
                    + data.apartmentPrice.value * data.apartmentRoom.value.length

        let servicePrice = 0
        data.service.value.forEach(service => {
            servicePrice += service.amount * service.price
        })

        return price * days + servicePrice
    }
    
//=================
// selectedRooms
//=================
    const selectedRooms = (data) => {
        return props.rooms.filter(room => {
            const totalRoomValues = data.totalRooms.value.map(selectRoom => selectRoom.value)
            return totalRoomValues.includes(room.number)
        })
    }
//==================
// noSelectedRooms
//==================
    const noSelectedRooms = (data) => {
        return props.rooms.filter(room => {
            const totalRoomValues = data.totalRooms.value.map(selectRoom => selectRoom.value)
            return !totalRoomValues.includes(room.number)
        })
    }

//================
// checkinHandler
//================
    const checkinHandler = (data) => {
        selectedRooms(data).forEach(room => {
            room.isEmpty = false
            room.owner = data.name.value
            room.price = handleTotalPrice(data)
            room.linkBooking = data.id.value
        })

        // noSelectedRooms(data).forEach(room => {
        //     room.isEmpty = true
        //     room.owner = ''
        //     room.price = 0
        //     room.linkBooking = ''
        // })

        //EDIT_ROOM
        props.rooms.forEach(room => {
            props.editRoom(room.id, room)
        })
    }

//=======================
// reserveBookingHandler
//=======================
    const reserveBookingHandler = (data) => {
        selectedRooms(data).forEach(room => {
            room.date = room.date ? room.date : []
            room.date = room.date.filter(date => date.bookingid !== data.id.value)
            room.date.push({
                startDate: data.startDate.value,
                endDate: data.endDate.value,
                bookingid: data.id.value
            })
        })

        noSelectedRooms(data).forEach(room => {
            room.date = room.date ? room.date : []
            room.date = room.date.filter(date => date.bookingid !== data.id.value)

        })

        //EDIT_ROOM
        props.rooms.forEach(room => {
            props.editRoom(room.id, room)
        })
    }

//=============
// checkinForm
//=============
    const checkinForm = (event) => {
        if(moment().valueOf() >= formdata.startDate.value) {
            
            
            if(submitForm(event)) {
                const newFormdata = { ...formdata }
                newFormdata.checked.value = 'checked in'
                setFormdata(newFormdata)

                checkinHandler(formdata)
                setIsCheckedIn(true)
                submitForm(event)
            }
            
        } else {
            setFormError(true)
            setErrorMessage('Check-in day is not coming yet')
        }
    }

//===================
// checkOutHandler
//===================
    const checkOutHandler = (event) => {
        selectedRooms(formdata).forEach(room => {
            room.isEmpty = true
            room.owner = ''
            room.price = ''
            room.linkBooking = ''
            room.isCleaned = false
            room.date = room.date.filter(date => date.bookingid !== formdata.id.value)
        })

        // EDIT_ROOM
        props.rooms.map(room => {
            props.editRoom(room.id, room)
        })

        const newFormdata = { ...formdata }
        newFormdata.checked.value = 'checked out'
        setFormdata(newFormdata)

        if(submitForm(event)) {
            setIsCheckedIn(false)
            submitForm(event)
            successForm('Checked out correctly')
        } else {
            setFormError(true)
            setErrorMessage('Check-out unsuccessful')
        }
        
    }

    const removeHandler = (event) => {
        // REMOVE_BOOKING
        checkOutHandler(event)
        props.removeBooking({ id: props.booking.id }).then(() => {
            props.history.push('/booking')
        })
    }

    const cancelHandler = () => {
        const id = props.match.params.id
        if(!id) {
            return props.history.push('/booking/add_booking')
        }
        props.history.push(`/booking/add_booking/${id}`)
    }

    return (
        <AdminLayout>
            <div className="container" style={{padding:'70px 0 100px 0'}}>
                <h2>{formType}</h2>
                <div>
                    <form>
                        <div style={{width: '300px'}}>
                            <FormField
                                id={'name'}
                                formdata={formdata.name}
                                change={(element) => updateForm(element)}
                            />

                            <FormField
                                id={'passport'}
                                formdata={formdata.passport}
                                change={(element) => updateForm(element)}
                            />

                            <FormField
                                id={'phone'}
                                formdata={formdata.phone}
                                change={(element) => updateForm(element)}
                            />

                            <FormField
                                id={'deposit'}
                                formdata={formdata.deposit}
                                change={(element) => updateForm(element)}
                            />

                            <div style={{display:'flex', flexDirection: 'row'}}>

                                <FormField
                                    id={'startDate'}
                                    formdata={formdata.startDate}
                                    startDate={formdata.startDate.value}
                                    endDate={formdata.endDate.value}
                                    change={(element) => updateForm(element)}
                                />

                                <FormField
                                    id={'endDate'}
                                    formdata={formdata.endDate}
                                    startDate={formdata.startDate.value}
                                    endDate={formdata.endDate.value}
                                    change={(element) => updateForm(element)}
                                />

                            </div>
                            <FormField
                                id={'company'}
                                formdata={formdata.company}
                                change={(element) => updateForm(element)}
                            />

                            <FormField
                                id={'note'}
                                formdata={formdata.note}
                                change={(element) => updateForm(element)}
                            />
                        </div>
                        

                        <ServiceForm
                            mainFormdata={formdata}
                            setMainFormdata={setFormdata}
                            booking={props.booking}
                        />

                        <div style={{width:'700px'}} className="alert alert-success d-flex justify-content-between">
                            <div>
                                <strong>Total price: </strong>
                                {handleTotalPrice(formdata)}
                            </div>

                            <div>
                                <strong>Remaining price: </strong>
                                {handleTotalPrice(formdata) - formdata.deposit.value}
                            </div>
                        </div>                        

                        <div className="text-success"><strong>{formSuccess}</strong></div>
                        {
                            formError ?
                                <div className="text-danger"><strong>{errorMessage}</strong></div>
                            : ''
                        }
                        {
                            formdata.totalRooms.validation && !formdata.totalRooms.valid ?
                                <div className="text-danger"><strong>{formdata.totalRooms.validationMessage}</strong></div>
                            : null
                        }
                        
                        <button style={style} className="btn btn-primary" onClick={(event) => submitForm(event)}>
                            {formType}
                        </button>

                    </form>
                    <button style={style} className="btn btn-success" disabled={formdata.checked.value === 'checked in'} onClick={checkinForm}>
                        Check In
                    </button>

                    <button style={style} className="btn btn-warning" disabled={formdata.checked.value !== 'checked in'} onClick={checkOutHandler}>
                        Check Out
                    </button>

                    <button style={style} className="btn btn-secondary" onClick={cancelHandler}>
                        Cancel
                    </button>
                    
                    
                    {
                        formType === 'Edit booking' ?
                            <>
                                <button style={style} className="btn btn-danger" onClick={(event) => {if (window.confirm('Are you sure you wish to delete this item?')) removeHandler(event) } }>
                                    Remove
                                </button>
                                {
                                    formdata.checked.value !== 'checked out' ?
                                        <div style={{marginBottom:'5px'}}>
                                            <button className="btn btn-info "><Link className="text-light" style={{textDecoration:'none'}} target="_blank" to={`booking_confirm/${props.booking.id}`}>Print booking confirm</Link></button>
                                        </div>
                                    : null
                                }
                            </>
                        : null
                    }
                    {
                        formdata.checked.value === 'checked in' ?
                            <button className="btn btn-info "><Link className="text-light" style={{textDecoration:'none'}} target="_blank" to={`booking_bill/${props.booking.id}`}>Print booking bill</Link></button>
                        :null
                    }
                    
                </div>
                <div  >
                    
                    <Paper style={{width:'700px'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Room</TableCell>
                                    <TableCell>Available</TableCell>
                                    <TableCell>Check in</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableForm
                                    idRoom={'singleRoom'}
                                    idPrice={'singlePrice'}
                                    typeRoom={typeRoomOptions[0]}
                                    formdata={formdata.singleRoom}
                                    price={formdata.singlePrice}
                                    updateForm={updateForm}
                                />

                                <TableForm
                                    idRoom={'twinRoom'}
                                    idPrice={'twinPrice'}
                                    typeRoom={typeRoomOptions[1]}
                                    formdata={formdata.twinRoom}
                                    price={formdata.twinPrice}
                                    updateForm={updateForm}
                                />

                                <TableForm
                                    idRoom={'tripleRoom'}
                                    idPrice={'triplePrice'}
                                    typeRoom={typeRoomOptions[2]}
                                    formdata={formdata.tripleRoom}
                                    price={formdata.triplePrice}
                                    updateForm={updateForm}
                                />

                                <TableForm
                                    idRoom={'familyRoom'}
                                    idPrice={'familyPrice'}
                                    typeRoom={typeRoomOptions[3]}
                                    formdata={formdata.familyRoom}
                                    price={formdata.familyPrice}
                                    updateForm={updateForm}
                                />

                                <TableForm
                                    idRoom={'apartmentRoom'}
                                    idPrice={'apartmentPrice'}
                                    typeRoom={typeRoomOptions[4]}
                                    formdata={formdata.apartmentRoom}
                                    price={formdata.apartmentPrice}
                                    updateForm={updateForm}
                                />

                            </TableBody>
                        </Table>
                    </Paper>

                </div>
            </div>
        </AdminLayout>
    )
}

const mapStateToProps = (state, props) => ({
    rooms: state.rooms,
    booking: state.bookings.find((booking) => booking.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    addBooking: (booking) => dispatch(startAddBooking(booking)),
    editBooking: (id, updates) => dispatch(startEditBooking(id, updates)),
    removeBooking: (data) => dispatch(startRemoveBooking(data)),
    editRoom: (id, updates) => dispatch(startEditRoom(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditBooking)

