import React, { useState } from 'react'

const StakePayout = () => {
  const [interval, setInterval] = useState('')
  const [timezone, setTimezone] = useState('')

  const handleUpdate = () => {
    // You can replace this with actual logic to update the settings
    alert(`Time Interval: ${interval}\nTime Zone: ${timezone}`)
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">⚙️ Stake Payout Settings</h2>
      <p className="text-muted mb-4">
        Set the interval and time zone for automatic stake payouts.
      </p>

      <div className="card p-4" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="interval" className="form-label">
            Time Interval (in hours)
          </label>
          <input
            type="number"
            className="form-control"
            id="interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            placeholder="e.g., 24"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="timezone" className="form-label">
            Time Zone
          </label>
          <input
            type="text"
            className="form-control"
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            placeholder="e.g., UTC, GMT+1, EST"
          />
        </div>

        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  )
}

export default StakePayout
