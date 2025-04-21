// "use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Row, Col, Button, Image, Badge, Tabs, Tab } from "react-bootstrap"
import { booksData } from "../data/books"

function BookDetailPage() {
  const [book, setBook] = useState(null)
  const [activeTab, setActiveTab] = useState("description")
  const { id } = useParams()

  useEffect(() => {
    // Find the book by ID
    const foundBook = booksData.find((book) => book.id === Number.parseInt(id))
    setBook(foundBook)
  }, [id])

  if (!book) {
    return <div className="text-center py-5">Loading...</div>
  }

  return (
    <div>
      <Button variant="outline-primary" as={Link} to="/" className="mb-4">
        &larr; Back to Books
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
          <h4 className="text-muted">by {book.author}</h4>

          <div className="my-3">
            <Badge bg="primary" className="me-2">
              {book.genre}
            </Badge>
            <Badge bg="secondary" className="me-2">
              {book.year}
            </Badge>
            <Badge bg="info">{book.pages} pages</Badge>
          </div>

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="description" title="Description">
              <p className="lead">{book.description}</p>
            </Tab>
            <Tab eventKey="details" title="Details">
              <ul className="list-unstyled">
                <li>
                  <strong>Publisher:</strong> {book.publisher}
                </li>
                <li>
                  <strong>Published:</strong> {book.year}
                </li>
                <li>
                  <strong>Language:</strong> {book.language}
                </li>
                <li>
                  <strong>ISBN:</strong> {book.isbn}
                </li>
                <li>
                  <strong>Pages:</strong> {book.pages}
                </li>
              </ul>
            </Tab>
            <Tab eventKey="reader" title="Reader">
              <div className="p-4 border rounded bg-light">
                <p className="lead text-center mb-4">Book Preview</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>
                <div className="text-center mt-4">
                  <Button variant="primary">Continue Reading</Button>
                </div>
              </div>
            </Tab>
          </Tabs>

          <div className="d-grid gap-2 d-md-flex mt-4">
            <Button variant="success" size="lg">
              Read Now
            </Button>
            <Button variant="outline-secondary" size="lg">
              Add to Library
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BookDetailPage
