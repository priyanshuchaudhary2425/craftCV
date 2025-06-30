import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Home from "../pages/home";
import About from "../pages/about";
import { useState } from "react";

function App() {
    const [result, setResult] = useState(null);

    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home result={result} setResult={setResult}/>} />
                    <Route path="/about" element={<About />} />
                </Routes>                
            <Footer />
        </BrowserRouter>
    );
}

export default App;