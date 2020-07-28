const roomsReducerDefaultState = []

export default (state = roomsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ROOM':
            return [
                ...state,
                action.room
            ]
        case 'REMOVE_ROOM':
            return state.filter((room) => room.id !== action.id)
        case 'EDIT_ROOM':
            return state.map((room) => {
                if (room.id === action.id) {
                    return {
                        ...room,
                        ...action.updates
                    }
                } else {
                    return room
                }
            })
        case 'SET_ROOMS':
            return action.rooms
        default:
            return state;
    }
}