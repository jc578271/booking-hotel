const servicesReducerDefaultState = []

export default (state = servicesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_SERVICE':
            return [
                ...state,
                action.service
            ]
        case 'REMOVE_SERVICE':
            return state.filter((service) => service.id !== action.id)
        case 'EDIT_SERVICE':
            return state.map((service) => {
                if (service.id === action.id) {
                    return {
                        ...service,
                        ...action.updates
                    }
                } else {
                    return service
                }
            })
        case 'SET_SERVICES':
            return action.services
        default:
            return state;
    }
}