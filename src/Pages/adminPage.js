import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminPage = () => {
  const navigate = useNavigate();
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.setItem('isAdminAuthenticated', false);
    window.location.reload();
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Admin Page
            </Card.Header>
            <Card.Body className="body" style={{ backgroundColor: '', color: 'white' }}>
              <Row>
                <Col md={6}>
                  <Card className="custom-card">
                    <Card.Body>
                      <Card.Title>Add Questions</Card.Title>
                      <Card.Text>Add new questions to the quiz.</Card.Text>
                      <Link to="/addquiz">
                        <Button variant="primary">Go to Add Questions</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Card className="custom-card">
                    <Card.Body>
                      <Card.Title>Update Questions</Card.Title>
                      <Card.Text>Update existing questions in the quiz.</Card.Text>
                      <Link to="/GetallQuiz">
                        <Button variant="success">Go to Update Questions</Button>
                      </Link>
                      <Button variant="warning" onClick={handleLogout}>
                        Logout
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
