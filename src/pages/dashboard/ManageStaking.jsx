import React, { useState } from 'react'
import { Row, Col, Card, Table } from 'react-bootstrap'

const sampleStakes = [
  { id: 1, user: 'alice', amount: 300, date: '2025-06-01', duration: '30 days', status: 'Active' },
  { id: 2, user: 'bob', amount: 500, date: '2025-05-10', duration: '60 days', status: 'Completed' },
  { id: 3, user: 'charlie', amount: 150, date: '2025-06-20', duration: '30 days', status: 'Active' },
  { id: 4, user: 'diana', amount: 250, date: '2025-07-01', duration: '15 days', status: 'Pending' },
  { id: 5, user: 'edward', amount: 180, date: '2025-07-03', duration: '7 days', status: 'Failed' }
]

const ManageStaking = () => {
  const [stakes] = useState(sampleStakes)

  const getTotal = () => stakes.reduce((sum, s) => sum + s.amount, 0)
  const getCountByStatus = (status) => stakes.filter((s) => s.status === status).length

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Staking Management</h3>

      {/* Dashboard Overview */}
      <Row className="mb-4">
        <Col md={2}>
          <Card className="text-center p-3 shadow-sm">
            <h6>Total Stakes</h6>
            <h4>{stakes.length}</h4>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center p-3 shadow-sm text-success">
            <h6>Active</h6>
            <h4>{getCountByStatus('Active')}</h4>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center p-3 shadow-sm text-secondary">
            <h6>Completed</h6>
            <h4>{getCountByStatus('Completed')}</h4>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center p-3 shadow-sm text-warning">
            <h6>Pending</h6>
            <h4>{getCountByStatus('Pending')}</h4>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center p-3 shadow-sm text-danger">
            <h6>Failed</h6>
            <h4>{getCountByStatus('Failed')}</h4>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center p-3 shadow-sm text-primary">
            <h6>Total Staked</h6>
            <h4>${getTotal()}</h4>
          </Card>
        </Col>
      </Row>

      {/* Staking Summary Table */}
      <Card className="p-3 shadow-sm">
        <h5 className="mb-3">Staking Summary</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Amount ($)</th>
              <th>Staking Date</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stakes.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.user}</td>
                <td>${s.amount}</td>
                <td>{s.date}</td>
                <td>{s.duration}</td>
                <td>
                  <span
                    className={`badge bg-${
                      s.status === 'Completed'
                        ? 'secondary'
                        : s.status === 'Active'
                        ? 'success'
                        : s.status === 'Pending'
                        ? 'warning'
                        : 'danger'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

export default ManageStaking


// import React, { useState } from 'react'
// import { Row, Col, Card, Table } from 'react-bootstrap'

// const sampleStakes = [
//   { id: 1, user: 'alice', amount: 300, date: '2025-06-01', duration: '30 days', status: 'Active' },
//   { id: 2, user: 'bob', amount: 500, date: '2025-05-10', duration: '60 days', status: 'Completed' },
//   { id: 3, user: 'charlie', amount: 150, date: '2025-06-20', duration: '30 days', status: 'Active' },
// ]

// const ManageStaking = () => {
//   const [stakes] = useState(sampleStakes)

//   const getTotal = () => stakes.reduce((sum, s) => sum + s.amount, 0)
//   const getCountByStatus = (status) => stakes.filter((s) => s.status === status).length

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Staking Management</h3>

//       {/* Dashboard Overview */}
//       <Row className="mb-4">
//         <Col md={3}>
//           <Card className="text-center p-3 shadow-sm">
//             <h6>Total Stakes</h6>
//             <h4>{stakes.length}</h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center p-3 shadow-sm text-success">
//             <h6>Active</h6>
//             <h4>{getCountByStatus('Active')}</h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center p-3 shadow-sm text-secondary">
//             <h6>Completed</h6>
//             <h4>{getCountByStatus('Completed')}</h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center p-3 shadow-sm text-primary">
//             <h6>Total Staked</h6>
//             <h4>${getTotal()}</h4>
//           </Card>
//         </Col>
//       </Row>

//       {/* Staking Summary Table */}
//       <Card className="p-3 shadow-sm">
//         <h5 className="mb-3">Staking Summary</h5>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>User</th>
//               <th>Amount ($)</th>
//               <th>Staking Date</th>
//               <th>Duration</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stakes.map((s, i) => (
//               <tr key={s.id}>
//                 <td>{i + 1}</td>
//                 <td>{s.user}</td>
//                 <td>${s.amount}</td>
//                 <td>{s.date}</td>
//                 <td>{s.duration}</td>
//                 <td>
//                   <span
//                     className={`badge bg-${
//                       s.status === 'Completed' ? 'secondary' : 'success'
//                     }`}
//                   >
//                     {s.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>
//     </div>
//   )
// }

// export default ManageStaking