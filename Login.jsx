import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }}>
      <h3>Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input className="form-control mb-2" type="email" placeholder="Email"
        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input className="form-control mb-2" type="password" placeholder="Password"
        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button className="btn btn-primary">Login</button>
    </form>
  );
}