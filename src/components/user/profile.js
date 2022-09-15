import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./profile.css"

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
        <section className="mainbox">
            <h2>Your Life List!</h2>
            <article className="HerpTypes">

                {
                    filteredLifeList.map(
                        (list) => {
                            return <section className="HerpType" key={`herp--${list.id}`}>
                                <ul className="list">Order: {list.order}</ul>
                                <ul className="list">Family:  {list.family}</ul>
                                <ul className="list">Genus:  {list.genus}</ul>
                                <ul className="list">Species:  {list.species}</ul>
                                <ul className="list">Common Name:  {list.commonName}</ul>
                                <ul className="list">Location Found:  {list.locationFound}</ul>
                                <ul className="list">Date Found:  {list.dateFound}</ul>

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
                                }} className="btn btn-primary"

                                >Delete</button>
                            </section>
                        }
                    )
                }

            </article>
        </section>
    </>
}