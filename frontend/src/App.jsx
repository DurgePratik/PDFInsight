import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import SplashScreen from "./components/SplashScreen";

import { getPdfs } from "./services/api";

import "./App.css";

function App() {

    const [showSplash, setShowSplash] =
        useState(true);

    const [pdfs, setPdfs] =
        useState([]);

    const [selectedPdf, setSelectedPdf] =
        useState(null);

    const [messages, setMessages] =
        useState([]);

    useEffect(() => {

        const timer =
            setTimeout(() => {

                setShowSplash(false);

            }, 2000);

        return () =>
            clearTimeout(timer);

    }, []);

    useEffect(() => {

        loadPdfs();

    }, []);

    async function loadPdfs() {

        try {

            const data =
                await getPdfs();

            setPdfs(
                [...data].reverse()
            );

        }
        catch (error) {

            console.error(error);

        }
    }

    if (showSplash) {

        return <SplashScreen />;

    }

    return (

        <div className="app">

            <Sidebar
                pdfs={pdfs}
                selectedPdf={selectedPdf}
                setSelectedPdf={setSelectedPdf}
            />

            <div className="chat-area">

                <ChatWindow
                    messages={messages}
                    setMessages={setMessages}
                    setSelectedPdf={setSelectedPdf}
                />

                <ChatInput
                    selectedPdf={selectedPdf}
                    messages={messages}
                    setMessages={setMessages}
                    pdfs={pdfs}
                    setPdfs={setPdfs}
                />

            </div>

        </div>

    );
}

export default App;