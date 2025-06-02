import React, { useState } from 'react'
import { Table, Button, Form, Modal, Badge } from 'react-bootstrap'

const Ticketing = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: 'Issue with login',
      description: 'I can’t access my dashboard after login.',
      status: 'Pending',
      date: '2025-05-27',
      response: '',
    },
    {
      id: 2,
      subject: 'Unable to reset password',
      description: 'Reset link is not working.',
      status: 'Completed',
      date: '2025-05-26',
      response: 'Issue has been resolved.',
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [viewTicket, setViewTicket] = useState(null)
  const [formData, setFormData] = useState({ subject: '', description: '' })
  const [responseText, setResponseText] = useState('')

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({ subject: '', description: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTicket = {
      id: tickets.length + 1,
      subject: formData.subject,
      description: formData.description,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      response: '',
    }
    setTickets([newTicket, ...tickets])
    handleCloseModal()
  }

  const openTicketDetails = (ticket) => {
    setViewTicket(ticket)
    setResponseText(ticket.response || '')
  }

  const handleStatusChange = (id, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    )
  }

  const handleReplySubmit = () => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === viewTicket.id ? { ...ticket, response: responseText } : ticket
      )
    )
    setViewTicket(null)
  }

  return (
    <div>
      <h2>Support Tickets</h2>
      <p>View and manage user-submitted support requests.</p>

      <div className="mb-3">
        <strong>Total Tickets:</strong> {tickets.length}
      </div>

      <Button variant="primary" onClick={handleShowModal} className="mb-3">
        <i className="bi bi-plus-circle me-2"></i> New Ticket
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>
                <Form.Select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </td>
              <td>{ticket.date}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => openTicketDetails(ticket)}>
                  View / Reply
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for New Ticket Submission */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submit New Ticket</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Ticket
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal for Viewing/Replying to Ticket */}
      {viewTicket && (
        <Modal show={true} onHide={() => setViewTicket(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Ticket #{viewTicket.id} - {viewTicket.subject}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Description:</strong></p>
            <p>{viewTicket.description}</p>

            <Form.Group className="mt-3">
              <Form.Label>Reply / Resolution</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setViewTicket(null)}>
              Close
            </Button>
            <Button variant="success" onClick={handleReplySubmit}>
              Submit Reply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default Ticketing


// import React, { useState } from 'react'
// import { Table, Button, Form, Modal } from 'react-bootstrap'

// const Ticketing = () => {
//   const [tickets, setTickets] = useState([
//     {
//       id: 1,
//       subject: 'Issue with login',
//       status: 'Open',
//       date: '2025-05-27',
//     },
//     {
//       id: 2,
//       subject: 'Unable to reset password',
//       status: 'Closed',
//       date: '2025-05-26',
//     },
//   ])

//   const [showModal, setShowModal] = useState(false)
//   const [formData, setFormData] = useState({ subject: '', description: '' })

//   const handleShowModal = () => setShowModal(true)
//   const handleCloseModal = () => {
//     setShowModal(false)
//     setFormData({ subject: '', description: '' })
//   }

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const newTicket = {
//       id: tickets.length + 1,
//       subject: formData.subject,
//       status: 'Open',
//       date: new Date().toISOString().split('T')[0],
//     }
//     setTickets([newTicket, ...tickets])
//     handleCloseModal()
//   }

//   return (
//     <div>
//       <h2>Support Tickets</h2>
//       <p>View and manage user-submitted support requests.</p>

//       <Button variant="primary" onClick={handleShowModal} className="mb-3">
//         <i className="bi bi-plus-circle me-2"></i> New Ticket
//       </Button>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Subject</th>
//             <th>Status</th>
//             <th>Date Submitted</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tickets.map((ticket) => (
//             <tr key={ticket.id}>
//               <td>{ticket.id}</td>
//               <td>{ticket.subject}</td>
//               <td>
//                 <span
//                   className={`badge ${
//                     ticket.status === 'Open' ? 'bg-warning text-dark' : 'bg-success'
//                   }`}
//                 >
//                   {ticket.status}
//                 </span>
//               </td>
//               <td>{ticket.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Ticket Submission Modal */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Submit New Ticket</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Form.Group className="mb-3">
//               <Form.Label>Subject</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="description"
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit">
//               Submit Ticket
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   )
// }

// export default Ticketing
