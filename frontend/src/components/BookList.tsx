import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { Book } from '../types/Book';
import { getBooks, deleteBook } from '../services/bookService';
import { useAuth } from '../contexts/AuthContext';

interface BookListProps {
  onEdit: (book: Book) => void;
  onAdd: () => void;
  refresh: boolean;
  onRefreshComplete: () => void;
}

const BookList: React.FC<BookListProps> = ({ onEdit, onAdd, refresh, onRefreshComplete }) => {
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (refresh && isAuthenticated) {
      fetchBooks();
      onRefreshComplete();
    }
  }, [refresh, onRefreshComplete, isAuthenticated]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getBooks();
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books. Please make sure your backend API is running.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
      } catch (err) {
        setError('Failed to delete book.');
        console.error('Error deleting book:', err);
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading books...</p>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <div className="bg-light rounded-3 p-5 shadow-sm">
              <i className="fas fa-lock text-warning mb-3" style={{ fontSize: '3rem' }}></i>
              <h3 className="text-dark fw-bold mb-3">Authentication Required</h3>
              <p className="text-muted mb-4 lead">
                Please sign in to view and manage your personal book collection.
              </p>
             
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="text-dark fw-bold mb-1">
    <i className="fas fa-books me-2 text-primary"></i>
                Your Book Collection
              </h2>
              <p className="text-muted mb-0 ms-1">Manage and organize your digital library</p>
            </div>
            <Button variant="primary" onClick={onAdd} size="lg" className="shadow-sm">
              <i className="fas fa-plus me-2"></i>
              Add New Book
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger" className="d-flex align-items-center">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {books.length === 0 && !loading ? (
        <Row>
          <Col>
            <div className="text-center py-5">
              <i className="fas fa-book-open text-muted mb-3" style={{ fontSize: '4rem' }}></i>
              <h4 className="text-muted mb-3">No Books Found</h4>
              <p className="text-muted mb-4">Start building your digital library by adding your first book!</p>
              <Button variant="primary" onClick={onAdd} size="lg">
                <i className="fas fa-plus me-2"></i>
                Add Your First Book
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          {books.map((book) => (
            <Col md={6} lg={4} key={book.id} className="mb-4">
              <Card className="h-100 book-card shadow-sm border-0">
                <div className="book-card-header bg-primary text-white p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <i className="fas fa-book text-warning" style={{ fontSize: '1.5rem' }}></i>
                    <span className="badge bg-warning text-dark">#{book.id}</span>
                  </div>
                </div>
                <Card.Body className="d-flex flex-column p-4">
                  <Card.Title className="text-primary fw-bold mb-2" style={{ fontSize: '1.1rem' }}>
                    {book.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    <i className="fas fa-user me-1"></i>
                    by {book.author}
                  </Card.Subtitle>
                  <Card.Text className="flex-grow-1 text-secondary">
                    {book.description}
                  </Card.Text>
                  <div className="mt-auto pt-3 border-top">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="flex-fill"
                        onClick={() => onEdit(book)}
                      >
                        <i className="fas fa-edit me-1"></i>
                        Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        className="flex-fill"
                        onClick={() => handleDelete(book.id!)}
                      >
                        <i className="fas fa-trash me-1"></i>
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BookList;
