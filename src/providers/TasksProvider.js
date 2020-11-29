import React from "react";
import "firebase/database";
import TasksContext from "./TasksContext";
import { getTasks } from "../services/tasks";

class TasksProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: null,
      tasks: {},
    };

    this.setSelectedTask = this.setSelectedTask.bind(this);
    this.setTasks = this.setTasks.bind(this);
    this.forceProviderUpdate = this.forceProviderUpdate.bind(this);
  }

  setSelectedTask(taskId) {
    this.setState({ selectedTask: taskId });
  }

  setTasks(newTasks) {
    this.setState((prevState) => {
      const updatedState = Object.assign({}, prevState);
      updatedState.tasks = newTasks;
      return updatedState;
    });
  }

  forceProviderUpdate() {
    this.forceUpdate();
  }

  componentDidMount() {
    const thisComponent = this;
    // get tasks
    getTasks().then((result) => {
      if (result.errorCode) {
        console.log(result.errorCode, result.msg);
      } else {
        thisComponent.setTasks(result.tasks);
      }
    });
  }

  render() {
    return (
      <TasksContext.Provider
        value={{
          state: this.state,
          setSelectedTask: this.setSelectedTask,
          setTasks: this.setTasks,
          forceProviderUpdate: this.forceProviderUpdate,
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}

export default TasksProvider;
