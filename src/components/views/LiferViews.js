import { Outlet, Route, Routes } from "react-router-dom"
import { CreateNewLifer } from "../user/NewFind"
import { HerpTypeList } from "../user/herpTypes"
import { YourLifeList } from "../user/profile"
import { EditLifer } from "../user/editLifer"

export const LiferViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Life List</h1>
                    <div>Welcome back herper!</div>

                    <Outlet />
                </>
            }>
                <Route path="/profile" element={ <YourLifeList /> } />
                <Route path="/newfind" element={ <CreateNewLifer /> } />
                <Route path="/order" element={ <HerpTypeList /> } />
                <Route path="profile/:entryId/edit" element={ <EditLifer />} />
                

            </Route>
        </Routes>
    )
}
