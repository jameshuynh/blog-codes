class ProjectsController < ApplicationController
  def index
    json = Project.all.map do |project|
      {
        id: project.id,
        name: project.name
      }
    end

    render json: json
  end

  def show
    project = Project.find(params[:id])
    render json: project_json(project)
  end

  def create
    project = Project.new(project_params)
    result = project.save
    render json: project_json(project), status: result ? 200 : 422
  end

  def update
    project = Project.find(params[:id])
    project.attributes = project_params
    result = project.save
    render json: project_json(project), status: result ? 200 : 422
  end

  def destroy
    project = Project.find(params[:id])
    project.destroy
    render json: { result: :ok }
  end

  private

  def project_json(project)
    {
      id: project.id,
      name: project.name,
      errors: project.errors,
      tasks_attributes: project.tasks.map do |task|
        {
          id: task.id,
          title: task.title,
          errors: task.errors,
          _destroy: task._destroy
        }
      end
    }
  end

  def project_params
    params
      .require(:project)
      .permit(:name, tasks_attributes: %I[title _destroy id])
  end
end
