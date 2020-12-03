import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ListAltIcon from "@material-ui/icons/ListAlt";

function SelectTaskMenuHeader(props) {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(1),
      }}
    >
      <ListAltIcon style={{ marginRight: theme.spacing(1) }} />
      <Typography variant="body1">
        <strong>{props.title}</strong>
      </Typography>
    </div>
  );
}

SelectTaskMenuHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export { SelectTaskMenuHeader };
