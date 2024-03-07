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
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h5" className="text-center bg-dark text-white">
              Admin Page
            </Card.Header>
            <Card.Body className="bg-light">
              <Row className="justify-content-center">
                <Col md={6} className="mb-4">
                  <Card className="custom-card">
                    <Card.Body className=''>
                      <Card.Title>Add Questions</Card.Title>
                      <Card.Text>Add new questions to the quiz.</Card.Text>
                      <Link to="/addquiz">
                        <Button variant="dark" block>
                          Go to Add Questions
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-4">
                  <Card className="custom-card ">
                    <Card.Body className=''>
                      
                      <Card.Title>Update Questions</Card.Title>
                      <Card.Text>Update existing questions in the quiz.</Card.Text>
                      <Link to="/GetallQuiz">
                        <Button variant="dark" block>
                          Go to Update Questions
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={2}>
                 
                      <Button variant="danger" block onClick={handleLogout}>
                        Logout
                      </Button>
                  
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
