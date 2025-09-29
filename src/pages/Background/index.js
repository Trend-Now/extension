chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'FLOAT_CLICKED') {
    // 예: 확장 내부 페이지 열기
    const url = chrome.runtime.getURL('popup.html');
    chrome.tabs.create({ url });
  }
});
