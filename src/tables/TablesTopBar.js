import React from "react";
import PropTypes from "prop-types";
import { UploadCSVButton } from "./buttons/UploadCSVButton";

function TablesTopBar({ userId }) {
  return (
    <React.Fragment>
      <UploadCSVButton />
    </React.Fragment>
  );
}

TablesTopBar.propTypes = {
  userId: PropTypes.string.isRequired,
};

TablesTopBar.defaultProps = {
  userId: undefined,
};

export { TablesTopBar };
