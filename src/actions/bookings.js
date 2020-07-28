import { firebaseBookings, firebaseDB } from "../firebase"

// ADD_BOOKING
export const addBooking = (booking) => {
    return {
        type: 'ADD_BOOKING',
        booking
    }
}

export const startAddBooking = (bookingData = {}) => {
    return (dispatch) => {
        const {
            name = '',
            passport= '',
            singleRoom = [],
            twinRoom = [],
            tripleRoom = [],
            familyRoom = [],
            apartmentRoom = [],
            totalRooms = [],
            startDate = '',
            endDate = '',
            company = '',
            note = '',
            singlePrice = '',
            twinPrice = '',
            triplePrice = '',
            familyPrice = '',
            apartmentPrice = '',
            checked = '',
            id = '',
            service= []
        } = bookingData
        const booking = {
            name, 
            passport, 
            singleRoom, 
            twinRoom, 
            tripleRoom, 
            familyRoom, 
            apartmentRoom, 
            totalRooms, 
            startDate, 
            endDate, 
            company, 
            note, 
            singlePrice,
            twinPrice,
            triplePrice,
            familyPrice,
            apartmentPrice,
            checked,
            id,
            service
        }

        return firebaseBookings.child(id).set(booking).then((ref) => {
            dispatch(addBooking({
                ...booking
            }))
        })
    }
}

// REMOVE_BOOKING
export const removeBooking = ({ id } = {}) => ({
    type: 'REMOVE_BOOKING',
    id
})

export const startRemoveBooking = ({ id } = {}) => {
    return (dispatch) => {
        return firebaseDB.ref(`bookings/${id}`).remove().then(() => {
            dispatch(removeBooking({ id }));
        })
    }
}

// EDIT_BOOKING
export const editBooking = (id, updates) => ({
    type: 'EDIT_BOOKING',
    id,
    updates
})

export const startEditBooking = (id, updates) => {
    return (dispatch) => {
        return firebaseDB.ref(`bookings/${id}`).update(updates).then(() => {
            dispatch(editBooking(id, updates));
        })
    }
}

// SET_BOOKINGS
export const setBookings = (bookings) => ({
    type: 'SET_BOOKINGS',
    bookings
})

export const startSetBookings = () => {
    return (dispatch) => {
        return firebaseDB.ref(`bookings`).once('value').then((snapshot) => {
            const bookings = [];

            snapshot.forEach((childSnapshot) => {
                bookings.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            
            dispatch(setBookings(bookings));
        }) 
            
    }
}