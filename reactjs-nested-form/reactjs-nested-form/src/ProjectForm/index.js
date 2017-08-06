import React, { Component } from 'react';
import axiosClient from '../axiosClient';
import './Index.css';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.emptyTask = {
      title: '',
      id: null,
      errors: {},
      _destroy: false
    };

    this.state = {
      project: {
        name: '',
        errors: {},
        tasks_attributes: [Object.assign({}, this.emptyTask)]
      }
    };
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      axiosClient
        .get(`/projects/${this.props.match.params.id}`)
        .then(response => {
          this.setState({ project: response.data });
        });
    }
  }

  render() {
    return (
      <div className="ProjectForm">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={e => this.handleProjectNameChange(e)}
              value={this.state.project.name}
              className="form-control"
            />
            {this.renderProjectNameInlineError()}
          </div>
          <hr />
          <div className="tasks-fieldset">
            <h3>Tasks</h3>
            {this.renderTasksForm()}
            <button
              className="btn btn-success"
              onClick={e => this.handleAddTask()}>
              + Add Task
            </button>
          </div>
          <br />
          <button
            onClick={e => this.handleFormSubmit()}
            className="btn btn-primary">
            Save
          </button>
          &nbsp;
          <button
            onClick={e => this.handleCancel()}
            className="btn btn-default">
            Cancel
          </button>{' '}
        </form>
      </div>
    );
  }

  handleCancel() {
    this.props.history.push('/projects');
  }

  handleFormSubmit() {
    let submitMethod = this.state.project.id ? 'patch' : 'post';
    let url = this.state.project.id
      ? `/projects/${this.state.project.id}.json`
      : '/projects.json';

    axiosClient
      [submitMethod](url, {
        project: this.state.project
      })
      .then(response => {
        this.props.history.push('/projects');
      })
      .catch(error => {
        this.setState({ project: error.response.data }, () => {
          console.log(this.state.project);
        });
      });
  }

  handleAddTask() {
    this.state.project.tasks_attributes.push(Object.assign({}, this.emptyTask));
    this.setState({ project: this.state.project });
  }

  renderTasksForm() {
    let counter = 0;
    return this.state.project.tasks_attributes.map((task, index) => {
      if (task._destroy === false) {
        let taskDOM = (
          <div className="task-form" key={index}>
            <div className="form-group">
              <div className="clearfix" style={{ marginBottom: 5 }}>
                <label>
                  Task {counter + 1}
                </label>
                <button
                  className="btn btn-danger"
                  style={{ padding: '5px 10px', float: 'right' }}
                  onClick={e => this.handleRemoveTask(task)}>
                  X
                </button>
              </div>
              <input
                placeholder="Title"
                onChange={event => this.onTaskTitleChange(event, task)}
                type="text"
                value={task.title}
                className="form-control"
              />
              {this.renderTaskInlineError(task)}
            </div>
          </div>
        );
        counter++;

        return taskDOM;
      } else {
        return null;
      }
    });
  }

  renderTaskInlineError(task) {
    if (task.errors.title) {
      return (
        <div className="inline-error alert alert-danger">
          {task.errors.title.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  renderProjectNameInlineError() {
    if (this.state.project.errors.name) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.project.errors.name.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  onTaskTitleChange(event, task) {
    task.title = event.target.value;
    this.setState({ project: this.state.project });
  }

  handleRemoveTask(task) {
    task._destroy = true;
    this.setState({ project: this.state.project });
  }

  handleProjectNameChange(e) {
    let project = this.state.project;
    project.name = e.target.value;
    this.setState({ project: this.state.project });
  }
}

export default ProjectForm;
