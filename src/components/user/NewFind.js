import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./users.css"

export const CreateNewLifer = () => {
    const navigate = useNavigate()
    const [herpTypes, setHerpTypes] = useState([])
    const [herpOrder, setOrder] = useState([])
    const [filteredFamily, setFamily] = useState([])


    const localLiferUser = localStorage.getItem("lifer_user")
    const liferUserObject = JSON.parse(localLiferUser)


    const [newLifer, updateNewLifer] = useState({
        usersId: liferUserObject.id,
        herpTypeId: (0),
        order: "",
        genus: "",
        species: "",
        commonName: "",
        locationFound: "",
        dateFound: ""
    })

    useEffect(
        () => {

            fetch(`http://localhost:8088/ordersAndFamilys?_expand=commonNameForOrders`)
                .then(response => response.json())
                .then((herpTypesArray) => {
                    setHerpTypes(herpTypesArray)
                })
        }, []
    )

    useEffect(
        () => {

            fetch(`http://localhost:8088/commonNameForOrders`)
                .then(response => response.json())
                .then((herpOrderArray) => {
                    setOrder(herpOrderArray)
                })
        }, []
    )

    useEffect(
        () => {
            const filteredByOrderForFamily = herpTypes.filter(herp => herp.commonNameForOrdersId === parseInt(newLifer.herpTypeId))
            setFamily(filteredByOrderForFamily)


        },
        [newLifer]
    )

    const addNewLifer = (event) => {
        event.preventDefault()

        const newHerpToSendToAPI = {
            usersId: liferUserObject.id,
            herpTypeId: parseInt(newLifer.herpTypeId),
            order: newLifer.order,
            family: newLifer.family,
            genus: newLifer.genus,
            species: newLifer.species,
            commonName: newLifer.commonName,
            locationFound: newLifer.locationFound,
            dateFound: newLifer.dateFound
        }
        return fetch(`http://localhost:8088/lifers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHerpToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/profile")
            })
    }





    return <>
        <article className="HerpTypes" >

            <form className="HerpType">
                <h2 className="liferform__title">New lifer!</h2>

                <fieldset className="orderBoxMain">
                    <label htmlFor="name" className="orderBox">Select type of herp</label>
                    {
                        herpOrder.map(
                            (order) => {
                                return <article className="orderType" key={`type--${order.id}`} >
                                    <div className="order" >
                                        <input type="radio" name="OnlyOne"

                                            onChange={
                                                (evt) => {
                                                    const copy = { ...newLifer }
                                                    copy.herpTypeId = evt.target.value
                                                    copy.order = order.order
                                                    updateNewLifer(copy)

                                                }
                                            } value={order.id} /> {order.herpType}
                                    </div>
                                </article>
                            }
                        )
                    }
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Family:</label>
                        <select id="description" value={newLifer.family}
                            onChange={(evt) => {
                                const copy = { ...newLifer }
                                copy.family = evt.target.value
                                updateNewLifer(copy)
                            }}
                        >
                            <option value={0}>Select the family</option>
                            {
                                filteredFamily.map(family => {
                                    return <option key={`family--${family.id}`} value={family.family}>{family.family}</option>
                                })
                            }
                        </select>


                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Genus:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="in Latin please"
                            value={newLifer.genus}
                            onChange={
                                (evt) => {
                                    const copy = { ...newLifer }
                                    copy.genus = evt.target.value
                                    updateNewLifer(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Species:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="in Latin please"
                            value={newLifer.species}
                            onChange={
                                (evt) => {
                                    const copy = { ...newLifer }
                                    copy.species = evt.target.value
                                    updateNewLifer(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Common Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="in English please"
                            value={newLifer.connomName}
                            onChange={
                                (evt) => {
                                    const copy = { ...newLifer }
                                    copy.commonName = evt.target.value
                                    updateNewLifer(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Where was this found:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="County, State for example"
                            value={newLifer.locationFound}
                            onChange={
                                (evt) => {
                                    const copy = { ...newLifer }
                                    copy.locationFound = evt.target.value
                                    updateNewLifer(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Date:</label>
                        <input
                            required autoFocus
                            type="date"
                            className="form-control"
                            placeholder="Date found"
                            value={newLifer.dateFound}
                            onChange={
                                (evt) => {
                                    const copy = { ...newLifer }
                                    copy.dateFound = evt.target.value
                                    updateNewLifer(copy)
                                }
                            } />
                    </div>
                </fieldset>




                <button
                    onClick={(clickEvent) => addNewLifer(clickEvent)}
                    className="btn btn-primary">
                    Submit new herp find!
                </button>
            </form>
        </article>
    </>

}