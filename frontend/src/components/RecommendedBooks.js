import { Row, Col } from "react-bootstrap"
import BookCard from "./BookCard"

function RecommendedBooks({ books, onBookSelect }) {
  // Filter to get only 4 books for recommendations
  const recommendedBooks = books.slice(0, 4)

  return (
    <div className="my-5">
      <h3 className="mb-4">Recommended for You</h3>
      <Row xs={1} sm={2} md={4} className="g-4">
        {recommendedBooks.map((book) => (
          <Col key={book.id}>
            <BookCard book={book} onBookSelect={onBookSelect} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default RecommendedBooks
