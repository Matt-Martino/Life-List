import "./profile.css"

export const ProfileSearch = ({setterFunction}) => {
    return (
        <div className="searchInputOuter">
        <input className="searchInput" onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        
        type="text" placeholder="Filter your Life List by taxa"></input>
        </div>
    )
}