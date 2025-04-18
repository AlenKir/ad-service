import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdList from "./components/AdList/AdList.jsx";
import AdDetail from "./components/AdDetail/AdDetail.jsx";
import AdForm from "./components/AdForm/AdForm.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdList title="Advertisement Board" />} />
                <Route path="/ads/:id" element={<AdDetail />} />
                <Route path="/create-ad" element={<AdForm />} />
                <Route path="/edit-ad/:id" element={<AdForm />} />
            </Routes>
        </Router>
    );
}

export default App;
