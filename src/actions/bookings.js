import { firebaseDB } from "../firebase"

// ADD_BOOKING
export const addBooking = (booking) => {
    return {
        type: 'ADD_BOOKING',
        booking
    }
}

export const startAddBooking = (bookingData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
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
            service= [],
            totalPrice = '',
            deposit = '',
            phone = ''
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
            service,
            totalPrice,
            deposit,
            phone
        }

        return firebaseDB.ref(`users/${uid}/bookings`).child(id).set(booking).then(() => {
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/bookings/${id}`).remove().then(() => {
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/bookings/${id}`).update(updates).then(() => {
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/bookings`).once('value').then((snapshot) => {
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