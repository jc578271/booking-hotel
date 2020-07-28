import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import MultiSelect from "react-multi-select-component"

const FormField = ({ formdata, id, change, startDate, endDate, roomOptions, style }) => {

    const showError = () => {
        let errorMessage = (
            <div className="text-danger">
                {
                    formdata.validation && !formdata.valid ?
                        <strong>{formdata.validationMessage}</strong>
                    : null
                }
            </div>
        )

        return errorMessage
    }

    const renderTemplate = () => {  
        let formTemplate = null

        switch (formdata.element) {
            case 'date':
                formTemplate = (
                    <div className="form-group">   
                        { formdata.showLabel ?
                            <div>
                                {formdata.config.label}
                            </div>
                            :null
                        }    
                        <DatePicker
                            selected={id === 'startDate' ? startDate: endDate}
                            onChange={date => change({date, id})}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={id === 'startDate' ? undefined : startDate}
                            isClearable
                            placeholderText="select date"
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                        {showError()}
                    </div>
                )
            break
            case 'input':
                formTemplate = (
                    <div style={style} className="form-group">
                        { formdata.showLabel ?
                            <label>
                                {formdata.config.label}
                            </label>
                            :null
                        }
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            className="form-control"
                            placeholder={formdata.showPlaceholder ? formdata.config.label: ''}
                            onChange={(event) => change({event, id})}
                        />
                        {showError()}
                    </div>
                )
            break
            case 'textarea':
                formTemplate = (
                    <div className="form-group">
                        { formdata.showLabel ?
                            <div>
                                {formdata.config.label}
                            </div>
                            :null
                        }
                        <textarea
                            {...formdata.config}
                            value={formdata.value}
                            onChange={(event) => change({event, id})}
                            className="form-control"
                        />
                    </div>
                )
            break
            case 'select':
                formTemplate = (
                    <div>
                        { formdata.showLabel ?
                            <div>
                                {formdata.config.label}
                            </div>
                            :null
                        }
                        <select
                            value={formdata.value}
                            onChange={(event) => change({event, id})}
                            className="custom-select"
                            style={style}
                        >
                            <option value="">select one</option>
                            {
                                formdata.config.options.map((item) => (
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
            break
            case 'multi_select':
                formTemplate = (
                    <div style={style}>
                        { formdata.showLabel ?
                            <div>
                                {formdata.config.label}
                            </div>
                            :null
                        }
                        <MultiSelect
                            options={roomOptions}
                            value={formdata.value}
                            onChange={(event) => change({ id, event })}
                            labelledBy={"Select"}
                        />
                        {showError()}
                    </div>
                )
            break
            default:
                formTemplate = null
        }

        return formTemplate
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField