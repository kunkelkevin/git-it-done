var issuesContainerEl = document.querySelector("#issues-container");

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
    console.log(titleEl);
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    issuesEl.appendChild(typeEl);
    issuesContainerEl.appendChild(issuesEl);
  }
};

var getRepoIssues = function (repo) {
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);
      });
    } else {
      alert("There was a problem with the request");
    }
  });
};

getRepoIssues("kunkelkevin/taskinators");
