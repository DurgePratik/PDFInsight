import { useRef, useState } from "react";

import {
    uploadPdf,
    askQuestion,
    getPdfs
}
from "../services/api";

function ChatInput({
    selectedPdf,
    messages,
    setMessages,
    setPdfs
}) {

    const [question, setQuestion] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const fileInputRef =
        useRef(null);

    const handleUploadClick = () => {

        fileInputRef.current.click();

    };

    const handleFileChange =
        async (event) => {

        const file =
            event.target.files[0];

        if (!file) return;

        try {

            const response =
                await uploadPdf(file);

            const updatedPdfs =
                await getPdfs();

            setPdfs(updatedPdfs);

            alert(
                `${response.filename} uploaded successfully`
            );

        }
        catch (error) {

            console.error(error);

            alert("Upload failed");

        }
    };

    const handleAsk =
        async () => {

        if (!question.trim()) return;

        if (!selectedPdf) {

            alert(
                "Please select a PDF first"
            );

            return;

        }

        const userMessage = {
            role: "user",
            text: question
        };

        setMessages([
            ...messages,
            userMessage
        ]);

        setLoading(true);

        try {

            const response =
                await askQuestion(
                    question,
                    selectedPdf
                );

            const botMessage = {
                role: "assistant",
                text: response.answer
            };

            setMessages([
                ...messages,
                userMessage,
                botMessage
            ]);

            setQuestion("");

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }
    };

    return (

        <div
            style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                borderTop: "1px solid #e5e5e5",
                background: "#fff",
                flexShrink: 0
            }}
        >

            <div
                style={{
                    width: "900px",
                    height: "60px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "30px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 15px",
                    background: "#fff",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.05)"
                }}
            >

                <button
                    onClick={handleUploadClick}
                    style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "28px",
                        fontWeight: "500",
                        cursor: "pointer",
                        color: "#000",
                        marginRight: "20px"
                    }}
                >
                    +
                </button>

                <input
                    type="text"
                    value={question}
                    placeholder="Ask anything..."
                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter"
                        ) {

                            handleAsk();

                        }

                    }}
                    style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "15px",
                        background:
                            "transparent",
                        color: "#000"
                    }}
                />

                <button
                    onClick={handleAsk}
                    disabled={loading}
                    style={{
                        width: "40px",
                        height: "40px",
                        border: "none",
                        borderRadius: "50%",
                        background: "#d9d9d9",
                        cursor: loading
                            ? "not-allowed"
                            : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        color: "#000",
                        marginLeft: "10px"
                    }}
                >
                    {
                        loading
                            ? "⌛︎"
                            : "↑"
                    }
                </button>

            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{
                    display: "none"
                }}
                onChange={handleFileChange}
            />

        </div>

    );
}

export default ChatInput;