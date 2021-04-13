const fetch = require('node-fetch')

module.exports = async function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
}