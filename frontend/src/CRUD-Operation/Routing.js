import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupForm from "./FrontEnd_Pages/SignUp";
import LoginForm from "./FrontEnd_Pages/Login";
import UpdateForm from "./FrontEnd_Pages/Update";
import Home from "./FrontEnd_Pages/Home";
import Layout from "./FrontEnd_Pages/Layout";
import Admintable from "./FrontEnd_Pages/AdminTable";


export default function Myrouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="signup" element={<SignupForm />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="update" element={<UpdateForm />} />
                        <Route path="admintable" element={<Admintable />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </>

    )
}