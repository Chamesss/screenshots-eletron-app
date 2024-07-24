import { HashRouter, Route, Routes } from 'react-router-dom'
import ScreenshotDashboard from './pages/screenshot-dashboard'
import UserSelection from './pages/user-selection'

function App(): JSX.Element {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" Component={UserSelection} />
          <Route path="/dashboard" Component={ScreenshotDashboard} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
