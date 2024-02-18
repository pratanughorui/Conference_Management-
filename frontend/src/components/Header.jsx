import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
//import { Navbar, Nav } from 'react-bootstrap'; // Import Navbar and Nav components from react-bootstrap

const Header = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Link to="/conference-root" className="nav-link">Create Conference</Link>
    </Nav.Item>
    <Nav.Item>
      <Link  to={"paper-review"} className="nav-link"> Allot Paper</Link>
    </Nav.Item>
    {/* <Nav.Item>
      <Link to="/committee-members-registration" className="nav-link"> Committee Members</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/reviewers-registration" className="nav-link"> Reviewers</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/paper-review" className="nav-link">Paper Allotments</Link>
    </Nav.Item> */}
  </Nav>
  );
};

export default Header;
