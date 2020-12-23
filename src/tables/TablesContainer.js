import React from "react";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { TablesContent } from "./TablesContent";
import { TablesProvider } from "../providers/TablesProvider";

function TablesContainer({ user }) {
  const userId = user.uid;

  return (
    <TablesProvider userId={userId}>
      <React.Fragment>
        <AppDrawer dashTitle="Tables" userId={userId} />
        <TablesContent />
      </React.Fragment>
    </TablesProvider>
  );
}

TablesContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

export { TablesContainer };
