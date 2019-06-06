import React from 'react'
import {MDBContainer} from 'mdbreact'


class Layout extends React.Component {
    render() {
        return(
            <MDBContainer fluid>
                <MDBContainer fluid className="mt-5 pt-5">
                    {this.props.children}
                </MDBContainer>
            </MDBContainer>
        )
    }
}

export default Layout