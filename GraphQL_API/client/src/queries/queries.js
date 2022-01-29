import { gql } from 'apollo-boost';


const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`

const getTasksQuery = gql`
  {
    tasks {
      id
      title
      weight
      description
      projectId
    }
  }
`

export { getProjectsQuery, getTasksQuery };