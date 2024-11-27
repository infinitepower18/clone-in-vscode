const applicationDropdown = document.getElementById("application");

function save_options() {
  var protocol = document.getElementById("protocol").value;
  var application = document.getElementById("application").value;
  var scheme = document.getElementById("url-scheme").value;
  chrome.storage.sync.set(
    {
      protocol: protocol,
      application: application,
      urlScheme: scheme,
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
      urlScheme: "",
    },
    function (items) {
      document.getElementById("protocol").value = items.protocol;
      document.getElementById("application").value = items.application;
      url_container_visibility()
    }
  );
}

function url_container_visibility() {
  const urlContainer = document.getElementById("url-container");
  const urlInput = document.getElementById("url-scheme");

  if (applicationDropdown.value === "Other") {
    urlContainer.style.display = "block";
  } else {
    urlContainer.style.display = "none";
    urlInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
applicationDropdown.addEventListener("change", url_container_visibility)