import AuthenticationForm from "./AuthenticationForm";

export default function Login(props) {
    return (
        <AuthenticationForm isLogin={true} handleLogin={props.onLogin}>
        </AuthenticationForm>
    );
}