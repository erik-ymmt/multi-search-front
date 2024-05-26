import apiResponseMock from "../../mockData/data.json";
import logo from '../img/logo_multisearch_header.png'
import ResultCard from "./ResultCard";
import { SearchResults } from "../interfaces/interfaces";
import { useState } from "react";

function Results() {
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState(apiResponseMock);
  const searchResults: SearchResults = response.results;
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      console.log('data', data);
      setResponse(data)
      // You can update the UI with the received data here
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex vh-100 flex-column align-items-center gap-3 w-50 mb-5">
    <header className="d-flex gap-2 flex-column align-items-center w-100">
      <div>
        <img alt="multisearch logo" src={logo} />
      </div>
      <div className="input-group">
        <input type="text" placeholder="Search" className="form-control" onChange={e => setSearchTerm(e.target.value)} />
        <button type="button" className="btn btn-outline-secondary" onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
            {/* Search icon ref.: https://icons.getbootstrap.com/icons/search/ */}
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </header>
      {
        response.resultsCount === 0 ? 
        <div className="text-body-tertiary align-self-baseline">Não foram encontrados resultados.</div> :
          response.resultsCount > 1 ? 
            <div className="text-body-tertiary align-self-baseline">Foram encontrados {response.resultsCount} resultados:</div> :
            <div className="text-body-tertiary align-self-baseline">Foi encontrado {response.resultsCount} resultado.</div>
      }
      {Object.keys(searchResults).map((category: string, index) => (
        <ResultCard key={index + category} category={category} data={searchResults[category as keyof SearchResults]} />
      ))}
    </div>
  );
}

export default Results;
