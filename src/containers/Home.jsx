import React from 'react'
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardText, MDBCardHeader, MDBCardBody, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Layout from './Layout';
import {BreedingRhombusSpinner} from 'react-epic-spinners'



let graphs = require("../graphql")


class Home extends React.Component {
    state = {
        projets: [],
        open_issues:[],
        pull_requests:[],
        contribs:[],
        loading:true
    }
    componentDidMount() {
        console.log("retrieving data")
        graphs.client.query({
            query:graphs.GET_REPOS
        }).then(data => {
            this.setState({
                projets:data.data.viewer.repositories.nodes
            })
            graphs.client.query({
                query:graphs.GET_OPEN_ISSUES
            }).then(data => {
                this.setState({
                    open_issues:data.data.viewer.issues.nodes
                })
                graphs.client.query({
                    query:graphs.GET_PULL_REQUESTS
                }).then(data => {
                    this.setState({
                        pull_requests:data.data.viewer.pullRequests.nodes,
                    })
                    graphs.client.query({
                        query:graphs.GET_CONTRIBS
                    }).then(data => {
                        this.setState({
                            contribs:data.data.viewer.repositoriesContributedTo.nodes,
                            loading:false
                        })
                    })
                }).catch(err => {
                    
                })
            }).catch(err => {
    
            })
        }).catch(err => {

        })


    }
    render() {
        let projects_rows = []
        let projects = this.state.projets.reverse()
        for (let i = 0; i < 6; i++) {
            if (!projects[i])
                break
            let language_string = ""
            projects[i].languages["nodes"].map((language) => {
                language_string += language.name + " "
                return language_string
            })
            projects_rows.push({
                name: projects[i].name,
                languages: language_string,
                info: <MDBBtn color="secondary" href={projects[i].url} target="_blank">More Info</MDBBtn>
            })
        }
        let contribs = this.state.contribs.reverse()
        let contribs_rows = []
        for (let i = 0; i < 6; i++) {
            if (!contribs[i])
                break
            let language_string = ""
            contribs[i].languages["nodes"].map((language) => {
                language_string += language.name + " "
                return language_string
            })
            contribs_rows.push({
                name:contribs[i].name,
                author:contribs[i].owner.login,
                languages: language_string,
                info: <MDBBtn color="secondary" href={contribs[i].url} target="_blank">More Info</MDBBtn>
            })
        }
        let data_contribs = {
            columns: [
                {
                    label:'Name',
                    field:'name',
                    order:'asc'
                },
                {
                    label:'Author',
                    field:'author',
                    order:'asc'
                },
                {
                    label:'Languages',
                    field:'languages',
                    order:'asc'
                },
                {
                    label:'#',
                    field:'info',
                    order:'asc'
                }
            ],
            rows:contribs_rows
        }
        // let rows = this.state.projets.map((project) => {
        //     let language_string = ""
        //     project.languages["nodes"].map(language => {
        //         language_string += language.name + " "
        //     })
        //     return(
        //     {
        //         name: project.name,
        //         languages: language_string
        //     })
        // })
        let project_data = {
            columns: [
                {
                    label:'Name',
                    field:'name',
                    order:'asc',
                },
                {
                    label:'Languages',
                    field:'languages',
                    order:'asc'
                },
                {
                    label:"#",
                    field:'info',
                    order:'asc'
                }
            ],
            rows: projects_rows
        }
        if (this.state.loading) {
            return(
            <Layout>
                <MDBRow center>
                    <BreedingRhombusSpinner color="red" size={200} />
                </MDBRow>
            </Layout>
            )
        }
        return(
            <Layout>
            <MDBRow>
                <MDBCol md="4">
                    <MDBCard className="text-center">
                        <MDBCardHeader color="success-color">Projects</MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardText>
                                {this.state.projets.length}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard className="text-center">
                        <MDBCardHeader color="warning-color">Open Issues</MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardText>
                                {this.state.open_issues.length}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard className="text-center">
                        <MDBCardHeader color="secondary-color">Pull Requests</MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardText>
                                {this.state.pull_requests.length}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-5 pt-2">
                <MDBCol md="6">
                    <MDBCard className="text-center">
                        <MDBCardHeader>Latest projects</MDBCardHeader>
                        <MDBCardBody>
                            <MDBTable>
                                <MDBTableHead columns={project_data.columns} />
                                <MDBTableBody rows={project_data.rows} />
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                    <MDBCard className="text-center">
                        <MDBCardHeader>Latest contributions</MDBCardHeader>
                        <MDBCardBody>
                            <MDBTable>
                                <MDBTableHead columns={data_contribs.columns} />
                                <MDBTableBody rows={data_contribs.rows} />
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            </Layout>
        )
    }
}

export default Home