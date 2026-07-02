import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/register", {
        email,
        password,
      });

      alert(res.data.msg);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.msg || "Registration Failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="glass-card">
        <h1>Create Account 🚀</h1>
        <p>Register to continue</p>

        <form onSubmit={signup}>
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="btn">{loading ? "Creating..." : "Register"}</button>
        </form>

        <div className="bottom-text">
          Already have an account?
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

