import React, { useContext } from "react";
import { TablesContext } from "../../providers/TablesContext";
import { csvToJson } from "../../utils/utils";

function UploadCSVButton() {
  const { setCurTable } = useContext(TablesContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (evt) => {
      const csvText = evt.target.result;
      const { headers, data } = csvToJson(csvText);
      setCurTable(headers, data);
    };

    reader.readAsText(file);
  };

  const handleClick = (event) => {
    event.target.value = null;
  };

  return (
    <div style={{ marginLeft: "auto" }}>
      <input
        multiple
        accept=".csv"
        type="file"
        onChange={handleFileChange}
        onClick={handleClick}
      />
    </div>
  );
}

export { UploadCSVButton };
