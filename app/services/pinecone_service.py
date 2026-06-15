import os

from dotenv import load_dotenv

from pinecone import Pinecone

load_dotenv()


pc = Pinecone(
    api_key=os.getenv("PINECONE_API_KEY")
)

index = pc.Index("pdfinsight")


def store_vectors(chunks, vectors, namespace):

    records = []

    for i in range(len(chunks)):

        records.append(
            {
                "id": f"chunk-{i}",
                "values": vectors[i],
                "metadata": {
                    "text": chunks[i]
                }
            }
        )

    index.upsert(
    vectors=records,
    namespace=namespace
)

    return len(records)


def search_vectors(question_vector, namespace, top_k=3):

    results = index.query(
    vector=question_vector,
    top_k=top_k,
    namespace=namespace,
    include_metadata=True
)

    return results


def delete_all_vectors():

    index.delete(delete_all=True)


def get_namespaces():

    stats = index.describe_index_stats()

    return list(
        stats["namespaces"].keys()
    )