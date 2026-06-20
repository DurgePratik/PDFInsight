# PDFInsight 📄🤖

PDFInsight is an AI-powered PDF Question Answering system that enables users to upload PDF documents and interact with them using natural language queries. The application leverages Retrieval-Augmented Generation (RAG), vector embeddings, Pinecone Vector Database, and Google's Gemini LLM to provide accurate, context-aware responses based solely on the uploaded document.

---

## 🚀 Features

* Upload PDF documents through a modern web interface
* Extract and process PDF text automatically
* Intelligent text chunking for efficient retrieval
* Semantic search using vector embeddings
* Pinecone-powered vector storage and retrieval
* Gemini-powered answer generation
* Retrieval-Augmented Generation (RAG) architecture
* Multiple PDF support using namespaces
* ChatGPT-inspired user interface
* Recent PDF history sidebar
* Real-time question answering
* Deployed frontend and backend architecture

---

## 🏗️ System Architecture

```text
                ┌───────────────┐
                │    User       │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ React Frontend│
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ FastAPI Server│
                └───────┬───────┘
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
 PDF Processing                  User Question
        │                               │
        ▼                               ▼
 Text Extraction                 Create Embedding
        │                               │
        ▼                               ▼
 Text Chunking                Pinecone Similarity Search
        │                               │
        ▼                               ▼
 Create Embeddings             Retrieve Relevant Chunks
        │                               │
        ▼                               ▼
 Store in Pinecone            Build Context Prompt
                                        │
                                        ▼
                                Gemini 2.5 Flash
                                        │
                                        ▼
                                  Final Answer
```

---

# 🧠 How It Works

## Step 1: Upload PDF

The user uploads a PDF through the React frontend.

The backend receives the file and stores it temporarily.

```python
file_path = f"uploads/{file.filename}"
```

---

## Step 2: Extract Text

The uploaded PDF is processed using PyPDF.

```python
text = extract_text(file_path)
```

The extracted text becomes the knowledge base for the document.

---

## Step 3: Chunking

Large documents are split into smaller chunks.

Why?

* Improves retrieval quality
* Reduces noise
* Works efficiently with embedding models

```python
chunks = chunk_text(text)
```

---

## Step 4: Create Embeddings

Each chunk is converted into a numerical vector representation.

```python
vectors = create_embeddings(chunks)
```

Embeddings capture semantic meaning rather than exact keywords.

---

## Step 5: Store in Pinecone

Each vector is stored inside Pinecone under a namespace corresponding to the PDF.

```python
store_vectors(
    chunks,
    vectors,
    namespace=file.filename
)
```

Namespaces ensure PDFs remain isolated.

Example:

```text
sample.pdf
research.pdf
notes.pdf
```

---

## Step 6: Ask a Question

The user selects a PDF and asks a question.

Example:

```text
What is the main objective of this document?
```

---

## Step 7: Embed the Question

The question is converted into a vector.

```python
question_vector =
    embed_question(question)
```

---

## Step 8: Similarity Search

Pinecone searches for the most relevant chunks.

```python
search_vectors(
    question_vector,
    namespace=pdf_name
)
```

---

## Step 9: Build Context

Retrieved chunks are combined into a context block.

```python
context +=
    match["metadata"]["text"]
```

---

## Step 10: Generate Answer

Gemini receives:

* User question
* Retrieved context

```python
response =
    llm.generate_content(prompt)
```

Gemini generates an answer using only the provided document content.

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* JavaScript
* CSS

## Backend

* FastAPI
* Python

## AI & RAG

* Google Gemini 2.5 Flash
* Embedding Models
* Retrieval-Augmented Generation (RAG)

## Vector Database

* Pinecone

## Deployment

### Frontend

* Vercel

### Backend

* Render

## Version Control

* Git
* GitHub

---

# 📂 Project Structure

```text
PDFInsight
│
├── app
│   ├── services
│   │   ├── pdf_service.py
│   │   ├── chunk_service.py
│   │   ├── embedding_service.py
│   │   └── pinecone_service.py
│   │
│   ├── rag.py
│   └── main.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   └── SplashScreen.jsx
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── uploads
├── requirements.txt
├── .env
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/DurgePratik/PDFInsight.git
cd PDFInsight
```

---

## Backend Setup

Create virtual environment:

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create `.env`

```env
GOOGLE_API_KEY=your_api_key
PINECONE_API_KEY=your_api_key
PINECONE_INDEX_NAME=your_index_name
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 API Endpoints

## Upload PDF

```http
POST /upload
```

Uploads and indexes a PDF.

---

## Ask Question

```http
POST /ask
```

Parameters:

```text
question
pdf_name
```

Returns:

```json
{
  "answer": "Generated response"
}
```

---

## Get PDFs

```http
GET /pdfs
```

Returns all available PDF namespaces.

---

# 🎯 Challenges Faced

* React state management
* Sidebar synchronization
* CORS configuration
* Pinecone namespace management
* Gemini quota limitations
* Render deployment issues
* Uvicorn startup errors
* File upload handling
* Production debugging

---

# 📈 Future Improvements

* User authentication
* Multi-user support
* Conversation history
* PDF previews
* Streaming responses
* Citation support
* Source highlighting
* Multi-document querying
* OCR support for scanned PDFs

---

# 👨‍💻 Author

**Pratik Durge**

Electronics and Communication Engineering
Indian Institute of Technology Guwahati

GitHub: https://github.com/DurgePratik

---

# ⭐ Acknowledgement

This project was developed as a hands-on exploration of Retrieval-Augmented Generation (RAG), Large Language Models, Vector Databases, and Full-Stack AI Application Development. It demonstrates the integration of modern AI technologies with scalable web architectures to build intelligent document understanding systems.
