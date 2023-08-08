import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Admintable = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [AllDetails, setAllDetails] = useState([]);

    useEffect(() => {
        setAllDetails(location.state && location.state.myloginData);
    }, [])

    const editUser = (userobj) => {
        navigate("/update", { state: { myloginData: userobj } });
    }

    const deleteuser = (id) => {
        console.log("myid", id);
        axios.post("http://localhost:8000/deleteUser",
            {
                Userid: id.UserId,
            }).then(res => {
                console.log("deleted record", res);
                if (res.data.status == 200) {
                    alert("Deleted Successfully !");
                    setAllDetails(res.data.data);
                } else if (res.data.status) {
                    alert(res.data.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    return (<>
        <table className="table table-hover bg-light table-bordered" style={{ textAlign: 'center', fontSize: '18px' }}>
            <thead className="table-dark align-center">
                <tr className="table-hover">
                    <th>UserId</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Country</th>
                    <th>Mobile</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {AllDetails && AllDetails.map((item, index) => (
                    <tr key={index} className="table-hover">
                        <td>{item.UserId}</td>
                        <td>{item.Firstname}</td>
                        <td>{item.Email}</td>
                        <td>{item.Password}</td>
                        <td>{item.Country}</td>
                        <td>{item.Mobile}</td>
                        <td><button className="btn btn-success ps-4 pe-4" onClick={() => editUser(item)}>Edit</button></td>
                        <td><button className=" btn btn-danger" onClick={() => deleteuser(item)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>)
}
export default Admintable;
