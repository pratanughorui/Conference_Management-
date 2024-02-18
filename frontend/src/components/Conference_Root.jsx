import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Conference_Root() {
    const linkStyle = {
        textDecoration: 'none' // Remove underline
      }
  return (
   
    <Container>
      <Row>
        <Col md={6} className="mt-4"> {/* Adjust offset and margin top for spacing */}
          <ListGroup>
            <Link  to={"/create-conference"} style={linkStyle}><ListGroup.Item>Create Conference</ListGroup.Item></Link><br/>
            <Link to={"/track-creation"} style={linkStyle}><ListGroup.Item>Track</ListGroup.Item></Link><br/>
            <Link to={"/committee-members-registration"} style={linkStyle}><ListGroup.Item>Members</ListGroup.Item></Link><br/>
            <Link to={"/reviewers-registration"} style={linkStyle}><ListGroup.Item>Reviewers</ListGroup.Item></Link><br/>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Conference_Root