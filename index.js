const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://icanhazdadjoke.com';

const term = 'joke';

var url = `${apiUrl}/search?term=${term}`;

console.log(url);

axios
  .get(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    console.log(response);
    let joke_count = response.data.total_jokes;

    let joke_results = response.data.results;

    if (response.data.total_jokes == 0) {
      console.log('No Jokes Found');
    } else if (response.data.total_jokes != 0) {
      console.log(joke_count + 'Jokes Found');
      // console.log(response.data.results);
    }

    joke_results.forEach((jokes) => {
      console.log(jokes);
    });

    joke_results.map((result) =>
      fs.appendFileSync('jokes.txt', result.joke + '\n')
    );
  })
  .catch((error) => {
    console.log(error);
  });
