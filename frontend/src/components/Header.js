import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown, Modal, Spinner } from "react-bootstrap";
import { booksData } from "../data/books";
import axios from "axios";
import { AppContext } from "../context/appContext";

const API_URL = process.env.REACT_APP_API_URL;

function Header() {
  const { state, setAuth, clearAuth } = useContext(AppContext);
  const { token } = state;
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [registerData, setRegisterData] = useState({ name: "", password: "" });
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${API_URL}/genres`);
        setGenres(["All", ...response.data.map(genre => genre.name)]);
      } catch (err) {
        console.error("Error al cargar géneros:", err);
      }
    };
    fetchGenres();
  }, []);

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
    setIsLoading(true); // Iniciar loading
    try {
      const response = await axios.post(`${API_URL}/register`, registerData);
      const { user, access_token } = response.data;
      setAuth(access_token, user);
      setError(null);
      setShowRegister(false);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setIsLoading(false); // Finalizar loading
    }
  };

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Iniciar loading
    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      const { user, access_token } = response.data;
      setAuth(access_token, user);
      setError(null);
      setShowLogin(false);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false); // Finalizar loading
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
      setIsLoading(true); // Iniciar loading
      try {
        await axios.post(`${API_URL}/logout`, {}, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        clearAuth(); // Limpiar contexto y localStorage
        navigate("/");
        setIsLoading(false); // Finalizar loading
      } catch (err) {
        console.error("Error al cerrar sesión:", err);
      } finally {
        setIsLoading(false); // Finalizar loading
      }
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          BookReader
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {state.token && (
              <Nav.Link as={Link} to="/mylibrary">
                My Library
              </Nav.Link>
            )}
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

            <Button variant="outline-light" type="submit" className="me-2">
              Search
            </Button>
            <FormControl
              type="search"
              placeholder="Search books..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form>
          {!state.token && (
            <>
              <Button variant="outline-primary" className="ms-2" onClick={() => setShowRegister(true)} disabled={isLoading}>
                Registrarse
              </Button>
              <Button variant="outline-primary" className="ms-2" onClick={() => setShowLogin(true)} disabled={isLoading}>
                Login
              </Button>
            </>
          )} 
          {state.token && (
            <Button variant="outline-danger" className="ms-2" onClick={handleLogout} disabled={isLoading}>
              {isLoading ? <Spinner as="span" animation="border" size="sm" /> : `Lgout ${state.user}`}
            </Button>
          )}
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
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner as="span" animation="border" size="sm" /> : "Registrarse"}
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
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner as="span" animation="border" size="sm" /> : "Iniciar Sesión"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default Header;