export const validate = (element) => {
    let error = [true, '']

    if(element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Must be a valid email' : ''}`

        error = !valid ? [valid, message] : error
    }

    if(element.validation.required) {
        let valid
        if(typeof element.value === 'object') {
            valid = element.value.length !== 0
        } else if (typeof element.value === 'string') {
            valid = element.value.trim() !== ''
        } else {
            valid = typeof element.value !== 'string'
        }
        
        const message = `${!valid ? 'This field is required' : ''}`

        error = !valid ? [valid, message] : error
    }

    return error
}
