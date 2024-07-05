import Logo from "../components/auth/Logo";
import "../components/auth/Authorization.css";
import Login from "../sections/auth/login";

export default function LogInPage() {
  return (
    <div>
      <Logo />
      <section>
        <Login />
      </section>
    </div>
  );
}
