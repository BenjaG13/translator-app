import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pagination, Container, Button } from "react-bootstrap";
import Sentence from "../components/Sentence";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL+"/books";
const SENTENCES_PER_PAGE = 10;
const PAGES_PER_GROUP = 10; // Número de páginas a mostrar a la vez

function BookReaderPage() {
  const { slug } = useParams();
  const [sentences, setSentences] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0); // Grupo de páginas actual

  // Cargar progreso del usuario y oraciones al montar el componente
  useEffect(() => {

    // localStorage.setItem("user", JSON.stringify("Ab"));
    // localStorage.setItem("token", "2|aBXRMnAbk4NteH3VodiQf8oYrhHRZzZvuQ3xvicmc38334d8");

    const fetchData = async () => {
      try {
        // Obtener progreso del usuario desde la API
        const progressResponse = await axios.get(`${API_URL}/${slug}/progress`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const savedPage = progressResponse.data.progress || 1;
        setCurrentPage(savedPage);

        // Obtener oraciones del libro desde la API
        const sentencesResponse = await axios.get(`${API_URL}/${slug}/sentences`);
        const fetchedSentences = sentencesResponse.data.sentences || [];
        setSentences(fetchedSentences);
        const total = Math.ceil(fetchedSentences.length / SENTENCES_PER_PAGE);
        setTotalPages(total);
        setCurrentGroup(Math.floor((savedPage - 1) / PAGES_PER_GROUP));
        setError(null);
      } catch (err) {
        setError(localStorage.getItem("name") + err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Manejar cambio de página y actualizar progreso en el backend
  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Desplazar al inicio de la página

    // Actualizar progreso en la API
    try {
      await axios.post(
        `${API_URL}/${slug}/progress`,
        { progress: pageNumber },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (err) {
      console.error("Error al actualizar progreso:", err);
    }
  };

  // Calcular oraciones a mostrar en la página actual
  const startIndex = (currentPage - 1) * SENTENCES_PER_PAGE;
  const endIndex = startIndex + SENTENCES_PER_PAGE;
  const currentSentences = sentences.slice(startIndex, endIndex);

  // Calcular las páginas a mostrar en el grupo actual
  const startPage = currentGroup * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);
  const pages = [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);

  // Manejar cambio al grupo siguiente
  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentGroup(currentGroup + 1);
      setCurrentPage(startPage + PAGES_PER_GROUP);
    }
  };

  // Manejar cambio al grupo anterior
  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
      setCurrentPage(startPage - PAGES_PER_GROUP);
    }
  };

  // Estados de carga y error
  if (loading) return <div className="text-center py-5 text-white">Cargando...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="bg-dark min-vh-100 text-white d-flex flex-column">
      <Container className="py-5 flex-grow-1">
        <Button variant="outline-light" as={Link} to={`/books/${slug}`} className="mb-4">
          ← Volver a Detalles del Libro
        </Button>

        <h2 className="text-2xl font-bold mb-4">Leyendo: {slug}</h2>

        {/* Mostrar oraciones de la página actual */}
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
            {currentGroup > 0 && (
              <Pagination.Ellipsis onClick={handlePrevGroup} />
            )}
            {pages.map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? "bg-light text-dark" : "bg-dark text-white"}
              >
                {page}
              </Pagination.Item>
            ))}
            {endPage < totalPages && (
              <Pagination.Ellipsis onClick={handleNextGroup} />
            )}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </Container>
    </div>
  );
}

export default BookReaderPage;