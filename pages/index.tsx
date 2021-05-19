import Login from "../components/Login";

export default function Dashboard({ session }) {
  if (!session) return <Login />;

  return <h1>Dashboard</h1>;
}
