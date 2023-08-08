import { useState } from "react";
import axios from "axios";

//Code for Signup Form
const SignupForm = () => {
    const [inputs, setinputs] = useState({});

    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setinputs(values => ({ ...values, [name]: value }));
        console.log("inputs = ", inputs);
    }

    const submit = () => {
        console.log("Submit Button clicked");
        axios.post("http://localhost:8000/signup", {
            Name: inputs.fname,
            Email: inputs.email,
            Password: inputs.password,
            Country: inputs.country,
            Mobile: inputs.mobile   
        }).then(res => {
            let response = res.data;
            if (response.status === 200) {
                alert(response.msg + "Your userid is  " + response.data.userid);
            }
            else {
                alert("Error" + response.msg);
            }
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })
    }
    return (

        <div className="signup">
            <div className="wrapper">
                <div>
                    <h3 className="card-title mt-3">Signup Form </h3>

                    <div>
                        <label className="form-label">Your Name:</label>
                        <input type="text" name="fname" className="form-control text-center" id="uname" placeholder="Enter Username" required value={inputs.fname || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <label className="form-label ">Your Email:</label>
                        <input type="email" name="email" className="form-control text-center" id="umail" placeholder="Enter Email" required value={inputs.email || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <label className="form-label ">Your Password:</label>
                        <input type="password" name="password" className="form-control text-center" id="upasswd" placeholder="Enter Password" required value={inputs.password || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <label className="form-label ">Your Country:</label>
                        <input type="text" name="country" className="form-control text-center" id="ucountry" placeholder="Enter Country" required value={inputs.country || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <label className="form-label ">Your Mobile:</label>
                        <input type="number" name="mobile" className="form-control text-center" id="umobile" placeholder="Enter Mobile" required value={inputs.mobile || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <button className="mybutton" onClick={submit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default SignupForm;