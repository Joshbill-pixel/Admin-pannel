import React, { useState } from 'react'
import { Card, Button, Modal, Form, Table, Row, Col } from 'react-bootstrap'

const initialTasks = [
  {
    id: 1,
    title: 'Invite 5 Users',
    description: 'Invite 5 new users to the platform',
    reward: 100,
    deadline: '2025-07-10',
    status: 'Active',
    rewarded: false,
  },
  {
    id: 2,
    title: 'Join Telegram Group',
    description: 'Join our community group for updates',
    reward: 50,
    deadline: '2025-07-05',
    status: 'Completed',
    rewarded: true,
  },
]

const ManageTask = () => {
  const [tasks, setTasks] = useState(initialTasks)
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    reward: '',
    deadline: '',
    status: 'Active',
    rewarded: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value })
    } else {
      setNewTask({ ...newTask, [name]: value })
    }
  }

  const handleCreateTask = () => {
    const id = tasks.length + 1
    setTasks([...tasks, { id, ...newTask }])
    setNewTask({
      title: '',
      description: '',
      reward: '',
      deadline: '',
      status: 'Active',
      rewarded: false,
    })
    setShowModal(false)
  }

  const handleUpdateTask = () => {
    const updated = tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
    setTasks(updated)
    setEditingTask(null)
    setShowModal(false)
  }

  const handleRewardToggle = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, rewarded: !task.rewarded } : task
    )
    setTasks(updated)
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setShowModal(true)
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Task Management</h3>

      {/* Create Task Button */}
      <div className="text-end mb-3">
        <Button onClick={() => { setShowModal(true); setEditingTask(null) }}>
          <i className="bi bi-plus-circle me-2"></i>Create Task
        </Button>
      </div>

      {/* Task List Table */}
      <Card className="p-3 shadow-sm">
        <h5 className="mb-3">Task List</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Reward</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Rewarded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No tasks available.</td>
              </tr>
            ) : (
              tasks.map((task, i) => (
                <tr key={task.id}>
                  <td>{i + 1}</td>
                  <td>{task.title}</td>
                  <td>${task.reward}</td>
                  <td>
                    <span className={`badge bg-${task.status === 'Completed' ? 'secondary' : 'success'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.deadline}</td>
                  <td>
                    {task.rewarded ? (
                      <span className="text-success">Yes</span>
                    ) : (
                      <span className="text-danger">No</span>
                    )}
                  </td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleEdit(task)} className="me-2">
                      View / Edit
                    </Button>
                    <Button
                      size="sm"
                      variant={task.rewarded ? 'warning' : 'success'}
                      onClick={() => handleRewardToggle(task.id)}
                    >
                      {task.rewarded ? 'Revoke' : 'Reward'}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Create / Edit Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? 'Edit Task' : 'Create New Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editingTask ? editingTask.title : newTask.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={editingTask ? editingTask.description : newTask.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Reward ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="reward"
                    value={editingTask ? editingTask.reward : newTask.reward}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={editingTask ? editingTask.deadline : newTask.deadline}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={editingTask ? editingTask.status : newTask.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={editingTask ? handleUpdateTask : handleCreateTask}
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ManageTask