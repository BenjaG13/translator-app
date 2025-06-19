import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown, Modal } from "react-bootstrap";
import { booksData } from "../data/books";
import axios from "axios";
import { AppContext } from '../context/appContext';



const API_URL = process.env.REACT_APP_API_URL;

function Header() {
  const {state: { token }} = useContext(AppContext)
  const {setToken} = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [registerData, setRegisterData] = useState({ name: "", password: "" });
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get unique genres for filter
  const genres = ["All", ...new Set(booksData.map((book) => book.genre))];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
  };

  const handleGenreSelect = (genre) => {
    navigate(`/?genre=${genre}`);
  };

 

  // Handle Register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, registerData);
      const { data, acces_token } = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", acces_token);
      setToken(acces_token)
      setError(null);
      setShowRegister(false);
      window.location.reload(); // Recargar para actualizar estado
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      const { user, accesstoken } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accesstoken);
      setError(null);
      setShowLogin(false);
      window.location.reload(); // Recargar para actualizar estado
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
      try {
        console.log(token)
        await axios.post(
          `${API_URL}/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
      } catch (err) {
        console.error("Error al cerrar sesión:", err);
      }
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          BookReader
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/?shelf=mylibrary">
              My Library
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Genres
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {genres.map((genre, index) => (
                  <Dropdown.Item key={index} onClick={() => handleGenreSelect(genre)}>
                    {genre}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search books..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
          {!token && <Button variant="outline-light" className="ms-2" onClick={() => setShowRegister(true)}>
            Registrarse
          </Button>
          }
          {!token && <Button variant="outline-light" className="ms-2" onClick={() => setShowLogin(true)}>
            Login
          </Button>
        }
          {token && <Button variant="outline-light" className="ms-2" onClick={() => handleLogout()}>
              Logout
          </Button>
          }
        </Navbar.Collapse>
      </Container>

      {/* Register Modal */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                value={loginData.name}
                onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default Header;