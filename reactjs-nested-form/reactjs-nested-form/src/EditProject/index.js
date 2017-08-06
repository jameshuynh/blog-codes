import React, { Component } from 'react';
import ProjectForm from '../ProjectForm';

class EditProject extends Component {
  render() {
    return (
      <div className="EditProject col-md-8 col-md-offset-2">
        <h2>Edit Project</h2>
        <ProjectForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default EditProject;
