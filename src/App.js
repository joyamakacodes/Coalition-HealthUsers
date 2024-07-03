import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="m-4 text-sm">
        <Navbar/>
        <Dashboard/>
    </div>
  );
}

export default App;
