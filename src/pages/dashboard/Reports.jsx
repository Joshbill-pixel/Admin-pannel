import React, { useState } from 'react'
import {
  Card,
  Table,
  Row,
  Col,
  Form,
  Button,
  Tabs,
  Tab
} from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const withdrawalReports = [
  { id: 1, user: 'alice', amount: 120, date: '2025-07-01', status: 'Completed' },
  { id: 2, user: 'bob', amount: 75, date: '2025-07-02', status: 'Pending' },
  { id: 3, user: 'alice', amount: 100, date: '2025-07-03', status: 'Completed' },
  { id: 4, user: 'bob', amount: 50, date: '2025-07-04', status: 'Pending' },
  { id: 5, user: 'alice', amount: 120, date: '2025-07-01', status: 'Completed' },
  { id: 6, user: 'bob', amount: 75, date: '2025-07-02', status: 'Pending' },
  { id: 7, user: 'alice', amount: 100, date: '2025-07-03', status: 'Completed' },
  { id: 8, user: 'bob', amount: 50, date: '2025-07-04', status: 'Pending' },
  { id: 9, user: 'alice', amount: 120, date: '2025-07-01', status: 'Completed' },
  { id: 10, user: 'bob', amount: 75, date: '2025-07-02', status: 'Pending' },
  { id: 11, user: 'alice', amount: 100, date: '2025-07-03', status: 'Completed' },
  { id: 12, user: 'bob', amount: 50, date: '2025-07-04', status: 'Pending' },
]

const stakingReports = [
  { id: 1, user: 'alice', stake: 200, date: '2025-07-01', status: 'Active' },
  { id: 2, user: 'bob', stake: 100, date: '2025-07-02', status: 'Ended' },
  { id: 3, user: 'alice', stake: 300, date: '2025-07-03', status: 'Active' },
  { id: 4, user: 'bob', stake: 150, date: '2025-07-04', status: 'Ended' },
  { id: 5, user: 'alice', stake: 200, date: '2025-07-01', status: 'Active' },
  { id: 6, user: 'bob', stake: 100, date: '2025-07-02', status: 'Ended' },
  { id: 7, user: 'alice', stake: 300, date: '2025-07-03', status: 'Active' },
  { id: 8, user: 'bob', stake: 150, date: '2025-07-04   ', status: 'Ended' },
  { id: 9, user: 'alice', stake: 200, date: '2025-07-01', status: 'Active' },
  { id: 10, user: 'bob', stake: 100, date: '2025-07-02', status: 'Ended' },
  { id: 11, user: 'alice', stake: 300, date: '2025-07-03', status: 'Active' },
  { id: 12, user: 'bob', stake: 150, date: '2025-07-04', status: 'Ended' },
]

const taskReports = [
  { id: 1, user: 'alice', task: 'Invite 5 friends', date: '2025-07-01', status: 'Completed' },
  { id: 2, user: 'bob', task: 'Connect wallet', date: '2025-07-02', status: 'Pending' },
  { id: 3, user: 'alice', task: 'Invite 5 friends', date: '2025-07-03', status: 'Completed' },
  { id: 4, user: 'bob', task: 'Connect wallet', date: '2025-07-04', status: 'Pending' },
  { id: 5, user: 'alice', task: 'Invite 5 friends', date: '2025-07-01', status: 'Completed' },
  { id: 6, user: 'bob', task: 'Connect wallet', date: '2025-07-02', status: 'Pending' },
  { id: 7, user: 'alice', task: 'Invite 5 friends', date: '2025-07-03', status: 'Completed' },
  { id: 8, user: 'bob', task: 'Connect wallet', date: '2025-07-04', status: 'Pending' },
  { id: 9, user: 'alice', task: 'Invite 5 friends', date: '2025-07-01', status: 'Completed' },
  { id: 10, user: 'bob', task: 'Connect wallet', date: '2025-07-02', status: 'Pending' },
  { id: 11, user: 'alice', task: 'Invite 5 friends', date: '2025-07-03', status: 'Completed' },
  { id: 12, user: 'bob', task: 'Connect wallet', date: '2025-07-04', status: 'Pending' },
]

