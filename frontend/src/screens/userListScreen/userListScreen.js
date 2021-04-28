import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import FormContainer from "../../containers/form/FormContainer"
import { listUsers } from "../../redux/actions/userAction"
import Message from "../../components/message/Message"
import Loader from "../../components/loader/Loader"

function UserListScreen({ history }) {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
                    dispatch(listUsers())
        } else {
             history.push('/login')
        }
    }, [dispatch, history])

    const deleteHandler = (id) => {

    }

    return (
        <div>
            <h1>Users</h1>
            {loading
            ? <Loader />
            : error
                    ? <Message variant="danger">{error}</Message>
                    : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (
                                        <i className="fas fa-check" style={{color: "green"}}></i>
                                    ) : (
                                        <i className="fas fa-check" style={{color: "red"}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}`}>
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant="danger"
                                                className="btn-sm"
                                                 onClick={() => deleteHandler(user._id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen