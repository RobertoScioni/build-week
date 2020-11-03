/**
 * in this file i'll try js code
 */

const fetch = require("node-fetch")

fetch("https://rapidapi.p.rapidapi.com/search?q=metallica", {
	method: "GET",
	headers: {
		"x-rapidapi-key": "e75d8629a2mshe74bcadd1131095p185f53jsn7e5fafda57bb",
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
	},
})
	.then((response) => {
		console.log(response.json())
	})
	.catch((err) => {
		console.error(err)
	})
