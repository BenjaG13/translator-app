import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom"
import { Row, Col, Alert, Spinner } from "react-bootstrap";
import BookCard from "../components/BookCard";
import BookCarousel from "../components/BookCarousel";
import { AppContext } from "../context/appContext";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function SearchBookPage() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false) // Nuevo estado para loading
  const [genresWithBooks, setGenresWithBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [genre, setGenre] = useState("")
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
      return `${API_URL}/books?${queryParams.toString()}` // Ajuste en la construcción de la URL
    }
  
    useEffect(() => {
      const fetchBooks = async () => {
        setLoading(true) // Activar loading al inicio de la solicitud
        const searchParams = getSearchParams()
        setSearchTerm(searchParams.searchTerm);
        setGenre(searchParams.genre);
        const url = buildApiUrl(searchParams)
  
        try {
          const response = await axios.get(url)
          setBooks(response.data)
          setError(null)
          console.log(response)
        } catch (err) {
          setError("Error al cargar los libros. Intenta nuevamente más tarde.")
          console.error(err)
        } finally {
          setLoading(false) // Desactivar loading al finalizar, éxito o error
        }
      }
      fetchBooks()
    }, [location.search]) // Vuelve a ejecutar cuando cambie la búsqueda en la URL

  return (
    <div>
      {searchTerm && <h2 className="mb-4">Resultados para "{searchTerm}" </h2>}
      {genre && <h2 className="mb-4"> Libros de {genre} </h2>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando libros...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : books.length === 0 ? (
        <Alert variant="info">No se encontraron resultados para tu busqueda.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
        // <BookCarousel books={books} />
      )}
    </div>
  );
}

export default SearchBookPage;