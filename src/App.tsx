import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/auth/ForgotPassword";
import HomePage from "./pages/home";
import AuthLayout from "./layout/auth";
import SignIn from "./pages/signIn";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<SignIn />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
