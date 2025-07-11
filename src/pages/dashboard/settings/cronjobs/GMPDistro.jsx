import React, { useState } from 'react'

const GMPDistro = () => {
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState('Daily')
  const [time, setTime] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [weekday, setWeekday] = useState(1) // 1 = Monday
  const [utcOffset, setUtcOffset] = useState(0)
  const [percentage, setPercentage] = useState('')

  const handleDistribute = () => {
    alert(
      `Amount: ${amount}\nFrequency: ${frequency}\nTime: ${time}\nEnabled: ${enabled}\nWeekday: ${weekday}\nUTC Offset: ${utcOffset}\nPercentage: ${percentage}%`
    )
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

        <div className="mb-3">
          <label htmlFor="time" className="form-label">Distribution Time (HH:mm)</label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="enabledSwitch"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="enabledSwitch">
            Enable Distribution
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="weekday" className="form-label">Weekday (1 = Mon, 7 = Sun)</label>
          <input
            type="number"
            className="form-control"
            id="weekday"
            min="1"
            max="7"
            value={weekday}
            onChange={(e) => setWeekday(Number(e.target.value))}
            disabled={frequency !== 'Weekly'}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="utcOffset" className="form-label">UTC Offset (e.g., +1, -5)</label>
          <input
            type="number"
            className="form-control"
            id="utcOffset"
            value={utcOffset}
            onChange={(e) => setUtcOffset(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="percentage" className="form-label">Distribution Percentage (%)</label>
          <input
            type="number"
            className="form-control"
            id="percentage"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="e.g., 10"
          />
        </div>

        <button className="btn btn-success w-100" onClick={handleDistribute}>
          Distribute
        </button>
      </div>
    </div>
  )
}

export default GMPDistro


// import React, { useState } from 'react'

// const GMPDistro = () => {
//   const [amount, setAmount] = useState('')
//   const [frequency, setFrequency] = useState('Daily')

//   const handleDistribute = () => {
//     alert(`Amount: ${amount}\nFrequency: ${frequency}`)
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">📤 GMP Distribution</h2>
//       <p className="text-muted mb-4">Distribute GMP tokens to users periodically.</p>

//       <div className="card p-4" style={{ maxWidth: '600px' }}>
//         <div className="mb-3">
//           <label htmlFor="amount" className="form-label">Distribution Amount</label>
//           <input
//             type="number"
//             className="form-control"
//             id="amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="e.g., 1000"
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="frequency" className="form-label">Frequency</label>
//           <select
//             className="form-select"
//             id="frequency"
//             value={frequency}
//             onChange={(e) => setFrequency(e.target.value)}
//           >
//             <option value="Daily">Daily</option>
//             <option value="Weekly">Weekly</option>
//             <option value="Monthly">Monthly</option>
//           </select>
//         </div>

//         <button className="btn btn-success" onClick={handleDistribute}>
//           Distribute
//         </button>
//       </div>
//     </div>
//   )
// }

// export default GMPDistro
