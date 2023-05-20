import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';
import { SearchBox } from './SearchBox';
import { useUserInfo } from '../hooks/useUserInfo';

export const Header = () => {
  const { userLogin, logout } = useUserInfo();
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    logout();
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
        <Link to="/" className="nav-link">
          <Navbar.Brand>Shop</Navbar.Brand>
        </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {userInfo
                ? (
          <NavDropdown title={userInfo.name} id="username">
            <Link to="/profile" className="dropdown-item">
              profile
            </Link>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
                  )
                : (
          <Link to="/login" className="nav-link">
            <i className="fas fa-user"></i> Sign In
          </Link>
                  )}
        {userInfo && userInfo.isAdmin && (
          <NavDropdown title="Admin" id="adminmenu">
            <Link to="/admin/userlist" className="dropdown-item">
              Users
            </Link>
            <Link to="/admin/productlist" className="dropdown-item">
              Products
            </Link>
            <Link to="/admin/orderlist" className="dropdown-item">
              Orders
            </Link>
          </NavDropdown>
        )}
            </Nav>
            <Link to="/cart" className="nav-link mx-2">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
            <SearchBox history={history} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
