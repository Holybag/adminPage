import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
//import axios from 'axios';

const API_URL = 'http://localhost:5000';

class ChatContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            socket: null,
            message: ''
        }
    }

    componentDidMount() {

        const socket = socketIOClient(API_URL);
        this.setState({socket: socket});

        socket.on('fromServer', data => {
            console.log('fromServer:' + data);
            this.setState({ messages: [...this.state.messages, {id:this.state.messages.length, text:data}] })            
            console.log('state.messages:' + this.state.messages);
        });        

        // const url = `${API_URL}/users/`;
        // axios.get(url).then(response => response.data)
        // .then((data) => {
        //     this.setState({ users: data });
        //     console.log(this.state.users);
        // })
    }

    sendMessage = () => {
        this.state.socket.emit('toServer', this.state.message);
    }

    handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }
    
    render() {
        return (
            <div>
                <h3>ChatContents Management</h3>                
                <input value={this.state.message} onChange={this.handleChange} name='message'/>
                <Button color='danger' onClick={this.sendMessage}>Send</Button>
                <ListGroup>
                    {
                        this.state.messages.map((message) => (
                            <ListGroupItem key={message.id} color="success">
                                { message.text }
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </div>
        )
    }        
}

export default ChatContents;