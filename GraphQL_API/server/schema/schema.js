// Get your imports! Get your hot, steamy imports here!
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLList
} = require('graphql');
const Project = require('../models/project');
const Task = require('../models/task');
const lodash = require('lodash');
const { resolve } = require('path/posix');

// dummy data for tasks object -- commented out to pull data from db (db still empty)
// const tasks = [
// 	{
// 		id: '1',
// 		title: 'Create your first webpage',
// 		weight: 1,
// 		description: `Create your first HTML file 0-index.html with: -Add the doctype on
// 		the first line (without any comment) -After the doctype, open and close a html tag
// 		Open your file in your browser (the page should be blank)`,
// 		projectId: '1'
// 	},
// 	{
// 		id: '2',
// 		title: 'Structure your webpage',
// 		weight: 1,
// 		description: `Copy the content of 0-index.html into 1-index.html
// 		Create the head and body sections inside the html tag,
// 		create the head and body tags (empty) in this order`,
// 		projectId: '1'
// 	}
// ];

// dummy data for projects object -- commented out to pull data from db (db still empty)
// const projects = [
// 	{
// 		id: '1',
// 		title: 'Advanced HTML',
// 		weight: 1,
// 		description: `Welcome to the Web Stack specialization. The 3 first projects will
// 		give you all basics of the Web development: HTML, CSS and Developer tools. In this project,
// 		you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry,
// 		the final page will be “ugly” it’s normal, it’s not the purpose of this project.
// 		Important note: details are important! lowercase vs uppercase / wrong letter… be careful!`
// 	},
// 	{
// 		id: '2',
// 		title: 'Bootstrap',
// 		weight: 1,
// 		description: `Bootstrap is a free and open-source CSS framework directed at responsive,
// 		mobile-first front-end web development. It contains CSS and JavaScript design templates
// 		for typography, forms, buttons, navigation, and other interface components.`
// 	}
// ];

// Root Query to define the type of data that we can query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		// two fields: tasks and projects
		task: {
			type: TaskType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// returns a single task
				// return lodash.find(tasks, { id: args.id });
				return Task.findById(id);
			}
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// returns a single project
				// return lodash.find(projects, { id: args.id });
				return Project.findById(args.id);
			}
		},
		tasks: {
			type: new GraphQLList(TaskType),
			resolve(parent, args) {
				// returns all tasks
				// return tasks;
					return Task.find({});
			}
		},
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				// returns all projects
				// return projects;
				return Project.find({});
			}
		}
	})
});

// Task Type object with name and fields: id, title, weight, description
const TaskType = new GraphQLObjectType({
	name: 'Task',
	fields: () => ({
		id: { type: GraphQLID },
		projectId: { type: GraphQLID },
		title: { type: GraphQLString },
		weight: { type: GraphQLInt },
		description: { type: GraphQLString },
		project: {
			type: TaskType,
			resolve(parent, args) {
				// finds the project with the same id as the task
				// return lodash.find(projects, { id: parent.projectId });
				return Project.findById(parent.projectId);
			}
		}
	})
});

 // Each task has a project, so we need to define a relation between the two
 // A project can have 0 to multiple tasks

// Project Type object with name and fields: id, title, weight, description
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		weight: { type: GraphQLInt },
		description: { type: GraphQLString },
		tasks: {
			type: new GraphQLList(TaskType),
			resolve(parent, args) {
				// filters through tasks array and returns only tasks with the same projectId
				//  return lodash.filter(tasks, { projectId: parent.id });
				return Task.find({ projectId: parent.id });
			}
		} 
	})
});

// Mutation Type object with name and fields: createTask, createProject
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		addProject: {
			type: ProjectType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				weight: { type: new GraphQLNonNull(GraphQLInt) },
				description: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				// make new project, save in db and return results
				let prj = new Project({
					title: args.title,
					weight: args.weight,
					description: args.description,
				});
				return prj.save();
			}
		},
		addTask: {
			type: TaskType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				weight: { type: new GraphQLNonNull(GraphQLInt) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				projectId: {type: GraphQLNonNull(GraphQLID)}
			},
			resolve: (parent, args) => {
				// make new task, save in db and return results
				const tasker = new Task({
					title: args.title,
					weight: args.weight,
					description: args.description,
					projectId: args.projectId
				});
				return tasker.save();
			},
		},
	})
});

// export schema based on RootQuery and Mutation
const schema = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});

module.exports = schema;
