import { List, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { TasksActivityListItem } from "./TasksActivityListItem";

const DUMMY_DATA = {
  activities: {
    0: { id: 0, text: "Workout at 12pm" },
    1: { id: 1, text: "Write assignment." },
    2: {
      id: 2,
      text:
        "Read Machine Learning book and then go to sleep before waking up the next day.",
    },
    3: {
      id: 3,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis tristique sollicitudin nibh sit amet commodo. Tellus molestie nunc non blandit massa enim nec dui nunc. Sed augue lacus viverra vitae congue eu. Cras semper auctor neque vitae tempus quam pellentesque nec nam. Et magnis dis parturient montes nascetur ridiculus. Blandit libero volutpat sed cras ornare arcu dui vivamus arcu. Consequat nisl vel pretium lectus quam id leo in. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Pellentesque habitant morbi tristique senectus et netus. Pretium quam vulputate dignissim suspendisse in est ante. Pellentesque elit ullamcorper dignissim cras tincidunt. Non blandit massa enim nec. Consequat interdum varius sit amet mattis vulputate enim. Purus ut faucibus pulvinar elementum integer enim neque volutpat. Egestas integer eget aliquet nibh. Tellus molestie nunc non blandit.",
    },
  },
};

function TasksActivityList(props) {
  const theme = useTheme();

  const renderList = () => {
    let listJsx = [];
    listJsx = Object.keys(DUMMY_DATA.activities).map((activityId) => (
      <TasksActivityListItem
        activityId={activityId}
        text={DUMMY_DATA.activities[activityId].text}
      />
    ));
    return listJsx;
  };

  return (
    <Grid container style={{ padding: theme.spacing(0, 2) }}>
      <Grid item xs={12}>
        <List>{renderList()}</List>
      </Grid>
    </Grid>
  );
}

export { TasksActivityList };
