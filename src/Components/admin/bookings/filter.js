import React, {useState, useEffect} from 'react'
import FormField from '../../ui/formFields'
import moment from 'moment'

const style = {
    margin: '0 2px 2px 0'
}

const now = moment().startOf('day').valueOf()
const BookingFilter = ({ bookings, setFilterBookings, setFilterdata }) => {
    const [action, setAction] = useState('current')
    const [formdata, setFormdata] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                label: 'Search name'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showPlaceholder: true
        },
        company: {
            element: 'input',
            value: '',
            config: {
                label: 'Search company'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showPlaceholder: true
        },
        startDate: {
            element: 'date',
            value: moment().startOf('month').valueOf(),
            config: {
                label: 'Start date'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showPlaceholder: true
        },
        endDate: {
            element: 'date',
            value: moment().endOf('month').valueOf(),
            config: {
                label: 'End date'
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: '',
            showPlaceholder: true
        }
    })

    useEffect(() => {
        sortBookings()
        showChecked('current')

        let filterdata = {}
        for(let key in formdata) {
            filterdata[key] = formdata[key].value
        }
        setFilterdata(filterdata)
    }, [])

    const updateForm = (element) => {
        const newFormdata = {...formdata}
        const newElement = {...newFormdata[element.id]}

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
        } else {   
            newElement.value = element.event.target.value
        }

        newFormdata[element.id] = newElement
        setFormdata(newFormdata)

        let filterdata = {}
        for(let key in newFormdata) {
            filterdata[key] = newFormdata[key].value
        }
        setFilterdata(filterdata)
    }

    

    const showChecked = (action) => {
        const list = bookings.filter(booking => {
            if(action === 'current') {
                return (booking.startDate <= now && now <= booking.endDate) && 
                (booking.checked !== 'checked out')
                
            } else if(action === 'about out') {
                return booking.checked === 'checked in' 
                && (booking.endDate <= now 
                    || booking.endDate - booking.startDate === 1800000)
            } else if(action === 'up coming') {
                return booking.checked === 'not checked in'
            }
        })

        setAction(action)
        setFilterBookings(action === 'All' ? bookings : list)
    }

    const sortBookings = () => {
        setFilterBookings(bookings.sort((a, b) => {
            return (a.startDate - now) > (b.startDate - now) ? 1 : -1
        }))
    }

    return (
        <div>
            <div>
                <div>
                    <button style={style} className={`btn btn-warning btn-sm ${action === 'current' ? 'active' : 'disabled'}`} onClick={() => showChecked('current')}>Current</button>
                    <button style={style} className={`btn btn-danger btn-sm ${action === 'about out' ? 'active' : 'disabled'}`} onClick={() => showChecked('about out')}>About out</button>
                    <button style={style} className={`btn btn-success btn-sm ${action === 'up coming' ? 'active' : 'disabled'}`} onClick={() => showChecked('up coming')}>Up coming</button>
                </div>
                <div>
                    <button className={`btn btn-info btn-sm" ${action === 'All' ? 'active' : 'disabled'}`} onClick={() => showChecked("All")}>All</button>
                </div>
                
            </div>

            <div style={{width: '300px', margin: '0 2px 5px 0'}}>
                <FormField
                    id={'name'}
                    formdata={formdata.name}
                    change={(element) => updateForm(element)}
                />

                <FormField
                    id={'company'}
                    formdata={formdata.company}
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
            </div>
            
        </div>
    )
}

export default BookingFilter





