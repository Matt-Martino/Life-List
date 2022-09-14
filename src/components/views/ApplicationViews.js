import { LiferViews } from "./LiferViews"

export const ApplicationViews = () => {

    const localLiferUser = localStorage.getItem("lifer_user")
    const liferUserObject = JSON.parse(localLiferUser)


        return <LiferViews/>



	
}