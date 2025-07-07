import React, { useState } from 'react'

const StakePayout = () => {
  const [enabled, setEnabled] = useState(true)
  const [percentages, setPercentages] = useState({
    baseReward: 50,
    bonusReward: 20,
    loyaltyReward: 30,
  })

  const handlePercentageChange = (key, value) => {
    setPercentages({ ...percentages, [key]: Number(value) })
  }

  const handleUpdate = () => {
    alert(
      `Enabled: ${enabled}\nPercentages:\n${Object.entries(percentages)
        .map(([k, v]) => `- ${k}: ${v}%`)
        .join('\n')}`
    )
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">⚙️ Stake Payout Settings</h2>
      <p className="text-muted mb-4">
        Enable or disable payouts and adjust distribution percentages.
      </p>

      <div className="card p-4" style={{ maxWidth: '600px' }}>
        {/* Enable Toggle */}
        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="enablePayout"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="enablePayout">
            Enable Payout
          </label>
        </div>

        {/* Percentages */}
        <div className="mb-3">
          <label className="form-label">Payout Percentages</label>
          {Object.entries(percentages).map(([key, value]) => (
            <div className="input-group mb-2" key={key}>
              <span className="input-group-text" style={{ minWidth: '140px' }}>{key}</span>
              <input
                type="number"
                className="form-control"
                value={value}
                onChange={(e) => handlePercentageChange(key, e.target.value)}
              />
              <span className="input-group-text">%</span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary w-100" onClick={handleUpdate}>
          Update Settings
        </button>
      </div>
    </div>
  )
}

export default StakePayout