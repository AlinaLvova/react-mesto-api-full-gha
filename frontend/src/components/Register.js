import AuthenticationForm from "./AuthenticationForm";
import React from 'react';

export default function Register(props) {
    return (
        <AuthenticationForm isLogin={false} handleLogin={props.onRegister}>
        </AuthenticationForm>
    );
}