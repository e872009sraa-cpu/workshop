import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', password_confirmation: '', role: 'student',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors ? Object.values(errors).flat().join(' | ') : err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }}>
      <h3>Register</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={set('name')} required />
      <input className="form-control mb-2" type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
      <input className="form-control mb-2" type="password" placeholder="Password" value={form.password} onChange={set('password')} required />
      <input className="form-control mb-2" type="password" placeholder="Confirm password" value={form.password_confirmation} onChange={set('password_confirmation')} required />
      <select className="form-select mb-3" value={form.role} onChange={set('role')}>
        <option value="student">Student</option>
        <option value="organizer">Organizer</option>
      </select>
      <button className="btn btn-primary">Register</button>
    </form>
  );
}