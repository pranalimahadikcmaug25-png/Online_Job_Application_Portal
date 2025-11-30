import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function NavbarComponent() {
  const { user, logout, isEmployer, isCandidate } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" sticky="top" className="navbar-glass">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          JobPortal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/" className="px-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/jobs" className="px-3">
              Find Jobs
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="px-3">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="px-3">
              Contact
            </Nav.Link>
            
            {user ? (
              <>
                {isEmployer && (
                  <>
                    <Nav.Link as={Link} to="/employer/dashboard" className="px-3">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/post-job" className="px-3">
                      Post Job
                    </Nav.Link>
                    <Nav.Link as={Link} to="/manage-jobs" className="px-3">
                      Manage Jobs
                    </Nav.Link>
                  </>
                )}
                {isCandidate && (
                  <Nav.Link as={Link} to="/dashboard" className="px-3">
                    My Dashboard
                  </Nav.Link>
                )}
                {user?.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin/dashboard" className="px-3">
                    Admin Dashboard
                  </Nav.Link>
                )}
                <Dropdown className="ms-2">
                  <Dropdown.Toggle 
                    variant="light" 
                    id="dropdown-user"
                    className="d-flex align-items-center gap-2 px-3"
                    style={{ background: 'transparent', border: 'none', color: 'inherit' }}
                  >
                    <span>👤</span>
                    {user.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="glass">
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="px-3">
                  Login
                </Nav.Link>
                <Nav.Item className="ms-2">
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-glass btn-sm">Sign Up</button>
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
