import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Table, ButtonGroup } from 'react-bootstrap';
import { jobAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function ManageJobs() {
  const { user, isEmployer } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isEmployer) {
      navigate('/login');
      return;
    }
    fetchJobs();
  }, [user, isEmployer]);

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getByEmployer(user.id);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (jobId) => {
    try {
      await jobAPI.toggleActive(jobId);
      fetchJobs();
    } catch (error) {
      console.error('Error toggling job status:', error);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await jobAPI.delete(jobId);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  if (loading) {
    return (
      <Container fluid className="container-smash my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container fluid className="container-smash my-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="fw-bold">Manage Jobs</h2>
        </Col>
        <Col xs="auto">
          <Link to="/post-job">
            <Button
              style={{
                background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                border: 'none',
                borderRadius: '10px'
              }}
            >
              Post New Job
            </Button>
          </Link>
        </Col>
      </Row>

      {jobs.length === 0 ? (
        <div className="glass p-5 text-center">
          <div style={{fontSize: '4rem'}} className="mb-3">📭</div>
          <h4 className="fw-bold mb-2">No jobs posted yet</h4>
          <p className="text-muted mb-3">Start by posting your first job</p>
          <Link to="/post-job">
            <Button className="btn btn-primary">Post a Job</Button>
          </Link>
        </div>
      ) : (
        <div className="glass p-4">
          <div className="table-responsive">
            <Table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Posted</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <strong>{job.title}</strong>
                    </td>
                    <td>{job.location}</td>
                    <td><span className="badge bg-light text-dark">{job.jobType}</span></td>
                    <td>{new Date(job.postedAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${job.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/applications/${job.id}`} className="text-decoration-none">
                        View Applications
                      </Link>
                    </td>
                    <td>
                      <ButtonGroup size="sm">
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="outline-primary">
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleToggleActive(job.id)}
                        >
                          {job.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDelete(job.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
}

export default ManageJobs;
