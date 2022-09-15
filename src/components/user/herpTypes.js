import { useEffect, useState } from "react"
import "./profile.css"

export const HerpTypeList = () => {
    const [taxonomy, getTaxonomy] = useState([])

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

    useEffect(
        () => {

            fetch(`http://localhost:8088/ordersAndFamilys?_expand=commonNameForOrders`)
                .then(response => response.json())
                .then((taxonomy) => {
                    getTaxonomy(taxonomy)
                })
        }, []
    )




    return <>
        <article className="HerpTypes">
            <h2>Taxonomy refresher</h2>
            <div>
                {
                    herpTypes.map(
                        (taxa) => {
                            return <section className="HerpType" key={`herp--${taxa.id}`}>
                                <article>{taxa.herpType} are in the Order {taxa.order}.  This order has all the following families in it.</article>
                                <div>{herpFamilies.map(
                                    (family) => {
                                        if (taxa.id === family.commonNameForOrdersId) {
                                            return <div className="families" key={`herp--${family.id}`}>
                                                <section className="family">
                                                    <ul className="list">
                                                        {family.family}
                                                    </ul>
                                                </section>
                                            </div>
                                        }
                                    }
                                )}
                                </div>

                            </section>
                        })
                }
            </div>
        </article>
    </>
}
