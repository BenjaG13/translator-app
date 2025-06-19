// "use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Row, Col, Button, Image, Badge, Tabs, Tab } from "react-bootstrap"
import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL+"/books";

function BookDetailPage() {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("sinopsis");
  const { slug } = useParams();
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_URL}/${slug}`);
        setBook(response.data);
        setError(null);
      } catch (err) {
        setError("Error al cargar el libro. Intenta nuevamente más tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [slug]);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await axios.get(`${API_URL}/${slug}/sentences`);
        setSentences(response.data.sentences);
      } catch (err) {
        setError("Error al cargar oraciones. Intenta nuevamente más tarde.");
        console.error(err);
      }
    };
    fetchSentences();
  }, []);
  

 

  if (loading) {
    return <div className="text-center py-5">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center py-5">{error}</div>;
  }

  if (!book) {
    return <div className="text-center py-5">Libro no encontrado.</div>;
  }

  return (
    <div>
      <Button variant="outline-primary" as={Link} to="/" className="mb-4">
        ← Volver a Lios {localStorage.getItem('name')+"n"}
      </Button>

      <Row>
        <Col md={4} className="mb-4">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fluid
            className="shadow rounded"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </Col>

        <Col md={8}>
          <h1>{book.title}</h1>
          <h4 className="text-muted">{book.author}</h4>

          <div className="my-3">
          {book.genres.map((genre) => (
            <Badge key={genre.id} bg="primary" className="me-2">
              {genre.name}
            </Badge>
          ))}
            <Badge bg="secondary" className="me-2">
              {book.year}
            </Badge>
            <Badge bg="info">{book.pages} páginas</Badge>
          </div>

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="sinopsis" title="Sinopsis">
              <p className="lead">{book.synopsis}</p>
            </Tab>

           

          </Tabs>
          <div className="d-grid gap-2 d-md-flex mt-4">
            <Button variant="success" size="lg" as={Link} to={`/books/${slug}/read`}>
              Leer Ahora
            </Button>
            <Button variant="outline-secondary" size="lg">
              Añadir a la Biblioteca
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default BookDetailPage
