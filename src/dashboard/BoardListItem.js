import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

function BoardListItem(props) {
  return (
    <Grid item xs={2}>
      <Card style={{ margin: "10px", width: "200px", height: "100px" }}>
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
