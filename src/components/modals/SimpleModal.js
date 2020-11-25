/**
 *
 * General modal component
 *
 */
import { React } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Fade, Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
}));

function SimpleModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openModal}
        onClose={props.handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>{props.children}</div>
        </Fade>
      </Modal>
    </div>
  );
}

SimpleModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

SimpleModal.defaultProps = {
  openModal: false,
};

export { SimpleModal };
