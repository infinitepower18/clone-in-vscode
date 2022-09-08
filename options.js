function save_options() {
  var protocol = document.getElementById("protocol").value;
  chrome.storage.sync.set(
    {
      protocol: protocol,
    },
    function () {
      var status = document.getElementById("status");
      status.textContent = "Option saved.";
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
    },
    function (items) {
      document.getElementById("protocol").value = items.protocol;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
