import React, { useState } from 'react'
import { Table, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

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
            users.map(({ id, name, email, role }, index) => {
              const isSelected = editingUser?.id === id

              return (
                <tr
                  key={id}
                  style={{ cursor: 'pointer', backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }}
                  onClick={() => setEditingUser(users.find(u => u.id === id))}
                >
                  <td>{index + 1}</td>
                  <td>
                    {name}
                    {isSelected && (
                      <Button
                        variant="success"
                        size="sm"
                        style={{
                          marginLeft: '10px',
                        }}
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
                  <td>{email}</td>
                  <td>{role}</td>
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
