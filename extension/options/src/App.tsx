import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const responseData = queryParams.get('data');

    if (responseData) {
      const parsedData = JSON.parse(decodeURIComponent(responseData));
      localStorage.setItem('mindmeo-userData', JSON.stringify(parsedData)); // Store parsed data in localStorage
      setUserData(parsedData);
    } else {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    }
  }, []);

  return (
    <>
      <div>
        {userData ? (
          <div>
            <h1>Welcome, {userData.name}!</h1>
            <p>Email: {userData.email}</p>
            {/* Display other user data */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <a href="https://mindmemo.onrender.com/authRoutes/auth/google">Authenticate Google Tasks option</a>
    </>
  );
}

export default App;
