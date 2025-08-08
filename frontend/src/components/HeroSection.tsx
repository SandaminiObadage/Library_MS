import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

interface HeroSectionProps {
  onAddBook: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAddBook }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="hero-section bg-gradient py-5">
      <Container>
        <Row className="align-items-center min-vh-50">
          <Col lg={6}>
            <div className="hero-content">
              {isAuthenticated ? (
                <>
                  <h1 className="display-4 fw-bold text-white mb-4">
                    Welcome back,
                    <span className="text-warning d-block">{user?.username}! 📚</span>
                  </h1>
                  <p className="lead text-white-50 mb-4">
                    Manage your personal library collection with ease. Add new books, 
                    edit existing ones, and keep track of your reading journey.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="display-4 fw-bold text-white mb-4">
                    Welcome to Your
                    <span className="text-warning d-block">Digital Library</span>
                  </h1>
                  <p className="lead text-white-50 mb-4">
                    Join thousands of book lovers! Create an account to start building 
                    your personal digital library and never lose track of your books again.
                  </p>
                </>
              )}
              
              <div className="d-flex gap-3">
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="warning" 
                      size="lg" 
                      onClick={onAddBook}
                      className="fw-semibold px-4"
                    >
                      <i className="fas fa-plus me-2"></i>
                      Add New Book
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="lg" 
                      className="fw-semibold px-4"
                      href="#books"
                    >
                      <i className="fas fa-book-open me-2"></i>
                      My Collection
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="warning" 
                      size="lg" 
                      className="fw-semibold px-4"
                      onClick={() => {
                        // This will trigger the register modal
                        const registerBtn = document.querySelector('[data-testid="register-button"]') as HTMLElement;
                        registerBtn?.click();
                      }}
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      Get Started Free
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="lg" 
                      className="fw-semibold px-4"
                    >
                      <i className="fas fa-info-circle me-2"></i>
                      Learn More
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <div className="hero-image">
              <div className="book-stack-animation">
                <i className="fas fa-book-open text-warning" style={{ fontSize: '8rem' }}></i>
              </div>
              <div className="floating-icons">
                <i className="fas fa-bookmark text-light opacity-50 floating-icon-1"></i>
                <i className="fas fa-pencil-alt text-light opacity-50 floating-icon-2"></i>
                <i className="fas fa-search text-light opacity-50 floating-icon-3"></i>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
