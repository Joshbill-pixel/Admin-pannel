import React, { useState } from 'react'
import { Table, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap'

const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', wallet: '', username: '', password: '', photo: '' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Admin', wallet: '', username: '', password: '', photo: '' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', wallet: '', username: '', password: '', photo: '' },
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
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: '140px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(({ id, name, email, role }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(users.find(u => u.id === id))}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={editingUser.role}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sol Wallet Address</Form.Label>
                <Form.Control
                  type="text"
                  name="wallet"
                  value={editingUser.wallet}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={editingUser.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control
                  type="text"
                  name="photo"
                  value={editingUser.photo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Users



// import React, { useState } from 'react'
// import { Table, Button } from 'react-bootstrap'

// const initialUsers = [
//   { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
//   { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Admin' },
//   { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
// ]

// const Users = () => {
//   const [users, setUsers] = useState(initialUsers)

//   const handleEdit = (id) => {
//     alert(`Edit user with id: ${id}`)
//   }

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(users.filter((user) => user.id !== id))
//     }
//   }

//   return (
//     <div>
//       <h2>User Management</h2>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th style={{ width: '140px' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 No users found.
//               </td>
//             </tr>
//           ) : (
//             users.map(({ id, name, email, role }, index) => (
//               <tr key={id}>
//                 <td>{index + 1}</td>
//                 <td>{name}</td>
//                 <td>{email}</td>
//                 <td>{role}</td>
//                 <td>
//                   <Button
//                     variant="warning"
//                     size="sm"
//                     onClick={() => handleEdit(id)}
//                     className="me-2"
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDelete(id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </div>
//   )
// }

// export default Users
