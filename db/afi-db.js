const films = [
  {
    title: "Citizen Kane",
    director: "Orson Welles",
    year: 1941,
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
  },
  {
    title: "Casablanca",
    director: "Michael Curtiz",
    year: 1942,
  },
  {
    title: "Raging Bull",
    director: "Martin Scorsese",
    year: 1980,
  },
  {
    title: "Singin' in the Rain",
    director: ["Gene Kelly", "Stanley Donen"],
    year: 1952,
  },
  {
    title: "Gone with the Wind",
    director: "Victor Fleming",
    year: 1939,
  },
  {
    title: "Lawrence of Arabia",
    director: "David Lean",
    year: 1962,
  },
  {
    title: "Schindler's List",
    director: "Steven Spielberg",
    year: 1993,
  },
  {
    title: "Vertigo",
    director: "Alfred Hitchcock",
    year: 1958,
  },
  {
    title: "The Wizard of Oz",
    director: "Victor Fleming",
    year: 1939,
  },
  {
    title: "City Lights",
    director: "Charlie Chaplin",
    year: 1931,
  },
  {
    title: "The Searchers",
    director: "John Ford",
    year: 1956,
  },
  {
    title: "Star Wars",
    director: "George Lucas",
    year: 1977,
  },
  {
    title: "Psycho",
    director: "Alfred Hitchcock",
    year: 1960,
  },
  {
    title: "2001: A Space Odyssey",
    director: "Stanley Kubrick",
    year: 1968,
  },
  {
    title: "Sunset Boulevard",
    director: "Billy Wilder",
    year: 1950,
  },
  {
    title: "The Graduate",
    director: "Mike Nichols",
    year: 1967,
  },
  {
    title: "The General",
    director: ["Buster Keaton", "Clyde Bruckman"],
    year: 1926,
  },
  {
    title: "On the Waterfront",
    director: "Elia Kazan",
    year: 1954,
  },
  {
    title: "It's a Wonderful Life",
    director: "Frank Capra",
    year: 1946,
  },
  {
    title: "Chinatown",
    director: "Roman Polanski",
    year: 1974,
  },
  {
    title: "Some Like It Hot",
    director: "Billy Wilder",
    year: 1959,
  },
  {
    title: "The Grapes of Wrath",
    director: "John Ford",
    year: 1940,
  },
  {
    title: "E.T. the Extra-Terrestrial",
    director: "Steven Spielberg",
    year: 1982,
  },
  {
    title: "To Kill a Mockingbird",
    director: "Robert Mulligan",
    year: 1962,
  },
  {
    title: "Mr. Smith Goes to Washington",
    director: "Frank Capra",
    year: 1939,
  },
  {
    title: "High Noon",
    director: "Fred Zinnemann",
    year: 1952,
  },
  {
    title: "All About Eve",
    director: "Joseph L. Mankiewicz",
    year: 1950,
  },
  {
    title: "Double Indemnity",
    director: "Billy Wilder",
    year: 1944,
  },
  {
    title: "Apocalypse Now",
    director: "Francis Ford Coppola",
    year: 1979,
  },
  {
    title: "The Maltese Falcon",
    director: "John Huston",
    year: 1941,
  },
  {
    title: "The Godfather Part II",
    director: "Francis Ford Coppola",
    year: 1974,
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    director: "Milos Forman",
    year: 1975,
  },
  {
    title: "Snow White and the Seven Dwarfs",
    director: "David Hand",
    year: 1937,
  },
  {
    title: "Annie Hall",
    director: "Woody Allen",
    year: 1977,
  },
  {
    title: "The Bridge on the River Kwai",
    director: "David Lean",
    year: 1957,
  },
  {
    title: "The Best Years of Our Lives",
    director: "William Wyler",
    year: 1946,
  },
  {
    title: "The Treasure on the Sierra Madre",
    director: "John Huston",
    year: 1948,
  },
  {
    title: "Dr. Strangelove",
    director: "Stanley Kubrick",
    year: 1964,
  },
  {
    title: "The Sound of Music",
    director: "Robert Wise",
    year: 1965,
  },
  {
    title: "King Kong",
    director: ["Merian C. Cooper", "Ernest B. Schoedsack"],
    year: 1933,
  },
  {
    title: "Bonnie and Clyde",
    director: "Arthur Penn",
    year: 1967,
  },
  {
    title: "Midnight Cowboy",
    director: "John Schlesinger",
    year: 1969,
  },
  {
    title: "The Philadelphia Story",
    director: "George Cukor",
    year: 1940,
  },
  {
    title: "Shane",
    director: "George Stevens",
    year: 1953,
  },
  {
    title: "It Happened One Night",
    director: "Frank Capra",
    year: 1934,
  },
  {
    title: "A Streetcar Named Desire",
    director: "Elia Kazan",
    year: 1951,
  },
  {
    title: "Rear Window",
    director: "Alfred Hitchcock",
    year: 1954,
  },
  {
    title: "Intolerance",
    director: "D. W. Griffith",
    year: 1916,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    director: "Peter Jackson",
    year: 2001,
  },
  {
    title: "West Side Story",
    director: ["Jerome Robbins", "Robert Wise"],
    year: 1961,
  },
  {
    title: "Taxi Driver",
    director: "Martin Scorsese",
    year: 1976,
  },
  {
    title: "The Deer Hunter",
    director: "Michael Cimino",
    year: 1978,
  },
  {
    title: "M*A*S*H",
    director: "Robert Altman",
    year: 1970,
  },
  {
    title: "North by Northwest",
    director: "Alfred Hitchcock",
    year: 1959,
  },
  {
    title: "Jaws",
    director: "Steven Spielberg",
    year: 1975,
  },
  {
    title: "Rocky",
    director: "John G. Avildsen",
    year: 1976,
  },
  {
    title: "The Gold Rush",
    director: "Charlie Chaplin",
    year: 1925,
  },
  {
    title: "Nashville",
    director: "Robert Altman",
    year: 1975,
  },
  {
    title: "Duck Soup",
    director: "Leo McCarey",
    year: 1933,
  },
  {
    title: "Sullivan's Travels",
    director: "Preston Sturges",
    year: 1941,
  },
  {
    title: "American Graffiti",
    director: "George Lucas",
    year: 1973,
  },
  {
    title: "Cabaret",
    director: "Bob Fosse",
    year: 1972,
  },
  {
    title: "Network",
    director: "Sidney Lumet",
    year: 1976,
  },
  {
    title: "The African Queen",
    director: "John Huston",
    year: 1951,
  },
  {
    title: "Raiders of the Lost Ark",
    director: "Steven Spielberg",
    year: 1981,
  },
  {
    title: "Who's Afraid of Virginia Woolf?",
    director: "Mike Nichols",
    year: 1966,
  },
  {
    title: "Unforgiven",
    director: "Clint Eastwood",
    year: 1992,
  },
  {
    title: "Tootsie",
    director: "Sydney Pollack",
    year: 1982,
  },
  {
    title: "A Clockwork Orange",
    director: "Stanley Kubrick",
    year: 1971,
  },
  {
    title: "Saving Private Ryan",
    director: "Steven Spielberg",
    year: 1998,
  },
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
  },
  {
    title: "Butch Cassidy and the Sundance Kid",
    director: "George Roy Hill",
    year: 1969,
  },
  {
    title: "The Silence of the Lambs",
    director: "Jonathan Demme",
    year: 1991,
  },
  {
    title: "In the Heat of the Night",
    director: "Norman Jewison",
    year: 1967,
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    year: 1994,
  },
  {
    title: "All the President's Men",
    director: "Alan J. Pakula",
    year: 1976,
  },
  {
    title: "Modern Times",
    director: "Charlie Chaplin",
    year: 1936,
  },
  {
    title: "The Wild Bunch",
    director: "Sam Peckinpah",
    year: 1969,
  },
  {
    title: "The Apartment",
    director: "Billy Wilder",
    year: 1960,
  },
  {
    title: "Spartacus",
    director: "Stanley Kubrick",
    year: 1960,
  },
  {
    title: "Sunrise: A Song of Two Humans",
    director: "F. W. Murnau",
    year: 1927,
  },
  {
    title: "Titanic",
    director: "James Cameron",
    year: 1997,
  },
  {
    title: "Easy Rider",
    director: "Dennis Hopper",
    year: 1969,
  },
  {
    title: "A Night at the Opera",
    director: "Sam Wood",
    year: 1935,
  },
  {
    title: "Platoon",
    director: "Oliver Stone",
    year: 1986,
  },
  {
    title: "12 Angry Men",
    director: "Sidney Lumet",
    year: 1957,
  },
  {
    title: "Bringing Up Baby",
    director: "Howard Hawks",
    year: 1938,
  },
  {
    title: "The Sixth Sense",
    director: "M. Night Shyamalan",
    year: 1999,
  },
  {
    title: "Swing Time",
    director: "George Stevens",
    year: 1936,
  },
  {
    title: "Sophie's Choice",
    director: "Alan J. Pakula",
    year: 1982,
  },
  {
    title: "Goodfellas",
    director: "Martin Scorsese",
    year: 1990,
  },
  {
    title: "The French Connection",
    director: "William Friedkin",
    year: 1971,
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: 1994,
  },
  {
    title: "The Last Picture Show",
    director: "Peter Bogdanovich",
    year: 1971,
  },
  {
    title: "Do the Right Thing",
    director: "Spike Lee",
    year: 1989,
  },
  {
    title: "Blade Runner",
    director: "Ridley Scott",
    year: 1982,
  },
  {
    title: "Yankee Doodle Dandy",
    director: "Michael Curtiz",
    year: 1942,
  },
  {
    title: "Toy Story",
    director: "John Lasseter",
    year: 1995,
  },
  {
    title: "Ben-Hur",
    director: "William Wyler",
    year: 1959,
  },
];
