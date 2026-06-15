import { useState } from "react";

function Sidebar({
    pdfs,
    selectedPdf,
    setSelectedPdf  
}) {

    const [hoveredPdf, setHoveredPdf] =
        useState(null);

    return (

        <div
            style={{
                width: "280px",
                height: "100vh",
                borderRight: "1px solid #e5e5e5",
                padding: "20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}
        >

            <h1
                style={{
                    marginTop: 0,
                    marginBottom: "25px",
                    textAlign: "left",
                    fontSize: "32px",
                    fontWeight: "700",
                    letterSpacing: "-1px",
                    color: "#111"
                }}
            >
                PDFInsight
            </h1>


            <div
                style={{
                    textAlign: "left",
                    color: "#141111",
                    fontSize: "17px",
                    fontWeight: "600",
                    marginTop: "70px"
                }}
            >
                Recent
            </div>

            <hr
                style={{
                    border: "none",
                    borderTop: "1px solid #0f0a0a42",
                    margin: "10px 0 15px 0"
                }}
            />

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    paddingRight: "5px"
                }}
            >

                {
                    pdfs.map((pdf) => (

                        <div
                            key={pdf}
                            onClick={() =>
                                setSelectedPdf(pdf)
                            }
                            onMouseEnter={() =>
                                setHoveredPdf(pdf)
                            }
                            onMouseLeave={() =>
                                setHoveredPdf(null)
                            }
                             style={{
                            padding: "8px 12px",
                            marginBottom: "3px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            transition: "all 0.2s ease",

                            fontSize: "13px",
                            color: "#000",

                            background:
                                selectedPdf === pdf
                                    ? "#e5e5e5"
                                    : hoveredPdf === pdf
                                    ? "#f3f3f3"
                                    : "transparent",

                            fontWeight:
                                selectedPdf === pdf
                                    ? "500"
                                    : "400"
                        }}
                        >
                            📄 {pdf}
                        </div>

                    ))
                }

            </div>

        </div>

    );
}

export default Sidebar;