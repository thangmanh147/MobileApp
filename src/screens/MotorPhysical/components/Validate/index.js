export const validationPackage = (values, required) => {
    let errors = {}
    try {
        if(!values.fullName) {
            errors.fullName = 'Không được bỏ trống'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
}


export function isEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    // return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}
