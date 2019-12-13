import React from 'react';
import { Table, Button } from 'reactstrap';
import { UserAddPopup } from './';


const User = () => {
    const [ isOpen, setIsOpen ] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    }

    const hideModal = () => {
        setIsOpen(false);
    }

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
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>mark@aaa.com</td>
                        <td>2019-11-20</td>
                        <th><Button>Edit</Button><Button>Del</Button></th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Eric</td>
                        <td>erick@aaa.com</td>
                        <td>2019-10-25</td>
                        <th><Button>Edit</Button><Button>Del</Button></th>
                    </tr>
                </tbody>
            </Table>
            <Button onClick={showModal}>Add User</Button>
            <UserAddPopup
                show={isOpen}
                onHide={hideModal}
            />
        </div>
    )    
}

export default User;