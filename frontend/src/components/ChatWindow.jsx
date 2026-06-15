function ChatWindow({
    messages,
    setMessages,
    setSelectedPdf
}) {

    function handleNewChat() {

        setMessages([]);
        setSelectedPdf(null);

    }

    return (

        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}
        >

            <div
                style={{
                    padding: "20px 30px",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexShrink: 0
                }}
            >

                <button
                    onClick={handleNewChat}
                    style={{
                        padding: "10px 18px",
                        borderRadius: "12px",
                        border: "1px solid #ddd",
                        background: "white",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    + New Chat
                </button>

            </div>

            {
                messages.length === 0 ? (

                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >

                        <h1  style={{
                    
                    fontSize: "50px",
                    fontWeight: "700",
                    letterSpacing: "-1px",
                    color: "#2f2e2e"
                }}>
                            Welcome to PDFInsight
                        </h1>

                    </div>

                ) : (

                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "20px 150px"
                        }}
                    >

                        {
                            messages.map((message, index) => (

                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            message.role === "user"
                                                ? "flex-end"
                                                : "flex-start",
                                        marginBottom: "20px"
                                    }}
                                >

                                    <div
                                        style={{
                                            maxWidth: "70%",
                                            padding: "14px 18px",
                                            borderRadius: "16px",
                                            fontSize: "14px",
                                            lineHeight: "1.7",
                                            color: "#000000",

                                            background:
                                                message.role === "user"
                                                    ? "#f3f3f3"
                                                    : "#ffffff",

                                            border:
                                                "1px solid #e5e5e5"
                                        }}
                                    >

                                        {message.text}

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );
}

export default ChatWindow;