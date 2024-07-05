import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import ForgotPassword from "./components/auth/ForgotPassword";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
