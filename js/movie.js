const TMDB_API_KEY = "e2e6c3ca4cf91520519a76115662cf35";
const IMAGE_URL = "https://image.tmdb.org/t/p";
const BASE_URL = "https://api.themoviedb.org/3";

// 1. 트렌딩 영화 20개 받아와서 전역변수에 저장
let trendingMovies = [];

const getTrendingMovies = async () => {
  console.log("1. API 호출함");
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  const movieArray = data.results;
  console.log("1. 받아온 트렌딩 영화 목록", movieArray);
  trendingMovies = movieArray;
  return trendingMovies;
};

console.log("1. 전역에 저장된 목록", trendingMovies);

// 받아온 트렌딩 영화 중 랜덤으로 한 개 뽑아서 디테일 받아오고 리턴
const getDetail = async (movieList) => {
  console.log("2. 랜덤 추첨 진입");
  console.log("2. 넘겨받은 트렌딩 영화 목록", movieList);
  const randomIndex = Math.floor(Math.random() * 20);
  const movieId = movieList[randomIndex].id;

  console.log("2. 뽑힌 영화", movieId);
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  console.log("2. 뽑힌 영화의 디테일", data);
  return data;
};

// 요소 만들어서 붙이기
const appendMovie = (detail) => {
  console.log("3. 요소 만들기 진입");
  const bgImg = document.querySelector(".backGround__image");
  const poster = document.querySelector(".movie__poster__image");
  const title = document.querySelector(".movie__detail__title");
  const genres = document.querySelector(".movie__detail__genres");
  const rating = document.querySelector(".movie__detail__rating");
  const overview = document.querySelector(".movie__detail__overview");
  const officialSiteBtn = document.querySelector("#officialSite a");

  console.log("3. 넘겨받은 디테일", detail);
  bgImg.src = `${IMAGE_URL}/original${detail.backdrop_path}`;
  poster.src = `${IMAGE_URL}/w500${detail.poster_path}`;
  title.innerText = `${detail.title} (${detail.release_date.slice(0, 4)})`;
  genre = detail.genres.map((genre) => `<span>${genre.name}</span>`).join("");
  genres.innerHTML = genre;
  rating.innerHTML = `<i class="fas fa-star"></i> ${detail.vote_average} / 10`;
  overview.innerText =
    detail.overview === ""
      ? "There is no overview for this moivie"
      : detail.overview;
  officialSiteBtn.href = detail.homepage;
};

const loadAnotherMovie = async () => {
  console.log("4. 리로드");
  console.log("4. 전역에 저장된 목록", trendingMovies);
  const detail = await getDetail(trendingMovies);
  appendMovie(detail);
};

const initMovie = async () => {
  console.log("0. 초기화");

  const movieList = await getTrendingMovies();
  const detail = await getDetail(movieList);
  appendMovie(detail);

  const loadAnotherBtn = document.getElementById("loadAnother");
  loadAnotherBtn.addEventListener("click", loadAnotherMovie);
  console.log("0. 전역에 저장된 목록", trendingMovies);
};

initMovie();
