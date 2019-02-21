

export const validate = (element, formdata= []) => {
    let error = [true,''];


    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Must be a valid email':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid,message] : error;
    }

    return error
}

export const update = (element, formdata, formName ) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }    

    newElement.value = element.event.target.value;    

    if(element.blur){
        let validData = validate(newElement,formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    } else {
        let validData = validate(newElement,formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

export const generateData = (formdata, formName) =>{
    let dataToSubmit = {};

    for(let key in formdata){
        if(key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
        }
    }

    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for(let key in formdata){
        formIsValid = formdata[key].valid && formIsValid
        if (formIsValid === false) {
            console.log(formdata[key]);
        }
    }
    return formIsValid;

}

export const populateField = (oldFormData, arrayData=[], category) => {
    var newFormData = {
        ...oldFormData
    }
    var newList = [];

    arrayData.forEach((item) => {
        newList.push({key: item._id, value: item.name});
    })

    newFormData[category].config.options = newList;

    return newFormData;
    
}

export const resetFormData = (oldFormData) => {
    let newFormData = {
        ...oldFormData
    };

    for (let key in oldFormData) {
        
        if (key === 'image') {
            newFormData[key].value = [];
        } else {
            newFormData[key].value = "";
        }
        
        newFormData[key].valid = false;
        newFormData[key].touched = false;
        newFormData[key].validationMessage = "";
    }

    return newFormData;
}

export const populateUserInfo = (formData, fields) => {
    
    for(let key in formData){
        formData[key].value = fields[key];
        formData[key].valid = true;
        formData[key].touched = true;
        formData[key].validationMessage = ''
    }

    return formData;

}