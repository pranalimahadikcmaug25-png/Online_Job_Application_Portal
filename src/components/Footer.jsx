import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  const currentYear = new Date().getFullYear();

  const linkStyle = { opacity: 0.8, color: 'inherit' };

  return (
    <footer className="glass mt-5" style={{
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '40px 0 20px'
    }}>
      <Container fluid className="px-3 px-md-5">
        <Row className="g-4">
          {/* Company Info */}
          <Col lg={4} md={6}>
            <h5 className="fw-bold mb-3">JobPortal</h5>
            <p className="mb-3" style={{ opacity: 0.8 }}>
              Your trusted platform for finding the perfect job opportunities and connecting talented candidates with top employers.
            </p>
            <div className="mb-2">
              <strong>Contact Us:</strong>
            </div>
            <div className="mb-1" style={linkStyle}>
              📧 Email: <a href="mailto:info@jobportal.com" className="text-decoration-none">info@jobportal.com</a>
            </div>
            <div className="mb-1" style={linkStyle}>
              📞 Phone: <a href="tel:+911234567890" className="text-decoration-none">+91 123 456 7890</a>
            </div>
            <div style={linkStyle}>
              📍 Address: CDAC Kharghar, Mumbai, India
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none" style={linkStyle}>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/jobs" className="text-decoration-none" style={linkStyle}>
                  Find Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none" style={linkStyle}>
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none" style={linkStyle}>
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          {/* For Candidates */}
          <Col lg={3} md={6}>
            <h6 className="fw-bold mb-3">For Candidates</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/jobs" className="text-decoration-none" style={linkStyle}>
                  Browse Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-decoration-none" style={linkStyle}>
                  My Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-decoration-none" style={linkStyle}>
                  My Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-decoration-none" style={linkStyle}>
                  Register
                </Link>
              </li>
            </ul>
          </Col>

          {/* For Employers */}
          <Col lg={3} md={6}>
            <h6 className="fw-bold mb-3">For Employers</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/post-job" className="text-decoration-none" style={linkStyle}>
                  Post a Job
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/employer/dashboard" className="text-decoration-none" style={linkStyle}>
                  Employer Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/manage-jobs" className="text-decoration-none" style={linkStyle}>
                  Manage Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-decoration-none" style={linkStyle}>
                  Register
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" style={{ opacity: 0.2 }} />

        {/* Bottom Bar */}
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0" style={{ opacity: 0.7 }}>
              &copy; {currentYear} JobPortal. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link to="/privacy-policy" className="text-decoration-none me-3" style={{ opacity: 0.7 }}>
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-decoration-none" style={{ opacity: 0.7 }}>
              Terms of Service
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
