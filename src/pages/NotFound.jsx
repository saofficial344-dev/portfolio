import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1 className="font-display text-7xl gradient-text">404</h1>
        <p className="mt-4 text-muted">Page not found</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 rounded-full bg-primary text-bg font-medium">Go home</Link>
      </div>
    </div>
  );
}
