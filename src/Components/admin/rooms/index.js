import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import AdminLayout from '../../../Hoc/AdminLayout'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

export const Room = (props) => {
    const sortRooms = (rooms) => {
        return rooms.sort((a, b) => {
            return parseInt(a.number) > parseInt(b.number) ? 1 : -1
        })
    }

    return (
        <AdminLayout>
            <div className="container" style={{padding:'70px 0 100px 0'}}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Number</TableCell>
                                <TableCell>Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                sortRooms(props.rooms).map((room, i) => (
                                    
                                        <TableRow key={i}>
                                            <TableCell><Link key={room.id} to={`/room/add_room/${room.id}`}>{room.number}</Link></TableCell>
                                            <TableCell>
                                                
                                                    {room.type}
                                                
                                            </TableCell>
                                        </TableRow>
                                    
                                ))
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
        rooms: state.rooms
    }
}

export default connect(mapStateToProps)(Room)
