import React, { useEffect, useState } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import MemoDetails from './components/MemoDetails';
import styled from 'styled-components';
import RemindMe from './components/RemindMe';
import Notes from './components/Notes';
import Saved from './components/Saved';
import MindMemoIcon from './components/MindMemoIcon';

const MainForm = styled.div`
  &&& {
    font-family: Inter,sans-serif;
  }

  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  height: fit-content;
  position: relative;
  top: -14px;
  width: 272px;
  margin: 0 8px;
  box-sizing: border-box;
`;

function App() {
  const currentDate = new Date()
  const [isJWT, setIsJWT] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const pageHeading = document.querySelectorAll('h1')[0]?.textContent
  let pageSubHeading = document.querySelectorAll('h2')[0]?.textContent
  pageSubHeading = pageSubHeading ? pageSubHeading + "..." : pageSubHeading
  const [title, setTitle] = useState(pageHeading || '');
  const [url, setUrl] = useState(window.location.href);
  const [notes, setNotes] = useState(pageSubHeading || '');
  const [titleUp, setTitleUp] = useState(false);
  const [startDate, setStartDate] = useState(currentDate);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (title.length > 0 && url.length > 0 && startDate !== null) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [title, url, startDate])

  const handleTodayClick = () => {
    console.log(`handleTodayClick`)
    setStartDate(new Date())
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    //localhost:5173/
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(`handleTomorrowClick`)
    setStartDate(tomorrow)
  };

  const handleTwoDaysAfterClick = () => {
    const twoDaysAfter = new Date();
    twoDaysAfter.setDate(twoDaysAfter.getDate() + 2);
    console.log(`handleTwoDaysAfterClick`)
    setStartDate(twoDaysAfter)
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      // Adjust the div's position based on mouse movement
      // For example: div.style.left = e.clientX + 'px';
      //              div.style.top = e.clientY + 'px';
    }
  };

  const handleMouseUp = () => {
    setDragging(false);

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSaved(true);
    let dataToPass = { title: title, url: url, dataDate: startDate, notes: notes };
    dataToPass = encodeURIComponent(JSON.stringify(dataToPass));
    // let queryString = Object.keys(dataToPass)
    //   .map((key) => key + '=' + encodeURIComponent(dataToPass[key]))
    //   .join('&');
    let newWindow = window.open(`https://mindmemo-auth.vercel.app/post?post-task=${dataToPass}`, '_blank');
  };

  return (
    <>
      {isJWT && (
        <>
          {isOpen ? (
            <div>
              {!saved ? (
                <Container>
                  <Header handleMouseDown={handleMouseDown} setIsOpen={setIsOpen} />
                  <MainForm>
                    <MemoDetails
                      title={title}
                      titleUp={titleUp}
                      setTitle={setTitle}
                      setTitleUp={setTitleUp}
                      url={url}
                      setUrl={setUrl}
                    />
                    <RemindMe
                      startDate={startDate}
                      setStartDate={setStartDate}
                      handleTodayClick={handleTodayClick}
                      handleTomorrowClick={handleTomorrowClick}
                      handleTowDaysAfterClick={handleTwoDaysAfterClick}
                    />
                    <Notes
                      notes={notes}
                      setNotes={setNotes}
                      handleSave={handleSave}
                      canSave={canSave}
                    />
                  </MainForm>
                </Container>
              ) : (
                <div id="content-script-root">
                  {/* 
                    FUTURE FEATURE: NEW STATE THAT CHECKS IF A LINK IS ALREADY AN ACTIVE TASK 
                    PROBABLY A REQURE A NEW TASKS DB AND CAN HAVE THE LINK AS THE PK
                  */}
                  <Saved
                    handleMouseDown={handleMouseDown}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title={title}
                    url={url}
                    startDate={startDate}
                    notes={notes}
                  />
                </div>
              )}
            </div >
          ) : (
            <MindMemoIcon setIsOpen={setIsOpen} />
          )
          }
        </>
      )
      }
    </>
  );
}

export default App;
