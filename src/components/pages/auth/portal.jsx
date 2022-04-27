import { useState, useContext } from "react/cjs/react.development";
import { AdminContext } from "../../../context/admin-context";
import Register from "./register"

const Portal = () => {
    const [showLogin, setShowLogin] = useState(true);
    const { token, setEmail, setPassword, email, password } = useContext(AdminContext);

    return (
    <Register 
    token={token} 
    setEmail={setEmail}
    setPassword={setPassword}
    email={email}
    password={password}
    />
)
}

export default Portal