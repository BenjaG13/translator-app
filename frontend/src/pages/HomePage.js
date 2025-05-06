"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Row, Col, Alert } from "react-bootstrap"
import BookCard from "../components/BookCard"
import axios from "axios"

const API_URL = "http://localhost/api/books" // Reemplaza con la URL real de tu API

function HomePage() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)
  const location = useLocation()

  // Función para obtener los parámetros de búsqueda desde la URL
  const getSearchParams = () => {
    const searchParams = new URLSearchParams(location.search)
    return {
      searchTerm: searchParams.get("search") || "",
      genre: searchParams.get("genre") || "",
      shelf: searchParams.get("shelf") || "",
    }
  }

  // Función para construir la URL con parámetros
  const buildApiUrl = (params) => {
    const queryParams = new URLSearchParams()
    if (params.searchTerm) queryParams.append("search", params.searchTerm)
    if (params.genre) queryParams.append("genre", params.genre)
    if (params.shelf) queryParams.append("shelf", params.shelf)
    return `${API_URL}?${queryParams.toString()}`
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const searchParams = getSearchParams()
      const url = buildApiUrl(searchParams)
      try {
        const response = await axios.get(url)
        setBooks(response.data)
        setError(null)
      } catch (err) {
        setError("Error al cargar los libros. Intenta nuevamente más tarde.")
        console.error(err)
      }
    }
    fetchBooks()
  }, [location.search]) // Vuelve a ejecutar cuando cambie la búsqueda en la URL

  const searchParams = getSearchParams()

  return (
    <div>
      <h2 className="mb-4">
        {searchParams.shelf === "mylibrary" ? "Mi Biblioteca" : "Descubre Libros"}
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {books.length === 0 && !error ? (
        <Alert variant="info">No se encontraron libros que coincidan con tus criterios. Ajusta tu búsqueda o filtros.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomePage