# import sys
# import spacy

# # Cargar el modelo de spaCy (ajusta según el idioma de tus libros)
# nlp = spacy.load("en_core_web_sm")

# # Obtener el texto desde los argumentos de la línea de comandos
# if len(sys.argv) < 2:
#     print("Error: No se proporcionó texto")
#     sys.exit(1)

# text = sys.argv[1]

# # Procesar el texto con spaCy
# doc = nlp(text)

# # Extraer oraciones y limpiarlas
# sentences = [sent.text.strip() for sent in doc.sents if sent.text.strip()]

# # Imprimir cada oración en una línea nueva
# for sentence in sentences:
#     print(sentence)

import sys
import spacy

# Cargar el modelo de spaCy
nlp = spacy.load("en_core_web_sm")

# Obtener la ruta del archivo desde los argumentos
if len(sys.argv) < 2:
    print("Error: No se proporcionó la ruta del archivo")
    sys.exit(1)

file_path = sys.argv[1]

# Leer el contenido del archivo
try:
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
except FileNotFoundError:
    print(f"Error: El archivo {file_path} no se encontró")
    sys.exit(1)

# Procesar el texto con spaCy
doc = nlp(text)

# Extraer oraciones y limpiarlas
sentences = [sent.text.strip() for sent in doc.sents if sent.text.strip()]

# Imprimir cada oración en una línea nueva
for sentence in sentences:
    print(sentence)