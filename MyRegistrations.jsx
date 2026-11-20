import { useEffect, useState } from 'react';
import { api } from '../api';

export default function MyRegistrations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    api.get('/my-registrations')
      .then((res) => { if (!ignore) setItems(res.data.data); })
      .catch((err) => {
        if (!ignore) {
          setError(err.response?.status === 401 ? 'Please login again' : 'Failed to load registrations');
        }
      })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, []);

  const cancel = async (id) => {
    try {
      await api.delete(`/registrations/${id}`);
      setItems(items.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.response?.status === 403 ? 'Not allowed' : 'Cancel failed');
    }
  };

  if (loading) return <div className="spinner-border" />;

  return (
    <div>
      <h3>My Registrations</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {items.length === 0 && <p>No registrations yet.</p>}
      <ul className="list-group">
        {items.map((r) => (
          <li key={r.id} className="list-group-item d-flex justify-content-between">
            <span>{r.workshop.title} — {new Date(r.workshop.date).toLocaleString()}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={() => cancel(r.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}