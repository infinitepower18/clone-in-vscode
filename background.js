function ext(){

    chrome.action.disable();
  
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      let rule = {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'github.com'},
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'gitlab.com'},
          })
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      };
  
      let rules = [rule];
      chrome.declarativeContent.onPageChanged.addRules(rules);
    });
  }

chrome.runtime.onStartup.addListener(() => {
    //ext()
  });

chrome.runtime.onInstalled.addListener(() => {
    //ext()
  });

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        const url = new URL(tabs[0].url);
        const path = url.pathname.split('/');
        if (path[1] !== undefined && path[2] !== undefined) {
          chrome.tabs.create({url: "vscode://vscode.git/clone?url=https://" + url.hostname + "/" + path[1] + "/" + path[2] + ".git"});
        }
    });
  })
