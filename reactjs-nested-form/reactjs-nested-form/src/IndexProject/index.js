import React, { Component } from 'react';
import axiosClient from '../axiosClient';

class IndexProject extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };
  }

  componentWillMount() {
    axiosClient.get('/projects.json').then(response => {
      this.setState({ projects: response.data });
    });
  }

  render() {
    return (
      <div className="IndexProject col-md-12" style={{ marginTop: 10 }}>
        <div className="clearfix">
          <div className="pull-right">
            <button
              onClick={e => this.handleNewProject()}
              className="btn btn-success">
              New Project
            </button>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>
      </div>
    );
  }

  renderTableBody() {
    return this.state.projects.map(project => {
      return (
        <tr key={project.id}>
          <td>
            {project.id}
          </td>
          <td>
            {project.name}
          </td>
          <td>
            <button
              onClick={e => this.handleEdit(project.id)}
              className="btn btn-primary">
              Edit
            </button>
            &nbsp;
            <button
              onClick={e => this.handleRemove(project.id)}
              className="btn btn-danger">
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  handleNewProject() {
    this.props.history.push('/projects/new');
  }

  handleEdit(projectId) {
    this.props.history.push(`/projects/${projectId}/edit`);
  }

  handleRemove(projectId) {
    let projects = this.state.projects;
    projects = projects.filter(project => {
      return project.id !== projectId;
    });
    this.setState({ projects: projects });
    axiosClient.delete(`/projects/${projectId}`);
  }
}

export default IndexProject;
