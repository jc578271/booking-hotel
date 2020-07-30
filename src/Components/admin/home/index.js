import React from 'react'
import { connect } from 'react-redux'
import AdminLayout from '../../../Hoc/AdminLayout'
import { Link } from 'react-router-dom'

import { startEditRoom } from '../../../actions/rooms'

import moment from 'moment'
const now = moment().startOf('day').valueOf()

const Home = (props) => {
    // get floor order and find most-rooms floor
    const floors = Math.max(...props.rooms.map(room =>parseInt(room.level)))
    const floorOrder = []
    for(let i = 1; i <= floors; i++) {
        floorOrder.push(`${i}`)
    }
    const mostRoomLevel = Math.max(...floorOrder.map(level => props.rooms.filter(room => level === room.level).length))

    // sort rooms
    const sortRooms = (rooms) => {
        return rooms.sort((a, b) => {
            return parseInt(a.number) > parseInt(b.number) ? 1 : -1
        })
    }

    // clean room
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
                    floorOrder.map((level, i) => (
                        <div key={i} style={{marginLeft: '10px', width:`${mostRoomLevel*210}px`}}>
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
                                        getLink = ''
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
                                                <div key={i} className={`card  ${background}`} style={{margin:'5px', width: '200px', display:'inline-block'}}>
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
