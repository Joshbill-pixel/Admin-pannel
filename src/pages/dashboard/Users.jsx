import React, { useState } from 'react'
import { Table, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const initialUsers = [
  { id: 1, userId: 'USR001', username: 'alicejohnson', role: 'User', wallet: '', password: '', photo: '', createdAt: '2025-07-01T10:00' },
  { id: 2, userId: 'USR002', username: 'bobsmith', role: 'Admin', wallet: '', password: '', photo: '', createdAt: '2025-07-02T11:30' },
  { id: 3, userId: 'USR003', username: 'charliebrown', role: 'User', wallet: '', password: '', photo: '', createdAt: '2025-07-03T09:45' },
]

const Users = () => {
  const [users, setUsers] = useState(initialUsers)
  const [editingUser, setEditingUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleEdit = (user) => {
    setEditingUser(user)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditingUser({ ...editingUser, [name]: value })
  }

  const handleSave = () => {
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user))
    setShowModal(false)
  }

  const navigate = useNavigate()

  return (
    <div>
      <h2>User Management</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center p-3">
            <h4>Total Users</h4>
            <h2>{users.length}</h2>
          </Card>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Created At</th>
            <th style={{ width: '140px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(({ id, userId, username, role, createdAt }, index) => {
              const isSelected = editingUser?.id === id

              return (
                <tr
                  key={id}
                  style={{ cursor: 'pointer', backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }}
                  onClick={() => setEditingUser(users.find(u => u.id === id))}
                >
                  <td>{index + 1}</td>
                  <td>{userId}</td>
                  <td>
                    {username}
                    {isSelected && (
                      <Button
                        variant="success"
                        size="sm"
                        style={{ marginLeft: '10px' }}
                        onClick={() =>
                          navigate(`/dashboard/user-profile/${id}`, {
                            state: { user: users.find(u => u.id === id) },
                          })
                        }
                      >
                        View Profile
                      </Button>
                    )}
                  </td>
                  <td>{role}</td>
                  <td>{createdAt}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users