import * as yup from 'yup'

const password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@$%&*?])[A_Za-z\d!@$%&*?]{8,}$/

// Register Schema :
export const registerSchema = yup.object().shape({
    name:yup.
    string().min(3, 'minimum 3 character reqired').required('This field is required'),
    email:yup.
    string().email('enter the valid email address').required('This field is required'),
    age:yup.
    number().typeError('Enter a valid number').integer('only whole numbers allowed').positive('value must be greater than 0').max(120, 'age cant exeed 120').required('this field is required'),
    password:yup.
    string().matches(password, 'password must be strong 2 uppercase lowercase symbol & number').required('This field is required'),
    phone:yup.
    string().matches(/^[6-9]\d{9}$/).required('This field is required'),
    role:yup.
    string().required('This field is required')
})

export const loginSchema =yup.object().shape({
    email:yup.
    string().email('enter valid email id').required('This field is required'),
    password:yup.
    string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@$%&*?])[A-Za-z\d!@$%&*?]{8,}$/, 'password must contain 2 uppercase loercase symbol & number').required('This field is required')
})