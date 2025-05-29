import React, { useState } from "react";
import axios from "axios";

const Loginpage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      alert(res.data.message); // Should say "Login successful"
      setError("");
      console.log("Logged in as:", res.data.username);
      // Optionally redirect or store token here
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const styles = {
    box: {
      height: "425px",
      width: "400px",
      backgroundColor: "#fff",
      padding: "1.5rem",
      borderRadius: "1rem",
      margin: "auto",
      marginTop: "20px",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginTop: "2.5rem",
      color: "#6b21a8",
      textAlign: "center",
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#6b21a8",
      display: "block",
      marginBottom: "0.25rem",
    },
    input: {
      width: "100%",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      border: "1px solid #ccc",
      outline: "none",
      marginBottom: "1rem",
      backgroundColor: "#282c34",
      color: "#fff",
      cursor: 'pointer',
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#6b21a8",
      color: "white",
      border: "none",
      borderRadius: "0.375rem",
      cursor: "pointer",
    },
    error: {
      color: "#dc2626",
      fontSize: "0.875rem",
      marginBottom: "1rem",
    },
    footerText: {
      fontSize: "0.875rem",
      textAlign: "center",
      marginTop: "1rem",
      color: "#4b5563",
    },
    link: {
      color: "#7c3aed",
      textDecoration: "underline",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.box}>
      <h2 style={styles.title}>Login</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Email"
          />
        </div>

        <div>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Password"
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <p style={styles.footerText}>
        Don't have an account?{" "}
        <a href="/register" style={styles.link}>
          Register
        </a>
      </p>
    </div>
  );
};

export default Loginpage;
