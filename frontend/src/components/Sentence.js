import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";

const TRANSLATE_API_URL = "http://localhost/api/translate"; // Ajusta según tu API

function Sentence({ text }) {
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Llamar a la API de traducción
  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const response = await axios.post(TRANSLATE_API_URL, { text });
      setTranslatedText(response.data.translation || "Traducción no disponible");
      setShowTranslation(true);
    } catch (err) {
      console.error("Error al traducir:", err);
      setTranslatedText("Error al traducir la oración.");
      setShowTranslation(true);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded bg-light">
      <p className="lead mb-2">{text}</p>
      {showTranslation && (
        <p className="mt-2 text-muted fst-italic">{translatedText}</p>
      )}
      <Button
        variant="outline-primary"
        onClick={handleTranslate}
        disabled={isTranslating}
        size="sm"
      >
        {isTranslating ? (
          <Spinner as="span" animation="border" size="sm" className="me-2" />
        ) : (
          "Traducir"
        )}
      </Button>
    </div>
  );
}

export default Sentence;