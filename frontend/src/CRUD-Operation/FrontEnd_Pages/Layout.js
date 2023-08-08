
import { Link, Outlet } from "react-router-dom";
import logo from '../../logo.png';

const Layout = () => {
    return (
        //Code for Navbar
        <>
            <nav className=" navbar navbar-expand-sm sticky mynavbar" >
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" >
                        <img src={logo} alt="Logo" style={{ height: '50px', width: '60px' }} />
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link  ps-3 pe-3" to="/">Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link  ps-3 pe-3" to="/signup">Signup Here
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link  ps-3 pe-3" to="/login">Login Here
                                </Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

            <div className="container-fluid mt-3">
                <Outlet />
            </div>
        </>
    )
}
export default Layout;