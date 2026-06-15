import os

from dotenv import load_dotenv

import google.generativeai as genai

from app.services.embedding_service import (
    embed_question
)

from app.services.pinecone_service import (
    search_vectors
)

load_dotenv()

genai.configure(
    api_key=os.getenv("GOOGLE_API_KEY")
)

llm = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def ask_pdf(
    question,
    pdf_name
):

    question_vector = embed_question(
        question
    )

    results = search_vectors(
        question_vector,
        namespace=pdf_name
    )

    context = ""

    for match in results["matches"]:

        context += (
            match["metadata"]["text"]
        )

        context += "\n\n"

    prompt = f"""
You are a helpful PDF assistant.

Answer the question using ONLY the provided context.

Instructions:
- Write in normal sentence case.
- Never write the entire answer in CAPITAL LETTERS.
- Use proper grammar and punctuation.
- Format the answer naturally like ChatGPT.
- If the answer is not present in the context, say:
  "The answer was not found in the document."

Context:

{context}

Question:

{question}
"""

    try:

        response = llm.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print("Gemini Error:", e)

        return (
            "AI service is temporarily unavailable. "
            "The Gemini API quota may have been exceeded. "
            "Please try again after some time."
        )