import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert(res.data.msg);
        navigate("/dashboard");
      } else {
        alert(res.data.msg || "Login Failed");
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">

      <div className="glass-card">

        <h1>Welcome Back 👋</h1>

        <p>Sign in to continue</p>

        <form onSubmit={login}>

          <div className="input-box">
            <FaEnvelope className="icon" />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">

            <FaLock className="icon"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <span onClick={()=>setShowPassword(!showPassword)}>

              {showPassword ? <FaEyeSlash/> : <FaEye/>}

            </span>

          </div>

          <button className="btn">

            {loading ? "Please Wait..." : "Login"}

          </button>

        </form>

        <div className="bottom-text">

          Don't have an account?

          <Link to="/signup">

            Register

          </Link>

        </div>

      </div>

    </div>
  );
}