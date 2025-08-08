import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface StatsProps {
  totalBooks: number;
}

const Stats: React.FC<StatsProps> = ({ totalBooks }) => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={3} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-book text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="text-primary fw-bold">{totalBooks}</h3>
              <p className="text-muted mb-0">Total Books</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-users text-success mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="text-success fw-bold">∞</h3>
              <p className="text-muted mb-0">Authors</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-bookmark text-warning mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="text-warning fw-bold">∞</h3>
              <p className="text-muted mb-0">Categories</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-star text-info mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="text-info fw-bold">5.0</h3>
              <p className="text-muted mb-0">Rating</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
