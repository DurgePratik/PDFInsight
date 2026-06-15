const API_URL = "https://pdfinsight-ng6g.onrender.com";

export async function getPdfs() {

    const response =
        await fetch(`${API_URL}/pdfs`);

    return await response.json();
}


export async function uploadPdf(file) {

    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    const response =
        await fetch(
            `${API_URL}/upload`,
            {
                method: "POST",
                body: formData
            }
        );

    return await response.json();
}


export async function askQuestion(
    question,
    pdfName
) {

    const response =
        await fetch(
            `${API_URL}/ask?question=${encodeURIComponent(question)}&pdf_name=${pdfName}`,
            {
                method: "POST"
            }
        );

    return await response.json();
}