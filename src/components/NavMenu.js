import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavMenu = () => {

  return (
    <div>
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link id="nav-link-gloves" to="/gloves">Gloves</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link id="nav-link-beanies" to="/beanies">Beanies</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link id="nav-link-facemasks" to="/facemasks">Facemasks</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </div>
  )

}

export default NavMenu