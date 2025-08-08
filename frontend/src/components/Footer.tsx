import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="text-warning mb-3">
              <i className="fas fa-book-open me-2"></i>
              Library Management System
            </h5>
            <p className="text-muted">
              A modern, efficient solution for managing your library's book collection. 
              Built with React and .NET Core for optimal performance and user experience.
            </p>
          </Col>
          <Col md={3}>
            <h6 className="text-warning mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-muted text-decoration-none">Home</a></li>
              <li><a href="#books" className="text-muted text-decoration-none">Books</a></li>
              <li><a href="#about" className="text-muted text-decoration-none">About</a></li>
              <li><a href="#contact" className="text-muted text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="text-warning mb-3">Follow Us</h6>
            <div className="d-flex">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3" style={{ fontSize: '1.25rem' }}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3" style={{ fontSize: '1.25rem' }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3" style={{ fontSize: '1.25rem' }}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted" style={{ fontSize: '1.25rem' }}>
                <i className="fab fa-github"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="text-muted my-4" />
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              © 2025 Library Management System. Built for Expernetic LLC Internship Assignment.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
