import React from "react";
import { Card, Placeholder } from "react-bootstrap";
import "../styles/components/bookcardd.css"; // mismo css que BookCard

export default function BookPlaceholder() {
  return (
    <Card className="book-card h-100 shadow-sm placeholder-card" aria-hidden="true">
      {/* Reutiliza la misma caja de imagen para asegurar tamaño/ratio */}
      <div className="card-image placeholder-image">
        {/* Placeholder de bloque que ocupa toda la imagen */}
        <Placeholder as="div" animation="glow" className="w-100 h-100">
          <Placeholder xs={12} className="h-100" />
        </Placeholder>
      </div>

      <Card.Body className="card-body d-flex flex-column">
        <div className="card-meta">
          <Placeholder as="p" animation="glow">
            <Placeholder xs={8} /> {/* título */}
          </Placeholder>
          <Placeholder as="p" animation="glow" className="mt-2">
            <Placeholder xs={5} /> {/* autor */}
          </Placeholder>
        </div>

        <div className="card-genres mt-auto d-flex">
          <Placeholder as="span" animation="glow" className="me-1">
            <Placeholder xs={3} />
          </Placeholder>
          <Placeholder as="span" animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </div>
      </Card.Body>
    </Card>
  );
}
