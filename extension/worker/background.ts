// // background.js

// // Reload all tabs
// function reloadAllTabs() {
//   chrome.tabs.query({}, function (tabs) {
//     for (const tab of tabs) {
//       chrome.tabs.reload(tab.id);
//     }
//   });
// }

// // Listen for a message from the content script
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === 'reloadTabs') {
//     reloadAllTabs();
//   }
// });
