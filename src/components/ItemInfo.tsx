import { ItemInfoProps } from "../interfaces/interfaces";

function ItemInfo({ toggleDetails, data }: ItemInfoProps) {
  const keys = data ? Object.keys(data) : [];
  const values = data ? Object.values(data) : [];
  return data ? (
    <div
      className="position-absolute start-0 top-100 d-flex gap-1 card  py-3 px-4 bg-light shadow-sm"
      style={{ zIndex: 10 }}
    >
      <b>Detalhes do pedido</b>
      {values.map((item, index) => {
        return <div key={index}>{`${keys[index]}: ${item}`}</div>;
      })}

      <button
        onClick={() => toggleDetails(null)}
        className="btn btn-secondary align-self-ceter"
      >
        Fechar
      </button>
    </div>
  ) : (
    <div
      className="position-absolute start-0 top-100 d-flex gap-1 card  py-3 px-4 bg-light shadow-sm"
      style={{ zIndex: 10 }}
    >
      <div>Não há mais informações</div>
      <button
        onClick={() => toggleDetails(null)}
        className="btn btn-secondary align-self-ceter"
      >
        Fechar
      </button>
    </div>
  );
}

export default ItemInfo;
