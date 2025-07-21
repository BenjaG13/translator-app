import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import BookDetailPage from "./pages/BookDetailPage"
import BookReaderPage from "./pages/BookReaderPage"
import MyLibraryPage from "./pages/MyLibraryPage";
import Footer from "./components/Footer"
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />

          <main className="flex-grow-1 py-4">
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mylibrary" element={<MyLibraryPage />} />
                <Route path="/book/:slug" element={<BookDetailPage />} />
                <Route path="/books/:slug/read" element={<BookReaderPage />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
