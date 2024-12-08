const applicationDropdown = document.getElementById("application");
const urlSchemeInput = document.getElementById("url-scheme");
const saveButton = document.getElementById("save");

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
      document.getElementById("url-scheme").value = items.urlScheme;
      url_container_visibility();
      checkSaveButton();
    }
  );
}

function url_container_visibility() {
  const urlContainer = document.getElementById("url-container");

  if (applicationDropdown.value === "Other") {
    urlContainer.style.display = "block";
  } else {
    urlContainer.style.display = "none";
    urlSchemeInput.value = "";
  }
  checkSaveButton();
}

function checkSaveButton() {
  if (applicationDropdown.value === "Other" && urlSchemeInput.value.trim() === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
applicationDropdown.addEventListener("change", url_container_visibility);
urlSchemeInput.addEventListener("input", checkSaveButton);
