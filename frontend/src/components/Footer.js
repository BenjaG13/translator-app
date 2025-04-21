import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>BookReader</h5>
            <p className="text-muted">Your digital reading companion</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/?shelf=mylibrary" className="text-decoration-none text-light">
                  My Library
                </Link>
              </li>
              <li>
                <Link to="/?sort=newest" className="text-decoration-none text-light">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/?sort=popular" className="text-decoration-none text-light">
                  Top Picks
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li className="text-light">Email: contact@bookreader.com</li>
              <li className="text-light">Phone: (123) 456-7890</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3 bg-secondary" />
        <div className="text-center text-muted">
          <small>&copy; {new Date().getFullYear()} BookReader. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
