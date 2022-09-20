import { useState } from "react"
import { YourLifeList } from "./profile"
import { ProfileSearch } from "./profileSearch"

export const ProfileSearchContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
                    <ProfileSearch setterFunction={setSearchTerms} />
                    <YourLifeList searchTermState={searchTerms} />
        </>
}