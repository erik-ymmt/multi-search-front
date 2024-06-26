import Footer from "./components/Footer";
import Results from "./components/Results";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <main className="d-flex min-vh-100 flex-column align-items-center py-5 container">
      <Results />
      <Footer />
    </main>
  );
}

export default App;