const Reports = () => {
  const [filters, setFilters] = useState({ user: '', status: '', date: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [activeTab, setActiveTab] = useState('withdrawal')

  const dataMap = {
    withdrawal: withdrawalReports,
    staking: stakingReports,
    task: taskReports
  }

  const filteredData = dataMap[activeTab].filter((r) => {
    return (
      (!filters.user || r.user.toLowerCase().includes(filters.user.toLowerCase())) &&
      (!filters.status || r.status === filters.status) &&
      (!filters.date || r.date === filters.date)
    )
  })

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentData = filteredData.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`, 20, 10)
    const columns = {
      withdrawal: ['User', 'Amount', 'Date', 'Status'],
      staking: ['User', 'Stake', 'Date', 'Status'],
      task: ['User', 'Task', 'Date', 'Status']
    }
    const rows = filteredData.map((r) =>
      activeTab === 'withdrawal'
        ? [r.user, r.amount, r.date, r.status]
        : activeTab === 'staking'
        ? [r.user, r.stake, r.date, r.status]
        : [r.user, r.task, r.date, r.status]
    )
    doc.autoTable({ head: [columns[activeTab]], body: rows })
    doc.save(`${activeTab}_report.pdf`)
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Reports</h3>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => {
          setActiveTab(k)
          setCurrentPage(1)
        }}
        className="mb-3"
      >
        <Tab eventKey="withdrawal" title="Withdrawal Reports" />
        <Tab eventKey="staking" title="Staking Reports" />
        <Tab eventKey="task" title="Task Reports" />
      </Tabs>

      <Card className="p-3 shadow-sm mb-4">
        <Form>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>User</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user"
                  value={filters.user}
                  onChange={(e) => setFilters({ ...filters, user: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter status"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button
                variant="secondary"
                onClick={() => setFilters({ user: '', status: '', date: '' })}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <div className="mb-2 d-flex justify-content-between">
        <CSVLink data={filteredData} filename={`${activeTab}_report.csv`} className="btn btn-outline-success">
          Export CSV
        </CSVLink>
        <Button variant="outline-danger" onClick={exportPDF}>
          Export PDF
        </Button>
      </div>

      <Card className="shadow-sm p-3">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>{activeTab === 'withdrawal' ? 'Amount ($)' : activeTab === 'staking' ? 'Stake ($)' : 'Task'}</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No results found.
                </td>
              </tr>
            ) : (
              currentData.map((r, i) => (
                <tr key={r.id}>
                  <td>{indexOfFirst + i + 1}</td>
                  <td>{r.user}</td>
                  <td>{activeTab === 'withdrawal' ? `$${r.amount}` : activeTab === 'staking' ? `$${r.stake}` : r.task}</td>
                  <td>{r.date}</td>
                  <td>
                    <span
                      className={`badge bg-${r.status === 'Completed' || r.status === 'Active' ? 'success' : 'warning'}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredData.length)} of {filteredData.length} entries
          </div>
          <div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="me-2"
            >
              Prev
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Reports

// import React, { useState } from 'react'
// import {
//   Card,
//   Table,
//   Row,
//   Col,
//   Form,
//   Button,
// } from 'react-bootstrap'
// import { CSVLink } from 'react-csv'
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'

// const withdrawalReports = [
//   { id: 1, user: 'alice', amount: 120, date: '2025-07-01', status: 'Completed' },
//   { id: 2, user: 'bob', amount: 75, date: '2025-07-02', status: 'Pending' },
//   { id: 3, user: 'alice', amount: 100, date: '2025-07-03', status: 'Completed' },
//   { id: 4, user: 'bob', amount: 50, date: '2025-07-04', status: 'Pending' },
//   { id: 5, user: 'alice', amount: 120, date: '2025-07-01', status: 'Completed' },
//   { id: 6, user: 'bob', amount: 75, date: '2025-07-02', status: 'Pending' },
//   { id: 7, user: 'alice', amount: 100, date: '2025-07-03', status: 'Completed' },
//   { id: 8, user: 'bob', amount: 50, date: '2025-07-04', status: 'Pending' },
//   { id: 9, user: 'alice', amount: 120, date: '2025-07-01', status: 'Completed' },
//   { id: 10, user: 'bob', amount: 75, date: '2025-07-02', status: 'Pending' },
//   { id: 11, user: 'alice', amount: 100, date: '2025-07-03', status: 'Completed' },
//   { id: 12, user: 'bob', amount: 50, date: '2025-07-04', status: 'Pending' },
// ]

// const Reports = () => {
//   const [filters, setFilters] = useState({ user: '', status: '', date: '' })
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 6

//   const filteredData = withdrawalReports.filter((r) => {
//     return (
//       (!filters.user || r.user.toLowerCase().includes(filters.user.toLowerCase())) &&
//       (!filters.status || r.status === filters.status) &&
//       (!filters.date || r.date === filters.date)
//     )
//   })

//   const indexOfLast = currentPage * itemsPerPage
//   const indexOfFirst = indexOfLast - itemsPerPage
//   const currentData = filteredData.slice(indexOfFirst, indexOfLast)
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage)

//   const exportPDF = () => {
//     const doc = new jsPDF()
//     doc.text('Withdrawal Report', 20, 10)
//     doc.autoTable({
//       head: [['User', 'Amount', 'Date', 'Status']],
//       body: filteredData.map((r) => [r.user, r.amount, r.date, r.status]),
//     })
//     doc.save('withdrawals.pdf')
//   }

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Withdrawal Reports</h3>

//       {/* Filter Section */}
//       <Card className="p-3 shadow-sm mb-4">
//         <Form>
//           <Row>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>User</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter user"
//                   value={filters.user}
//                   onChange={(e) => setFilters({ ...filters, user: e.target.value })}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Status</Form.Label>
//                 <Form.Select
//                   value={filters.status}
//                   onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//                 >
//                   <option value="">All</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Pending">Pending</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={filters.date}
//                   onChange={(e) => setFilters({ ...filters, date: e.target.value })}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3} className="d-flex align-items-end">
//               <Button
//                 variant="secondary"
//                 onClick={() => setFilters({ user: '', status: '', date: '' })}
//               >
//                 Clear Filters
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Card>

//       {/* Export Buttons */}
//       <div className="mb-2 d-flex justify-content-between">
//         <CSVLink data={filteredData} filename="withdrawals.csv" className="btn btn-outline-success">
//           Export CSV
//         </CSVLink>
//         <Button variant="outline-danger" onClick={exportPDF}>
//           Export PDF
//         </Button>
//       </div>

//       {/* Table Section */}
//       <Card className="shadow-sm p-3">
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>User</th>
//               <th>Amount ($)</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center">
//                   No results found.
//                 </td>
//               </tr>
//             ) : (
//               currentData.map((r, i) => (
//                 <tr key={r.id}>
//                   <td>{indexOfFirst + i + 1}</td>
//                   <td>{r.user}</td>
//                   <td>${r.amount}</td>
//                   <td>{r.date}</td>
//                   <td>
//                     <span
//                       className={`badge bg-${r.status === 'Completed' ? 'success' : 'warning'}`}
//                     >
//                       {r.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>

//         {/* Pagination */}
//         <div className="d-flex justify-content-between align-items-center">
//           <div>
//             Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredData.length)} of {filteredData.length} entries
//           </div>
//           <div>
//             <Button
//               variant="outline-primary"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="me-2"
//             >
//               Prev
//             </Button>
//             <Button
//               variant="outline-primary"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }

// export default Reports