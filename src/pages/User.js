import React from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Form, FormGroup, Label, Col, Input, Alert } from 'reactstrap';
// import UserAddPopup from './UserAddPopup';

const API_URL = 'http://localhost:5000';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            users: [],
            modalShow: false,
            modalTitle: '',
            curId: '',
            curEmail: '',
            curPassword: '',
            curPasswordConfirm: '',
            curName: '',
            curCreatedAt: '',
            curWarningMessage: '',
        }
    }

    componentDidMount() {
        this.loadUsers();
    }
    
    loadUsers = () => {
        const url = `${API_URL}/users/`;
        axios.get(url).then(response => response.data)
        .then((data) => {
            this.setState({ users: data });
            console.log(this.state.users);
        })
    }
    
    handleModal = (id) => {
        console.log('handleModal');
        console.log('modalShow1:' + this.state.modalShow);
        this.setState(prevState => ({
            modalShow: !prevState.modalShow
        }));
        if (!id) {
            this.setState({
                modalTitle: 'Add User',
                curId: '',
                curEmail: '',
                curName: '',
                curPassword: '',
                curPasswordConfirm: '',
                curCreatedAt: '',
            });
        } else {
            for (const user of this.state.users){
                console.log('id:' + user.id);
                if (user.id === id){
                    this.setState({
                        modalTitle: 'Edit User',
                        curId: user.id,
                        curEmail: user.email,
                        curName: user.name,
                        curPassword: user.password,
                        curPasswordConfirm: user.password,
                        curCreatedAt: user.created_at
                    });        
                    break;
                }
            }
        }
        console.log('modalShow2:' + this.state.modalShow);
    }

    handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }    

    addEditUser = (id) => {
        
        if (!this.state.curEmail) {
            this.setState({
                curWarningMessage: 'Please input the Email.'
            });
            return;
        }
        if (!this.state.curName){
            this.setState({
                curWarningMessage: 'Please input the Name.'
            });
            return;
        }
        if (!this.state.curPassword){
            this.setState({
                curWarningMessage: 'Please input the Password.'
            });
            return;
        }
        if (this.state.curPassword !== this.state.curPasswordConfirm){
            this.setState({
                curWarningMessage: 'Please check the Password and Password Confirm.'
            });
            return;
        }

        if (this.state.modalTitle === 'Add User'){
            const url = `${API_URL}/users/`;
            axios.post(url, {
                email: this.state.curEmail,
                password: this.state.curPassword,
                name: this.state.curName
            }).then(response => {
                this.toggle();
                this.loadUsers();
            });
        } else {
            const url = `${API_URL}/users/${id}`;
            axios.put(url, {
                email: this.state.curEmail,
                password: this.state.curPassword,
                name: this.state.curName
            }).then(response => {
                this.toggle();
                this.loadUsers();
            });
        }

        
    }
    
    delUser = (id) => {
        const url = `${API_URL}/users/${id}`;
        axios.delete(url, {
            
        }).then(response => {
            this.toggle();
            this.loadUsers();
        });
    }

    toggle = () => {
        this.setState(prevState => ({
            modalShow: !prevState,
            curWarningMessage: ''
        }));
    }

    render() {
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => (
                            <tr key={user.id}>
                                <td>1</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <th>
                                    <Button onClick={ () => this.handleModal(user.id) }>Edit</Button>
                                    <Button onClick={ () => this.delUser(user.id) }>Del</Button>
                                </th>
                            </tr>
                        ))}                        
                    </tbody>
                </Table>
                <Button onClick={ ()=> this.handleModal() }>Add User</Button>
                
                <Modal isOpen={this.state.modalShow} toggle={ this.toggle } fade={false} className={this.props.className}                
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader toggle={this.toggle}>
                        {this.state.modalTitle}
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="curEmail" id="email" value={this.state.curEmail} onChange={this.handleChange} placeholder="Email address"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" name="curName" id="name" value={this.state.curName} onChange={this.handleChange} placeholder="Name" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input type="password" name="curPassword" id="password" value={this.state.curPassword} onChange={this.handleChange} placeholder="Password" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="passwordConfirm" sm={2}>Password Confirm</Label>
                                <Col sm={10}>
                                    <Input type="password" name="curPasswordConfirm" id="passwordConfirm" value={this.state.curPasswordConfirm} onChange={this.handleChange} placeholder="Password Confirm" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="warningMessage" sm={2}></Label>
                                <Col sm={10}>
                                    <Alert color="light" id="warningMessage">{this.state.curWarningMessage}</Alert>
                                </Col>
                                
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={ () => { this.addEditUser(this.state.curId) } }>{this.state.modalTitle}</Button>
                        <Button onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }        
}

export default User;