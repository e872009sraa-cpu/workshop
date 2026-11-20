import { useEffect, useState } from 'react';
import { api } from '../api';

const empty = { title: '', description: '', date: '' };

export default function Dashboard() {
  const [workshops, setWorkshops] = useState([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    api.get('/workshops')
      .then((res) => { if (!ignore) setWorkshops(res.data.data); })
      .catch(() => { if (!ignore) setError('Failed to load workshops'); })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const create = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/workshops', form);
      setWorkshops([...workshops, res.data.data]);
      setForm(empty);
      setError('');
    } catch (err) {
      setError(err.response?.status === 403 ? 'Forbidden: organizers only' : 'Create failed');
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/workshops/${id}`);
      setWorkshops(workshops.filter((w) => w.id !== id));
    } catch (err) {
      setError(err.response?.status === 403 ? 'Forbidden: organizers only' : 'Delete failed');
    }
  };

  return (
    <div>
      <h3>Organizer Dashboard</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={create} className="card card-body mb-4">
        <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={set('title')} required />
        <textarea className="form-control mb-2" placeholder="Description" value={form.description} onChange={set('description')} required />
        <input className="form-control mb-2" type="datetime-local" value={form.date} onChange={set('date')} required />
        <button className="btn btn-primary">Publish Workshop</button>
      </form>

      {loading ? <div className="spinner-border" /> : (
        <table className="table">
          <thead>
            <tr><th>Title</th><th>Date</th><th></th></tr>
          </thead>
          <tbody>
            {workshops.map((w) => (
              <tr key={w.id}>
                <td>{w.title}</td>
                <td>{new Date(w.date).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => remove(w.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}