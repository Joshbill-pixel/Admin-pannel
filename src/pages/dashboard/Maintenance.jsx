import React, { useState } from 'react'
import { Card, Form, Badge } from 'react-bootstrap'

const Maintenance = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const toggleMode = () => {
    setMaintenanceMode(!maintenanceMode)
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Maintenance Mode</h3>

      <Card className="p-4 shadow-sm">
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
    </div>
  )
}

export default Maintenance