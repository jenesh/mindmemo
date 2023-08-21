import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);

  const postTask = async (title, url, notes, dataTime, userId) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/userDetails/userMemo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          url: url,
          notes: notes,
          dataTime: dataTime,
          userId: userId,
        }),
      },
    );
    const responseData = await response.json();
    console.log(responseData);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const responseData = queryParams.get("data");
    const responsePostTask = queryParams.get("post-task");

    if (responseData) {
      const parsedData = JSON.parse(decodeURIComponent(responseData));
      localStorage.setItem("mindmeo-userData", JSON.stringify(parsedData)); // Store parsed data in localStorage
      setUserData(parsedData);
    } else if (responsePostTask) {
      console.log(responsePostTask);
      const parsedData = JSON.parse(decodeURIComponent(responsePostTask));
      const userId = JSON.parse(localStorage.getItem("mindmeo-userData")).id;
      console.log(userId);
      postTask(
        parsedData.title,
        parsedData.url,
        parsedData.notes,
        parsedData.dataTime,
        userId,
      );
    } else {
      const storedData = localStorage.getItem("userData");
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
      <a href={import.meta.env.VITE_APP_AUTH_URL}>
        Authenticate Google Tasks option
      </a>
    </>
  );
}

export default App;
