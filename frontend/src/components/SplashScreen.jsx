function SplashScreen() {

    return (

        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white"
            }}
        >

            <h1
                style={{
                    fontSize: "72px",
                    fontWeight: "900",
                    letterSpacing: "-2px",
                    color: "#111"
                }}
            >
                PDFInsight
            </h1>

        </div>

    );
}

export default SplashScreen;