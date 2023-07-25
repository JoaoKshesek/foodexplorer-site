import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Details } from '../pages/Details'
import { EditMeal } from '../pages/EditMeal'
import { CreateMeal } from '../pages/CreateMeal'

export function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/create/" element={<CreateMeal />} />
            <Route path="/edit/:id" element={<EditMeal />} />
        </Routes>
    )
}