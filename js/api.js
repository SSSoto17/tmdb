import { baseURL, apiKey } from "./env.js";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
  },
};

export function getMovies(endpoint) {
  fetch(`${baseURL}${endpoint}`, options)
    .then((res) => res.json())
    .then((data) => {
      const movies = data.results;
      const movieList = document.querySelector("#movieList");

      movies.map((movie) => {
        const movieCard = document
          .querySelector("template")
          .content.cloneNode(true);

        movieCard.querySelector("h2").textContent = movie.title;
        movieCard.querySelector("p").textContent = movie.overview;
        movieCard.querySelector(
          "img"
        ).src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        movieCard.querySelector("img").alt = movie.title;
        movieCard.querySelector(".ogTitle").textContent = movie.original_title;
        movieCard.querySelector(".releaseDate").textContent =
          movie.release_date;

        movieList.appendChild(movieCard);
      });
    })
    .catch((err) => console.error(err));
}

const tabsList = document.querySelector("#tabs");
let activeTab = tabsList.querySelector(".active");
let endpoint = `/movie/${activeTab.getAttribute("data-endpoint")}`;

getMovies(endpoint);

tabsList.addEventListener("mousedown", (e) => {
  tabsList.querySelectorAll("li").forEach((tab) => {
    tab.classList = "";
  });

  e.target.classList.add("active");

  activeTab = tabsList.querySelector(".active");
  endpoint = `/movie/${activeTab.getAttribute("data-endpoint")}`;

  document.querySelector("#movieList").innerHTML = "";

  getMovies(endpoint);
});
