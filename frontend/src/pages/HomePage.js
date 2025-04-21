"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Row, Col, Alert } from "react-bootstrap"
import BookCard from "../components/BookCard"
import { booksData } from "../data/books"

function HomePage() {
  const [books, setBooks] = useState(booksData)
  const location = useLocation()

  useEffect(() => {
    // Get search params
    const searchParams = new URLSearchParams(location.search)
    const searchTerm = searchParams.get("search")
    const genre = searchParams.get("genre")
    const shelf = searchParams.get("shelf")

    // Filter books based on URL parameters
    let filtered = booksData

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (genre && genre !== "All") {
      filtered = filtered.filter((book) => book.genre === genre)
    }

    // For demonstration purposes only - in a real app, you'd have user data
    if (shelf === "mylibrary") {
      // Simulate "My Library" by showing only first 3 books
      filtered = filtered.slice(0, 3)
    }

    setBooks(filtered)
  }, [location.search])

  return (
    <div>
      <h2 className="mb-4">{location.search.includes("shelf=mylibrary") ? "My Library" : "Discover Books"}</h2>

      {books.length === 0 ? (
        <Alert variant="info">No books found matching your criteria. Try adjusting your search or filters.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomePage
