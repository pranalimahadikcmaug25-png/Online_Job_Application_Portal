import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { jobAPI } from '../api';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await jobAPI.getAll({ featured: true, limit: 6 });
      setFeaturedJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching featured jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (location) params.append('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const popularCategories = [
    { name: 'Information Technology', icon: '💻', count: '1000+' },
    { name: 'Marketing', icon: '📊', count: '500+' },
    { name: 'Design', icon: '🎨', count: '300+' },
    { name: 'Data Science', icon: '📈', count: '400+' },
    { name: 'Sales', icon: '💼', count: '350+' },
    { name: 'Finance', icon: '💰', count: '250+' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-bg">
        <div className="hero-anim"></div>
        <div className="hero-content text-center">
          <Container fluid className="container-smash">
            <h1 className="display-4 fw-bold mb-3" style={{fontSize: '3.5rem'}}>
              Find Your Dream Job
            </h1>
            <p className="lead mb-4" style={{fontSize: '1.25rem', opacity: 0.85}}>
              Discover thousands of opportunities from top companies
            </p>
            
            {/* Search Bar */}
            <Form onSubmit={handleSearch}>
              <div className="glass p-4 mx-auto" style={{maxWidth: '800px'}}>
                <Row className="g-3">
                  <Col md={5}>
                    <Form.Control
                      type="text"
                      size="lg"
                      className="form-glass"
                      placeholder="🔍 Job title, keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      size="lg"
                      className="form-glass"
                      placeholder="📍 Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Col>
                  <Col md={3}>
                    <Button type="submit" className="w-100" size="lg" style={{
                      background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                      border: 'none',
                      borderRadius: '12px'
                    }}>
                      Search
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>

            {/* Quick Stats */}
            <Row className="mt-5 g-4">
              <Col md={4}>
                <div className="glass p-3">
                  <h3 className="fw-bold mb-0">10,000+</h3>
                  <p className="mb-0 small">Job Openings</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="glass p-3">
                  <h3 className="fw-bold mb-0">5,000+</h3>
                  <p className="mb-0 small">Companies Hiring</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="glass p-3">
                  <h3 className="fw-bold mb-0">50,000+</h3>
                  <p className="mb-0 small">Candidates</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Popular Categories */}
      <Container fluid className="container-smash my-5">
        <h2 className="text-center fw-bold mb-4">Browse by Category</h2>
        <Row className="g-4">
          {popularCategories.map((category, index) => (
            <Col key={index} md={4} sm={6}>
              <Link to={`/jobs?industry=${encodeURIComponent(category.name)}`} className="text-decoration-none">
                <div className="glass job-card p-4 text-center">
                  <div style={{fontSize: '3rem'}} className="mb-2">{category.icon}</div>
                  <h5 className="fw-bold mb-1">{category.name}</h5>
                  <p className="mb-0 small" style={{opacity: 0.7}}>{category.count} jobs</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Jobs */}
      <Container fluid className="container-smash my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Featured Jobs</h2>
          <Link to="/jobs" className="text-decoration-none">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row className="g-4">
            {featuredJobs?.map((job) => (
              <Col key={job.id} md={6} lg={4}>
                <Link to={`/jobs/${job.id}`} className="text-decoration-none">
                  <div className="glass job-card h-100">
                    <div className="job-card-inner">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="fw-bold mb-1">{job.title}</h5>
                          <p className="mb-0 small" style={{opacity: 0.7}}>{job.company}</p>
                        </div>
                        <span className="badge bg-primary">Featured</span>
                      </div>
                      <div className="mb-3">
                        <span className="badge bg-light text-dark me-2">📍 {job.location}</span>
                        <span className="badge bg-light text-dark me-2">💼 {job.jobType}</span>
                      </div>
                      <p className="small mb-3" style={{opacity: 0.8}}>
                        {job.description?.substring(0, 100)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold" style={{color: '#4078FF'}}>{job.salary}</span>
                        <small style={{opacity: 0.6}}>
                          {new Date(job.postedAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* How It Works */}
      <Container fluid className="container-smash my-5 py-5">
        <h2 className="text-center fw-bold mb-5">How It Works</h2>
        <Row className="g-4">
          <Col md={4} className="text-center">
            <div className="glass p-4">
              <div style={{fontSize: '3.5rem'}} className="mb-3">🔍</div>
              <h5 className="fw-bold mb-2">Search Jobs</h5>
              <p className="mb-0" style={{opacity: 0.7}}>
                Browse through thousands of job listings from top companies
              </p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="glass p-4">
              <div style={{fontSize: '3.5rem'}} className="mb-3">📝</div>
              <h5 className="fw-bold mb-2">Apply Easily</h5>
              <p className="mb-0" style={{opacity: 0.7}}>
                Submit your application with just a few clicks
              </p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="glass p-4">
              <div style={{fontSize: '3.5rem'}} className="mb-3">🎉</div>
              <h5 className="fw-bold mb-2">Get Hired</h5>
              <p className="mb-0" style={{opacity: 0.7}}>
                Connect with employers and land your dream job
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
