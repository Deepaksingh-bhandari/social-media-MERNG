
module.exports.validateRegisterInput = (userName, email, password, confirmPassword) => {
    const errors = {}

    if (userName.trim() === '')
        errors.userName = 'UserName must not be empty'

    if (email.trim() === '')
        errors.eamil = 'Email must not be empty'
    else {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email.match(emailRegEx))
            errors.email = 'Email must be a vaild email address';
    }
    if (password === '')
        errors.password = 'Password must not be empty'
    else if (password !== confirmPassword)
        errors.confirmPassword = 'Passwords must match';

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (userName, password) => {
    const errors = {}

    if (userName.trim() === '')
        errors.userName = 'UserName must not be empty'

    if (password.trim() === '')
        errors.password = 'Password must not be empty'
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}