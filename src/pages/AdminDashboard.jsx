import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Tabs, Tab, Table } from 'react-bootstrap';
import { jobAPI, applicationAPI, authAPI } from '../api';

function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalUsers: 0,
    activeJobs: 0
  });
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchAdminData();
  }, [user, isAdmin, navigate]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Fetch all jobs
      const jobsResponse = await jobAPI.getAll({ limit: 1000 });
      const allJobs = jobsResponse.data.jobs || [];
      console.log('Fetched jobs:', allJobs.length);
      setJobs(allJobs);

      // Fetch all applications (admin endpoint)
      const applicationsResponse = await applicationAPI.getAll();
      const allApplications = applicationsResponse.data || [];
      console.log('Fetched applications:', allApplications.length);
      setApplications(allApplications);

      // Fetch user statistics
      const userStatsResponse = await authAPI.getUserStats();
      const userStats = userStatsResponse.data;
      console.log('Fetched user stats:', userStats);

      // Calculate statistics
      const calculatedStats = {
        totalJobs: allJobs.length,
        totalApplications: allApplications.length,
        totalUsers: userStats.total || 0,
        activeJobs: allJobs.filter(job => job.isActive).length
      };
      console.log('Calculated stats:', calculatedStats);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      console.error('Error details:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobAPI.delete(jobId);
        fetchAdminData();
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job');
      }
    }
  };

  if (!user || !isAdmin) {
    return (
      <Container fluid className="container-smash my-5">
        <div className="glass p-5 text-center">
          <h3>Access Denied</h3>
          <p>Only administrators can access this page.</p>
        </div>
      </Container>
    );
  }

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
          <div>
            <h2 className="fw-bold mb-1">Admin Dashboard</h2>
            <p className="text-muted mb-0">Manage your job portal</p>
          </div>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>💼</div>
              <div>
                <h3 className="fw-bold mb-0">{stats.totalJobs}</h3>
                <p className="mb-0 small text-muted">Total Jobs</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>✅</div>
              <div>
                <h3 className="fw-bold mb-0">{stats.activeJobs}</h3>
                <p className="mb-0 small text-muted">Active Jobs</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>📝</div>
              <div>
                <h3 className="fw-bold mb-0">{stats.totalApplications}</h3>
                <p className="mb-0 small text-muted">Total Applications</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>👥</div>
              <div>
                <h3 className="fw-bold mb-0">{stats.totalUsers}</h3>
                <p className="mb-0 small text-muted">Total Users</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Tabs */}
      <div className="glass p-3 mb-4">
        <Tabs 
          activeKey={activeTab} 
          onSelect={(k) => setActiveTab(k)}
          className="nav nav-pills"
        >
          <Tab eventKey="overview" title="Overview">
            <div className="glass p-4 mt-3">
              <h4 className="fw-bold mb-4">Recent Activity</h4>
              <Row>
                <Col md={6}>
                  <h5 className="fw-bold mb-3">Recent Jobs</h5>
                  {jobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="mb-3 p-3" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                      <h6 className="fw-bold mb-1">{job.title}</h6>
                      <p className="mb-1 small text-muted">{job.company}</p>
                      <small className="text-muted">
                        Posted: {new Date(job.postedAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                </Col>
                <Col md={6}>
                  <h5 className="fw-bold mb-3">Recent Applications</h5>
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="mb-3 p-3" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                      <h6 className="fw-bold mb-1">{app.fullName}</h6>
                      <p className="mb-1 small text-muted">Job ID: {app.jobId}</p>
                      <small className="text-muted">
                        Applied: {new Date(app.appliedAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                </Col>
              </Row>
            </div>
          </Tab>
          <Tab eventKey="jobs" title="All Jobs">
            <div className="glass p-4 mt-3">
              <h4 className="fw-bold mb-4">All Jobs ({jobs.length})</h4>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Posted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td>{job.id}</td>
                        <td><strong>{job.title}</strong></td>
                        <td>{job.company}</td>
                        <td>{job.location}</td>
                        <td>
                          <span className="badge bg-light text-dark">{job.jobType}</span>
                        </td>
                        <td>{new Date(job.postedAt).toLocaleDateString()}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Tab>
          <Tab eventKey="applications" title="All Applications">
            <div className="glass p-4 mt-3">
              <h4 className="fw-bold mb-4">All Applications ({applications.length})</h4>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Candidate Name</th>
                      <th>Email</th>
                      <th>Job ID</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.id}</td>
                        <td><strong>{app.fullName}</strong></td>
                        <td>{app.email}</td>
                        <td>{app.jobId}</td>
                        <td>
                          <span className={`badge ${
                            app.status === 'pending' ? 'bg-warning' :
                            app.status === 'reviewed' ? 'bg-info' :
                            app.status === 'accepted' ? 'bg-success' :
                            'bg-danger'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default AdminDashboard;
