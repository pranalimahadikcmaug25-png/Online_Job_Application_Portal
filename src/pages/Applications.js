import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import API from '../api';
import { useParams } from 'react-router-dom';

export default function Applications(){
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(()=>{
    const load = async ()=>{
      try { const res = await API.get(`/applications/job/${jobId}`); setApps(res.data); } catch (err) { /* ignore */ }
    };
    load();
  }, [jobId]);

  const apply = async (e)=>{
    e.preventDefault();
    try {
      await API.post('/applications', { jobId: Number(jobId), message });
      alert('Applied successfully');
      setMessage('');
    } catch (err) {
      alert(err.response?.data?.error || 'Apply failed');
    }
  };

  return (
    <Container fluid className="container-smash mt-5">
      <Row>
        <Col md={6} className="mb-4">
          <div className="glass p-3">
            <h5>Apply for this job</h5>
            <Form onSubmit={apply}>
              <Form.Group className="mb-3">
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  placeholder="Message / cover letter" 
                  value={message} 
                  onChange={e=>setMessage(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Button className="btn btn-glass">Submit Application</Button>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <h5>Received applications</h5>
          {apps.length===0 && <p className="text-muted">No applications or not authorized to view.</p>}
          <ListGroup>
            {apps.map(a=>(
              <ListGroup.Item key={a.id}>
                <b>{a.applicant?.name || 'Applicant'}</b> — {a.applicant?.email}
                <p>{a.message}</p>
                <small className="text-muted">{new Date(a.createdAt).toLocaleString()}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
