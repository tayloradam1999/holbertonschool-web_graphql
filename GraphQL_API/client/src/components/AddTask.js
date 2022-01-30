// import {
// 	useState,
// 	//useEffect
// } from "react";
import { graphql } from 'react-apollo';
// import { render } from "react-dom";
import { Component } from "react";
import { flowRight as compose } from 'lodash';
// query that gets all project id and titles
import { getProjectsQuery } from '../queries/queries';


//   const handleChange = (e) => {
//     const newInputs = {
//       ...inputs
//     };
//     newInputs[e.target.name] = e.target.value
//     setInputs(newInputs)
//   }

class AddTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			weight: 0,
			description: "",
			projectId: ""
		}
	};

	displayProjects() {
		var data = this.props.data;
		if (data.loading) {
			return (
				<option> Loading projects... </option>
			);
		} else {
			return data.projects.map(project => {
				return ( <option key = {
					project.id
				}
				value = {
					project.id
				} > {
					project.title
				} </option>);
			});
		}
	}

	submitForm(e) {
		e.preventDefault();
	}

	render() {
		return (
			<form className="task" id="add-task" onSubmit={this.submitForm.bind(this)}>
				<div className="field">
					<label> Task title: </label>
					<input type="text" name="title" onChange={(e) => this.setState({ title: e.target.value })} required />
				</div>
				<div className="field">
					<label> Weight: </label>
					<input type="number" name="weight" onChange={(e) => this.setState({ weight: Number(e.target.value) })} required />
				</div>
				<div className="field">
					<label> description: </label>
					<textarea name="description" onChange={(e) => this.setState({ description: e.target.value })} required />
				</div>
				<div className="field">
					<label> Project: </label>
					<select name="projectId" defaultValue="" onChange={(e) => this.setState({ projectId: e.target.value })} required>
						<option value="" disabled="disabled"> Select project </option>
						{this.displayProjects()}
					</select>
				</div>
				<button> + </button>
			</form>
		);
	}
}

export default compose(
	graphql(getProjectsQuery, { name: "getProjectsQuery" })
)(AddTask);
