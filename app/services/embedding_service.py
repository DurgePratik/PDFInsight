import os

from dotenv import load_dotenv

from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings
)

load_dotenv()


embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=os.getenv("GOOGLE_API_KEY")
)


def create_embeddings(chunks):

    vectors = embedding_model.embed_documents(
        chunks
    )

    return vectors


def embed_question(question):

    vector = embedding_model.embed_query(
        question
    )

    return vector