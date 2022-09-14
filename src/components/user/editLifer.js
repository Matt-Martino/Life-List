import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditLifer = () => {

    const localLiferUser = localStorage.getItem("lifer_user")
    const liferUserObject = JSON.parse(localLiferUser)

    const [herpTypes, setHerpTypes] = useState([])
    const [herpOrder, setOrder] = useState([])
    const [filteredFamily, setFamily] = useState([])

    const [entry, updateEntry] = useState({
        id: (1),
        usersId: liferUserObject.id,
        herpTypeId: (0),
        genus: "",
        species: "",
        commonName: "",
        locationFound: "",
        dateFound: ""
    })

    const { entryId } = useParams() 
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/lifers/${entryId}`)
            .then(response => response.json())
            .then((data) => {                
                updateEntry(data)

            })
    }, [entryId])
    
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
            const filteredByOrderForFamily = herpTypes.filter(herp => herp.commonNameForOrdersId === parseInt(entry.herpTypeId))
            setFamily(filteredByOrderForFamily)


        },
        [entry]
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newHerpToSendToAPI = {
            id: entryId,
            usersId: liferUserObject.id,
            herpTypeId: parseInt(entry.herpTypeId),
            order: entry.order,
            family: entry.family,
            genus: entry.genus,
            species: entry.species,
            commonName: entry.commonName,
            locationFound: entry.locationFound,
            dateFound: entry.dateFound
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/lifers/${entry.id}`, {
            method: "PUT",
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
        <article className="HerpTypes">

            <form className="HerpType">
                <h2 className="liferform__title">New lifer!</h2>

                <fieldset>
                    <label htmlFor="name">Select type of herp</label>
                    {
                        herpOrder.map(
                            (order) => {
                                return <article className="HerpType" key={`type--${order.id}`}>
                                    <div className="form-group" >
                                        <input type="radio" name="OnlyOne"

                                            onChange={
                                                (evt) => {
                                                    const copy = { ...entry }
                                                    copy.herpTypeId = evt.target.value
                                                    updateEntry(copy)

                                                }
                                            } value={order.id} /> {order.herpType}
                                    </div>
                                </article>
                            }
                        )
                    }
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Family:</label>
                        <select id="description" value={entry.family}
                            onChange={(evt) => {
                                const copy = { ...entry }
                                copy.family = evt.target.value
                                updateEntry(copy)
                            }}
                        >
                            <option value={0}>Select the family</option>
                            {
                                filteredFamily.map(family => {
                                    return <option key={`type--${family.id}`} value={family.family}>{family.family}</option>
                                })
                            }
                        </select>


                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Genus:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="in Latin please"
                            value={entry.genus}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.genus = evt.target.value
                                    updateEntry(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Species:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="in Latin please"
                            value={entry.species}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.species = evt.target.value
                                    updateEntry(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Connom Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="in English please"
                            value={entry.connomName}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.commonName = evt.target.value
                                    updateEntry(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Where was this found:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="County, State for example"
                            value={entry.locationFound}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.locationFound = evt.target.value
                                    updateEntry(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Date:</label>
                        <input
                            required autoFocus
                            type="date"
                            className="form-control"
                            placeholder="Date found"
                            value={entry.dateFound}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.dateFound = evt.target.value
                                    updateEntry(copy)
                                }
                            } />
                    </div>
                </fieldset>




                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save changes
                </button>
            </form>
        </article>
    </>
}