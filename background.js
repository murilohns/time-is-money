chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ income: null }, function() {
    console.log('Time is Money extension is ON');
  });
});