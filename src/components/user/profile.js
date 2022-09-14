import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./users.css"

export const YourLifeList = () => {

    const [lifeList, setLifeList] = useState([])
    const [filteredLifeList, setFiltered] = useState([])
    const [deleteChange, setDeleteChange] = useState([])
    const navigate = useNavigate()
    const localLiferUser = localStorage.getItem("lifer_user")
    const liferUserObject = JSON.parse(localLiferUser)

    useEffect(
        () => {

            fetch(`http://localhost:8088/lifers`)
                .then(response => response.json())
                .then((liferArray) => {
                    setLifeList(liferArray)
                })
        }, []
    )
    useEffect(
        () => {

            fetch(`http://localhost:8088/lifers`)
                .then(response => response.json())
                .then((liferArray) => {
                    setLifeList(liferArray)
                })
        }, [deleteChange]
    )

    useEffect(
        () => {
            const filtered = lifeList.filter(list => list.usersId === liferUserObject.id)
            setFiltered(filtered)


        },
        [lifeList]
    )





    return <>
        <article className="HerpTypes">
            <h2>Your Life List!</h2>

            {
                filteredLifeList.map(
                    (list) => {
                        return <section className="HerpType" key={`herp--${list.id}`}>
                            <header>Order: </header>
                            <ul>Family:{list.family}</ul>
                            <ul>Genus:{list.genus}</ul>
                            <ul>Species:{list.species}</ul>
                            <ul>Common Name:{list.commonName}</ul>
                            <ul>Location Found:{list.locationFound}</ul>
                            <ul>Date Found:{list.dateFound}</ul>

                            <button onClick={
                                () => navigate(`${list.id}/edit`)}
                                className="btn btn-primary">
                                Edit</button>

                            <button onClick={() => {
                                fetch(`http://localhost:8088/lifers/${list.id}`, {
                                    method: "DELETE"
                                })
                                    .then(() => {
                                        setDeleteChange(Date.now)
                                    })
                            }} className="ticket__delete"

                            >Delete</button>
                        </section>
                    }
                )
            }

        </article>
    </>
}