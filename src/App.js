import { items } from "./data";
import { ListaEmpacados } from "./Empacados";
import { useEffect, useState } from "react";
import "./styles.css";
import ListaNoEmpacados from "./NoEmpacados";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [data, setData] = useState(items);
  const [update, setUpdate] = useState(false);
  const [searchPacked, setSearchPacked] = useState("");
  const [searchUnpacked, setSearchUnpacked] = useState("");
  const [packedItems, setPackedItems] = useState([]);
  const [unPackedItems, setUnPackedItems] = useState([]);

  // actualizacion de listas empacado y no empacado cuando se ingresa la data
  // y cuando se mueven items de una lista a la otra

  useEffect(() => {
    let packedItems = data.filter((object) => {
      return object.empacado === true;
    });

    setPackedItems(packedItems);

    let unPackedItems = data.filter((object) => {
      return object.empacado === false;
    });

    setUnPackedItems(unPackedItems);
  }, [data, update]);

  // captura del item a ingresar

  let captureNewItem = (e) => {
    setNewItem(e.target.value);
  };

  //ingreso del item nuevo a la data

  let pushNewItem = (e) => {
    e.preventDefault();

    newItem !== "" &&
      setData([
        ...data,
        {
          nombre: newItem,
          id: data.length + 1,
          empacado: false
        }
      ]);

    setNewItem("");
  };

  //manejo de estados de las barras de busqueda

  let handleSearchUnpacked = (e) => {
    setSearchUnpacked(e.target.value);
  };

  let handleSearchPacked = (e) => {
    setSearchPacked(e.target.value);
  };

  //logica del boton desempacar todos

  const unPackAll = () => {
    let desempacar = data.map((object) => {
      return object.empacado
        ? {
            nombre: object.nombre,
            id: object.id,
            empacado: false
          }
        : object;
    });
    setData(desempacar);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Valijatrón</h1>
        <div className="separador"></div>
        <form>
          <input
            className="push-input"
            value={newItem}
            onChange={captureNewItem}
            type="text"
          ></input>
          <button className="btn push-btn" onClick={pushNewItem}>
            ENVIAR
          </button>
        </form>
        <h2>No empacados ({unPackedItems.length})</h2>
        <input
          onChange={handleSearchUnpacked}
          type="text"
          className="text-input"
        ></input>
        <div className="list-container">
          <ListaNoEmpacados
            unPackedItems={unPackedItems}
            searchUnpacked={searchUnpacked}
            update={update}
            setUpdate={setUpdate}
            data={data}
            setData={setData}
          />
        </div>
        <h2>Empacados ({packedItems.length})</h2>
        <input
          onChange={handleSearchPacked}
          type="text"
          className="text-input"
        ></input>
        <div className="list-container">
          <ListaEmpacados
            packedItems={packedItems}
            searchPacked={searchPacked}
            update={update}
            setUpdate={setUpdate}
            data={data}
            setData={setData}
          />
        </div>
        <button onClick={unPackAll} className="btn unpack">
          Marcar todos como desempacados
        </button>
      </div>
    </div>
  );
}
