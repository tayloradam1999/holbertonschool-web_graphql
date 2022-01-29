import { Component } from 'react';
import graphql from 'graphql-tag';
import TaskDetails from './TaskDetails';
// query that takes id and title of all tasks and returns them
import { getTasksQuery } from '../queries/queries';


class TaskList extends Component {
	// constructor to default state to null
	constructor(props) {
		super(props);
		this.state = {
			selectedTask: null
		};
	}

	// takes data from query and maps it to a return of li tags
	displayTasks() {
		var data = this.props.data;
		if (data.loading) {
			return (
				<div>Loading tasks...</div>
			);
		} else {
			return data.tasks.map(task => {
				return (
					<li key={ task.id } onClick={
						// if no error, set list item to selectedTask
						(e) => { this.setState({ selectedTask: task.id })}}>{ task.title }</li>
				);
			})
		}
	}

	// handles rendering of tasks from displayTasks function
	render() {
		return(
			<div>
				<ul id="task-list">
					{ this.displaTasks() }
				</ul>
				<TaskDetails taskId={ this.state.selectedTask }/>
			</div>
		);
	}
}

// bind query to component to access data that comes from query
// modify to be like following prototype:
// export default graphql(the query name)(the component name);
export default graphql(getTasksQuery)(TaskList);