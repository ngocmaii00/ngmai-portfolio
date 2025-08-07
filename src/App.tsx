import Header from "./layouts/Header";
import headerElements from "./data/headerElements";
import About from "./layouts/About";
import Project from "./layouts/Project";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./layouts/Home";

function App() {
  return (
    <>
      <div className="absolute top-[20%] left-0 right-0 z-10">
        <div className="cosmos-background">
          <div className="stars-container"></div>
        </div>
      </div>
      <Header
        items={headerElements}
        position="bottom"
        magnification={70}
        baseItemSize={50}
        className="fixed top-0 left-0 right-0 z-20"
      />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Project />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
