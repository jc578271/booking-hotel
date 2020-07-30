import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

const ServiceList = ({ services }) => {
    return (
        <div>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            services.map((service, i) => (
                                
                                    <TableRow key={i}>
                                        <TableCell><Link key={service.id} to={`/service/${service.id}`}>{service.description}</Link></TableCell>
                                        <TableCell>
                                                {service.price}
                                        </TableCell>
                                    </TableRow>
                                
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

export default ServiceList
