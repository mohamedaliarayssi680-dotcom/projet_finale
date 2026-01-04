import { Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* Dashboard Layout */}
                <Route element={<AppLayout />}>
                    <Route index path="/" element={<Home />} />

                    {/* Others Page */}
                    <Route path="/profile" element={<UserProfiles />} />
                    <Route path="/calendar" element={<Calendar />} />

                    {/* Forms */}
                    <Route
                        path="/clients-terrains"
                        element={<FormElements />}
                    />

                    {/* Tables */}
                    <Route
                        path="/list-des-commandes"
                        element={<BasicTables />}
                    />
                </Route>

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
