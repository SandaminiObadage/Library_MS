import React from 'react';
import { Container, Row, Col, Card,  } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero bg-gradient py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 text-secondary mb-4">
                About Our Library Management System
              </h1>
              <p className="lead text-muted mb-0">
                Revolutionizing how you manage and organize your personal book collection
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* About Content */}
      <div className="about-content py-5">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto">
              <div className="text-center mb-5">
                <h2 className="fw-bold text-primary mb-4">Our Mission</h2>
                <p className="lead text-muted">
                  We believe that every book lover deserves a simple, elegant way to manage their personal library. 
                  Our platform combines modern technology with intuitive design to create the perfect digital 
                  companion for your reading journey.
                </p>
              </div>
            </Col>
          </Row>

          {/* Features Section */}
          <Row className="mb-5">
            <Col lg={12}>
              <h3 className="text-center fw-bold mb-5">Why Choose Our Platform?</h3>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-book-open text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-3">Easy Book Management</h5>
                  <p className="text-muted">
                    Add, edit, and organize your books effortlessly with our intuitive interface.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-search text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-3">Smart Search</h5>
                  <p className="text-muted">
                    Find any book in your collection instantly with our powerful search functionality.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-shield-alt text-warning" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-3">Secure & Private</h5>
                  <p className="text-muted">
                    Your personal library data is protected with enterprise-grade security.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Technology Stack */}
          <Row className="mb-5">
            <Col lg={12}>
              <h3 className="text-center fw-bold mb-5">Built with Modern Technology</h3>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col md={6}>
              <Card className="border-0 bg-light">
                <Card.Body className="p-4">
                  <h5 className="fw-bold text-primary mb-3">
                    <i className="fas fa-laptop-code me-2"></i>
                    Frontend Technologies
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>React.js with TypeScript</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Bootstrap 5 for responsive design</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Context API for state management</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>JWT Authentication</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 bg-light">
                <Card.Body className="p-4">
                  <h5 className="fw-bold text-info mb-3">
                    <i className="fas fa-server me-2"></i>
                    Backend Technologies
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>ASP.NET Core Web API</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Entity Framework Core</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>SQLite Database</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>BCrypt Password Hashing</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          

          {/* Statistics */}
          <Row className="text-center">
            <Col md={3}>
              <div className="stat-item mb-4">
                <h3 className="display-4 fw-bold text-primary">100+</h3>
                <p className="text-muted">Happy Users</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item mb-4">
                <h3 className="display-4 fw-bold text-success">1000+</h3>
                <p className="text-muted">Books Managed</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item mb-4">
                <h3 className="display-4 fw-bold text-warning">99.9%</h3>
                <p className="text-muted">Uptime</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item mb-4">
                <h3 className="display-4 fw-bold text-info">24/7</h3>
                <p className="text-muted">Support</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default About;
