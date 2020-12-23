import { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { TablesContext } from "../providers/TablesContext";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const useStyles = makeStyles((theme) => ({
  agGridContainer: {
    "&:first-child": {
      height: "100vh !important",
    },
  },
}));

function TableGrid() {
  const classes = useStyles();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const { curTable } = useContext(TablesContext);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  useEffect(() => {
    console.log("useEffect: ", gridApi, gridColumnApi, curTable);
    if (gridApi) {
      gridApi.setRowData(curTable.data);
    }
  }, [curTable]);

  const handleCellValueChanged = (params) => {
    console.log("cellValueChanged(): ", params);
  };

  const renderColumns = () => {
    let colJsx = curTable.headers.map((header) => (
      <AgGridColumn
        field={header}
        resizable
        editable
        onCellValueChanged={handleCellValueChanged}
        sortable
      ></AgGridColumn>
    ));

    if (curTable.headers.length) {
      colJsx.unshift(
        <AgGridColumn
          headerName="#"
          valueGetter={(params) => params.node.rowIndex}
          checkboxSelection
        ></AgGridColumn>
      );
    }

    return colJsx;
  };

  return (
    <div
      className={clsx("ag-theme-alpine", classes.agGridContainer)}
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <AgGridReact
        onGridReady={onGridReady}
        rowData={curTable.data}
        undoRedoCellEditing
        undoRedoCellEditingLimit={50}
        rowSelection="multiple"
      >
        {renderColumns()}
      </AgGridReact>
    </div>
  );
}

export { TableGrid };
