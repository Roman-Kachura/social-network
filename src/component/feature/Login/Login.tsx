import s from './Login.module.css';
import { useFormik} from "formik";
import {RequestType} from "../../../api/auth-api";
import { Navigate } from 'react-router-dom';

type LoginPropsType = {
    login: (data: RequestType) => void
    isLoggedIn: boolean
}


export const Login = ({login,isLoggedIn}:LoginPropsType) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email field is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if(!values.password){
                errors.password = 'Password field is required';
            } else if(values.password.length < 3){
                errors.password = 'Длина пароля не может быть менее 3 символов';
            }
            return errors;
        },
        onSubmit: values => {
            login(values);
        },
    })

    if(isLoggedIn){
        return <Navigate to='/'/>
    }

    return(
        <div>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <label>
                    <input {...formik.getFieldProps('email')}type='text' placeholder='Email'/>
                    {formik.errors.email && <div className={s.error}>{formik.errors.email}</div>}
                </label>

                <label>
                    <input autoComplete={''} {...formik.getFieldProps('password')} type='password' placeholder='Password'/>
                    {formik.errors.password && <div className={s.error}>{formik.errors.password}</div>}
                </label>
                <label>
                    <input {...formik.getFieldProps('rememberMe')} type='checkbox'/>RememberMe
                </label>

                <input type="submit"/>

            </form>
        </div>
    )
}

//Types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}