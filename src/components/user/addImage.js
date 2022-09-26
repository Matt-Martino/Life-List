import Axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./profile.css"


export const AddAnImage = () => {


    const { entryId } = useParams()
    const [selectedImage, setImage] = useState()
    const navigate = useNavigate()

    const [lifer, setLifer] = useState({
        id: entryId,
        usersId: "",
        herpTypeId: "",
        order: "",
        family: "",
        genus: "",
        species: "",
        subspecies: "",
        commonName: "",
        locationFound: "",
        aweb_uid: "",
        image: "",
        dateFound: ""
    })

    useEffect(() => {
        fetch(`http://localhost:8088/lifers/${entryId}`)
            .then(response => response.json())
            .then((lifeListEntry) => {
                setLifer(lifeListEntry)
            })

    }, [entryId])


    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", selectedImage)
        formData.append("upload_preset", "shgfdsfhd")

        return Axios.post("https://api.cloudinary.com/v1_1/dm0vsswx2/image/upload", formData)
    }
    const saveImageClick = (event) => {
        event.preventDefault()

        uploadImage()
            .then((response) => {

                const newHerpToSendToAPI = {
                    id: entryId,
                    usersId: lifer.usersId,
                    herpTypeId: lifer.herpTypeId,
                    order: lifer.order,
                    family: lifer.family,
                    genus: lifer.genus,
                    species: lifer.species,
                    subspecies: lifer.subspecies,
                    commonName: lifer.commonName,
                    locationFound: lifer.locationFound,
                    aweb_uid: lifer.aweb_uid,
                    image: response.data.url,
                    dateFound: lifer.dateFound
                }


                return fetch(`http://localhost:8088/lifers/${entryId}`, {
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
            })
    }
    return <>
        <section className="mainbox">
                <h1 className="Header-text-edit">Add an image to your find.</h1>
            <article className="HerpTypes">
                <div className="HerpType">

                    <div>
                        <input className="btn btn-primary"
                            type="file"
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                            }}

                        >
                        </input>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={(clickEvent) => { saveImageClick(clickEvent) }}
                        >Upload Image</button>
                    </div>

                </div>
            </article>
        </section>
    </>
}