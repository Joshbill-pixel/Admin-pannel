import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'

const UsersProfile = () => {
  const { state } = useLocation()
  const user = state?.user

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ ...user })
  const [blacklisted, setBlacklisted] = useState(user?.blacklisted || false)

  if (!user) return <p>User not found.</p>

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    console.log('Saving user changes:', formData)
    setEditMode(false)
  }

  const toggleBlacklist = () => {
    setBlacklisted(!blacklisted)
    // Optionally call an API here
  }

  return (
    <div className="container mt-4">
      <h3>User Profile</h3>

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
            <div className="text-center">
              <h5 className="fw-bold">{formData.name}</h5>
              <div className="mt-3">
                <Button
                  variant={blacklisted ? 'dark' : 'outline-dark'}
                  size="sm"
                  onClick={toggleBlacklist}
                >
                  {blacklisted ? 'Unblacklist User' : 'Blacklist User'}
                </Button>
              </div>
            </div>
          </Col>

          <Col md={8}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wallet Address</Form.Label>
                <Form.Control
                  name="wallet"
                  value={formData.wallet}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>

              <div className="text-end">
                {!editMode ? (
                  <Button variant="primary" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button variant="success" onClick={handleSave}>
                    Save Changes
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

export default UsersProfile