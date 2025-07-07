import React, { useState, useEffect } from 'react'
import { Card, Form, Badge, Row, Col } from 'react-bootstrap'

const Maintenance = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [countdown, setCountdown] = useState(3600) // 1 hour in seconds

  const toggleMode = () => {
    setMaintenanceMode(!maintenanceMode)
  }

  // Countdown logic
  useEffect(() => {
    let timer
    if (maintenanceMode && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [maintenanceMode, countdown])

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '10')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Maintenance Mode</h3>

      <Card className="p-4 shadow-sm mb-4">
        <h5>System Status</h5>
        <p>
          Current Mode:{' '}
          <Badge bg={maintenanceMode ? 'danger' : 'success'}>
            {maintenanceMode ? 'Active (Under Maintenance)' : 'Running Normally'}
          </Badge>
        </p>

        <Form>
          <Form.Check
            type="switch"
            id="maintenance-switch"
            label="Enable Maintenance Mode"
            checked={maintenanceMode}
            onChange={toggleMode}
          />
        </Form>
      </Card>

      {maintenanceMode && (
        <Row className="gy-3">
          <Col md={6}>
            <Card className="p-3 shadow-sm text-center">
              <h5>Maintenance Countdown</h5>
              <h3 className="text-danger">{formatTime(countdown)}</h3>
              <p>Estimated time until system comes back online</p>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3 shadow-sm">
              <h5>Maintenance Message</h5>
              <p className="text-muted mb-0">
                We are currently upgrading our systems to serve you better.
                Please check back after the maintenance window. Thank you for your patience.
              </p>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default Maintenance
