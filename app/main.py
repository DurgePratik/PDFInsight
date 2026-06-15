import os

from fastapi import FastAPI, UploadFile, File

from app.services.pdf_service import extract_text
from app.services.chunk_service import chunk_text
from app.services.embedding_service import create_embeddings
from app.services.pinecone_service import store_vectors
from fastapi.middleware.cors import CORSMiddleware
from app.rag import ask_pdf

from app.services.pinecone_service import (
    store_vectors,
    get_namespaces
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():

    return {
        "message": "PDFInsight API Running"
    }


@app.post("/ask")
def ask_question(
    question: str,
    pdf_name: str
):

    answer = ask_pdf(
        question,
        pdf_name
    )

    return {
        "pdf_name": pdf_name,
        "question": question,
        "answer": answer
    }


@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(
            await file.read()
        )

    text = extract_text(
        file_path
    )

    chunks = chunk_text(
        text
    )

    vectors = create_embeddings(
        chunks
    )

    print("=" * 50)
    print("FILE:", file.filename)
    print("TEXT LENGTH:", len(text))
    print("CHUNKS:", len(chunks))
    print("VECTORS:", len(vectors))
    print("=" * 50)

    if len(chunks) == 0:

        return {
            "error": "No text extracted from PDF",
            "filename": file.filename
        }

    if len(vectors) == 0:

        return {
            "error": "No embeddings generated",
            "filename": file.filename
        }

    total_vectors = store_vectors(
        chunks,
        vectors,
        namespace=file.filename
    )

    return {
        "filename": file.filename,
        "chunks": len(chunks),
        "vectors_uploaded": total_vectors,
        "namespace": file.filename
    }

@app.get("/pdfs")
def get_pdfs():

    return get_namespaces()