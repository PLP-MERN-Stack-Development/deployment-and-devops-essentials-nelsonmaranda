import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="app">
      {!user ? (
        <Auth onLogin={setUser} />
      ) : (
        <Chat user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
