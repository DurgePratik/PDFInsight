import { useEffect } from "react";

function SplashScreen({ onFinish }) {

    useEffect(() => {

        setTimeout(() => {

            onFinish();

        }, 2000);

    }, []);

    return (

        <div className="splash">

            <h1>PDFInsight</h1>

        </div>
    );
}

export default SplashScreen;