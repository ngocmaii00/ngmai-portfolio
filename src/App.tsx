import Header from "./layouts/Header";
import headerElements from "./data/headerElements";
import About from "./layouts/About";
import Project from "./layouts/Project";

function App() {
  return (
    <>
      <Header
        items={headerElements}
        position="bottom"
        magnification={70}
        baseItemSize={50}
        className="fixed top-0 left-0 right-0 z-20"
      />
      <About />
      <div className="absolute top-[20%] left-0 right-0 z-10">
        <Project />
      </div>
    </>
  );
}

export default App;
