import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import BookDetailPage from "./pages/BookDetailPage"
import BookReaderPage from "./pages/BookReaderPage"
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1 py-4">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book/:slug" element={<BookDetailPage />} />
              <Route path="/books/:slug/read" element={<BookReaderPage />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
