import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import { CircularLoader } from "../components/CircularLoader";
import { CreateBoardModal } from "../components/modals/CreateBoardModal";

function NoBoardAction() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  });

  return !isLoaded ? (
    <CircularLoader color="primary" loaderHeight="100px" />
  ) : (
    <Grid container style={{ marginLeft: "10px", padding: "20px" }}>
      <Grid item xs={12} sm={2} md={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1">You have no cards.</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenModal}
            >
              Create Board
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <CreateBoardModal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </Grid>
  );
}

export { NoBoardAction };
