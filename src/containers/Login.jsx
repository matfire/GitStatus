import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon} from 'mdbreact';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {BreedingRhombusSpinner} from 'react-epic-spinners'

class Login extends React.Component {

    state = {
        'legged':false,
        'token':'',
        loading:false
    }
    componentDidMount() {
        const code =
          window.location.href.split('code=') && window.location.href.split('code=')[1]
        if (code) {
            this.setState({loading:true})
          axios.get(`https://gitstatusgatekeeper.herokuapp.com/authenticate/${code}`).then(
            (res) => {
                localStorage.setItem("jwt", res.data.token)
              this.setState({logged:true, loading:false})
            }
          )
        }
      }
      render() {
        let CLIENT_ID = "f7c82f6fabd2f4056bc5"
        //let REDIRECT_URI = "http://10.109.249.157:3000/login"
        if (this.state.loading) {
            return (
                <MDBRow center className="mt-5 pt-5">
                    <BreedingRhombusSpinner color="red" size={200} />
                </MDBRow>
            )
        }
        if (this.state.logged) {
            return (
                <Redirect to="/" />
            )
        }
    return (
        <MDBContainer className="mt-5 pt-5">
        <MDBRow center>
            <MDBCol md="6">
            <MDBCard>
                <MDBCardBody className="mx-4">
                <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                    <strong>Sign in</strong>
                    </h3>
                </div>
                <div className="text-center mb-3">
                    <MDBBtn
                    social="git"
                    type="a"
                    href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20repo%20gist%20read:org`}
                    rounded>
                        <MDBIcon fab icon="github" className="pr-1" /> Github
                    </MDBBtn>
                </div>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )}
};

export default Login;