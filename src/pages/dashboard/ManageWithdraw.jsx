import React, { useState } from 'react'
import { Row, Col, Card, Table, Form } from 'react-bootstrap'

const sampleWithdrawals = [
  {
    id: 'UD123456',
    user: 'alice',
    amount: 120,
    wallet: '5A1X...sfg6',
    status: 'Pending',
    date: '2025-07-01',
    gmpShares: 10,
    prevSLX: 45,
    slxPoints: 5,
  },
  {
    id: 'UD123789',
    user: 'bob',
    amount: 200,
    wallet: '9BK9...jjf1',
    status: 'Completed',
    date: '2025-07-03',
    gmpShares: 20,
    prevSLX: 60,
    slxPoints: 10,
  },
  {
    id: 'UD123945',
    user: 'charlie',
    amount: 75,
    wallet: '6XZ4...a9e2',
    status: 'Failed',
    date: '2025-07-02',
    gmpShares: 5,
    prevSLX: 35,
    slxPoints: 2,
  },
]


const ManageWithdraw = () => {
  const [withdrawals, setWithdrawals] = useState(sampleWithdrawals)
  const [withdrawEnabled, setWithdrawEnabled] = useState(true)

  const toggleWithdraw = () => {
    setWithdrawEnabled(!withdrawEnabled)
  }

  const getTotalByStatus = (status) =>
    withdrawals.filter((w) => w.status === status).length

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Withdrawal Management</h3>

      {/* Dashboard Overview */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <h6>Total Withdraws</h6>
            <h4>{withdrawals.length}</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm text-success">
            <h6>Completed</h6>
            <h4>{getTotalByStatus('Completed')}</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm text-warning">
            <h6>Pending</h6>
            <h4>{getTotalByStatus('Pending')}</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm text-danger">
            <h6>Failed</h6>
            <h4>{getTotalByStatus('Failed')}</h4>
          </Card>
        </Col>
      </Row>

      {/* Withdrawal Settings */}
      <Card className="p-3 mb-4 shadow-sm">
        <Row className="align-items-center">
          <Col md={8}>
            <h5>Withdrawal Settings</h5>
            <p>
              Withdrawal is currently:{' '}
              <strong className={withdrawEnabled ? 'text-success' : 'text-danger'}>
                {withdrawEnabled ? 'Enabled' : 'Disabled'}
              </strong>
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <Form.Check
              type="switch"
              id="withdraw-toggle"
              label={withdrawEnabled ? 'Disable Withdrawals' : 'Enable Withdrawals'}
              checked={withdrawEnabled}
              onChange={toggleWithdraw}
            />
          </Col>
        </Row>
      </Card>

      {/* Withdrawal History Table */}
      <Card className="p-3 shadow-sm">
        <h5 className="mb-3">Withdrawal History</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>ID</th>
              <th>Amount ($)</th>
              <th>Wallet</th>
              <th>GMP Shares</th>
              <th>Previous SLX</th>
              <th>SLX Points</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  No withdrawal records found.
                </td>
              </tr>
            ) : (
              withdrawals.map((w, i) => (
                <tr key={w.id}>
                  <td>{i + 1}</td>
                  <td>{w.user}</td>
                  <td>{w.id}</td>
                  <td>${w.amount}</td>
                  <td>{w.wallet}</td>
                  <td>{w.gmpShares}</td>
                  <td>{w.prevSLX}</td>
                  <td>{w.slxPoints}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        w.status === 'Completed'
                          ? 'success'
                          : w.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                      }`}
                    >
                      {w.status}
                    </span>

                  </td>
                  <td>{w.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

export default ManageWithdraw



// import React, { useState } from 'react'
// import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap'

// const sampleWithdrawals = [
//   {
//     id: 1,
//     user: 'alice',
//     amount: 120,
//     wallet: '5A1X...sfg6',
//     status: 'Pending',
//     date: '2025-07-01',
//   },
//   {
//     id: 2,
//     user: 'bob',
//     amount: 200,
//     wallet: '9BK9...jjf1',
//     status: 'Approved',
//     date: '2025-07-03',
//   },
//   {
//     id: 3,
//     user: 'charlie',
//     amount: 75,
//     wallet: '6XZ4...a9e2',
//     status: 'Rejected',
//     date: '2025-07-02',
//   },
// ]

// const ManageWithdraw = () => {
//   const [withdrawals, setWithdrawals] = useState(sampleWithdrawals)
//   const [withdrawEnabled, setWithdrawEnabled] = useState(true)

//   const toggleWithdraw = () => {
//     setWithdrawEnabled(!withdrawEnabled)
//   }

//   const updateStatus = (id, newStatus) => {
//     const updated = withdrawals.map((w) =>
//       w.id === id ? { ...w, status: newStatus } : w
//     )
//     setWithdrawals(updated)
//   }

//   const getTotalByStatus = (status) =>
//     withdrawals.filter((w) => w.status === status).length

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Withdrawal Management</h3>

//       {/* Dashboard Overview */}
//       <Row className="mb-4">
//         <Col md={3}>
//           <Card className="text-center p-3 shadow-sm">
//             <h6>Total Withdraws</h6>
//             <h4>{withdrawals.length}</h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center p-3 shadow-sm text-success">
//             <h6>Completed</h6>
//             <h4>{getTotalByStatus('Approved')}</h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center p-3 shadow-sm text-warning">
//             <h6>Pending</h6>
//             <h4>{getTotalByStatus('Pending')}</h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center p-3 shadow-sm text-danger">
//             <h6>Failed</h6>
//             <h4>{getTotalByStatus('Rejected')}</h4>
//           </Card>
//         </Col>
//       </Row>

//       {/* Withdrawal Settings */}
//       <Card className="p-3 mb-4 shadow-sm">
//         <Row className="align-items-center">
//           <Col md={8}>
//             <h5>Withdrawal Settings</h5>
//             <p>
//               Withdrawal is currently:{' '}
//               <strong className={withdrawEnabled ? 'text-success' : 'text-danger'}>
//                 {withdrawEnabled ? 'Enabled' : 'Disabled'}
//               </strong>
//             </p>
//           </Col>
//           <Col md={4} className="text-md-end">
//             <Form.Check
//               type="switch"
//               id="withdraw-toggle"
//               label={withdrawEnabled ? 'Disable Withdrawals' : 'Enable Withdrawals'}
//               checked={withdrawEnabled}
//               onChange={toggleWithdraw}
//             />
//           </Col>
//         </Row>
//       </Card>

//       {/* Withdrawal History Table */}
//       <Card className="p-3 shadow-sm">
//         <h5 className="mb-3">Withdrawal History</h5>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>User</th>
//               <th>Amount ($)</th>
//               <th>Wallet</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {withdrawals.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No withdrawal records found.
//                 </td>
//               </tr>
//             ) : (
//               withdrawals.map((w, i) => (
//                 <tr key={w.id}>
//                   <td>{i + 1}</td>
//                   <td>{w.user}</td>
//                   <td>${w.amount}</td>
//                   <td>{w.wallet}</td>
//                   <td>
//                     <span
//                       className={`badge bg-${
//                         w.status === 'Approved'
//                           ? 'success'
//                           : w.status === 'Pending'
//                           ? 'warning'
//                           : 'danger'
//                       }`}
//                     >
//                       {w.status}
//                     </span>
//                   </td>
//                   <td>{w.date}</td>
//                   <td>
//                     {w.status === 'Pending' && (
//                       <>
//                         <Button
//                           size="sm"
//                           variant="success"
//                           className="me-2"
//                           onClick={() => updateStatus(w.id, 'Approved')}
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="danger"
//                           onClick={() => updateStatus(w.id, 'Rejected')}
//                         >
//                           Reject
//                         </Button>
//                       </>
//                     )}
//                     {w.status !== 'Pending' && (
//                       <span className="text-muted">No Action</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//       </Card>
//     </div>
//   )
// }

// export default ManageWithdraw