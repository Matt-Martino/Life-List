import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./profile.css"

export const YourLifeList = ({ searchTermState }) => {

    const [lifeList, setLifeList] = useState([])
    const [filteredLifeList, setFiltered] = useState([])
    const [deleteChange, setDeleteChange] = useState([])
    const navigate = useNavigate()
    const localLiferUser = localStorage.getItem("lifer_user")
    const liferUserObject = JSON.parse(localLiferUser)



    useEffect(
        () => {
            const searchedProfile = lifeList.filter(herp => {
                return herp.order.toLowerCase().includes(searchTermState.toLowerCase())
                    || herp.family.toLowerCase().includes(searchTermState.toLowerCase())
                    || herp.genus.toLowerCase().includes(searchTermState.toLowerCase())
                    || herp.species.toLowerCase().includes(searchTermState.toLowerCase())
                    || herp.commonName.toLowerCase().includes(searchTermState.toLowerCase())

            })
            setFiltered(searchedProfile)
        },
        [searchTermState]
    )

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
        <h2 className="Header-text-edit">Your Life List!</h2>
        <article className="HerpTypes">

            {
                filteredLifeList.map(
                    (list) => {
                        return <section className="HerpType" key={`herp--${list.id}`}>
                            <ul className="list">Order: {list.order}</ul>
                            <ul className="list">Family:  {list.family}</ul>
                            <ul className="list">Genus:  <i>{list.genus}</i></ul>
                            <ul className="list">Species:  <i>{list.species}</i></ul>
                            {
                                list.subspecies
                                    ? <ul className="list">Subspecies:  <i>{list.subspecies}</i></ul>
                                    : ""
                            }
                            {
                                list.commonName
                                    ? <ul className="list">Common Name:  {list.commonName}</ul>
                                    : ""
                            }
                            {
                                list.locationFound
                                    ? <ul className="list">Location Found:  {list.locationFound}</ul>
                                    : ""
                            }
                            {
                                list.dateFound
                                    ? <ul className="list">Date Found:  {list.dateFound}</ul>
                                    : ""
                            }
                            {
                                list.aweb_uid
                                    ? <ul className="list">Life history data:  <a href={`https://amphibiaweb.org/species/${list.aweb_uid}`} target="_blank" >
                                        View {list.genus} {list.species} data.
                                    </a>
                                    </ul>
                                    : ""

                            }
                            {
                                list.image
                                ? <img src={list.image} className="uploaded_image"
                                ></img>
                                :""
                            }

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

                            <button onClick={
                                () => navigate(`${list.id}/editImage`)}
                                className="btn btn-primary">
                                Add image</button>


                        </section>
                    }
                )
            }

        </article>
    </section>
</>
}