import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';
// import UserAddPopup from './UserAddPopup';

const API_URL = 'http://localhost:5000';

class User extends Component {
    constructor(props) {
        super(props);
        this.state= {
            users: [],
            addModalShow: false
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.isOpen = this.isOpen.bind(this);
    }

    componentDidMount() {
        const url = `${API_URL}/users/`;
        axios.get(url).then(response => response.data)
        .then((data) => {
            this.setState({ users: data });
            console.log(this.state.users);
        })
    }
    
    
    showModal = () => {
        //setIsOpen(true);
    }

    hideModal = () => {
        //setIsOpen(false);
    }

    isOpen() {

    }

    render() {
        let addModalClose =() => this.setState({addModalShow: false});

        return (
            <div>
                <h3>User Management</h3>
                
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => (
                            <tr>
                                <td>1</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <th><Button>Edit</Button><Button>Del</Button></th>
                            </tr>
                        ))}                        
                    </tbody>
                </Table>
                <Button onClick={()=> this.setState({addModalShow: true})}>Add User</Button>
                {/* <UserAddPopup
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                /> */}
                <Modal isOpen={this.state.addModalShow} fade={false} 
                
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <ModalHeader closeButton>
                        {/* <Modal.Title id="contained-modal-title-vcenter">
                            User Add
                        </Modal.Title> */}
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="email" placeholder="Email address" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" name="name" id="name" placeholder="Name" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input type="password" name="password" id="password" placeholder="Password" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="passwordConfirm" sm={2}>Password Confirm</Label>
                                <Col sm={10}>
                                    <Input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Password Confirm" />
                                </Col>
                            </FormGroup>
        
                            <Button>Submit</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={addModalClose}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }        
}

export default User;