import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const { logout } = useAuth();
  return (
    <div className="page">
      <p className="text-black" onClick={logout}>
        Home
      </p>
    </div>
  );
}
