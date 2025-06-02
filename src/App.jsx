import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/dashboard/Home'
import Users from './pages/dashboard/Users'
import Ticketing from './pages/dashboard/Ticketing'
import Admin from './pages/dashboard/Admin'
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
        <Route path="tickets" element={<Ticketing />} />
        <Route path="admin" element={<Admin />} />
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
