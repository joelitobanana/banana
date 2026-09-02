// API fetch bonus: pulls live public profile data from the GitHub API
// and renders it into the #github-card container. Includes error
// handling for both network failures and non-OK responses.
(function () {
  const username = "joelitobanana";
  const card = document.querySelector("#github-card");

  if (!card) return;

  fetch("https://api.github.com/users/" + username)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("GitHub API responded with status " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      card.innerHTML = "";

      const avatar = document.createElement("img");
      avatar.src = data.avatar_url;
      avatar.alt = "";
      avatar.className = "github-avatar";

      const info = document.createElement("div");

      const name = document.createElement("p");
      name.className = "github-name";
      name.textContent = data.name || data.login;

      const bio = document.createElement("p");
      bio.className = "github-bio";
      bio.textContent = data.bio || "No bio provided.";

      const stats = document.createElement("p");
      stats.className = "github-stats";
      stats.textContent =
        data.public_repos + " public repos · " + data.followers + " followers";

      const link = document.createElement("a");
      link.href = data.html_url;
      link.className = "github-link";
      link.textContent = "View profile on GitHub";

      info.appendChild(name);
      info.appendChild(bio);
      info.appendChild(stats);
      info.appendChild(link);

      card.appendChild(avatar);
      card.appendChild(info);
    })
    .catch(function (error) {
      card.innerHTML = "";
      const message = document.createElement("p");
      message.className = "github-error";
      message.textContent =
        "Could not load GitHub data right now — try again in a bit.";
      card.appendChild(message);
      console.error("GitHub card fetch failed:", error);
    });
})();
