const { response } = require("express");
const { fetchFilms, getFilmById } = require("./films");
const client = require("./index");

async function getAllDirectors() {
  try {
    const films = await fetchFilms();

    let directorsList = [];
    const directors = films.map((film) => {
      return directorsList.push(film.director);
    });
    //   console.log(directorsList);

    let resultArr = [];

    const fixDirectorsStrings = (string) => {
      if (string.includes("{")) {
        let newDirectorString = string
          .replace(/{|_/g, "")
          .replace(/}|_/g, "")
          .replace(/"|_/g, "")
          .replace(/,|_/g, ",");

        let newDirectorsArr = newDirectorString.split(",");

        console.log(newDirectorsArr);
        resultArr.push(newDirectorsArr);
        return;
      }
      resultArr.push(string);
    };

    directorsList.map((director) => {
      fixDirectorsStrings(director);
    });

    console.log(
      "directors, including films with more than 1 director:",
      resultArr
    );

    if (resultArr.length > 0) {
      return resultArr;
    }
  } catch (error) {
    console.error("An error occurred retrieving all directors");
    throw error;
  }
}
// getAllDirectors();

async function getDirectorByFilmId(filmId) {
  try {
    const film = await getFilmById(filmId);
    // console.log("film", film);

    filmDirectors = film.map((details) => {
      return details.director;
    });
    // console.log(filmDirectors);

    let resultArr = [];

    if (
      filmDirectors.map((detail) => {
        if (detail.includes("{")) {
          //   console.log("film includes multiple directors, reformatting...");
          let newDirectorString = detail
            .replace(/{|_/g, "")
            .replace(/}|_/g, "")
            .replace(/"|_/g, "")
            .replace(/,|_/g, ",");

          let newDirectorsArr = newDirectorString.split(",");
          //   console.log(newDirectorString);

          //   console.log("array of more than one director:", newDirectorsArr);
          resultArr.push((directors = newDirectorsArr));
          return;
        } else {
          return;
        }
      })
    )
      resultArr.push(filmDirectors);
    console.log("resultArr", resultArr);
    return resultArr[0];
  } catch (error) {
    console.error(
      `An error occurred retrieving directors for film ID: ${filmId}`
    );
    throw error;
  }
}
// getDirectorByFilmId(1);

module.exports = { getAllDirectors, getDirectorByFilmId };
