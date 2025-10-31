
import React from "react";
import PropTypes from "prop-types";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "../styles/components/bookcard.css";
import "../styles/components/bookcardd.css";


function BookCard({ book }) {
  const title = book?.title || "Sin título";
  const author = book?.author || "Desconocido";
  const cover = book?.cover_image || "/images/cover-fallback.png";
  const slug = book?.slug || "";

  return (
    <Card className="book-card h-100 shadow-sm" as={Link} to={`/${slug}`} aria-label={`Abrir libro ${title}`}>
      <div className="card-image">
        <img src={cover} alt={title} loading="lazy" />
      </div>

      <Card.Body className="card-body d-flex flex-column">
        <div className="card-meta">
          <h5 className="card-title">{title}</h5>
          <div className="card-subtitle">{author}</div>
        </div>

        <div className="card-genres mt-auto">
          {Array.isArray(book?.genres) && book.genres.length > 0 ? (
            book.genres.map((genre, idx) => (
              <Badge key={genre?.id ?? idx} bg="secondary" className="me-1 genre-badge">
                {genre?.name ?? "—"}
              </Badge>
            ))
          ) : (
            <small className="text-muted">Sin géneros</small>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    slug: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    cover_image: PropTypes.string,
    genres: PropTypes.array,
  }).isRequired,
};

export default React.memo(BookCard);
