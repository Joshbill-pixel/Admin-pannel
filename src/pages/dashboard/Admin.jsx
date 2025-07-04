import React, { useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Alice Johnson', username: 'alicej', email: 'alice@site.com', role: 'Super Admin' },
    { id: 2, name: 'Bob Smith', username: 'bobsmith', email: 'bob@site.com', role: 'Admin' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState(null)
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'Admin'
  })

  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value })
  }

  const handleAddAdmin = (e) => {
    e.preventDefault()
    const newId = admins.length + 1
    setAdmins([...admins, { id: newId, ...newAdmin }])
    setShowModal(false)
    setNewAdmin({ name: '', username: '', email: '', password: '', role: 'Admin' })
  }

  const handleDelete = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id))
    setShowDeleteModal(false)
  }

  const confirmDelete = (admin) => {
    setAdminToDelete(admin)
    setShowDeleteModal(true)
  }
  const navigate = useNavigate()
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
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
               <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/dashboard/admin-profile/${admin.id}`, { state: { admin } })}
                >
                  View Profile
                </Button> 
                {/* Edit functionality could go here */}
                <Button variant="danger" size="sm" onClick={() => confirmDelete(admin)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddAdmin}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newAdmin.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newAdmin.email}
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
          Are you sure you want to delete admin <strong>{adminToDelete?.name}</strong> with username <strong>{adminToDelete?.username}</strong>?
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

export default Admin;



// import React, { useState } from 'react'
// import { Table, Button, Modal, Form } from 'react-bootstrap'

// const Admin = () => {
//   const [admins, setAdmins] = useState([
//     { id: 1, name: 'Alice Johnson', email: 'alice@site.com', role: 'Super Admin' },
//     { id: 2, name: 'Bob Smith', email: 'bob@site.com', role: 'Admin' },
//   ])

//   const [showModal, setShowModal] = useState(false)
//   const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' })

//   const handleChange = (e) => {
//     setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value })
//   }

//   const handleAddAdmin = (e) => {
//     e.preventDefault()
//     const newId = admins.length + 1
//     setAdmins([...admins, { id: newId, ...newAdmin }])
//     setShowModal(false)
//     setNewAdmin({ name: '', email: '', role: 'Admin' })
//   }

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <p>Manage admin users and assign roles.</p>

//       <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
//         <i className="bi bi-person-plus-fill me-2"></i> Add New Admin
//       </Button>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admins.map((admin) => (
//             <tr key={admin.id}>
//               <td>{admin.id}</td>
//               <td>{admin.name}</td>
//               <td>{admin.email}</td>
//               <td>{admin.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Admin</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleAddAdmin}>
//           <Modal.Body>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={newAdmin.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={newAdmin.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Role</Form.Label>
//               <Form.Select
//                 name="role"
//                 value={newAdmin.role}
//                 onChange={handleChange}
//               >
//                 <option>Admin</option>
//                 <option>Super Admin</option>
//               </Form.Select>
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="success">
//               Add Admin
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   )
// }

// export default Admin
