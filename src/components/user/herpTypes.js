import { useEffect, useState } from "react"
import "./users.css"

export const HerpTypeList = () => {
    const [herpTypes, setHerpTypes] = useState([])
    const [herpFamilies, setHerpFamilies] = useState([])

    useEffect(
        () => {

            fetch(`http://localhost:8088/commonNameForOrders`)
                .then(response => response.json())
                .then((herpTypesArray) => {
                    setHerpTypes(herpTypesArray)
                })
        }, []
    )
    useEffect(
        () => {

            fetch(`http://localhost:8088/ordersAndFamilys`)
                .then(response => response.json())
                .then((herpFamiliesArray) => {
                    setHerpFamilies(herpFamiliesArray)
                })
        }, []
    )

    return <>
        <article className="HerpTypes">
            <h2>Taxonomy refresher</h2>
            <div>
            {
                herpTypes.map(
                    (herp) => {
                        return <section className="HerpTypes" key={`herp--${herp.id}`}>
                            <header>{herp.herpType} are in the Order {herp.order}.</header>
                        </section>
                    })
            }
            </div>
            <article>
            <div>
            {
                herpFamilies.map(
                    (herp) => {
                        return <section className="HerpTypes" key={`herp--${herp.id}`}>
                            <header>{herp.family} .</header>
                        </section>
                    })
            }
            </div>
            </article>


        </article>
    </>
}
