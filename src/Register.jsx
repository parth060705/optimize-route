import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/register', form);
      alert(res.data.message);
      setForm({ username: '', email: '', password: '' }); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '1rem',
    width: '400px',
    height: '400px',
    margin: '0 auto',
    marginTop: "20px",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.1rem",
    color: "#6b21a8",
    textAlign: "center"
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '0.375rem',
    border: '1px solid #e2e8f0',
    backgroundColor: '#2d3748',
    color: '#ffffff',
    cursor: 'pointer',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#6b21a8',
    color: '#ffffff',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s ease',
    opacity: loading ? 0.6 : 1,
  };

  const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#6b21a8",
    display: "block",
    marginBottom: "0.25rem",
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
  };

  return (
    <>
      <form onSubmit={handleRegister} style={formStyle}>
        <h2 style={headingStyle}>Register</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <div>
          <label style={labelStyle}>Username</label>
          <input
            type="text"   
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </>
  );
}

export default Register;
