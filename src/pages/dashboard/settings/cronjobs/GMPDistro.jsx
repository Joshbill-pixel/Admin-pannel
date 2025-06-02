import React, { useState } from 'react'

const GMPDistro = () => {
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState('Daily')

  const handleDistribute = () => {
    alert(`Amount: ${amount}\nFrequency: ${frequency}`)
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📤 GMP Distribution</h2>
      <p className="text-muted mb-4">Distribute GMP tokens to users periodically.</p>

      <div className="card p-4" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Distribution Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 1000"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="frequency" className="form-label">Frequency</label>
          <select
            className="form-select"
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <button className="btn btn-success" onClick={handleDistribute}>
          Distribute
        </button>
      </div>
    </div>
  )
}

export default GMPDistro
