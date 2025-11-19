import { useState, useEffect, useContext } from "react";
import { Row, Col, Alert, Spinner } from "react-bootstrap";
import BookCard from "../components/BookCard";
import BookCarousel from "../components/BookCarousel";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppContext } from "../context/appContext";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function MyLibraryPage() {
  const { state } = useContext(AppContext);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/mybooks`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        setBooks(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching my books:", err);
        setError("Debes iniciar sesión para ver tu biblioteca.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyBooks();
  }, [state.token]);

  return (
    <div>
      <h2 className="mb-4">Mi Biblioteca</h2>
      {loading ? (
        <div className="text-center">
          <LoadingSpinner className="text-center py-5" />
          <p>Cargando libros...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : books.length === 0 ? (
        <Alert variant="info">No tienes libros en tu biblioteca.</Alert>
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

export default MyLibraryPage;