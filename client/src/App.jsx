import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import styles from './styles/dashboard.module.css'

function App() {

  return (
    <>
      <div className={styles.appRoot}>
        <Sidebar />
        <main className="main-content">
          <Dashboard />
        </main>
      </div>
    </>
  )
}

export default App
