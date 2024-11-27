chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    tab.url.match(/^https:\/\/github.com\/.*/) ||
    tab.url.match(/^https:\/\/gitlab.com\/.*/) ||
    tab.url.match(/^https:\/\/bitbucket.org\/.*/)
  ) {
    chrome.action.enable(tabId);
  } else {
    chrome.action.disable(tabId);
  }
});

chrome.tabs.onCreated.addListener(function (tab) {
  if (
    tab.url &&
    (tab.url.match(/^https:\/\/github.com\/.*/) ||
      tab.url.match(/^https:\/\/gitlab.com\/.*/) ||
      tab.url.match(/^https:\/\/bitbucket.org\/.*/))
  ) {
    chrome.action.enable(tabId);
  } else if (tab.url) {
    chrome.action.disable(tabId);
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.action.disable();
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(
    {
      protocol: "HTTPS",
      application: "VS Code",
      urlScheme: "",
    },
    function (items) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const url = new URL(tabs[0].url);
        const path = url.pathname.split("/");
        if (items.application == "VS Code") {
          openApp = "vscode";
        } else if (items.application == "VS Code Insiders") {
          openApp = "vscode-insiders";
        } else if (items.application == "VSCodium") {
          openApp = "vscodium";
        } else if (items.application == "VSCodium Insiders") {
          openApp = "vscodium-insiders";
        } else if (items.application == "Cursor") {
          openApp = "cursor";
        } else if (items.application == "Other") {
          openApp = items.urlScheme;
        }
        if (path[1] !== undefined && path[2] !== undefined) {
          if (items.protocol == "HTTPS") {
            chrome.tabs.update({
              url:
                openApp +
                "://vscode.git/clone?url=https://" +
                url.hostname +
                "/" +
                path[1] +
                "/" +
                path[2] +
                ".git",
            });
          } else if (items.protocol == "SSH") {
            chrome.tabs.update({
              url:
                openApp +
                "://vscode.git/clone?url=git@" +
                url.hostname +
                ":" +
                path[1] +
                "/" +
                path[2] +
                ".git",
            });
          }
        }
      });
    }
  );
});
