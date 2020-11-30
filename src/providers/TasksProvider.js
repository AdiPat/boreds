import React from "react";
import "firebase/database";
import TasksContext from "./TasksContext";
import { getTasks } from "../services/tasks";

class TasksProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: {},
      tasks: {},
      remount: false,
    };

    this.setSelectedTask = this.setSelectedTask.bind(this);
    this.clearSelectedTask = this.clearSelectedTask.bind(this);
    this.setTasks = this.setTasks.bind(this);
    this.forceProviderUpdate = this.forceProviderUpdate.bind(this);
    this.loadTasks = this.loadTasks.bind(this);
  }

  getSelectedTask() {
    return this.state.selectedTask;
  }

  setSelectedTask(taskId) {
    const tasks = this.state.tasks;
    const curTask = tasks[taskId];
    if (curTask) {
      this.setState({ selectedTask: curTask });
    }
  }

  clearSelectedTask() {
    this.setState({ selectedTask: {} });
  }

  setTasks(newTasks) {
    this.setState((prevState) => {
      const updatedState = Object.assign({}, prevState);
      updatedState.tasks = newTasks;
      return updatedState;
    });
  }

  forceProviderUpdate() {
    this.setState({ remount: !this.state.remount });
  }

  loadTasks() {
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

  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <TasksContext.Provider
        value={{
          state: this.state,
          setSelectedTask: this.setSelectedTask,
          clearSelectedTask: this.clearSelectedTask,
          setTasks: this.setTasks,
          loadTasks: this.loadTasks,
          forceProviderUpdate: this.forceProviderUpdate,
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}

export default TasksProvider;
