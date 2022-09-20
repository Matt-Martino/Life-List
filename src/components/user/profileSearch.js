export const ProfileSearch = ({setterFunction}) => {
    return (
        <div>
        <input onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        
        type="text" placeholder="Filter your Life List by taxa"></input>
        </div>
    )
}