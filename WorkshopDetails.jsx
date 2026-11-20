import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext';

export default function WorkshopDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    api.get(`/workshops/${id}`)
      .then((res) => { if (!ignore) setWorkshop(res.data.data); })
      .catch(() => { if (!ignore) setError('Failed to load workshop'); })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, [id]); // يتنفذ تاني لو الـ id اتغير

  const enroll = async () => {
    try {
      await api.post(`/workshops/${id}/register`);
      setMessage('Registered successfully');
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) setMessage('Please login first');
      else if (status === 403) setMessage('You are not allowed to do this');
      else setMessage('Registration failed');
    }
  };

  if (loading) return <div className="spinner-border" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>{workshop.title}</h2>
      <p>{workshop.description}</p>
      <p><b>Date:</b> {new Date(workshop.date).toLocaleString()}</p>
      {message && <div className="alert alert-info">{message}</div>}
      {user?.role === 'student' && (
        <button className="btn btn-success" onClick={enroll}>Register</button>
      )}
      {!user && <p className="text-muted">Login as a student to register.</p>}
    </div>
  );
}