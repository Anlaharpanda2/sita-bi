'use client';

import { useEffect, useState, FormEvent } from 'react';
import request from '../../../../lib/api';
import { useAuth } from '../../../../context/AuthContext';

// --- Interfaces ---
interface TugasAkhir {
  id: number;
  judul: string;
  status: string;
  peranDosenTa: { peran: string; dosen: { user: { name: string } } }[];
}

interface TawaranTopik {
  id: number;
  judul_topik: string;
  deskripsi: string;
  dosenPencetus: { user: { name: string } };
}

// --- Main Page Component ---
export default function TugasAkhirPage() {
  const { user } = useAuth();
  const [tugasAkhir, setTugasAkhir] = useState<TugasAkhir | null>(null);
  const [availableTopics, setAvailableTopics] = useState<TawaranTopik[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [judulMandiri, setJudulMandiri] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      // Check for active TA first
      const taData = await request<TugasAkhir>('/bimbingan/sebagai-mahasiswa');
      setTugasAkhir(taData);
    } catch (err: any) {
      // If no active TA is found (404), fetch available topics
      if (err.message.includes('not found')) {
        setTugasAkhir(null);
        try {
          const topicsData = await request<TawaranTopik[]>('/tawaran-topik/available');
          setAvailableTopics(topicsData);
        } catch (topicsErr: any) {
          setError(topicsErr.message || 'Failed to fetch available topics');
        }
      } else {
        setError(err.message || 'Failed to fetch data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleApply = async (topicId: number) => {
    if (!confirm('Are you sure you want to apply for this topic?')) return;
    try {
      await request(`/tawaran-topik/${topicId}/apply`, { method: 'POST' });
      alert('Successfully applied for the topic! Please wait for lecturer approval.');
      fetchData(); // Refresh data
    } catch (err: any) {
      alert(`Error applying: ${err.message}`);
    }
  };

  const handleMandiriSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to submit this title?')) return;
    try {
      await request('/tugas-akhir', { 
        method: 'POST',
        body: JSON.stringify({ judul: judulMandiri })
      });
      alert('Successfully submitted title for approval.');
      fetchData(); // Refresh data
    } catch (err: any) {
      alert(`Error submitting title: ${err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  // --- Render Logic ---
  if (tugasAkhir) {
    // Render current TA status
    return (
      <div>
        <h2>My Final Project</h2>
        <p><strong>Title:</strong> {tugasAkhir.judul}</p>
        <p><strong>Status:</strong> {tugasAkhir.status}</p>
        <h4>Supervisors:</h4>
        <ul>
          {tugasAkhir.peranDosenTa.map(p => (
            <li key={p.peran}>{p.peran}: {p.dosen.user.name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    // Render topic list and self-proposal form
    return (
      <div>
        <h2>Propose a Final Project</h2>
        <p>You do not have an active final project. You can apply for an existing topic or propose your own.</p>
        
        <hr style={{ margin: '2rem 0' }} />

        <h3>Propose Your Own Title</h3>
        <form onSubmit={handleMandiriSubmit}>
          <div>
            <label>Judul TA: </label>
            <input type="text" value={judulMandiri} onChange={e => setJudulMandiri(e.target.value)} required style={{ width: '400px' }}/>
          </div>
          <button type="submit">Submit for Approval</button>
        </form>

        <hr style={{ margin: '2rem 0' }} />

        <h3>Available Topics from Lecturers</h3>
        <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr><th>ID</th><th>Judul Topik</th><th>Deskripsi</th><th>Dosen</th><th>Action</th></tr>
          </thead>
          <tbody>
            {availableTopics.map(topic => (
              <tr key={topic.id}>
                <td>{topic.id}</td>
                <td>{topic.judul_topik}</td>
                <td>{topic.deskripsi}</td>
                <td>{topic.dosenPencetus.user.name}</td>
                <td><button onClick={() => handleApply(topic.id)}>Apply</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
