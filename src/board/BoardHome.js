import { DashDrawer } from "../components/DashDrawer";
import { BoardContent } from "./BoardContent";

function BoardHome(props) {
  return (
    <div>
      <DashDrawer />
      <BoardContent boardId={props.boardId} />
    </div>
  );
}

export { BoardHome };
