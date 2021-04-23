// const getData = require('./getData')

// const artists = ['Johannes Vermeer', 'Rembrandt van Rijn', 'Vincent van Gogh', 'Karel Appel']

// const filterData = async () => {
//     const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection/?key=7TAeATmh&ps=200'
//     const data = await getData(endpoint)
//     const filteredData = data.artObjects.filter(artObject => {
//     return artists.includes(artObject.principalOrFirstMaker)
//   })
//   return filteredData
// //   console.log(filteredData)
// }

// filterData()
// module.exports = filterData



const getData = require('./getData')

const artists = ['Johannes Vermeer', 'Rembrandt van Rijn', 'Vincent van Gogh', 'Karel Appel', 'Jeroen Bosch', 'Pieter Brueghel', 'Mondriaan']

const filterData = async () => {
    const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection/?key=7TAeATmh&p=1&ps=100'
    const data = await getData(endpoint)
    const filteredData = data.artObjects.filter(artObject => {
    return artists.includes(artObject.principalOrFirstMaker)
  })
  return filteredData
  // console.log(filteredData)
}

filterData()


const getArtObjects = async () => {
  // const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection/?key=7TAeATmh&ps=200'
  const data = await filterData()
  const sortedArtObjects = data.sort(() => .5 - Math.random())

//   console.log(sortedArtObjects)
  return sortedArtObjects

}

getArtObjects()

module.exports = getArtObjects