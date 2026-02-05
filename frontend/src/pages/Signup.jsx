import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../component/AuthInput";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(form);
      navigate("/chat");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <h2 className="text-center mb-1">
          Create Account
        </h2>

        <p className="text-center text-white-50 mb-4">
          Join us today
        </p>

        {error && (
          <div className="signup-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">

          <AuthInput
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <AuthInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <AuthInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="signup-button w-100"
          >
            <span>
              {loading ? "Creating account..." : "Sign Up"}
            </span>
          </button>

        </form>

        <div className="signup-footer">
          Already have an account?
          <Link to="/login" className="ms-2">
            Login
          </Link>
        </div>

      </div>
    </div>

  );
}
