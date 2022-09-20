import { Outlet, Route, Routes } from "react-router-dom"
import { CreateNewLifer } from "../user/NewFind"
import { HerpTaxonomyList } from "../user/browseTaxonomyTree"
import { YourLifeList } from "../user/profile"
import { EditLifer } from "../user/editLifer"
import { SearchTaxonomy } from "../user/SearchTaxonomy"
import { ProfileSearch } from "../user/profileSearch"
import { ProfileSearchContainer } from "../user/profileSearchContainer"

export const LiferViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="Header-text-edit">Life List</h1>
                    <h2 className="Header-text-edit">Welcome back herper!</h2>

                    <Outlet />
                </>
            }>
                <Route path="/profile" element={ <ProfileSearchContainer />} />
                <Route path="/newfind" element={ <CreateNewLifer /> } />
                <Route path="/order" element={ <HerpTaxonomyList /> } />
                <Route path="profile/:entryId/edit" element={ <EditLifer />} />
                <Route path="searchTaxonomy" element={ <SearchTaxonomy />} />

            </Route>
        </Routes>
    )
}
