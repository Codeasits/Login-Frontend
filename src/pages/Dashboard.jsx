import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(res.data.msg);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    loadDashboard();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <h2>{message}</h2>

        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}