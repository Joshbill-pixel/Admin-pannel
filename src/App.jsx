import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/dashboard/Home'
import Users from './pages/dashboard/Users'
import UsersProfile from './pages/dashboard/UsersProfile'
import Ticketing from './pages/dashboard/Ticketing'
import ManageWithdraw from './pages/dashboard/ManageWithdraw'
import ManageStaking from './pages/dashboard/ManageStaking'
import ManageTask from './pages/dashboard/ManageTask'
import Reports from './pages/dashboard/Reports'
import Maintenance from './pages/dashboard/Maintenance'
import Admin from './pages/dashboard/Admin'
import AdminsProfile from './pages/dashboard/AdminsProfile'
import Settings from './pages/dashboard/settings/Settings'
import StakePayout from './pages/dashboard/settings/cronjobs/StakePayout'
import GMPDistro from './pages/dashboard/settings/cronjobs/GmpDistro'
import ReferralCheck from './pages/dashboard/settings/cronjobs/ReferralCheck'
import RankPromo from './pages/dashboard/settings/cronjobs/RankPromo'
import RankBonus from './pages/dashboard/settings/cronjobs/RankBonus'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="/dashboard/user-profile/:id" element={<UsersProfile />} />
        <Route path="tickets" element={<Ticketing />} />
        <Route path="manage-withdraw" element={<ManageWithdraw />} />
        <Route path="manage-staking" element={<ManageStaking />} />
        <Route path="manage-task" element={<ManageTask />} />
        <Route path="reports" element={<Reports />} />
        <Route path="maintenance" element={<Maintenance />} />
        
        {/* Admin Routes Rendered Inside DashboardLayout */}
        <Route path="admin" element={<Admin />} />
        <Route path="admin-profile/:id" element={<AdminsProfile />} />
        <Route path="settings" element={<Settings />} />

        {/* Cronjob Routes Rendered Inside DashboardLayout */}
        <Route path="settings/cronjobs/stake-payout" element={<StakePayout />} />
        <Route path="settings/cronjobs/gmp-distro" element={<GMPDistro />} />
        <Route path="settings/cronjobs/referral-check" element={<ReferralCheck />} />
        <Route path="settings/cronjobs/rank-promo" element={<RankPromo />} />
        <Route path="settings/cronjobs/rank-bonus" element={<RankBonus />} />
      </Route>
    </Routes>
  )
}

export default App
