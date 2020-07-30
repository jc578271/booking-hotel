import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import AdminLayout from '../../../Hoc/AdminLayout'
import Filter from './filter'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

const now = moment().startOf('day').valueOf()

export const Booking = (props) => {
    const [filterBookings, setFilterBookings] = useState([])
    const [filterdata, setFilterdata] = useState({
        name: '',
        company: '',
        startDate: '',
        endDate: ''
    })

    const filterBooking = (bookings, { name, company, startDate, endDate }) => {
        return bookings.filter((booking) => {
            const nameMatch = booking.name ? booking.name.toLowerCase().includes(name.toLowerCase()) : true
            const companyMatch = !!booking.company ? booking.company.toLowerCase().includes(company.toLowerCase()) : true
            const startDateMatch = startDate !== '' ? startDate <= booking.startDate : true
            const endDateMatch = endDate !== '' ? booking.startDate <= endDate : true
            
            return nameMatch && companyMatch && startDateMatch && endDateMatch
        })
    }

    const newbookings = filterBooking(filterBookings, {
        name: filterdata.name,
        company: filterdata.company,
        startDate: filterdata.startDate,
        endDate: filterdata.endDate
    })

    return (
        <AdminLayout>
            <div className="container" style={{padding: '70px 0 100px 0'}}>
                <Filter
                    bookings={props.bookings}
                    filterBookings={filterBookings}
                    setFilterBookings={setFilterBookings}
                    setFilterdata={setFilterdata}
                />

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Room</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Company</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                newbookings.map((booking, i) => {
                                    let background = ''
                                    if(booking.checked === 'checked in' 
                                    && booking.endDate > now 
                                    && booking.endDate - booking.startDate !== 1800000) {
                                        background = 'yellow'
                                    }  if(booking.checked === 'checked in' &&
                                    (booking.endDate <= now 
                                        || booking.endDate - booking.startDate === 1800000)) {
                                        background = 'red'
                                    } if (booking.checked === 'not checked in' 
                                    && booking.startDate <= now) {
                                        background = '#32CD32'
                                    }
                                    
                                    return (
                                        <TableRow key={i} style={{background: `${background}`}}>
                                            <TableCell>{booking.name}</TableCell>
                                            <TableCell>
                                                <Link key={booking.id} to={`/booking/add_booking/${booking.id}`}>
                                                    {booking.totalRooms.map((value, i) => <span key={i}>{value.value} </span>)}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{moment(booking.startDate).format("DD-MM-YYYY")}</TableCell>
                                            <TableCell>{moment(booking.endDate).format("DD-MM-YYYY")}</TableCell>
                                            <TableCell>{booking.company}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </AdminLayout>
    )
}

const mapStateToProps = (state) => {
    return {
        bookings: state.bookings
    }
}

export default connect(mapStateToProps)(Booking)
