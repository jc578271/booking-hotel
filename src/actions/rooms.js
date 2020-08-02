import { firebaseDB } from "../firebase"

// ADD_ROOM
export const addRoom = (room) => {
    return {
        type: 'ADD_ROOM',
        room
    }
}

export const startAddRoom = (roomData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            number = '',
            level= 0,
            type = '',
            owner = '',
            service = '',
            price = 0,
            isEmpty = true,
            date = [],
            linkBooking = '',
            isCleaned = true
        } = roomData
        const room = { number, level, type, owner, service, price, isEmpty, date, linkBooking, isCleaned }

        return firebaseDB.ref(`users/${uid}/rooms`).push(room).then((ref) => {
            dispatch(addRoom({
                id: ref.key,
                ...room
            }))
        })
    }
}

// REMOVE_ROOM
export const removeRoom = ({ id } = {}) => ({
    type: 'REMOVE_ROOM',
    id
})

export const startRemoveRoom = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/rooms/${id}`).remove().then(() => {
            dispatch(removeRoom({ id }));
        })
    }
}

// EDIT_ROOM
export const editRoom = (id, updates) => ({
    type: 'EDIT_ROOM',
    id,
    updates
})

export const startEditRoom = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/rooms/${id}`).update(updates).then(() => {
            dispatch(editRoom(id, updates));
        })
    }
}

// SET_ROOMS
export const setRooms = (rooms) => ({
    type: 'SET_ROOMS',
    rooms
})

export const startSetRooms = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/rooms`).once('value').then((snapshot) => {
            const rooms = [];

            snapshot.forEach((childSnapshot) => {
                rooms.push( {
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            
            dispatch(setRooms(rooms));
        }) 
            
    }
}