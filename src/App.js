import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserFileUpload from "./pages/UserFileUpload";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/userupload" element={<UserFileUpload />} />
        <Route path="*" element={<Navigate to="/userupload" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
