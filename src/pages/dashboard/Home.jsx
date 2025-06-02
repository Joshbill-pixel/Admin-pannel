import React from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Home = () => {
  const isDarkMode = document.body.classList.contains('dark')

  const textColor = isDarkMode ? '#ffffff' : '#000000'
  const gridColor = isDarkMode ? '#444' : '#ccc'

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        color: textColor,
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  }

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'User Registrations',
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  }

  const barData = {
    labels: ['Login', 'Sign-up', 'Purchases', 'Messages', 'Support'],
    datasets: [
      {
        label: 'User Actions',
        data: [200, 150, 90, 70, 40],
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffcd56',
          '#4bc0c0',
          '#9966ff',
        ],
        borderRadius: 6,
      },
    ],
  }

  const pieData = {
    labels: ['Browsing', 'Checkout', 'Referrals', 'Edits'],
    datasets: [
      {
        label: 'Interactions',
        data: [35, 25, 20, 20],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56', '#4bc0c0'],
        borderWidth: 1,
      },
    ],
  }

  const engagementPercentage = 76

  return (
    <div className="container mt-4">
      <h2 className="mb-2" style={{ color: textColor }}>📊 Dashboard Analytics</h2>
      <p className="text-muted mb-4" style={{ color: textColor }}>
        Welcome to the analytics dashboard. Here's how users interact with your platform.
      </p>

      {/* Line + Bar Charts */}
      <div className="d-flex flex-wrap gap-4 mb-5">
        <div className="flex-fill" style={{ maxWidth: '500px' }}>
          <Line
            data={lineData}
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                title: { ...commonOptions.plugins.title, text: 'User Registrations Over Time' },
              },
            }}
          />
        </div>

        <div className="flex-fill" style={{ maxWidth: '500px'}}>
          <Bar
            data={barData}
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                title: { ...commonOptions.plugins.title, text: 'User Actions Breakdown' },
              },
            }}
          />
        </div>
      </div>

      {/* Pie Chart + Circular Progress */}
      <div className="d-flex flex-wrap gap-4 align-items-center justify-content-start">
        <div className="flex-fill" style={{ maxWidth: '400px' }}>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { color: textColor },
                },
                title: {
                  display: true,
                  text: 'User Interaction Distribution',
                  color: textColor,
                },
              },
            }}
          />
        </div>

        <div
          className="flex-fill d-flex justify-content-center align-items-center"
          style={{ maxWidth: '400px' }}
        >
          <div
            className="text-center"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: `conic-gradient(#36a2eb ${engagementPercentage * 3.6}deg, #e0e0e0 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: textColor,
            }}
          >
            <div>
              {engagementPercentage}%<br />
              Engagement
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home



// import React from 'react'
// import { Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// )

// const Home = () => {
//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     datasets: [
//       {
//         label: 'User Registrations',
//         data: [12, 19, 3, 5, 2, 3, 9],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1,
//       },
//     ],
//   }

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'User Registrations Over Time',
//       },
//     },
//   }

//   return (
//     <div>
//       <h2>Dashboard Analytics</h2>
//       <p>Welcome to the analytics dashboard.</p>
//       <div style={{ maxWidth: '700px' }}>
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   )
// }

// export default Home
