import { firebaseRooms, firebaseDB } from "../firebase"

// ADD_ROOM
export const addRoom = (room) => {
    return {
        type: 'ADD_ROOM',
        room
    }
}

export const startAddRoom = (roomData = {}) => {
    return (dispatch) => {
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

        return firebaseRooms.push(room).then((ref) => {
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
    return (dispatch) => {
        return firebaseDB.ref(`rooms/${id}`).remove().then(() => {
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
    return (dispatch) => {
        return firebaseDB.ref(`rooms/${id}`).update(updates).then(() => {
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
    return (dispatch) => {
        return firebaseDB.ref(`rooms`).once('value').then((snapshot) => {
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