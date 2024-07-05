import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const { logout } = useAuth();
  return (
    <div className="page">
      <p className="text-white" onClick={logout}>
        Home
      </p>
    </div>
  );
}
