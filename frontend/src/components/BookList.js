import { Row, Col, Alert } from "react-bootstrap"
import BookCard from "./BookCard"
import RecommendedBooks from "./RecommendedBooks"
import { booksData } from "../data/books"

function BookList({ books, onBookSelect }) {
  if (books.length === 0) {
    return (
      <>
        <Alert variant="info">No books found matching your criteria. Try adjusting your search or filters.</Alert>
        <RecommendedBooks books={booksData} onBookSelect={onBookSelect} />
      </>
    )
  }

  return (
    <>
      <h2 className="mb-4">Discover Books</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <BookCard book={book} onBookSelect={onBookSelect} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default BookList
