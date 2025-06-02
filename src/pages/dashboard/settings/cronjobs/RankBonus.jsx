import React, { useState } from 'react'

const RankBonus = () => {
  const [rank, setRank] = useState('Silver')
  const [bonus, setBonus] = useState('')

  const handleBonusApply = () => {
    alert(`Rank: ${rank}\nBonus: ${bonus}`)
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">💰 Rank Bonus</h2>
      <p className="text-muted mb-4">Configure and apply bonuses for ranks.</p>

      <div className="card p-4" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="rank" className="form-label">Select Rank</label>
          <select
            className="form-select"
            id="rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          >
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="bonus" className="form-label">Bonus Amount</label>
          <input
            type="number"
            className="form-control"
            id="bonus"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
            placeholder="Enter bonus amount"
          />
        </div>

        <button className="btn btn-danger" onClick={handleBonusApply}>
          Apply Bonus
        </button>
      </div>
    </div>
  )
}

export default RankBonus
