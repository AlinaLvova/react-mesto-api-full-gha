import AuthenticationForm from "./AuthenticationForm";

export default function Register(props) {
    return (
        <AuthenticationForm isLogin={false} handleLogin={props.onRegister}>
        </AuthenticationForm>
    );
}