import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import AuthLayout from "./layout/auth";
import SignIn from "./pages/signIn";
import { BrowserRouter as Router } from "react-router-dom";
import RootLayout from "./layout/root";
import SignUp from "./pages/signUp";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
