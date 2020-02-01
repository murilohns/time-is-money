const incomeInput = document.getElementById('monthly-income');
const confirmButton = document.getElementById('confirmButton');

chrome.storage.sync.get('income', function({ income }) {
  incomeInput.value = income;
});

confirmButton.addEventListener('click', () => {
  let income = incomeInput.value;
  updateIncome(income);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'income', income }, (response) => {
      console.log(JSON.stringify(response));
    });
  });
});

const updateIncome = income => {
  chrome.storage.sync.set({ income }, () => {
    console.log(`[Time is Money Extension] Income updated to ${income}`);
  });
};
