import { useEffect, useState } from "react";

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
      if (!localStorage.getItem("mindmeo-userData")) {
        window.location.replace(`${import.meta.env.VITE_APP_CLIENT_URL}/`);
      }

      const parsedData = JSON.parse(decodeURIComponent(responsePostTask));
      const userId = JSON.parse(localStorage.getItem("mindmeo-userData")).id;

      postTask(
        parsedData.title,
        parsedData.url,
        parsedData.notes,
        parsedData.dataTime,
        userId,
      );
      window.close();
    } else {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <img src="/hello.gif" alt="hello" className="h-1/2 w-1/2" />
        </div>

        {userData ? (
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="font-semibold text-2xl">
              Welcome, {userData.name}!
            </div>
            {/* <div>Email: {userData.email}</div> */}
            <div className="font-medium font-xl">
              You are successfully authenticated!!
            </div>
            <div className="font-medium text-lg">
              You can close the window now!!
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4 items-center justify-center">
            <div className="font-semibold text-xl">
              To use MindMemo, Please sign up with your google account!!
            </div>
            <div className="border-2 border-black rounded-md p-2 hover:bg-slate-100 w-1/2">
              <a
                className="flex items-center justify-center space-x-3 "
                href={`${
                  import.meta.env.VITE_APP_SERVER_URL
                }/authRoutes/auth/google`}>
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="scale-125">
                  <path
                    d="M16.3444 6.4332H15.7V6.4H8.5V9.6H13.0212C12.3616 11.4628 10.5892 12.8 8.5 12.8C5.8492 12.8 3.7 10.6508 3.7 8C3.7 5.3492 5.8492 3.2 8.5 3.2C9.7236 3.2 10.8368 3.6616 11.6844 4.4156L13.9472 2.1528C12.5184 0.8212 10.6072 0 8.5 0C4.082 0 0.5 3.582 0.5 8C0.5 12.418 4.082 16 8.5 16C12.918 16 16.5 12.418 16.5 8C16.5 7.4636 16.4448 6.94 16.3444 6.4332Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M1.42236 4.2764L4.05076 6.204C4.76196 4.4432 6.48436 3.2 8.49996 3.2C9.72356 3.2 10.8368 3.6616 11.6844 4.4156L13.9472 div2.1528C12.5184 0.8212 10.6072 0 8.49996 0C5.42716 0 2.76236 1.7348 1.42236 4.2764Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M8.49993 16C10.5663 16 12.4439 15.2092 13.8635 13.9232L11.3875 11.828C10.5843 12.4364 9.58593 12.8 8.49993 12.8C6.41913 12.8 4.65233 11.4732 3.98673 9.62158L1.37793 11.6316C2.70193 14.2224 5.39073 16 8.49993 16Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M16.3444 6.43322H15.7V6.40002H8.5V9.60002H13.0212C12.7044 10.4948 12.1288 11.2664 11.3864 11.8284C11.3868 11.828 11.3872 11.828 11.3876 11.8276L13.8636 13.9228C13.6884 14.082 16.5 12 16.5 8.00002C16.5 7.46362 16.4448 6.94002 16.3444 6.43322Z"
                    fill="#1976D2"
                  />
                </svg>
                <div className="text-[#030C2D] text-base font-Inter font-medium">
                  Continue with Google
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
