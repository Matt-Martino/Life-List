import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"

export const LiferNav = () => {
    const navigate = useNavigate()

    return (
    <ul className="navbar">

            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Your Lifer Profile</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/newfind">Manually enter a New Lifer</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/order">Add a Lifer via Taxonomy trees</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/searchTaxonomy">Browse the whole Reptile or Amphibian Taxonomy list</Link>
            </li>

            {
                localStorage.getItem("lifer_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("lifer_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
            
    </ul>
    )
}