import {
  MapCategory,
  Equipment,
  Material,
  SalesOrder,
  PurchaseOrder,
  Workforce,
} from "../interfaces/interfaces";

const mapCategory: MapCategory = {
  Equipments: { titlePtg: "Equipamentos", id: "EquipmentID" },
  Materials: { titlePtg: "Produtos", id: "MaterialID" },
  SalesOrders: { titlePtg: "Pedidos de Venda", id: "SalesOrderID" },
  PurchaseOrders: { titlePtg: "Pedidos de Compra", id: "PurchaseOrderID" },
  Workforce: { titlePtg: "Mão de Obra", id: "WorkforceID" },
};

function ResultCard({ category, data }: { category: string;  data: Equipment[] | Material[] | SalesOrder[] | PurchaseOrder[] | Workforce[] | undefined }) {
  console.log('data', data)
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
          data.map((item) => {
            if (category === "Equipments") {
              return <p className="d-flex gap-2">
                <div className="text-decoration-underline text-danger">#{(item as Equipment)["EquipmentID"]}</div>
                <div>{(item as Equipment)["EquipmentName"]}</div>
              </p>;
            }
            if (category === "Materials") {
              return <p className="d-flex gap-2">
                <div className="text-decoration-underline text-danger">#{(item as Material)["MaterialID"]}</div>
                <div>{(item as Material)["MaterialName"]}</div>
              </p>;
            }
            if (category === "SalesOrders") {
              return <p className="d-flex justify-content-between gap-2">
                <div className="d-flex  gap-2">
                  <div className="text-decoration-underline text-danger">#{(item as SalesOrder)["SalesOrderID"]}</div>
                  <div>{(item as SalesOrder)["MaterialName"]}</div>
                </div>
                <div>Qtd: {(item as SalesOrder)["Quantity"]}</div>
              </p>;
            }
            if (category === "PurchaseOrders") {
              return <p className="d-flex justify-content-between gap-2">
                <div className="d-flex  gap-2">
                  <div className="text-decoration-underline text-danger">#{(item as PurchaseOrder)["PurchaseOrderID"]}</div>
                  <div>{(item as PurchaseOrder)["MaterialName"]}</div>
                </div>
                <div>Qtd: {(item as PurchaseOrder)["Quantity"]}</div>
              </p>;
            }
            if (category === "Workforce") {
              return <p className="d-flex gap-2">
                <div className="text-decoration-underline text-danger">#{(item as Workforce)["WorkforceID"]}</div>
                <div>{(item as Workforce)["Name"]}</div>
              </p>;
            }
          })
        }
      </div>
    </div>
  );
}

export default ResultCard;
