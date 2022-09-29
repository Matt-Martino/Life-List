import { useEffect, useState } from "react"


export const SearchTaxonomy = () => {


    const [filteredHerpsArray, setFilteredHerps] = useState([])
    const [repOrAmphib, setHerp] = useState([])
    const [searchTerms, setSearchTerms] = useState([])
    const [filterSelection, setFilterSelection] = useState(
        {
            taxa: (0),

        }
    )



    useEffect(
        () => {
            if (parseInt(filterSelection.taxa) === 1) {
                fetch(`http://localhost:8088/reptiles`)
                    .then(response => response.json())
                    .then((reptileArray) => {
                        setHerp(reptileArray)
                        setFilteredHerps(reptileArray)
                    })

            }
            else if (parseInt(filterSelection.taxa) === 2) {
                fetch(`http://localhost:8088/amphibians`)
                    .then(response => response.json())
                    .then((amphibianArray) => {
                        setHerp(amphibianArray)
                        setFilteredHerps(amphibianArray)
                    })

            }
            else {

            }



        },
        [filterSelection]
    )

    useEffect(
        () => {
            
            const searchedTaxonomy = repOrAmphib.filter(herp => {
                return herp.family.toLowerCase().includes(searchTerms.toLowerCase())
                    || herp.genus.toLowerCase().includes(searchTerms.toLowerCase())
                    || herp.species.toLowerCase().includes(searchTerms.toLowerCase())
                    
            })
            setFilteredHerps(searchedTaxonomy)
        },
        [searchTerms]
    )



    return <>
        
            <h2 className="Header-text-edit">See the whole list of Reptiles or Amphibians</h2>
        <section className="searchBrowseTaxonomy">
            <fieldset className="SelectorsInSearch">
                
                <select className="searchInput1" id="description" value={""}
                    onChange={(evt) => {
                        const copy = { ...filterSelection }
                        copy.taxa = evt.target.value
                        setFilterSelection(copy)
                    }}
                >
                    <option value={0}>Choose Reptiles or Amphibians please.</option>
                    <option value={1}>Reptile</option>
                    <option value={2}>Amphibian</option>

                </select>
                <div>
                <input className="searchInput" onChange={
            (changeEvent) => {
                setSearchTerms(changeEvent.target.value)
            }
        }

            type="text" placeholder="Filter your Life List by keyword"></input>
                </div>
            </fieldset>
                    
            <article className="HerpTypes">
                {
                    filteredHerpsArray.map(
                        (list) => {
                            return <section className="HerpType" key={`herp--${list.id}`}>
                                {
                                    list.order
                                        ? <ul className="list">Order: {list.order}</ul>
                                        : ""
                                }
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
                                    list.aweb_uid
                                        ? <ul className="list">Life history data:  <a href={`https://amphibiaweb.org/species/${list.aweb_uid}`} target="_blank" >
                                            View {list.genus} {list.species} data.
                                        </a>
                                        </ul>
                                        : ""

                                }
                            </section>
                        })}
            </article>


        </section>

    </>
}