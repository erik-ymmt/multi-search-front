import "./App.css";
import Header from "./components/Header";
import Results from "./components/Results";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <main className="d-flex min-vh-100 flex-column align-items-center gap-3 py-5">
      <Header />
      <Results />
    </main>
  );
}

export default App;
