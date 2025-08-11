import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { Book, BookFormData } from '../types/Book';
import { createBook, updateBook } from '../services/bookService';
import { useAuth } from '../contexts/AuthContext';

interface BookFormProps {
  show: boolean;
  onHide: () => void;
  book?: Book;
  onSuccess: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ show, onHide, book, onSuccess }) => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Check if user is authenticated before form submission
  useEffect(() => {
    if (show && !isAuthenticated) {
      setError('You must be logged in to add or edit books.');
      return;
    }
  }, [show, isAuthenticated]);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description
      });
    } else {
      setFormData({
        title: '',
        author: '',
        description: ''
      });
    }
    setError('');
    setErrors({});
  }, [book, show]);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError('You must be logged in to add or edit books.');
      return;
    }

    if (!user?.id) {
      setError('User information is not available. Please log in again.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Log the data being sent for debugging
      console.log('Form Data being sent:', formData);
      console.log('Book ID for update:', book?.id);

      if (book && book.id) {
        const response = await updateBook(book.id, formData);
        console.log('Update response:', response);
      } else {
        const response = await createBook(formData);
        console.log('Create response:', response);
      }

      onSuccess();
      onHide();
    } catch (err: any) {
      console.error('Error saving book:', err);
      
      // More specific error messages
      if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const data = err.response.data;
        
        console.log('Error response details:', {
          status,
          data,
          headers: err.response.headers
        });
        
        if (status === 400) {
          // Try to extract validation errors
          if (data.errors) {
            const errorMessages = Object.values(data.errors).flat().join(', ');
            setError(`Validation Error: ${errorMessages}`);
          } else if (data.title) {
            setError(`Validation Error: ${data.title}`);
          } else {
            setError(`Validation Error: ${data.message || JSON.stringify(data) || 'Invalid data provided'}`);
          }
        } else if (status === 404) {
          setError('Book not found. It may have been deleted.');
        } else if (status === 500) {
          setError('Server error. Please check if the backend is running.');
        } else {
          setError(`Error ${status}: ${data.message || data.title || 'Unknown server error'}`);
        }
      } else if (err.request) {
        // Network error
        setError('Cannot connect to server. Please check if your backend is running on https://localhost:7155');
      } else {
        // Other error
        setError(`Error: ${err.message || 'Failed to save book. Please try again.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      author: '',
      description: ''
    });
    setError('');
    setErrors({});
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="d-flex align-items-center">
          <i className="fas fa-book me-2 text-primary"></i>
          {book ? 'Edit Book' : 'Add New Book'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {error && (
          <Alert variant="danger" className="d-flex align-items-center">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="d-flex align-items-center">
              <i className="fas fa-heading me-2 text-primary"></i>
              Title *
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              isInvalid={!!errors.title}
              placeholder="Enter book title"
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="d-flex align-items-center">
              <i className="fas fa-user me-2 text-primary"></i>
              Author *
            </Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              isInvalid={!!errors.author}
              placeholder="Enter author name"
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.author}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="d-flex align-items-center">
              <i className="fas fa-align-left me-2 text-primary"></i>
              Description *
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              isInvalid={!!errors.description}
              placeholder="Enter book description"
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="outline-secondary" onClick={handleClose} disabled={loading} size="lg" className="px-4">
          <i className="fas fa-times me-2"></i>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading} size="lg" className="px-4">
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            <>
              <i className={`fas ${book ? 'fa-save' : 'fa-plus'} me-2`}></i>
              {book ? 'Update Book' : 'Add Book'}
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookForm;
