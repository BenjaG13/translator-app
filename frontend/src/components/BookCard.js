// "use client"

import { Card, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"

function BookCard({ book }) {
  return (
    <Card
      className="h-100 shadow-sm book-card"
      as={Link}
      to={`/book/${book.id}`}
      style={{
        cursor: "pointer",
        transition: "transform 0.2s",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ height: "250px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={book.coverImage}
          alt={book.title}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <div className="mt-auto">
          <Badge bg="primary" className="me-1">
            {book.genre}
          </Badge>
          <Badge bg="secondary">{book.year}</Badge>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BookCard
