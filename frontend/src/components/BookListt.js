// import React from "react";
// import { Row, Col, Alert, Spinner, Placeholder } from "react-bootstrap";
// import BookCard from "./BookCard";

// /**
//  * Props:
//  *  - books: array
//  *  - loading: boolean
//  *  - error: string|null
//  *  - cols: object with responsive column counts: { xs:1, sm:2, md:3, lg:4 }
//  *  - gap: bootstrap gutter (default "g-4")
//  */
// export default function BookList({
//   books = [],
//   loading = false,
//   error = null,
//   cols = { xs: 1, sm: 2, md: 3, lg: 4 },
//   gap = "g-4",
// }) {
//   // Render placeholders cuando está cargando
//   if (loading) {
//     // render simple placeholders (4 placeholders)
//     const placeholders = new Array(4).fill(null);
//     return (
//       <Row xs={cols.xs} sm={cols.sm} md={cols.md} lg={cols.lg} className={gap}>
//         {placeholders.map((_, i) => (
//           <Col key={i}>
//             <div className="card h-100" aria-hidden>
//               <div style={{ height: 250, background: "#2b2b2b" }} />
//               <div className="card-body">
//                 <Placeholder as="h5" animation="glow">
//                   <Placeholder xs={8} />
//                 </Placeholder>
//                 <Placeholder as="p" animation="glow">
//                   <Placeholder xs={6} />
//                 </Placeholder>
//                 <div className="mt-auto">
//                   <Placeholder as="span" animation="glow">
//                     <Placeholder xs={4} />
//                   </Placeholder>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         ))}
//       </Row>
//     );
//   }

//   // Error
//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   // No results
//   if (!books || books.length === 0) {
//     return (
//       <Alert variant="info">
//         No se encontraron libros que coincidan con tus criterios. Ajusta tuuu
//         búsqueda o filtros.
//       </Alert>
//     );
//   }

//   // Lista de libros
//   return (
//     <>
//     <p>daleeeeestoy...</p>
//     <Row xs={cols.xs} sm={cols.sm} md={cols.md} lg={cols.lg} className={gap}>
//       {books.map((book) => (
//         <Col key={book.id}>
//           <BookCard book={book} />
//         </Col>
//       ))}
//     </Row>
//     </>
//   );
// }
import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert, Placeholder, Card } from "react-bootstrap";
import BookCard from "./BookCard";
import "../styles/components/booklist.css"; // ruta relativa desde src/components/BookList.js -> src/styles/...

/**
 * BookList - componente modular para mostrar grillas de BookCard
 *
 * Props:
 *  - books: array
 *  - loading: boolean
 *  - error: string | object | null
 *  - cols: { xs, sm, md, lg } (columnas responsivas)
 *  - gap: gutter bootstrap (ej: "g-4")
 */
function BookList({
  books = [],
  loading = false,
  error = null,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = "g-4",
}) {
  // placeholders dinámicos: columnas en large * 2 filas
  const columnsOnLarge = cols.lg || cols.md || cols.sm || cols.xs || 4;
  const placeholdersCount = columnsOnLarge * 2;

  if (loading) {
    const placeholders = new Array(placeholdersCount).fill(null);
    return (
      <Row xs={cols.xs} sm={cols.sm} md={cols.md} lg={cols.lg} className={gap}>
        {placeholders.map((_, i) => (
          <Col key={i} className="d-flex">
            <Card className="h-100 placeholder-card w-100" aria-hidden>
              <div className="card-image placeholder-image" />
              <Card.Body className="d-flex flex-column">
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={7} />
                </Placeholder>

                <Placeholder as="div" animation="glow" className="text-muted mb-2">
                  <Placeholder xs={5} />
                </Placeholder>

                <div className="mt-auto">
                  <Placeholder as="span" animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  if (error) return <Alert variant="danger">{String(error)}</Alert>;

  if (!books || books.length === 0)
    return (
      <Alert variant="info">
        No se encontraron libros que coincidan con tus criterios. Ajusta tu
        búsqueda o filtros.
      </Alert>
    );

  return (
    <Row xs={cols.xs} sm={cols.sm} md={cols.md} lg={cols.lg} className={gap}>
      {books.map((book) => (
        <Col key={book.id ?? book.slug} className="d-flex">
          <div className="book-card-wrapper w-100">
            <BookCard book={book} />
          </div>
        </Col>
      ))}
    </Row>
  );
}

BookList.propTypes = {
  books: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cols: PropTypes.object,
  gap: PropTypes.string,
};

export default React.memo(BookList);
