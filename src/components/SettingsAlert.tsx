import { useState } from "react";
import { SettingsAlertProps } from "../interfaces/interfaces";

function SettingsAlert({ setServerLocal }: SettingsAlertProps) {
  const [showServerMessage, setShowServerMessage] = useState(false);
  const [isServerRunning, setIsServerRunning] = useState(false);

  const callCloudServer = async () => {
    try {
      setShowServerMessage(true);
      const response = await fetch("https://multi-search-back-latest.onrender.com/ping");
      if (!response.ok) {
        throw new Error(`${response.status}: failed calling https://multi-search-back-latest.onrender.com/ping`);
      }
      const ping = await response.json();
      if (ping.message == "Pong! Server is running.") {
        setIsServerRunning(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerLocal(true)
    }
  }

  const handleClick = () => {
    setShowServerMessage(false);
    setServerLocal(false);
  }

  return (
    <div className="position-absolute d-flex flex-column align-items-center gap-1 card py-3 px-4 bg-light shadow-sm" style={{'zIndex':10}}>
      <p>Por favor, selecione o servidor backend:</p>
      <button onClick={() => setServerLocal(true)} className="btn btn-secondary d-flex align-items-center w-100">
        Servidor Local (http://localhost:8080/)
      </button>
      <button onClick={callCloudServer} className="btn btn-secondary  d-flex align-items-center w-100">
        Usar Servidor na Nuvem
      </button>
      {
        showServerMessage && (
          <div className="position-absolute d-flex flex-column shadow-lg card py-3 px-4 bg-light" style={{'zIndex':10}}>
            {
              isServerRunning ? (
                <div className="d-flex flex-column gap-1">
                  <p>Servidor iniciado!</p>
                  <button onClick={handleClick} className="btn btn-success text-center"> Ok </button>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-left pt-2">
                  <div className="spinner-border text-secondary align-self-center">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <br/>
                  <p>Iniciando backend na nuvem, por favor aguarde.</p>
                  <p>Como utilizo um serviço gratuito, é necessário reiniciá-lo sempre depois de certo tempo inativo. O processo leva cerca de 50 segundos</p>
                  <p>Uma mensagem aparecerá indicando o final da operação.</p>
                  <p>Agradeço a compreensão. Aproveite para conferir o <a href="https://github.com/erik-ymmt/multi-search-back" target="_blank">repositório no GitHub</a>.</p>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
}

export default SettingsAlert;
