import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdList from "./components/AdList";
import AdDetail from "./components/AdDetail";
import CreateAd from "./components/CreateAd";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdList title="Advertisement Board" />} />
                <Route path="/ads/:id" element={<AdDetail />} />
                <Route path="/create-ad" element={<CreateAd />} />
            </Routes>
        </Router>
    );
}

export default App;
