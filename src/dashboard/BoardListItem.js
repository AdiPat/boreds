import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

function BoardListItem(props) {
  return (
    <Grid item xs={12} sm={4} md={2}>
      <Card
        onClick={props.clickHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          width: "150px",
          height: "100px",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{props.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export { BoardListItem };
