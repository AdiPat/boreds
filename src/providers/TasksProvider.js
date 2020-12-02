import React from "react";
import "firebase/database";
import TasksContext from "./TasksContext";
import { attachTasksListener, detachTasksListener } from "../services/tasks";

class TasksProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {},
      remount: false,
      loaded: false,
      user: props.user,
      tasksLoaded: false,
      tasksRef: null,
    };
    this.setTasks = this.setTasks.bind(this);
    this.forceProviderUpdate = this.forceProviderUpdate.bind(this);
  }

  setTasks(newTasks, tasksRef) {
    this.setState((prevState) => {
      const updatedState = Object.assign({}, prevState);
      updatedState.tasks = newTasks;
      updatedState.tasksRef = tasksRef;
      return updatedState;
    });
  }

  forceProviderUpdate() {
    this.setState({ remount: !this.state.remount });
  }

  componentDidMount() {
    const thisComponent = this;
    if (this.state.user) {
      attachTasksListener(this.state.user.uid, this.setTasks).then(() => {
        thisComponent.setState({ tasksLoaded: true });
      });
    }
  }

  componentWillUnmount() {
    if (this.state.tasksRef) {
      detachTasksListener(this.state.tasksRef);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const thisComponent = this;
    if (prevProps.user !== this.props.user) {
      this.setState({ user: this.props.user, loaded: true });
    }

    if (!prevState.tasksLoaded && this.state.user) {
      attachTasksListener(this.state.user.uid, this.setTasks).then(() => {
        thisComponent.setState({ tasksLoaded: true });
      });
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
