import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import AddProject from './components/AddProject';

// Apollo client setup
const client = new ApolloClient({
	  uri: 'http://localhost:4000/graphql',
});

// App component, returns ApolloProvider with client before first div tag
function App() {
  return (
	  // ApolloProvider is a component that provides the client all of the components in the app
	<ApolloProvider client={client}>
		<div id="main">
			<div id="bg">
			</div>
			<h1>Holberton school tasks</h1>
			<TaskList />
			<AddProject />
			<AddTask />
		</div>
	</ApolloProvider>
	);
}

export default App;
