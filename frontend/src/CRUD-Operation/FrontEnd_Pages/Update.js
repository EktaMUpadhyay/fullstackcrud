
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Code for Update Profile

const UpdateForm = () => {

    const location = useLocation();
    const [inputs, setinputs] = useState({});
    const navigate = useNavigate();

    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setinputs(values => ({ ...values, [name]: value }));
    }

    useEffect(() => {
        console.log("location", location)
        if (location.state.myloginData) {
            let userprofile = location.state.myloginData;
            setinputs(userprofile);
        }
    }, []);

    const Update = () => {
        console.log("Update Button clicked");
        console.log(inputs);
        axios.post("http://localhost:8000/update", {
            Firstname: inputs.Firstname,
            Email: inputs.Email,
            Password: inputs.Password,
            Country: inputs.Country,
            Mobile: inputs.Mobile,
            UserId: inputs.UserId
        }).then(res => {
            let response = res.data;
            if (response.status === 200) {
                alert('Profile Updated Successfully');
                navigate("/admintable", { state: { myloginData: response.data } });
            } else {
                alert("Error", + response.msg);
            }
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <div className="update">
            <div className="wrapper">
                <div>
                    <h3 className="card-title mt-3">Update Form </h3>

                    <div>
                        <label className="form-label">Your Name:</label>
                        <input type="text" name="Firstname" className="form-control text-center" placeholder="Enter Username" required value={inputs.Firstname || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <label className="form-label">Your Email:</label>
                        <input type="email" name="Email" className="form-control text-center" placeholder="Enter Email" required value={inputs.Email || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <label className="form-label ">Your Password:</label>
                        <input type="password" name="Password" className="form-control text-center" placeholder="Enter Password" required value={inputs.Password || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <label className="form-label ">Your Country:</label>
                        <input type="text" name="country" className="form-control text-center" placeholder="Enter Country" required value={inputs.Country || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>
                        <label className="form-label ">Your Mobile:</label>
                        <input type="number" name="Mobile" className="form-control text-center" placeholder="Enter Mobile" required value={inputs.Mobile || ''} onChange={handlechange} />
                        <div className="valid-feedback">Valid.</div>
                        <span className="invalid-feedback">Please fill out this field.</span>
                    </div>

                    <div>  <br />
                        <button className="mybutton" onClick={Update}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateForm;