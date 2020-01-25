import React from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Col, Input, Alert } from 'reactstrap';

const API_URL = 'http://localhost:5000';

class Contents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [],
            modalShow: false,
            modalTitle: '',
            curId: '',
            curTitle: '',
            curType: '',
            curContents: '',
            curImageUrl: '',
            curUserId: '',
            curCreatedAt: '',
            curWarningMessage: ''
        }
    }

    componentDidMount() {
        this.loadContents();
    }

    loadContents = () => {
        const url = `${API_URL}/contents/`;
        axios.get(url).then(response => response.data)
        .then((data) => {
            this.setState({ contents: data });
            console.log('loadedContents:' + this.state.contents);
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
                modalTitle: 'Add Contents',
                curId: '',
                curTitle: '',
                curType: '',
                curContents: '',
                curImageUrl: '',
                curUserId: '',
                curCreatedAt: ''
            });
        } else {
            for (const content of this.state.contents){
                console.log('id:' + content._id);
                if (content._id === id){
                    this.setState({
                        modalTitle: 'Edit Content',
                        curId: content._id,
                        curTitle: content.title,
                        curType: content.type,
                        curContents: content.contents,
                        curImageUrl: content.image_url,
                        curUserId: content.user_id,
                        curCreatedAt: content.created_at
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

    addEditContent = (id) => {
        
        if (!this.state.curTitle) {
            this.setState({
                curWarningMessage: 'Please input the Title.'
            });
            return;
        }
        if (!this.state.curType){
            this.setState({
                curWarningMessage: 'Please input the Type.'
            });
            return;
        }
        if (!this.state.curContents){
            this.setState({
                curWarningMessage: 'Please input the Contents.'
            });
            return;
        }
        if (!this.state.curImageUrl){
            this.setState({
                curWarningMessage: 'Please input the Image URL.'
            });
            return;
        }
        if (!this.state.curUserId){
            this.setState({
                curWarningMessage: 'Please select the User ID.'
            });
            return;
        }
        

        if (this.state.modalTitle === 'Add Contents'){
            const url = `${API_URL}/contents/`;
            axios.post(url, {
                title: this.state.curTitle,
                type: this.state.curType,
                contents: this.state.curContents,
                image_url: this.state.curImageUrl,
                user_id: this.state.curUserId
            }).then(response => {
                this.toggle();
                this.loadContents();
            });
        } else {
            const url = `${API_URL}/contents/${id}`;
            axios.put(url, {
                title: this.state.curTitle,
                type: this.state.curType,
                contents: this.state.curContents,
                image_url: this.state.curImageUrl,
                user_id: this.state.curUserId
            }).then(response => {
                this.toggle();
                this.loadContents();
            });
        }
    }

    

    delContent = (id) => {
        const url = `${API_URL}/contents/${id}`;
        axios.delete(url, {
            
        }).then(response => {
            this.toggle();
            this.loadContents();
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
                <h3>Contents Management</h3>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Contents</th>
                            <th>Image URL</th>
                            <th>User ID</th>
                            <th>Create At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contents.map((content) => (
                            <tr key={content._id}>
                                <td>1</td>
                                <td>{content.title}</td>
                                <td>{content.type}</td>
                                <td>{content.contents}</td>
                                <td>{content.image_url}</td>
                                <td>{content.user_id}</td>
                                <td>{content.created_at}</td>
                                <td>
                                    <Button onClick= { () => this.handleModal(content._id) }>Edit</Button>
                                    <Button onClick= { () => this.delContent(content._id) }>Del</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button onClick={ () => this.handleModal() }>Add Content</Button>

                <Modal isOpen={this.state.modalShow} toggle={this.toggle} fade={false} className={this.props.className}
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
                                <Label for="title" sm={2}>Title</Label>
                                <Col sm={10}>
                                    <Input type="text" name="curTitle" id="title" value={this.state.curTitle} onChange={this.handleChange} placeholder="Title" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="type" sm={2}>Type</Label>
                                <Col sm={10}>
                                    <Input type="text" name="curType" id="type" value={this.state.curType} onChange={this.handleChange} placeholder="Type" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="contents" sm={2}>Contents</Label>
                                <Col sm={10}>
                                    <Input type="text" name="curContents" id="contents" value={this.state.curContents} onChange={this.handleChange} placeholder="Contents" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="imageUrl" sm={2}>Image URL</Label>
                                <Col sm={10}>
                                    <Input type="text" name="curImageUrl" id="imageUrl" value={this.state.curImageUrl} onChange={this.handleChange} placeholder="Image URL" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="userId" sm={2}>User ID</Label>
                                <Col sm={10}>
                                    <Input type="text" name="curUserId" id="userId" value={this.state.curUserId} onChange={this.handleChange} placeholder="User ID" />
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
                        <Button onClick={() => { this.addEditContent(this.state.curId) }}>{this.state.modalTitle}</Button>
                        <Button onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

export default Contents;