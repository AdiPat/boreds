import { useContext } from "react";
import { TablesContext } from "../providers/TablesContext";

function TableGrid() {
  const { curTable } = useContext(TablesContext);
  return (
    <div style={{ width: "100%" }}>
      <p>{JSON.stringify(curTable.headers)}</p>
      <p>{JSON.stringify(curTable.data)}</p>
    </div>
  );
}

export { TableGrid };
