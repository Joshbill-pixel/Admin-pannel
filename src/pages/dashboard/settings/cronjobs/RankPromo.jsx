import React, { useState } from 'react'

const RankPromo = () => {
  const [userId, setUserId] = useState('')
  const [rank, setRank] = useState('Silver')

  const handlePromotion = () => {
    alert(`User ID: ${userId}\nNew Rank: ${rank}`)
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🚀 Rank Promotion</h2>
      <p className="text-muted mb-4">Promote a user to a higher rank manually.</p>

      <div className="card p-4" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rank" className="form-label">New Rank</label>
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

        <button className="btn btn-warning" onClick={handlePromotion}>
          Promote
        </button>
      </div>
    </div>
  )
}

export default RankPromo
