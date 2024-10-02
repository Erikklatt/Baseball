import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../app/styles/styles.css";

const PitchTable = ({ rowData, selectedPitchId }) => {
  const columnDefs = [
    { headerName: "Batter Name", field: "batter_name" },
    { headerName: "Batter Stance", field: "batter_stance" },
    { headerName: "Batter Position", field: "batter_position" },
    { headerName: "Batter Birth Date", field: "batter_birth_date" },
    { headerName: "Is Swing", field: "is_swing" },
    { headerName: "Is Contact", field: "is_contact" },
    { headerName: "Is In Play", field: "is_in_play" },
    { headerName: "Is Strike", field: "is_strike" },
    { headerName: "Play Result", field: "play_result" },
    { headerName: "Pitch Type", field: "pitch_type" },
    { headerName: "Velocity", field: "velocity" },
    { headerName: "Spin Rate", field: "spin_rate" },
  ];
  console.log("rowData", rowData);
  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        rowClassRules={{
          "highlight-row": (params) => {
            console.log("Row Pitch ID:", params.data.pitcher_id);
            console.log("Selected Pitch ID:", selectedPitchId);
            return params.data.pitch_id === selectedPitchId;
          },
        }}
      />
    </div>
  );
};

export default PitchTable;
