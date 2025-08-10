import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    console.log('Header: Logout button clicked');
    console.log('Header: Current user:', user);
    console.log('Header: Is authenticated:', isAuthenticated);
    
    try {
      // Call the context logout function first
      logout();
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback: manually clear everything
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand 
            onClick={() => onNavigate('home')} 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer' }}
          >
            <i className="fas fa-book-open me-2 text-warning" style={{ fontSize: '1.5rem' }}></i>
            <span className="fw-bold">Library Management System</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                onClick={() => onNavigate('home')} 
                className="fw-semibold"
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-home me-1"></i>
                Home
              </Nav.Link>
              {isAuthenticated && (
                <Nav.Link 
                  onClick={() => onNavigate('home')} 
                  className="fw-semibold"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-book me-1"></i>
                  My Books
                </Nav.Link>
              )}
              <Nav.Link 
                onClick={() => onNavigate('about')} 
                className="fw-semibold"
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-info-circle me-1"></i>
                About
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-light">
                    <i className="fas fa-user me-1"></i>
                    Welcome, {user?.username}!
                  </span>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={handleLogout}
                    className="fw-semibold"
                  >
                    <i className="fas fa-sign-out-alt me-1"></i>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-light" 
                    onClick={() => setShowLogin(true)}
                    className="fw-semibold"
                  >
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Sign In
                  </Button>
                  <Button 
                    variant="warning" 
                    onClick={() => setShowRegister(true)}
                    className="fw-semibold"
                  >
                    <i className="fas fa-user-plus me-1"></i>
                    Register
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Authentication Modals */}
      <LoginModal 
        show={showLogin} 
        onHide={() => setShowLogin(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal 
        show={showRegister} 
        onHide={() => setShowRegister(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Header;
