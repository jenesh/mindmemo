const container = document.createElement('div');
container.id = 'content-script-root';

document.body.appendChild(container);

const draggableArea = document.createElement('div');
draggableArea.className = 'draggable-area';
container.appendChild(draggableArea);

// Create and append an icon or element for dragging
const dragIcon = document.createElement('div');
dragIcon.className = 'drag-icon';
draggableArea.appendChild(dragIcon);

// Apply the draggable behavior
let isDragging = false;
let offset = { x: 0, y: 0 };

dragIcon.addEventListener('mousedown', (e) => {
  isDragging = true;
  offset = {
    x: e.clientX - container.getBoundingClientRect().left,
    y: e.clientY - container.getBoundingClientRect().top,
  };
  container.style.zIndex = '9999';
  container.style.pointerEvents = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    container.style.left = e.clientX - offset.x + 'px';
    container.style.top = e.clientY - offset.y + 'px';
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    container.style.zIndex = ''; // Reset the z-index
    container.style.pointerEvents = ''; // Reset pointer events
  }
});

console.log(document.body);

// GET Active Tab and Access to DOM
// let tabId: number;
// document.getElementById('accessDOM').addEventListener('click', () => {
//   chrome.scripting.executeScript({
//     target: { tabId: tabId },
//     function: accessDOM,
//   });
// });

// function accessDOM() {
//   // Your DOM access code here
//   const title = document.title;
//   alert(`Title of the current page: ${title}`);
// }

// // Accessing the DOM of the active page
// const pageContent = document.documentElement.outerHTML;

// // Sending the content back to the extension
// chrome.runtime.sendMessage({ content: pageContent });


// chrome.runtime.sendMessage({ action: 'reloadTabs' });

// contentScript.js

// // Inject the React app into the DOM
// function injectApp() {
//   const appContainer = document.createElement('div');
//   appContainer.id = 'content-script-root';
//   document.body.appendChild(appContainer);

//   // Load your React app's JavaScript and CSS files
//   const script = document.createElement('script');
//   script.src = chrome.runtime.getURL('/content-react.js');
//   document.head.appendChild(script);

//   // Optional: Load CSS
//   const styles = document.createElement('link');
//   styles.rel = 'stylesheet';
//   styles.href = chrome.runtime.getURL('/content-root.css');
//   document.head.appendChild(styles);
// }

// // Listen for extension icon click
// chrome.browserAction.onClicked.addListener((tab) => {
//   // Inject your React app when the extension icon is clicked
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: injectApp,
//   });
// });
