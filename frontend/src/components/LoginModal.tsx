import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { LoginData } from '../types/Auth';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onHide, onSwitchToRegister }) => {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [error, setError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!validateForm()) {
      return;
    }

    try {
      setError('');
      await login(formData);
      onHide();
      // Reset form
      setFormData({ username: '', password: '' });
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 401) {
          setError('Invalid username or password');
        } else if (status === 400) {
          setError(data.message || data || 'Invalid credentials provided');
        } else {
          setError(`Login failed: ${data.message || data || 'Unknown error'}`);
        }
      } else if (err.request) {
        setError('Cannot connect to server. Please check if your backend is running.');
      } else {
        setError(`Error: ${err.message || 'Login failed. Please try again.'}`);
      }
    }
  };

  const handleClose = () => {
    setFormData({ username: '', password: '' });
    setError('');
    setErrors({});
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center text-primary">
          <i className="fas fa-sign-in-alt me-2"></i>
          Welcome Back
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
          <Form.Group className="mb-3">
            <Form.Label className="d-flex align-items-center fw-semibold">
              <i className="fas fa-user me-2 text-primary"></i>
              Username
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              isInvalid={!!errors.username}
              placeholder="Enter your username"
              className="form-control-lg"
              autoComplete="username"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="d-flex align-items-center fw-semibold">
              <i className="fas fa-lock me-2 text-primary"></i>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isInvalid={!!errors.password}
              placeholder="Enter your password"
              className="form-control-lg"
              autoComplete="current-password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading} 
            className="w-100 py-3 fw-semibold"
            size="lg"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Sign In
              </>
            )}
          </Button>
        </Form>

        <hr className="my-4" />

        <Row className="text-center">
          <Col>
            <p className="text-muted mb-2">Don't have an account?</p>
            <Button 
              variant="outline-primary" 
              onClick={onSwitchToRegister}
              className="fw-semibold"
            >
              <i className="fas fa-user-plus me-2"></i>
              Create Account
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
