fetch(
  "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-popular-movies&page=1&year=2020"
)
  .then((response) => {
    response.json();
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });
