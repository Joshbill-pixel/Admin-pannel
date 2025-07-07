import React, { useState } from 'react'
import { Row, Col, Card, Table } from 'react-bootstrap'

const sampleStakes = [
  {
    id: 1,
    stakeId: 'STK001',
    user: 'alice',
    amount: 300,
    date: '2025-06-01',
    duration: '30 days',
    status: 'Active',
    solWalletAddress: '4k3Dyjzv...6EdCz',
    totalStaked: 300,
    totalDeposit: 500,
    walletBalance: 200,
    totalEarnings: 75,
  },
  {
    id: 2,
    stakeId: 'STK002',
    user: 'bob',
    amount: 500,
    date: '2025-05-10',
    duration: '60 days',
    status: 'Completed',
    solWalletAddress: '9BK9...jjf1',
    totalStaked: 500,
    totalDeposit: 700,
    walletBalance: 250,
    totalEarnings: 150,
  },
  {
    id: 3,
    stakeId: 'STK003',
    user: 'charlie',
    amount: 150,
    date: '2025-06-20',
    duration: '30 days',
    status: 'Active',
    solWalletAddress: '6XZ4...a9e2',
    totalStaked: 150,
    totalDeposit: 200,
    walletBalance: 50,
    totalEarnings: 40,
  },
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
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <h6>Total Stakes</h6>
            <h4>{stakes.length}</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm text-warning">
            <h6>Active</h6>
            <h4>{getCountByStatus('Active')}</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm text-success">
            <h6>Completed</h6>
            <h4>{getCountByStatus('Completed')}</h4>
          </Card>
        </Col>
        <Col md={3}>
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
              <th>Stake ID</th>
              <th>User</th>
              <th>Amount ($)</th>
              <th>Staking Date</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Wallet</th>
              <th>Total Staked</th>
              <th>Total Deposit</th>
              <th>Wallet Balance</th>
              <th>Total Earnings</th>
            </tr>
          </thead>
          <tbody>
            {stakes.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.stakeId}</td>
                <td>{s.user}</td>
                <td>${s.amount}</td>
                <td>{s.date}</td>
                <td>{s.duration}</td>
                <td>
                  <span
                    className={`badge bg-${
                      s.status === 'Completed'
                        ? 'success'
                        : 'warning'
                      }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td>{s.solWalletAddress}</td>
                <td>${s.totalStaked}</td>
                <td>${s.totalDeposit}</td>
                <td>${s.walletBalance}</td>
                <td>${s.totalEarnings}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

export default ManageStaking
