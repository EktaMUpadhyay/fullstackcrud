import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Code for Login Form
const LoginForm = () => {
    const [inputs, setinputs] = useState({});
    const navigate = useNavigate();

    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setinputs(values => ({ ...values, [name]: value }));
    }

    const Login = async () => {
        console.log("Login Button clicked");
        await axios.post("http://localhost:8000/login", {
            Userid: inputs.Userid,
            Password: inputs.password
        }).then((res) => {
            if (res.data.status === 200) {
                console.log("detail for admin = " + res.data.data);
                let loginData = res.data.data;
                console.log("loginData", loginData);
                navigate("/admintable", { state: { myloginData: loginData } });
            }
            else if (res.data.status === 201) {
                console.log("user", res.data.data);
                let loginData = res.data.data;
                console.log("202", loginData);
                navigate("/update", { state: { myloginData: loginData } });
            } else {
                console.log("user not found");
            }
            console.log(res.data);
        })
    }

    return (
        <>
            <div className="login ">
                <div className="wrapper">
                    <div >
                        <h3 className="card-title mt-3">Login Form </h3>

                        <div className="mb-2 mt-3">
                            <label className="form-label">Your Userid:</label>
                            <input
                                type="text"
                                name="Userid" className="form-control text-center" id="uid" placeholder="Enter Username" required
                                value={inputs.Userid || ''}
                                onChange={handlechange} />
                            <div className="valid-feedback">Valid.</div>
                            <span className="invalid-feedback">Please fill out this field.</span>

                            <label className="form-label">Your Password:</label>
                            <input
                                type="password"
                                name="password" className="form-control text-center" id="upasswd" placeholder="Enter Password" required
                                value={inputs.password || ''}
                                onChange={handlechange} />
                            <div className="valid-feedback">Valid.</div>
                            <span className="invalid-feedback">Please fill out this field.</span>
                        </div>

                        <div>
                            <button className="myloginbutton" onClick={Login}>Login</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginForm;
