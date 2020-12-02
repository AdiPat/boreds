import React from "react";
import "firebase/database";
import TasksContext from "./TasksContext";
import { getTasks } from "../services/tasks";

class TasksProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {},
      remount: false,
      loaded: false,
      user: props.user,
    };
    this.setTasks = this.setTasks.bind(this);
    this.forceProviderUpdate = this.forceProviderUpdate.bind(this);
    this.loadTasks = this.loadTasks.bind(this);
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

  async loadTasks() {
    const thisComponent = this;
    // get tasks
    return getTasks().then((result) => {
      if (result.errorCode) {
        console.log(result.errorCode, result.msg);
        return { status: false };
      } else {
        thisComponent.setTasks(result.tasks);
        return { status: true };
      }
    });
  }

  componentDidMount() {
    console.log(
      "TaksProvider: componentDidMount()",
      this.state,
      this.props.user
    );
    if (this.state.user) {
      this.loadTasks();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setState({ user: this.props.user, loaded: true });
    }

    // forced remount , reload tasks
    if (prevState.remount !== this.state.remount) {
      this.loadTasks();
    }
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
