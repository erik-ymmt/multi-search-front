import { useState } from "react";
import {
  MapCategory,
  Equipment,
  Material,
  SalesOrder,
  PurchaseOrder,
  Workforce,
} from "../interfaces/interfaces";
import ItemInfo from "./ItemInfo";


function ResultCard({ category, data }: 
  { category: string;  data: Equipment[] | Material[] | SalesOrder[] | PurchaseOrder[] | Workforce[] | undefined }) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const mapCategory: MapCategory = {
    Equipments: { titlePtg: "Equipamentos", id: "EquipmentID" },
    Materials: { titlePtg: "Produtos", id: "MaterialID" },
    SalesOrders: { titlePtg: "Pedidos de Venda", id: "SalesOrderID" },
    PurchaseOrders: { titlePtg: "Pedidos de Compra", id: "PurchaseOrderID" },
    Workforce: { titlePtg: "Mão de Obra", id: "WorkforceID" },
  };

  const toggleDetails = (index: string | null ) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  return (
    <div className="card w-100">
      <div className="card-header bg-transparent d-flex align-items-center justify-content-between">
        <div className="fw-bold fs-5">{mapCategory[category].titlePtg}</div>
        <div className="text-body-tertiary">
          ({data?.length || 0}
          {(data?.length || 0) > 1 ? " itens encontrados" : " item encontrado" })
        </div>
      </div>
      <div className="card-body">
        {
          !data || data.length === 0 ? <p className="text-center text-body-tertiary">Nenhum item encontrado</p> :
          data.map((item, index) => {
            if (category === "Equipments") {
              return <div className="d-flex gap-2" key={category + index}>
                <div
                    className="text-decoration-underline link-danger link-underline-opacity-100-hover"
                    onClick={() => toggleDetails(category + index)}
                    style={{ cursor: "pointer" }}
                >
                  #{(item as Equipment)["EquipmentID"]}
                </div>
                <div>{(item as Equipment)["EquipmentName"]}</div>
                { 
                  selectedCard === (category + index) &&
                    <ItemInfo toggleDetails={(lineKey: string | null ) => (toggleDetails(lineKey))}/> 
                }
              </div>;
            }
            if (category === "Materials") {
              return <div className="d-flex gap-2" key={category + index}>
                <div
                    className="text-decoration-underline link-danger link-underline-opacity-100-hover"
                    onClick={() => toggleDetails(category + index)}
                    style={{ cursor: "pointer" }}
                >
                  #{(item as Material)["MaterialID"]}
                </div>
                <div>{(item as Material)["MaterialName"]}</div>
                { 
                  selectedCard === (category + index) &&
                    <ItemInfo toggleDetails={(lineKey: string | null ) => (toggleDetails(lineKey))}/> 
                }
              </div>;
            }
            if (category === "SalesOrders") {
              return <div className="d-flex justify-content-between gap-2" key={category + index}>
                <div className="d-flex  gap-2">
                  <div
                    className="text-decoration-underline link-danger link-underline-opacity-100-hover"
                    onClick={() => toggleDetails(category + index)}
                    style={{ cursor: "pointer" }}
                  >
                    #{(item as SalesOrder)["SalesOrderID"]}
                  </div>
                  <div>{(item as SalesOrder)["MaterialName"]}</div>
                </div>
                <div>Qtd: {(item as SalesOrder)["Quantity"]}</div>
                  {
                    selectedCard === category + index && (
                      <ItemInfo 
                      toggleDetails={(lineKey: string | null ) => (toggleDetails(lineKey))}
                      data={{
                        "Data de Entrega": (item as SalesOrder)["DeliveryDate"],
                        "Cliente": (item as SalesOrder)["Customer"],
                        "ID Material": (item as SalesOrder)["MaterialID"],
                        "Valor": "R$" + (item as SalesOrder)["TotalValue"]
                      }}
                      />
                    )
                  }
              </div>;
            }
            if (category === "PurchaseOrders") {
              return <div className="d-flex justify-content-between gap-2" key={category + index}>
                <div className="d-flex  gap-2">
                  <div
                      className="text-decoration-underline link-danger link-underline-opacity-100-hover"
                      onClick={() => toggleDetails(category + index)}
                      style={{ cursor: "pointer" }}
                  >
                    #{(item as PurchaseOrder)["PurchaseOrderID"]}
                  </div>
                  <div>{(item as PurchaseOrder)["MaterialName"]}</div>
                </div>
                <div>Qtd: {(item as PurchaseOrder)["Quantity"]}</div>
                {
                    selectedCard === category + index && (
                      <ItemInfo 
                      toggleDetails={(lineKey: string | null ) => (toggleDetails(lineKey))}
                      data={{
                        "Data de Entrega": (item as PurchaseOrder)["DeliveryDate"],
                        "Fornecedor": (item as PurchaseOrder)["Supplier"],
                        "ID Material": (item as PurchaseOrder)["MaterialID"],
                        "Custo": "R$" + (item as PurchaseOrder)["TotalCost"]
                      }}
                      />
                    )
                  }
              </div>;
            }
            if (category === "Workforce") {
              return <div className="d-flex gap-2" key={category + index}>
                <div
                    className="text-decoration-underline link-danger link-underline-opacity-100-hover"
                    onClick={() => toggleDetails(category + index)}
                    style={{ cursor: "pointer" }}
                >
                  #{(item as Workforce)["WorkforceID"]}
                </div>
                <div>{(item as Workforce)["Name"]}</div>
                {
                  selectedCard === category + index && (
                  <div 
                    className="position-absolute start-0 top-100 d-flex gap-1 card  py-3 px-4 bg-light shadow-sm"
                    style={{'zIndex':10}}
                  >
                    <div>Não há mais informações</div>
                    <button onClick={() => toggleDetails(null)} className="btn btn-secondary align-self-ceter">
                      Fechar
                    </button>
                  </div>)
                }
              </div>;
            }
          })
        }
      </div>
    </div>
  );
}

export default ResultCard;
