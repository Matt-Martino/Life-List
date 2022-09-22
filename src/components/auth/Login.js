import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("mattmartino54@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("lifer_user", JSON.stringify({
                        id: user.id,
                    }))

                    navigate("/profile")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section className="login-hug">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="register-text">Life List</h1>
                    <h2 className="register-text2">A place to record and keep track of your once in a lifetime finds.</h2>
                    
                    <fieldset>
                        <label htmlFor="inputEmail">Enter your Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn btn-primary">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="btn btn-primary">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
