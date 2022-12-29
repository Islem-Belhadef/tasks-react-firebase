// React & Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

function App() {

  return (
    <div className="App">
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
