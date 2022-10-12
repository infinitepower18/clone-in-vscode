function save_options() {
  var protocol = document.getElementById("protocol").value;
  var application = document.getElementById("application").value;
  chrome.storage.sync.set(
    {
      protocol: protocol,
      application: application,
    },
    function () {
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 3000);
    }
  );
}

function restore_options() {
  chrome.storage.sync.get(
    {
      protocol: "HTTPS",
      application: "VS Code",
    },
    function (items) {
      document.getElementById("protocol").value = items.protocol;
      document.getElementById("application").value = items.application;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
