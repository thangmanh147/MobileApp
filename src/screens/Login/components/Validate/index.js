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


