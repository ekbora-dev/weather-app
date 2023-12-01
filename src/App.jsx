import React from "react";
import Header from "./layout/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./layout/Footer";
import "./App.css"



function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<h1>Erreur 404 Page non trouvé !</h1>} />
            </Routes>
			<Footer />
        </>
    );
}

export default App;
