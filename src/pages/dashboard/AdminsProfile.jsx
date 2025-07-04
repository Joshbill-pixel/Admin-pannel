import { useLocation } from 'react-router-dom'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

const AdminsProfile = () => {
  const location = useLocation()
  const admin = location.state?.admin

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ ...admin })

  if (!admin) return <p>No admin data found.</p>

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => setEditMode(true)

  const handleSave = () => {
    // Here you'd send `formData` to API to save changes
    console.log('Updated Admin:', formData)
    setEditMode(false)
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Admin Profile</h3>

      <Card className="p-4 shadow-sm">
        <Row>
         <Col md={4}>
            <div className="text-center">
              <div
                className="rounded-circle bg-light border"
                style={{
                  width: '130px',
                  height: '130px',
                  margin: '0 auto',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Admin Avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span className="d-block pt-5 text-muted">No Image</span>
                )}
              </div>

              {editMode && (
                <div className="mt-2">
                  <Form.Group controlId="formFile" className="mt-2">
                    <Form.Label className="small text-muted">Upload Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData((prev) => ({ ...prev, image: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
            {/* <div className="text-center">
              <h5 className="fw-bold">{formData.name}</h5>
            </div> */}
          </Col>

          <Col md={8}>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>ID</Form.Label>
                <Col sm={9}>
                  <Form.Control plaintext readOnly defaultValue={formData.id} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Username</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Email</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Role</Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={!editMode}
                  >
                    <option value="Admin">Admin</option>
                    <option value="SuperAdmin">Super Admin</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <div className="text-end mt-4">
                {!editMode ? (
                  <Button variant="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                ) : (
                  <Button variant="success" onClick={handleSave}>
                    Save
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default AdminsProfile

// import { useLocation } from 'react-router-dom'
// import { Card } from 'react-bootstrap'

// const AdminsProfile = () => {
//   const location = useLocation()
//   const admin = location.state?.admin

//   if (!admin) return <p>No admin data found.</p>

//   return (
//     <div className="container mt-4">
//       <h3>Admin Profile</h3>
//       <Card className="p-4 shadow-sm">
//         <p><strong>ID:</strong> {admin.id}</p>
//         <p><strong>Username:</strong> {admin.username}</p>
//         <p><strong>Role:</strong> {admin.role}</p>
//         <p><strong>Email:</strong> {admin.email || 'N/A'}</p>
//         {/* Add more fields here if available */}
//       </Card>
//     </div>
//   )
// }

// export default AdminsProfile