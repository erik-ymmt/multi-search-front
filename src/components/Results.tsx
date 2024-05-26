import apiResponseMock from "../../mockData/data.json";
import ResultCard from "./ResultCard";
import { Response, SearchResults } from "../interfaces/interfaces";

function Results() {
  const response: Response = apiResponseMock;
  const searchResults: SearchResults = response.results;
  console.log('resp', response)
  console.log('resp', Object.keys(response.results))

  return (
    <div className="d-flex vh-100 flex-column align-items-center gap-3 w-50">
      {
        response.resultsCount === 0 ? 
        <div className="text-body-tertiary align-self-baseline">Não foram encontrados resultados.</div> :
          response.resultsCount > 1 ? 
            <div className="text-body-tertiary align-self-baseline">Foram encontrados {response.resultsCount} resultados:</div> :
            <div className="text-body-tertiary align-self-baseline">Foi encontrado {response.resultsCount} resultado.</div>
      }
      {Object.keys(searchResults).map((category: string, index) => (
        <ResultCard key={index} category={category} data={searchResults[category as keyof SearchResults]} />
      ))}
    </div>
  );
}

export default Results;
