import { Component } from 'react';
import { graphql } from 'react-apollo';
import { getTaskQuery } from '../queries/queries';

class TaskDetails extends Component {
    render() {
        return(
            <div>
                <div id='task-details'>

                </div>
            </div>
        );
    }
}
export default graphql(getTaskQuery, {
    options:(props) => {
        return {
            variables: {
                id: props.taskId
            }
        }
    }
})(TaskDetails);

