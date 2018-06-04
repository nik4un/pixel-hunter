import { SERVER_URL } from './constants';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJSON);
  }

  static loadResults(name) {
    return fetch(`${SERVER_URL}/stats/${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`,
      },
      method: `POST`,
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings).then(checkStatus);
  }
}
