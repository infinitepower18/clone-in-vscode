chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.match(/^https:\/\/github.com\/.*/) || tab.url.match(/^https:\/\/gitlab.com\/.*/)) {
    browser.browserAction.enable(tabId);
  } else {
    browser.browserAction.disable(tabId);
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
  if (tab.url && (tab.url.match(/^https:\/\/github.com\/.*/)|| tab.url.match(/^https:\/\/gitlab.com\/.*/))) {
    browser.browserAction.enable(tabId);
  } else if (tab.url) {
    browser.browserAction.disable(tabId);
  }
});

chrome.runtime.onStartup.addListener(() => {
  browser.browserAction.disable();
});

chrome.runtime.onInstalled.addListener(() => {
  browser.browserAction.disable();
});

browser.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        const url = new URL(tabs[0].url);
        const path = url.pathname.split('/');
        if (path[1] !== undefined && path[2] !== undefined) {
          chrome.tabs.create({url: "vscode://vscode.git/clone?url=https://" + url.hostname + "/" + path[1] + "/" + path[2] + ".git"});
        }
    });
  })