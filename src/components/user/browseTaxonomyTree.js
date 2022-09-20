import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./profile.css"

export const HerpTaxonomyList = () => {

    const localLiferUser = localStorage.getItem("lifer_user")
    const liferUserObject = JSON.parse(localLiferUser)
    const navigate = useNavigate()

    const [reptiles, getReptiles] = useState([])
    const [amphibians, getAmphibians] = useState([])
    const [sortedOrders, setOrders] = useState([])
    const [filteredGenus, filterGenus] = useState([])
    const [filteredFamily, setFamily] = useState([])
    const [herpTypes, setHerpTypes] = useState([])
    const [genusTrigger, filterGenusTrigger] = useState([])
    const [familyTrigger, triggerFamilySelector] = useState([])
    const [filteredSpecies, filterSpeciesSelector] = useState([])
    const [speciesTrigger, filterSpeciesTrigger] = useState([])
    const [filteredSubspecies, setFilterSubspecies] = useState([])
    const [subspeciesTrigger, filterSubSpeciesTrigger] = useState([])


    const [newLifer, updateNewLifer] = useState({
        usersId: liferUserObject.id,
        herpTypeId: (0),
        order: "",
        genus: "",
        species: "",
        subspecies: "",
        commonName: "",
        locationFound: "",
        dateFound: "",
        aweb_uid: ""
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
                const filteredByReptiles = reptiles.reduce((arr, herp) => {

                    if (herp.family === newLifer.family) {
                        arr.push(herp.genus)
                    }
                    return arr
                }, [])

                const uniqueReptiles = new Set(filteredByReptiles)
                const uniqueReptileArray = Array.from(uniqueReptiles)

                filterGenus(uniqueReptileArray)
            }
            else {
                const filteredByAmphibians = amphibians.reduce((arr, herp) => {

                    if (herp.family === newLifer.family) {
                        arr.push(herp.genus)
                    }
                    return arr
                }, [])

                const uniqueAmphibians = new Set(filteredByAmphibians)
                const uniqueAmphibianArray = Array.from(uniqueAmphibians)
                filterGenus(uniqueAmphibianArray)
            }

        },
        [genusTrigger]
    )

    useEffect(
        () => {

            if (parseInt(newLifer.herpTypeId) <= 5) {
                const filteredByReptiles = reptiles.reduce((arr, herp) => {

                    if (herp.genus === newLifer.genus) {
                        arr.push(herp.species)
                    }
                    return arr
                }, [])

                const uniqueReptiles = new Set(filteredByReptiles)
                const uniqueReptileArray = Array.from(uniqueReptiles)

                filterSpeciesSelector(uniqueReptileArray)
            }
            else {
                const filteredByAmphibians = amphibians.reduce((arr, herp) => {

                    if (herp.genus === newLifer.genus) {
                        arr.push(herp.species)
                    }
                    return arr
                }, [])

                const uniqueAmphibians = new Set(filteredByAmphibians)
                const uniqueAmphibianArray = Array.from(uniqueAmphibians)
                filterSpeciesSelector(uniqueAmphibianArray)
            }

        },
        [speciesTrigger]
    )

    useEffect(
        () => {

            if (parseInt(newLifer.herpTypeId) <= 5) {
                const filteredByReptiles = reptiles.reduce((arr, herp) => {

                    if (herp.species === newLifer.species) {
                        arr.push(herp.subspecies)
                    }
                    return arr
                }, [])

                const uniqueReptiles = new Set(filteredByReptiles)
                const uniqueReptileArray = Array.from(uniqueReptiles)
                setFilterSubspecies(uniqueReptileArray)


            }
            else {
                const filteredByAmphibians = amphibians.reduce((arr, herp) => {

                    if (herp.species === newLifer.species) {
                        arr.push(herp.subspecies)
                    }
                    return arr
                }, [])

                const uniqueAmphibians = new Set(filteredByAmphibians)
                const uniqueAmphibianArray = Array.from(uniqueAmphibians)
                setFilterSubspecies(uniqueAmphibianArray)

            }

        },
        [subspeciesTrigger]
    )



    const foundItClick = (event) => {
        event.preventDefault()
        
        if (parseInt(newLifer.herpTypeId) > 5) {

            if (newLifer.subspecies !== "") {
                const filterSpecificAmphib = amphibians.filter(herp => herp.subspecies === newLifer.subspecies && herp.genus === newLifer.genus && herp.species === newLifer.species)
                filterSpecificAmphib.map(herp => {

                    newLifer.commonName = herp.commonName
                    newLifer.aweb_uid = herp.aweb_uid 

                })
            }
            else {
                const filterSpecificAmphib = amphibians.filter(herp => herp.species === newLifer.species && herp.genus === newLifer.genus && herp.family === newLifer.family)
                filterSpecificAmphib.map(herp => {
                    debugger
                    newLifer.commonName = herp.commonName
                    newLifer.aweb_uid = herp.aweb_uid 

            })
        }
    }


    const newHerpToSendToAPI = {
        usersId: liferUserObject.id,
        herpTypeId: parseInt(newLifer.herpTypeId),
        order: newLifer.order,
        family: newLifer.family,
        genus: newLifer.genus,
        species: newLifer.species,
        subspecies: newLifer.subspecies,
        commonName: newLifer.commonName,
        locationFound: newLifer.locationFound,
        dateFound: newLifer.dateFound,
        aweb_uid: newLifer.aweb_uid
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
                                            copy.subspecies = ""
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
                                return <option key={`genus--${herp}`} value={herp}>{herp}</option>
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
                            filterSubSpeciesTrigger(Date.now)
                        }}
                    >
                        <option value={""}>Select the Species you'd like to view</option>
                        {
                            filteredSpecies.map(herp => {
                                return <option key={`species--${herp}`} value={herp}>{herp}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group" >
                    <label htmlFor="description">SubSpecies:</label>
                    <select id="description" value={newLifer.subspecies}
                        onChange={(evt) => {
                            const copy = { ...newLifer }
                            copy.subspecies = evt.target.value
                            updateNewLifer(copy)
                        }}
                    >
                        <option value={0}>Some animals do not have a subspecies</option>
                        {
                            filteredSubspecies.map(herp => {
                                
                                if (herp !== undefined )
                                return <option key={`species--${herp}`} value={herp}>{herp}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>


            <button
                onClick={(clickEvent) => foundItClick(clickEvent)}
                className="btn btn-primary">
                Found it before!
            </button>

        </form>

    </article>

</>
}
