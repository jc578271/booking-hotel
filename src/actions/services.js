import { firebaseDB } from "../firebase"

// ADD_SERVICE
export const addService = (service) => {
    return {
        type: 'ADD_SERVICE',
        service
    }
}

export const startAddService = (serviceData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            description = '',
            price= 0
        } = serviceData
        const service = { description, price }

        return firebaseDB.ref(`users/${uid}/services`).push(service).then((ref) => {
            dispatch(addService({
                id: ref.key,
                ...service
            }))
        })
    }
}

// REMOVE_SERVICE
export const removeService = ({ id } = {}) => ({
    type: 'REMOVE_SERVICE',
    id
})

export const startRemoveService = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/services/${id}`).remove().then(() => {
            dispatch(removeService({ id }));
        })
    }
}

// EDIT_SERVICE
export const editService = (id, updates) => ({
    type: 'EDIT_SERVICE',
    id,
    updates
})

export const startEditService = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/services/${id}`).update(updates).then(() => {
            dispatch(editService(id, updates));
        })
    }
}

// SET_SERVICES
export const setServices = (services) => ({
    type: 'SET_SERVICES',
    services
})

export const startSetServices = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebaseDB.ref(`users/${uid}/services`).once('value').then((snapshot) => {
            const services = [];

            snapshot.forEach((childSnapshot) => {
                services.push( {
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            
            dispatch(setServices(services));
        }) 
            
    }
}