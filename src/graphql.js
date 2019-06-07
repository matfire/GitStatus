import ApolloClient, { gql } from 'apollo-boost';

let client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: operation => {
        operation.setContext({
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
    }
  });

let GET_ORGS = gql`
    {
        viewer {
            name
                organizations(last: 6) {
                nodes {
                name
                id
                url
                }
            }
        }
    }
`

let GET_REPOS = gql`
    {
        viewer {
            name
            repositories(last:100) {
                nodes {
                    name
                    id
                    url
                    languages(last:100) {
                        nodes {
                            name
                            id
                        }
                    }
                }
            }
        }
    }
`

let GET_OPEN_ISSUES = gql`
    {
        viewer {
            issues(states:OPEN, last:100) {
          nodes {
            author {
              login
              url
            }
            repository {
              name
              id
            }
            id
            title
          }
        }
      }
    }
`

let GET_PULL_REQUESTS = gql`
    {
        viewer {
            pullRequests(last:100) {
          nodes {
            id
            url
            title
            repository {
              name
              id
              url
            }
            publishedAt
            headRepositoryOwner {
              login
              id
            }
          }
        }
        }
    }
`

let GET_CONTRIBS = gql`
{
        viewer {
            repositoriesContributedTo(last:100) {
                nodes {
                    id
                    url
                    name
                    owner {
                        login
                    }
                    languages(last:100) {
                        nodes {
                            name
                            id
                        }
                    }
                }
            }
        }
}
`
export {client, GET_ORGS, GET_REPOS, GET_OPEN_ISSUES, GET_PULL_REQUESTS, GET_CONTRIBS}