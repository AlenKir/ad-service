import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdList from "./components/AdList";
import AdDetail from "./components/AdDetail";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdList title="Advertisement Board" />} />
                <Route path="/ads/:id" element={<AdDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
