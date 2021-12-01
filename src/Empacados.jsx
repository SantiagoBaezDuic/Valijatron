import { useEffect, useState } from "react";

export let ListaEmpacados = (props) => {
  const { data, update, setUpdate, searchPacked, packedItems } = props;
  const [buscar, setBuscar] = useState([]);

  //logica del cambio de estado (empacado/no empacado) al switchear el checkbox

  let cambiarValor = (id) => {
    data[id - 1].empacado
      ? (data[id - 1].empacado = false)
      : (data[id - 1].empacado = true);
  };

  const handleCheck = (e) => {
    cambiarValor(e.target.name);
    setUpdate(!update);
  };

  //logica de remover el item de la lista

  let remover = (e) => {
    let toSlice = data.findIndex((object) => {
      return object.nombre === e.target.id;
    });
    data.splice(toSlice, 1);
    setUpdate(!update);
  };

  //lógica de búsqueda

  useEffect(() => {
    let comparar = packedItems.filter((object) => {
      return (
        object.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchPacked
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          ) === true
      );
    });
    setBuscar(comparar);
  }, [searchPacked, packedItems]);

  return searchPacked === ""
    ? packedItems.map((object) => {
        return (
          <div key={object.nombre}>
            <div className="item-container">
              <label>
                <input
                  checked={object.empacado}
                  name={object.id}
                  onChange={handleCheck}
                  type="checkbox"
                  value={object.empacado}
                ></input>
                {object.nombre}
              </label>
              <span className="delete" id={object.nombre} onClick={remover}>
                Remover
              </span>
            </div>
          </div>
        );
      })
    : buscar.map((object) => {
        return (
          <>
            <div key={object.nombre} className="item-container">
              <label>
                <input
                  checked={object.empacado}
                  name={object.id}
                  onChange={handleCheck}
                  type="checkbox"
                  value={object.empacado}
                ></input>
                {object.nombre}
              </label>
              <span className="delete" id={object.id} onClick={remover}>
                Remover
              </span>
            </div>
          </>
        );
      });
};
