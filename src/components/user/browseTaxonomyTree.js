import { useEffect, useState } from "react"
import "./profile.css"

export const HerpTaxonomyList = () => {

    const localLiferUser = localStorage.getItem("lifer_user")
    const liferUserObject = JSON.parse(localLiferUser)

    const [reptiles, getReptiles] = useState([])
    const [amphibians, getAmphibians] = useState([])
    const [sortedOrders, setOrders] = useState([])
    const [filteredGenus, filterGenus] = useState([])
    const [filteredFamily, setFamily] = useState([])
    const [herpTypes, setHerpTypes] = useState([])
    const [genusTrigger, filterGenusTrigger] = useState([])
    const [familyTrigger, triggerFamilySelector] = useState([])
    const [filteredSpecies, setSpecies] = useState([])
    const [speciesTrigger, filterSpeciesTrigger] = useState([])


    const [newLifer, updateNewLifer] = useState({
        usersId: liferUserObject.id,
        herpTypeId: (0),
        order: "",
        genus: "",
        species: "",
        subspecies: "",
        commonName: "",
        locationFound: "",
        dateFound: ""
    })


    useEffect(
        () => {

            fetch(`http://localhost:8088/commonNameForOrders`)
                .then(response => response.json())
                .then((herpOrderArray) => {
                    setOrders(herpOrderArray)
                })
        }, []
    )

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

            fetch(`http://localhost:8088/reptiles`)
                .then(response => response.json())
                .then((reptilesArray) => {
                    getReptiles(reptilesArray)
                })
        }, []
    )

    useEffect(
        () => {

            fetch(`http://localhost:8088/amphibians`)
                .then(response => response.json())
                .then((amphibArray) => {
                    getAmphibians(amphibArray)
                })
        }, []
    )

    useEffect(
        () => {
            const filteredByOrderForFamily = herpTypes.filter(herp => herp.commonNameForOrdersId === parseInt(newLifer.herpTypeId))
            setFamily(filteredByOrderForFamily)


        },
        [familyTrigger]
    )

    useEffect(
        () => {

            if (parseInt(newLifer.herpTypeId) <= 5) {
                const filteredByReptiles = reptiles.filter(herp => {

                    return herp.family === newLifer.family
                })
                const uniqueReptiles = new Set(filteredByReptiles)
                console.log(uniqueReptiles)
                const uniqueReptileArray = Array.from(uniqueReptiles)

                filterGenus(uniqueReptileArray)
            }
            else {
                const filteredByAmphibs = amphibians.filter(herp => {
                    return herp.family === newLifer.family
                })
                filterGenus(filteredByAmphibs)
            }

        },
        [genusTrigger]
    )
    
    useEffect(
        () => {
            const filteredSpecies = filteredGenus.filter(herp => herp.genus === newLifer.genus)
            setSpecies(filteredSpecies)


        },
        [speciesTrigger]
    )

    // useEffect(
    //     () => {
    //         const filteredSubSpecies = filteredSpecies.filter(herp => herp.species === newLifer.species)
    //         setSpecies(filteredSubSpecies)


    //     },
    //     [speciesTrigger]
    // )




    return <>
        <article className="HerpTypes" >
            <form className="HerpType">
                <fieldset className="orderBoxMain">
                    <label htmlFor="name" className="orderBox">Select type of herp to browse</label>
                    {
                        sortedOrders.map((order) => {
                            return <article className="orderType" key={`type--${order.id}`}>
                                <div className="order" >
                                    <input type="radio" name="OnlyOne"

                                        onChange={
                                            (evt) => {
                                                const copy = { ...newLifer }
                                                copy.herpTypeId = evt.target.value
                                                copy.order = order.order
                                                copy.genus = ""
                                                copy.species = ""
                                                updateNewLifer(copy)
                                                triggerFamilySelector(Date.now)


                                            }
                                        } value={order.id} /> {order.herpType}

                                </div>
                            </article>
                        })
                    }
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Family:</label>
                        <select id="descriptionFamily" value={newLifer.family}
                            onChange={(evt) => {
                                const copy = { ...newLifer }
                                copy.family = evt.target.value
                                updateNewLifer(copy)
                                filterGenusTrigger(Date.now)
                            }}
                        >
                            <option value={0}>Select the family you'd like to view</option>
                            {
                                filteredFamily.map(herp => {
                                    return <option key={`family--${herp.id}`} value={herp.family}>{herp.family}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description2">Genus:</label>
                        <select id="descriptionGenus" value={newLifer.genus}
                            onChange={(evt) => {
                                const copy = { ...newLifer }
                                copy.genus = evt.target.value
                                updateNewLifer(copy)
                                filterSpeciesTrigger(Date.now)
                            }}
                        >
                            <option value={0}>Select the Genus you'd like to view</option>
                            {
                                filteredGenus.map(herp => {
                                    return <option key={`genus--${herp.id}`} value={herp.genus}>{herp.genus}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Species:</label>
                        <select id="description" value={newLifer.species}
                            onChange={(evt) => {
                                const copy = { ...newLifer }
                                copy.species = evt.target.value
                                updateNewLifer(copy)
                            }}
                        >
                            <option value={0}>Select the Species you'd like to view</option>
                            {
                                filteredSpecies.map(herp => {
                                    return <option key={`genus--${herp.id}`} value={herp.species}>{herp.species}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>

                {/* <fieldset>
                    <div className="form-group" >
                        <label htmlFor="description">Sub Species:</label>
                        <select id="description" value={newLifer.subspecies}
                            onChange={(evt) => {
                                const copy = { ...newLifer }
                                copy.subspecies = evt.target.value
                                updateNewLifer(copy)
                            }}
                        >
                            <option value={0}>Select the subspecies you'd like to view</option>
                            {
                                filteredSubSpecies.map(herp => {
                                    return <option key={`genus--${herp.id}`} value={herp.subspecies}>{herp.subspecies}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset> */}


            </form>

        </article>

    </>
}
