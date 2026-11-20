import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false; // علامة للـ cleanup

    api.get('/workshops')
      .then((res) => { if (!ignore) setWorkshops(res.data.data); })
      .catch(() => { if (!ignore) setError('Failed to load workshops'); })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; }; // cleanup: لو الصفحة اتقفلت متحدّثش الـ state
  }, []); // فاضية = تتنفذ مرة واحدة

  if (loading) return <div className="spinner-border" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="row">
      {workshops.map((w) => (
        <div className="col-md-4 mb-3" key={w.id}>
          <div className="card">
            <div className="card-body">
              <h5>{w.title}</h5>
              <p className="small">{new Date(w.date).toLocaleString()}</p>
              <Link className="btn btn-sm btn-primary" to={`/workshops/${w.id}`}>Details</Link>
            </div>
          </div>
        </div>
      ))}
      {workshops.length === 0 && <p>No workshops yet.</p>}
    </div>
  );
}