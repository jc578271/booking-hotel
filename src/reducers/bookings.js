const bookingsReducerDefaultState = []

export default (state = bookingsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_BOOKING':
            return [
                ...state,
                action.booking
            ]
        case 'REMOVE_BOOKING':
            return state.filter((booking) => booking.id !== action.id)
        case 'EDIT_BOOKING':
            return state.map((booking) => {
                if (booking.id === action.id) {
                    return {
                        ...booking,
                        ...action.updates
                    }
                } else {
                    return booking
                }
            })
        case 'SET_BOOKINGS':
            return action.bookings
        default:
            return state;
    }
}