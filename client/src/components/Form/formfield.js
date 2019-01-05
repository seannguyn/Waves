import React from 'react'

const FormField = ({change, id, formdata}) => {

    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const formType = () => {
        let template = ''
        switch(formdata.element) {
            case "input":
                template = (
                    <div className="formBlock">
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=> change({event,id,blur:true})}
                            onChange={(event)=> change({event,id}) }
                        />
                        {showError()}
                    </div>
                )
                break
            default:
                template=''
        }
        return template;
    }

    return (
        <div>
            {formType()}
        </div>
    )
}

export default FormField;
