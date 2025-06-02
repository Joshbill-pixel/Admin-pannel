import React, { useState } from 'react'

const ReferralCheck = () => {
  const [period, setPeriod] = useState('')

  const handleCheck = () => {
    alert(`Referral Period: ${period}`)
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🔗 Referral Check</h2>
      <p className="text-muted mb-4">Check referral activity for a specified period.</p>

      <div className="card p-4" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="period" className="form-label">Referral Period (in days)</label>
          <input
            type="number"
            className="form-control"
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="e.g., 30"
          />
        </div>

        <button className="btn btn-info" onClick={handleCheck}>
          Run Check
        </button>
      </div>
    </div>
  )
}

export default ReferralCheck
