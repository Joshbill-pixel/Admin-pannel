import React, { useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      adminId: 'ADM001',
      username: 'alicej',
      role: 'Super Admin',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 2,
      adminId: 'ADM002',
      username: 'bobsmith',
      role: 'Admin',
      createdAt: new Date().toLocaleString(),
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState(null)
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value })
  }

  const handleAddAdmin = (e) => {
    e.preventDefault()

    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const newId = admins.length + 1
    const createdAt = new Date().toLocaleString()
    const adminId = `ADM00${newId}`

    setAdmins([
      ...admins,
      {
        id: 1,
        adminId,
        username: newAdmin.username,
        role: newAdmin.role,
        createdAt,
      },
    ])

    setShowModal(false)
    setNewAdmin({
      username: '',
      password: '',
      confirmPassword: '',
      role: 'Admin',
    })
  }

  const confirmDelete = (admin) => {
    setAdminToDelete(admin)
    setShowDeleteModal(true)
  }

  const handleDelete = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id))
    setShowDeleteModal(false)
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Manage admin users and assign roles.</p>

      <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
        <i className="bi bi-person-plus-fill me-2"></i> Add New Admin
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Admin ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.adminId}</td>
              <td>{admin.username}</td>
              <td>{admin.role}</td>
              <td>{admin.createdAt}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/dashboard/admin-profile/${admin.id}`, { state: { admin } })}
                >
                  View Profile
                </Button>
                <Button variant="danger" size="sm" onClick={() => confirmDelete(admin)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add New Admin Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddAdmin}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newAdmin.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={newAdmin.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={newAdmin.role}
                onChange={handleChange}
              >
                <option>Admin</option>
                <option>Super Admin</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Add Admin
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete admin{' '}
          <strong>{adminToDelete?.username}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(adminToDelete.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Admin