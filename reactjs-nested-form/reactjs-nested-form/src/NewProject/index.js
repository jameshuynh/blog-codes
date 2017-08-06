import React, { Component } from 'react';
import ProjectForm from '../ProjectForm';

class NewProject extends Component {
  render() {
    return (
      <div className="NewProject col-md-8 col-md-offset-2">
        <h2>New Project</h2>
        <ProjectForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default NewProject;
