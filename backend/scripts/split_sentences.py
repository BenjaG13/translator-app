import sys
import spacy

# Cargar el modelo de spaCy (ajusta según el idioma de tus libros)
nlp = spacy.load("en_core_web_sm")

# Obtener el texto desde los argumentos de la línea de comandos
if len(sys.argv) < 2:
    print("Error: No se proporcionó texto")
    sys.exit(1)

text = sys.argv[1]

# Procesar el texto con spaCy
doc = nlp(text)

# Extraer oraciones y limpiarlas
sentences = [sent.text.strip() for sent in doc.sents if sent.text.strip()]

# Imprimir cada oración en una línea nueva
for sentence in sentences:
    print(sentence)