import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";

const TRANSLATE_API_URL = process.env.REACT_APP_TRANSLATE_API_URL;

function Sentence({ text, source = "en", target = "es" }) {
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Llamar a la API de traducción
  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const response = await axios.post(TRANSLATE_API_URL, {
        text,
        source,
        target,
      });
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
    <div className="mb-4 p-4 border rounded bg-dark text-white">
      <p className="lead mb-2">{text}</p>
      {showTranslation && (
        <p className="mt-2 text-white fst-italic">{translatedText}</p>
      )}
      <Button
        variant="outline-light"
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