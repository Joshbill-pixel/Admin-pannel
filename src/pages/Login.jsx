import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation and fake auth (replace with real backend logic)
    if (!form.email || !form.password) {
      setError('Please enter email and password.')
      return
    }else {
      alert('Login successful! Redirecting to Dashboard.')
      navigate('/dashboard')
      // setError('Invalid email or password')
    }

    // if (form.email === 'admin@example.com' && form.password === 'admin123') {
    //   setError('')
    //   navigate('/dashboard')
    // }  
    
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login



// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Login = () => {
//   const navigate = useNavigate()
//   const [credentials, setCredentials] = useState({ email: '', password: '' })

//   const handleChange = e => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = e => {
//     e.preventDefault()
//     // Perform login validation here (e.g. check credentials)
//     navigate('/dashboard')
//   }

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
//         <h3 className="text-center mb-4">Login</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={credentials.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Login</button>
//         </form>
//         <p className="text-center mt-3 mb-0">
//           Don't have an account? <a href="/signup">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login
