var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var displayIssues = function (issues) {
  if (issues.length === 0) {
    alert("There are no open issues");
    return;
  }
  for (var i = 0; i < issues.length; i++) {
    var issuesEl = document.createElement("a");
    issuesEl.classList =
      "list-item flex-row justify-space-between align-center";
    issuesEl.setAttribute("href", issues[i].html_url);
    issuesEl.setAttribute("target", "_blank");
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    issuesEl.appendChild(titleEl);
    var typeEl = document.createElement("span");
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    issuesEl.appendChild(typeEl);
    issuesContainerEl.appendChild(issuesEl);
  }
};

var displayWarning = function (repo) {
  limitWarningEl.textContent = "To see more than 30 issues, visit ";
  var linkEl = document.createElement("a");
  linkEl.textContent = "See more issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");
  limitWarningEl.appendChild(linkEl);
};

var getRepoIssues = function (repo) {
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("There was a problem with the request");
    }
  });
};

getRepoIssues("facebook/react");
