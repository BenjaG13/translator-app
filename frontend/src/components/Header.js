// "use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap"
import { booksData } from "../data/books"

function Header() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  // Get unique genres for filter
  const genres = ["All", ...new Set(booksData.map((book) => book.genre))]

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`/?search=${searchTerm}`)
  }

  const handleGenreSelect = (genre) => {
    navigate(`/?genre=${genre}`)
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
