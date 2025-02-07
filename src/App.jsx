import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Meals from "./pages/Meals";
import Lists from "./pages/List";
import Tabs from "./components/Tab";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Meals />} />
        <Route path="/week/:weekNumber" element={<Lists />} />
      </Routes>
    </Router>
  )
}

export default App
