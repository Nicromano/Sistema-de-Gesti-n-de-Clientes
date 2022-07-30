import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/LoginPage";
import Signup from "./pages/Signup/SignupPage";
import Dashboard from "./pages/Dashboard/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
