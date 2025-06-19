import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pagination, Container, Button } from "react-bootstrap";
import Sentence from "../components/Sentence";
import { Link } from "react-router-dom";

const API_URL = "http://localhost/api/books";
const SENTENCES_PER_PAGE = 10;

function BookReaderPage() {
  const { slug } = useParams();
  const [sentences, setSentences] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Cargar las oraciones del libro desde la API
  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await axios.get(`${API_URL}/${slug}/sentences`);
        setSentences(response.data.sentences || []);
        setError(null);
      } catch (err) {
        setError("Error al cargar las oraciones del libro.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSentences();
  }, [slug]);

  // Calcular las oraciones a mostrar en la página actual
  const totalPages = Math.ceil(sentences.length / SENTENCES_PER_PAGE);
  const startIndex = (currentPage - 1) * SENTENCES_PER_PAGE;
  const endIndex = startIndex + SENTENCES_PER_PAGE;
  const currentSentences = sentences.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Volver al inicio de la página
  };

  // Estados de carga y error
  if (loading) return <div className="text-center py-5">Cargando...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <Container className="py-5">
      <Button variant="outline-primary" as={Link} to={`/books/${slug}`} className="mb-4">
        ← Volver al Detalle del Libro
      </Button>

      {totalPages > 1 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}  


      <h2 className="text-2xl font-bold mb-4">Leyendo: {slug}</h2>

      {/* Mostrar las oraciones de la página actual */}
      {currentSentences.map((sentence, index) => (
        <Sentence key={index} text={sentence} />
      ))}

      {/* Paginación */}
      {totalPages > 1 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
}

export default BookReaderPage;