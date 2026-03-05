import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <nav className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight text-amber-400">
        CSCI322 Cookbook
      </Link>
      <div className="flex gap-6 text-sm text-stone-400">
        <Link to="/search" className="hover:text-stone-100 transition-colors">Explore</Link>
        {user && <Link to="/favorites" className="hover:text-stone-100 transition-colors">Favorites</Link>}
        {user && <Link to="/my-recipes" className="hover:text-stone-100 transition-colors">My Recipes</Link>}
        {user
          ? <button onClick={handleLogout} className="hover:text-stone-100 transition-colors">Log out</button>
          : <Link to="/auth" className="hover:text-stone-100 transition-colors">Sign in</Link>
        }
      </div>
    </nav>
  );
}