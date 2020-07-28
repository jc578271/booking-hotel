import React from 'react'
import { connect } from 'react-redux'
import AdminLayout from '../../../Hoc/AdminLayout'
import { Link } from 'react-router-dom'

import { startEditRoom } from '../../../actions/rooms'

import moment from 'moment'
const now = moment().startOf('day').valueOf()

const Home = (props) => {

    const sortRooms = (rooms) => {
        return rooms.sort((a, b) => {
            return parseInt(a.number) > parseInt(b.number) ? 1 : -1
        })
    }

    const cleanRoom = (room) => {
        if(room.isEmpty) {
            room.isCleaned = true
            props.editRoom(room.id, room)
        }
    }

    return (
        <AdminLayout>
            <div>
                {
                    ['1', '2', '3', '4', '5'].map((level, i) => (
                        <div className="row" key={i} style={{marginLeft: '10px'}}>
                            {
                                sortRooms(props.rooms).map((room, i) => {
                                    room.date = room.date ? room.date : []

                                    // get link booking for room
                                    const selectDate = room.date.find(date => date.startDate === now)
                                    let getLink 
                                    if(room.linkBooking && !selectDate) {
                                        getLink = '/' + room.linkBooking
                                    } else if(selectDate) {
                                        getLink = '/' + selectDate.bookingid
                                    } else {
                                        getLink = '/'
                                    }

                                    //set background for room
                                    let background = ''
                                    if(!room.isCleaned) {
                                        background = 'bg-secondary'
                                    }
                                    if(!room.isEmpty) {
                                        background = 'bg-warning'
                                    }

                                    // set color for room
                                    let color = ''
                                    let isGreen = false
                                    let isRed = false
                                    room.date.forEach(date => {
                                        isGreen = (date.startDate === now && room.isEmpty) || isGreen
                                        isRed = ((date.endDate <= now || date.endDate - 1800000 <= now) && !room.isEmpty) || isRed
                                    })
                                    if(isGreen) {
                                        color = 'text-success'
                                    }
                                    if(isRed) {
                                        color = 'text-danger'
                                    }

                                    if(room.level === level) {
                                        return (
                                            <div key={i} className={`card col-2 ${background}`} style={{margin:'10px'}}>
                                                <div className={`card-body ${color}`}>
                                                    <h4 className="card-title">{room.number}</h4>
                                                    <p className="card-text">{room.type}</p>
                                                    <p className="card-text">{room.owner}</p>
                                                    <Link to={`/booking/add_booking${getLink}`} className="btn btn-primary">See Profile</Link>
                                                    <button style={{marginTop:'10px'}} className="btn btn-secondary" onClick={() => cleanRoom(room)}>Clean room</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                })
                            }
                        </div>
                    ))
                }
                

            </div>            
        </AdminLayout>
    )
}

const mapStateToProps = (state) => ({
    rooms: state.rooms,
    bookings: state.bookings
})

const mapDispatchToProps = (dispatch) => ({
    editRoom: (id, updates) => dispatch(startEditRoom(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
