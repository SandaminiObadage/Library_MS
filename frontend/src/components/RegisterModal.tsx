import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { RegisterData } from '../types/Auth';
import { useAuth } from '../contexts/AuthContext';

interface RegisterModalProps {
  show: boolean;
  onHide: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, onHide, onSwitchToLogin }) => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await register(formData);
      setSuccess(true);
      // Reset form
      setFormData({ username: '', email: '', password: '' });
    } catch (err: any) {
      console.error('Registration error:', err);
      
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          if (typeof data === 'string') {
            setError(data);
          } else {
            setError(data.message || 'Registration failed. Please check your information.');
          }
        } else {
          setError(`Registration failed: ${data.message || data || 'Unknown error'}`);
        }
      } else if (err.request) {
        setError('Cannot connect to server. Please check if your backend is running.');
      } else {
        setError(`Error: ${err.message || 'Registration failed. Please try again.'}`);
      }
    }
  };

  const handleClose = () => {
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
    setError('');
    setSuccess(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center text-primary">
          <i className="fas fa-user-plus me-2"></i>
          Create Your Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {error && (
          <Alert variant="danger" className="d-flex align-items-center">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="d-flex align-items-center">
            <i className="fas fa-check-circle me-2"></i>
            <div>
              <strong>Registration Successful!</strong>
              <br />
              Your account has been created. Please click "Sign In" to log into your account.
            </div>
          </Alert>
        )}
        
        {!success && (
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
              placeholder="Choose a username"
              className="form-control-lg"
              autoComplete="username"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Username must be at least 3 characters long
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="d-flex align-items-center fw-semibold">
              <i className="fas fa-envelope me-2 text-primary"></i>
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
              placeholder="Enter your email address"
              className="form-control-lg"
              autoComplete="email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
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
              placeholder="Create a password"
              className="form-control-lg"
              autoComplete="new-password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Password must be at least 6 characters long
            </Form.Text>
          </Form.Group>

          <Button 
            variant="success" 
            type="submit" 
            disabled={loading} 
            className="w-100 py-3 fw-semibold"
            size="lg"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Create Account
              </>
            )}
          </Button>
        </Form>
        )}

        <hr className="my-4" />

        <Row className="text-center">
          <Col>
            {success ? (
              <>
                <p className="text-success mb-2 fw-semibold">
                  <i className="fas fa-check-circle me-2"></i>
                  Ready to sign in!
                </p>
                <Button 
                  variant="primary" 
                  onClick={onSwitchToLogin}
                  className="fw-semibold px-4"
                  size="lg"
                >
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Sign In Now
                </Button>
              </>
            ) : (
              <>
                <p className="text-muted mb-2">Already have an account?</p>
                <Button 
                  variant="outline-primary" 
                  onClick={onSwitchToLogin}
                  className="fw-semibold"
                >
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Sign In
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
