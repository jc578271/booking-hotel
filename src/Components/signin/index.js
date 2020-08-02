import React, { useState } from 'react'
import { connect } from 'react-redux'
import FormFeild from '../ui/formFields'
import { validate } from '../ui/misc'
import { startLogin, startLoginWithGoogle } from '../../actions/auth'

export const SignIn = (props) => {
    const [formError, setFormError] = useState(false)
    const [formSuccess, setFormSuccess] = useState('')
    const [formdata, setFormdata] = useState({
        email: {
            element: 'input',
            value: '',
            config: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Enter your email'
            },
            validation: {
                required: true,
                email: true
            },
            valid: false,
            validationMessage: ''
        },
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter your password'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: ''
        }
    })

    const updateForm = (element) => {
        const newFormdata = {...formdata}
        const newElement = {...newFormdata[element.id]}
        newElement.value = element.event.target.value

        let validData = validate(newElement)
        newElement.valid = validData[0]                
        newElement.validationMessage = validData[1]
        newFormdata[element.id] = newElement
        
        setFormError(false)
        setFormdata(newFormdata)
    }

    const submitForm = (event) => {
        event.preventDefault()

        let dataToSubmit = {}
        let formIsValid = true

        for(let key in formdata) {
            dataToSubmit[key] = formdata[key].value
            formIsValid = formdata[key].valid && formIsValid
        }

        // *
        if(formIsValid) {
            props.startLogin(dataToSubmit.email, dataToSubmit.password).then(() => {
                props.history.push('/')
            }).catch((err) => {
                setFormError(true)
            })
            
        } else {
            setFormError(true)
        }
    }

    const loginWithGoogle = () => {
        props.startLoginWithGoogle()
    }
    
    
    return (
        <div className="container">
            <div style={{width: '300px', margin:'200px auto'}} className={formError ? '' : 'needs-validation'}>

                <form onSubmit={(event) => submitForm(event)}>

                    <h2>Please Login</h2>

                    <FormFeild
                        className="form-group"
                        inputClassName="form-control"
                        id={'email'}
                        formdata={formdata.email}
                        change={(element) => updateForm(element)} 
                    />

                    <FormFeild
                        className="form-group"
                        inputClassName="form-control"
                        id={'password'}
                        formdata={formdata.password}
                        change={(element) => updateForm(element)} 
                    />
                    
                    {
                        formError ?
                            <div className="text-danger">Something is wrong, try again</div>
                        : null
                    }

                    <button style={{marginBottom:'10px'}} className="btn btn-primary" onClick={(event) => submitForm(event)}>Log in</button>

                </form>
                <p>Or</p>
                <button className="btn btn-danger" onClick={loginWithGoogle}>Login with google</button>

            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (email, password) => dispatch(startLogin(email, password)),
    startLoginWithGoogle: () => dispatch(startLoginWithGoogle())
})

export default connect(undefined, mapDispatchToProps)(SignIn)
