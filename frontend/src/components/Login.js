import AuthenticationForm from "./AuthenticationForm";
import React from 'react';

export default function Login(props) {
    return (
        <AuthenticationForm isLogin={true} handleLogin={props.onLogin}>
        </AuthenticationForm>
    );
}