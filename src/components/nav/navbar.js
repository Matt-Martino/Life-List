import { LiferNav } from "./liferNav"
import "./navbar.css"

export const NavBar = () => {
    
    const localLiferUser = localStorage.getItem("lifer_user")
    const liferUserObject = JSON.parse(localLiferUser)

    
    return <LiferNav/>
    
}

