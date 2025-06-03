import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import logo from './assets/fullLogo.png'
import icon from './assets/icon.png'

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setSidebarOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const path = window.location.pathname
    if (!token && path === '/dashboard') {
      navigate('/dashboard')
    }
  }, [navigate])

  useEffect(() => {
    document.body.classList.toggle('bg-dark', darkMode)
    document.body.classList.toggle('text-white', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setCollapsed(!collapsed)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
      {/* Sidebar */}
      <div
        className={`border-end position-fixed top-0 start-0 d-flex flex-column h-100 ${
          isMobile ? `${sidebarOpen ? 'd-block' : 'd-none'}` : 'd-md-flex'
        } ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}
        // style={{
        //   width: collapsed && !isMobile ? '0' : '250px',
        //   zIndex: 1040,
        //   transition: 'all 0.3s ease-in-out',
        //   overflowY: 'auto',
        // }}
        style={{
          width: isMobile ? '80vw' : (collapsed ? '0' : '250px'),
          zIndex: 1040,
          transition: 'all 0.3s ease-in-out',
          overflowY: 'auto',
        }}
      >
        <div
          className="p-3 border-bottom d-flex justify-content-between align-items-center"
          style={{ height: !isMobile ? '67px' : '67px' }}
        >
        <div className="d-flex align-items-center">
          <img src={icon} alt="icon" className="me-2" style={{ width: '30px', height: '30px'}} />
          <h5 className="m-0">Admin Panel</h5>
        </div>
          {isMobile && sidebarOpen && (
            <button
              className="btn btn-sm btn-outline-secondary ms-2"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>

        <ul className="nav flex-column p-2 flex-grow-1">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link${isActive ? ' active fw-bold text-black' : ''} ${darkMode ? 'text-white' : ''}`
              }
              style={{
                color: '#0d6efd',
              }}
              end
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <i className="bi bi-house me-2"></i> Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `nav-link${isActive ? ' active fw-bold text-black' : ''} ${darkMode ? 'text-white' : ''}`
              }
              style={{
                color: '#0d6efd',
              }}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <i className="bi bi-people me-2"></i> Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/dashboard/tickets"
              className={({ isActive }) =>
                `nav-link ${isActive ? ' active fw-bold text-black' : ''} ${darkMode ? 'text-white' : ''}`
              }
              style={{
                color: '#0d6efd',
              }}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <i className="bi bi-ticket-detailed me-2"></i> Ticketing
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                `nav-link${isActive ? ' active fw-bold text-black' : ''} ${darkMode ? 'text-white' : ''}`
              }
              style={{
                color: '#0d6efd',
              }}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <i className="bi bi-ticket-detailed me-2"></i> Admin
            </NavLink>
          </li>
      
          <li className="nav-item dropdown">
            <a
              className={`nav-link dropdown-toggle ${darkMode ? 'text-white' : ''}`}
              href="#"
              id="settingsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-gear me-2"></i> Settings
            </a>
            <ul className={`dropdown-menu ${darkMode ? 'bg-dark text-white' : ''}`} aria-labelledby="settingsDropdown">
              <li>
                <NavLink
                  className={`dropdown-item ${darkMode ? 'bg-dark text-white' : ''}`}
                  to="/dashboard/settings"
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <i className="bi bi-gear me-2"></i> Settings
                </NavLink>
              </li>
              <li className="dropdown-header">Cronjobs</li>
              <li>
                <NavLink
                  className={`dropdown-item ${darkMode ? 'bg-dark text-white' : ''}`}
                  to="/dashboard/settings/cronjobs/stake-payout"
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Stake Payout Job
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item ${darkMode ? 'bg-dark text-white' : ''}`}
                  to="/dashboard/settings/cronjobs/gmp-distro"
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  GMP Distro Job
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item ${darkMode ? 'bg-dark text-white' : ''}`}
                  to="/dashboard/settings/cronjobs/referral-check"
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Referral Check Job
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item ${darkMode ? 'bg-dark text-white' : ''}`}
                  to="/dashboard/settings/cronjobs/rank-promo"
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Rank Promo
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item ${darkMode ? 'bg-dark text-white' : ''}`}
                  to="/dashboard/settings/cronjobs/rank-bonus"
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Rank Bonus
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        
        <div className="p-2 border-top">
          <button
            className="btn btn-sm btn-outline-danger w-100 mb-2"
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/login')
            }}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>

          <button
            className="btn btn-sm btn-outline-secondary w-100"
            onClick={toggleDarkMode}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* <div className="p-2 border-top">
          <button
            className="btn btn-sm btn-outline-secondary w-100"
            onClick={toggleDarkMode}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div> */}
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-grow-1 ${darkMode ? 'bg-dark text-white' : ''}`}
        style={{
          marginLeft: isMobile || collapsed ? '0' : '250px',
          transition: 'margin-left 0.3s',
          width: '100%',
        }}
      >
        <nav className={`navbar sticky-top ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} border-bottom px-3`}>
          <button
            className="btn btn-outline-primary d-md-none"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <span className="navbar-brand mb-0 h1">
            <img src={logo} alt="Logo" className="me-2" style={{ width: '150px', height: '40px'}} />
            {/* Dashboard */}
          </span>
        </nav>

        <main className="p-3 container-fluid">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

{/* <li className="nav-item dropdown">
<a
  className={`nav-link dropdown-toggle ${darkMode ? 'text-white' : ''}`}
  href="#"
  id="adminDropdown"
  role="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  <i className="bi bi-person-gear me-2"></i> Admin
</a>
<ul className={`dropdown-menu ${darkMode ? 'bg-dark text-white' : ''}`} aria-labelledby="adminDropdown">
  <li>
    <NavLink
      className={`dropdown-item ${darkMode ? 'bg-dark text-white' : ''}`}
      to="/dashboard/admin"
      onClick={() => isMobile && setSidebarOpen(false)}
    >
      Add Admin
    </NavLink>
  </li>
  <li>
    <NavLink
      className={`dropdown-item ${darkMode ? 'bg-dark text-white' : ''}`}
      to="/dashboard/admin"
      onClick={() => isMobile && setSidebarOpen(false)}
    >
      Manage Admins
    </NavLink>
  </li>
</ul>
</li> */}
// import React, { useState, useEffect } from 'react'
// import { Outlet, NavLink, useNavigate } from 'react-router-dom'

// const DashboardLayout = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [collapsed, setCollapsed] = useState(false)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768
//       setIsMobile(mobile)
//       if (!mobile) setSidebarOpen(false)
//     }

//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     const path = window.location.pathname
//     if (!token && path == '/dashboard') {
//       navigate('/dashboard')
//     }
//   }, [navigate])


//   const toggleSidebar = () => {
//     if (isMobile) {
//       setSidebarOpen(!sidebarOpen)
//     } else {
//       setCollapsed(!collapsed)
//     }
//   }

//   return (
//     <div className="d-flex min-vh-100">
//       {/* Sidebar */}
//       <div
//         className={`bg-light border-end position-fixed top-0 start-0 d-flex flex-column h-100 ${
//           isMobile
//             ? `h-100 ${sidebarOpen ? 'd-block' : 'd-none'}`
//             : 'd-md-flex'
//         }`}
//         style={{
//           width: collapsed && !isMobile ? '0' : '250px',
//           zIndex: 1040,
//           transition: 'all 0.3s ease-in-out',
//           overflowY: 'auto',
//         }}
//       >
//         <div
//           className="p-3 border-bottom d-flex justify-content-between align-items-center"
//           style={{ 
//             height: !isMobile ? '51px' : '55px',
//           }}
//         >
//           <h5 className="m-0">Admin Panel</h5>
//           {isMobile && sidebarOpen && (
//             <button
//               className="btn btn-sm btn-outline-secondary ms-2"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <i className="bi bi-x-lg"></i>
//             </button>
//           )}
//         </div>

//         <ul className="nav flex-column p-2 flex-grow-1">
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//               end
//               onClick={() => isMobile && setSidebarOpen(false)}
//             >
//               <i className="bi bi-house me-2"></i> Home
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard/users"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//               onClick={() => isMobile && setSidebarOpen(false)}
//             >
//               <i className="bi bi-people me-2"></i> Users
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard/tickets"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//               onClick={() => isMobile && setSidebarOpen(false)}
//             >
//               <i className="bi bi-ticket-detailed me-2"></i> Ticketing
//             </NavLink>
//           </li>

//           <li className="nav-item dropdown">
//             <a
//               className="nav-link dropdown-toggle"
//               href="#"
//               id="adminDropdown"
//               role="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <i className="bi bi-person-gear me-2"></i> Admin
//             </a>
//             <ul className="dropdown-menu" aria-labelledby="adminDropdown">
//               <li>
//                 <NavLink
//                   className="dropdown-item"
//                   to="/dashboard/admin"
//                   onClick={() => isMobile && setSidebarOpen(false)}
//                 >
//                   Add Admin
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   className="dropdown-item"
//                   to="/dashboard/admin"
//                   onClick={() => isMobile && setSidebarOpen(false)}
//                 >
//                   Manage Admins
//                 </NavLink>
//               </li>
//             </ul>
//           </li>

//           <li className="nav-item dropdown">
//             <a
//               className="nav-link dropdown-toggle"
//               href="#"
//               id="settingsDropdown"
//               role="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <i className="bi bi-gear me-2"></i> Settings
//             </a>
//             <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
//               <li className="dropdown-header">Cronjobs</li>
//               <li>
//                 <NavLink
//                   className="dropdown-item"
//                   to="/dashboard/settings/cronjobs/stake-payout"
//                   onClick={() => isMobile && setSidebarOpen(false)}
//                 >
//                   Stake Payout Job
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   className="dropdown-item"
//                   to="/dashboard/settings/cronjobs/gmp-distro"
//                   onClick={() => isMobile && setSidebarOpen(false)}
//                 >
//                   GMP Distro Job
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   className="dropdown-item"
//                   to="/dashboard/settings/cronjobs/referral-check"
//                   onClick={() => isMobile && setSidebarOpen(false)}
//                 >
//                   Referral Check Job
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   className="dropdown-item"
//                   to="/dashboard/settings/cronjobs/rank-promo"
//                   onClick={() => isMobile && setSidebarOpen(false)}
//                 >
//                   Rank Promo
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   className="dropdown-item"
//                   to="/dashboard/settings/cronjobs/rank-bonus"
//                   onClick={() => isMobile && setSidebarOpen(false)}
//                 >
//                   Rank Bonus
//                 </NavLink>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content Area */}
//       <div
//         className="flex-grow-1"
//         style={{
//           marginLeft: isMobile || collapsed ? '0' : '250px',
//           transition: 'margin-left 0.3s',
//           width: '100%',
//         }}
//       >
//         <nav className="navbar navbar-light bg-light border-bottom px-3">
//           <button
//             className="btn btn-outline-primary d-md-none"
//             onClick={toggleSidebar}
//           >
//             ☰
//           </button>
//           <span className="navbar-brand mb-0 h1">Dashboard</span>
//         </nav>

//         <main className="p-3">
//           <Outlet />
//         </main>
//       </div>
      
//     </div>
//   )
// }

// export default DashboardLayout








// import React, { useState } from 'react'
// import { Outlet, NavLink } from 'react-router-dom'

// const DashboardLayout = () => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

//   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

//   return (
//     <div className="d-flex">
//       <nav
//         className={`bg-light border-end ${
//           sidebarCollapsed ? 'd-none d-md-block' : ''
//         }`}
//         style={{ width: sidebarCollapsed ? '0' : '250px', height: '100%', transition: 'width 0.3s' }}
//       >
//         <div className="sidebar-header p-3">
//           <h4>Admin Panel</h4>
//         </div>
//         <ul className="nav flex-column">
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//               end
//             >
//               <i className="bi bi-house me-2"></i> Home
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard/users"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//             >
//               <i className="bi bi-people me-2"></i> Users
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard/tickets"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//             >
//               <i className="bi bi-ticket-detailed me-2"></i> Ticketing
//             </NavLink>
//           </li>

//           <li className="nav-item dropdown">
//             <a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//               <i className="bi bi-person-gear me-2"></i> Admin
//             </a>
//             <ul className="dropdown-menu" aria-labelledby="adminDropdown">
//               <li>
//                 <NavLink className="dropdown-item" to="/dashboard/admin">Add Admin</NavLink>
//               </li>
//               <li>
//                 <NavLink className="dropdown-item" to="/dashboard/admin">Manage Admins</NavLink>
//               </li>
//             </ul>
//           </li>

//           <li className="nav-item dropdown">
//             <a className="nav-link dropdown-toggle" href="#" id="settingsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//               <i className="bi bi-gear me-2"></i> Settings
//             </a>
//             <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
//               <li className="dropdown-header">Cronjobs</li>
//               <li><NavLink className="dropdown-item" to="/dashboard/settings/cronjobs/stake-payout">Stake Payout Job</NavLink></li>
//               <li><NavLink className="dropdown-item" to="/dashboard/settings/cronjobs/gmp-distro">GMP Distro Job</NavLink></li>
//               <li><NavLink className="dropdown-item" to="/dashboard/settings/cronjobs/referral-check">Referral Check Job</NavLink></li>
//               <li><NavLink className="dropdown-item" to="/dashboard/settings/cronjobs/rank-promo">Rank Promo</NavLink></li>
//               <li><NavLink className="dropdown-item" to="/dashboard/settings/cronjobs/rank-bonus">Rank Bonus</NavLink></li>
//             </ul>
//           </li>

//         </ul>
//       </nav>

//       <div className="flex-grow-1">
//         {/* Top Navbar */}
//         <nav className="navbar navbar-light bg-light border-bottom">
//           <div className="container-fluid">
//             <button
//               className="btn btn-outline-primary d-md-none"
//               onClick={toggleSidebar}
//             >
//               ☰
//             </button>
//             <span className="navbar-brand mb-0 h1">Dashboard</span>
//           </div>
//         </nav>

//         {/* Main Content */}
//         <main className="p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout;



// import React, { useState } from 'react'
// import { Outlet, NavLink } from 'react-router-dom'

// const DashboardLayout = () => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

//   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

//   return (
//     <div className="d-flex">
//       <nav
//         className={`bg-light border-end ${
//           sidebarCollapsed ? 'd-none d-md-block' : ''
//         }`}
//         style={{ width: sidebarCollapsed ? '0' : '250px', transition: 'width 0.3s' }}
//       >
//         <div className="sidebar-header p-3">
//           <h4>Admin Panel</h4>
//         </div>
//         <ul className="nav flex-column">
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//               end
//             >
//               Home
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard/users"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//             >
//               Users
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard/tickets"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//             >
//               Ticketing
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard/admin"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//             >
//               Admin
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/dashboard/settings"
//               className={({ isActive }) =>
//                 'nav-link' + (isActive ? ' active fw-bold' : '')
//               }
//             >
//               Settings
//             </NavLink>
//           </li>
//         </ul>
//       </nav>

//       <div className="flex-grow-1">
//         {/* Top Navbar */}
//         <nav className="navbar navbar-light bg-light border-bottom">
//           <div className="container-fluid">
//             <button
//               className="btn btn-outline-primary d-md-none"
//               onClick={toggleSidebar}
//             >
//               ☰
//             </button>
//             <span className="navbar-brand mb-0 h1">Dashboard</span>
//           </div>
//         </nav>

//         {/* Main Content */}
//         <main className="p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout
