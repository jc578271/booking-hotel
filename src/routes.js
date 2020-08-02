import React from 'react'
import Layout from './Hoc/Layout'
import { Switch } from 'react-router-dom'

import PrivateRoute from './Components/authRoutes/privateRoutes'
import PublicRoute from './Components/authRoutes/publicRoutes'

import Home from './Components/admin/home'
import Booking from './Components/admin/bookings'
import AddEditBooking from './Components/admin/bookings/AddEditBooking'
import Room from './Components/admin/rooms/index'
import AddEditRoom from './Components/admin/rooms/AddEditRoom'
import BookingConfirm from './Components/admin/bookings/BookingConfirm'
import BookingBill from './Components/admin/bookings/BookingBill'
import Service from './Components/admin/serviceRoom'

import SignIn from './Components/signin'

// import AddEditTest from './playground/AddEditTest'
// import Test from './playground/datagridtest'

const Route = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoute {...props} exact component={Home} path="/"/>
                <PrivateRoute {...props} exact component={Booking} path="/booking"/>
                <PrivateRoute {...props} exact component={AddEditBooking} path="/booking/add_booking"/>
                <PrivateRoute {...props} exact component={AddEditBooking} path="/booking/add_booking/:id"/>
                <PrivateRoute {...props} exact component={BookingConfirm} path="/booking/add_booking/booking_confirm/:id"/>
                <PrivateRoute {...props} exact component={BookingBill} path="/booking/add_booking/booking_bill/:id"/>
                <PrivateRoute {...props} exact component={Room} path="/room"/>
                <PrivateRoute {...props} exact component={AddEditRoom} path="/room/add_room"/>
                <PrivateRoute {...props} exact component={AddEditRoom} path="/room/add_room/:id"/>
                <PrivateRoute {...props} exact component={Service} path="/service"/>
                <PrivateRoute {...props} exact component={Service} path="/service/:id"/>
                <PublicRoute {...props} restricted={true} exact component={SignIn} path="/sign_in"/>
            </Switch>
        </Layout>
        
    )
}

export default Route
