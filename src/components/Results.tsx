import logo from "../img/logo_multisearch_header.png"
import ResultCard from "./ResultCard";
import { SearchResponse, SearchResults } from "../interfaces/interfaces";
import { useState } from "react";
import SettingsAlert from "./SettingsAlert";

function Results() {
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [isServerLocal, setIsServerLocal] = useState(true);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState("Olá! Busque por Pedidos de Venda, Pedidos de Compra, Produtos, Equipamentos e Mão de Obra do seu ERP.");

  const searchResults: SearchResults | null = response ? response.results : null;

  const handleSetServerLocal = (value: boolean) => {
    setIsServerLocal(value);
    setShowMessageBox(false);
  };

  const handleSearch = async () => {
    try {
      const url = isServerLocal ?
        `http://localhost:8080/search?q=${searchTerm}` :
        `https://multi-search-back-latest.onrender.com/search?q=${searchTerm}`
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      console.log('url', url);
      console.log('data', data);
      setResponse(data)
    } catch (error) {
      isServerLocal ? 
      setMessage("Verifique se o backend foi iniciado localmente em http://localhost:8080/ ou mude a configuração para o backend da nuvem.") :
      setMessage("Ops, parece que ocorreu um erro no servidor na nuvem, tente mais tarde ou rode localmente, instruções em https://github.com/erik-ymmt/multi-search-back")
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex vh-100 flex-column align-items-center gap-3 mb-5 col-12 col-md-8 col-lg-5">
      {
        showMessageBox &&
        <SettingsAlert setServerLocal={(setting: boolean) => { handleSetServerLocal(setting) }} />
      }
      <header className="d-flex gap-2 flex-column align-items-center w-100">
        <button type="button" className="btn btn-outline-secondary d-flex align-items-center position-absolute top-0 start-0 m-3 gap-2" onClick={() => setShowMessageBox(!showMessageBox)}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg>
          </div>
          <div>Backend ({isServerLocal?"Local":"Nuvem"})</div>
        </button>
        <div>
          <img alt="multisearch logo" src={logo} />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Pesquisar" className="form-control" onChange={e => setSearchTerm(e.target.value)} />
          <button type="button" className="btn btn-outline-secondary d-flex align-items-center" onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
              {/* Search icon ref.: https://icons.getbootstrap.com/icons/search/ */}
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </div>
      </header>
      {
        response ? (
          response.resultsCount === 0 ? 
          <div className="text-body-tertiary align-self-baseline">Não foram encontrados resultados.</div> :
            response.resultsCount > 1 ? 
              <div className="text-body-tertiary align-self-baseline">Foram encontrados {response.resultsCount} resultados:</div> :
              <div className="text-body-tertiary align-self-baseline">Foi encontrado {response.resultsCount} resultado.</div>
        ) : <div className='text-center'>
          {message}
        </div>
      }
      {
        searchResults ? (
          Object.keys(searchResults).map((category: string, index) => (
            <ResultCard key={index + category} category={category} data={searchResults[category as keyof SearchResults]} />
          ))
        ) : <></>
      }
    </div>
  );
}

export default Results;
