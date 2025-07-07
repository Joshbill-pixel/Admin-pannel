import { useLocation, useNavigate } from 'react-router-dom'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

const AdminsProfile = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const admin = location.state?.admin

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    ...admin,
    newUsername: '',
  })

  if (!admin) return <p>No admin data found.</p>

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => setEditMode(true)

  const handleSave = () => {
    // Here you'd send `formData.newUsername` and `formData.role` to backend
    console.log('Updated Admin Info:', formData)
    setEditMode(false)
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Admin Profile</h3>
        <Button variant="secondary" onClick={() => navigate('/dashboard/admin')}>
          <i className="bi bi-arrow-left me-1"></i> Back
        </Button>
      </div>

      <Card className="p-4 shadow-sm">
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
              <Form.Control plaintext readOnly value={formData.username} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>New Username</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="newUsername"
                type="text"
                value={formData.newUsername}
                onChange={handleChange}
                placeholder="Enter new username"
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
                <option value="Super Admin">Super Admin</option>
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
      </Card>
    </div>
  )
}

export default AdminsProfile