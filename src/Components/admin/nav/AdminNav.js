import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import { firebase } from '../../../firebase'

const AdminLayout = () => {

    const links = [
        {
            title: 'Bookings',
            linkTo: '/booking'
        },
        {
            title: 'Add Booking',
            linkTo: '/booking/add_booking'
        },
        {
            title: 'Rooms',
            linkTo: '/room'
        },
        {
            title: 'Add Room',
            linkTo: '/room/add_room'
        },
        {
            title: 'Add Service',
            linkTo: '/service'
        }
    ]

    const logoutHandler = () => {
        firebase.auth().signOut().then(() => {
            console.log('Log out successful')
        }, (err) => {
            console.log('Error logging out')
        })
    }

    return (
        <div>
            {
                links.map(link => (
                    <Link to={link.linkTo} key={link.title} style={{textDecoration:'none'}}>
                        <ListItem style={{paddingLeft: '30px'}} button>
                            {link.title}
                        </ListItem>
                    </Link>
                ))
            }
            <ListItem style={{paddingLeft: '30px'}} button onClick={logoutHandler}>
                Log out
            </ListItem>
        </div>
        
    )
}

export default AdminLayout
