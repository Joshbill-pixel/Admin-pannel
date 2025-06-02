import React, { useState } from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'

const Settings = () => {
  const [form, setForm] = useState({
    fullName: 'Admin User',
    email: 'admin@example.com',
    notifications: true,
    theme: 'light',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Settings updated successfully!')
  }

  return (
    <Card>
      <Card.Body>
        <h2>Settings</h2>
        <p>Manage your personal and application settings</p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Theme</Form.Label>
                <Form.Select name="theme" value={form.theme} onChange={handleChange}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Enable Notifications"
                  name="notifications"
                  checked={form.notifications}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Settings
