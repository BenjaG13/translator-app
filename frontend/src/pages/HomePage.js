"use client"

import { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"
import { Row, Col, Alert, Spinner } from "react-bootstrap" 
import BookCard from "../components/BookCard"
import BookList from "../components/BookListt"
import BookCarousel from "../components/BookCarousel"
import axios from "axios"
import { AppContext } from '../context/appContext';

const API_URL = process.env.REACT_APP_API_URL;

function HomePage() {

  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false) // Nuevo estado para loading
  const [genresWithBooks, setGenresWithBooks] = useState([])
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

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        console.log(API_URL)
        const resp = await axios.get(`${API_URL}/genres-with-books?limit=8`);
        setGenresWithBooks(resp.data);
      } catch (err) {
        setError("No se pudo cargar los géneros");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const searchParams = getSearchParams()

  return (

    <div>
      <h3 className="mb-3">Descubre Libros</h3>
      <BookCarousel books={books} />
      {genresWithBooks.map((genre) => (
        <section key={genre.id} className="mb-5">
          <h3 className="mb-3">{genre.name}</h3>
          <BookCarousel books={genre.books} />
        </section>
      ))}
    </div>
  )
}

export default HomePage