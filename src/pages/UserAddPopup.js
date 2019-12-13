import React from 'react';
import { Modal, Button, Col, Form } from 'reactstrap'
import { FormGroup, Label, Input } from 'reactstrap';

const UserAddPopup = (props) => {
    
    return (
        <Modal
            
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User Add
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserAddPopup;