import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'

const UsersProfile = () => {
  const { state } = useLocation()
  const user = state?.user

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ ...user })
  const [blacklisted, setBlacklisted] = useState(user?.isBlacklisted || false)

  if (!user) return <p>User not found.</p>

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    console.log('Saving user changes:', formData)
    setEditMode(false)
  }

  const toggleBlacklist = () => {
    setBlacklisted(!blacklisted)
    setFormData({ ...formData, isBlacklisted: !blacklisted })
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User Profile</h3>
        <Button variant="secondary" onClick={() => window.history.back()}>
          <i className="bi bi-arrow-left me-1"></i> Back
        </Button>
      </div>

      <Card className="p-4 shadow-sm">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={!editMode}
            />
            {formData.photo && (
              <div className="mt-2">
                <img
                  src={formData.photo}
                  alt="Uploaded"
                  style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            )}
          </Form.Group>

          {Object.entries({
            id: 'Public ID',
            username: 'Username',
            password: 'Password',
            referralCode: 'Referral Code',
            referralCount: 'Referral Count',
            referredBy: 'Referred By',
            referrals: 'Referrals',
            referralBonus: 'Referral Bonus',
            gmpEarnings: 'GMP Earnings',
            weeklyRankBonusEarnings: 'Weekly Rank Bonus Earnings',
            totalEarnings: 'Total Earnings',
            gmpShares: 'GMP Shares',
            rank: 'Rank',
            totalStakedEarned: 'Total Staked Earned',
            totalStaked: 'Total Staked',
            totalDeposit: 'Total Deposit',
            totalNetwork: 'Total Network',
            totalTeamVolumeSOL: 'Total Team Volume (SOL)',
            totalTeamVolumeUSD: 'Total Team Volume (USD)',
            totalWithdrawals: 'Total Withdrawals',
            withdrawal: 'Withdrawal',
            solWalletAddress: 'SOL Wallet Address',
            solPrivateKey: 'SOL Private Key',
            isBlacklisted: 'Is Blacklisted',
            SLX: 'SLX',
            token: 'Token',
            createdAt: 'Created At',
            updatedAt: 'Updated At'
          }).map(([key, label]) => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                name={key}
                type={key === 'createdAt' || key === 'updatedAt' ? 'datetime-local' : 'text'}
                value={formData[key] || ''}
                onChange={handleChange}
                disabled={
                  !editMode ||
                  key === 'solWalletAddress' ||
                  key === 'solPrivateKey' ||
                  key === 'id' ||
                  key === 'username'
                }
              />
            </Form.Group>
          ))}

          <div className="mt-3">
            <Button
              variant={blacklisted ? 'dark' : 'outline-dark'}
              size="sm"
              onClick={toggleBlacklist}
              className="me-2"
            >
              {blacklisted ? 'Unblacklist User' : 'Blacklist User'}
            </Button>
            {!editMode ? (
              <Button variant="primary" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            ) : (
              <Button variant="success" onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default UsersProfile
