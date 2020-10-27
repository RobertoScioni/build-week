const switchTo = (E) => {
	document.querySelectorAll("#sections > .section").forEach((section) => {
		section.classList.add("d-none")
	})
	document.querySelector("#C" + E.target.id).classList.toggle("d-none")
}

const focusCard = (E) => {
	E.target.querySelector(" .open").classList.toggle("d-none")
}
//#region object made by tree -J with a modicum of editing

const coversRoot = "assets/img/covers/"

const covers = [
	{
		type: "directory",
		name: "artist",
		contents: [
			{
				type: "directory",
				name: "01-QUEEN",
				contents: [
					{
						type: "directory",
						name: "01-OVERVIEW",
						contents: [{ type: "directory", name: "Albums", contents: [] }],
					},
					{ type: "directory", name: "02-RELATED ARTISTS", contents: [] },
					{ type: "directory", name: "03-ABOUT", contents: [] },
				],
			},
		],
	},
	{
		type: "directory",
		name: "home",
		contents: [
			{
				type: "directory",
				name: "01-TRENDING",
				contents: [
					{
						type: "directory",
						name: "CLASSIFICHE",
						contents: [
							{ type: "file", name: "Top 50 - Global.png" },
							{ type: "file", name: "Top 50 - Italy.png" },
							{ type: "file", name: "Viral 50 - Global.png" },
							{ type: "file", name: "Viral 50 - Italy.png" },
						],
					},
					{
						type: "directory",
						name: "#TROWBACKTHURSDAY",
						contents: [
							{ type: "file", name: "01-Italian Karaoke.png" },
							{ type: "file", name: "02-Lyricists.png" },
							{ type: "file", name: "03-Italy's Frequent Rotation.png" },
							{ type: "file", name: "04-00s italia.png" },
							{ type: "file", name: "05-Cocktail Time.png" },
							{ type: "file", name: "06-i love my 90s hip-hop.png" },
						],
					},
				],
			},
			{ type: "directory", name: "02-PODCAST", contents: [] },
			{ type: "directory", name: "03-MOOD AND GENRES", contents: [] },
			{ type: "directory", name: "04-NEW RELEASES", contents: [] },
			{ type: "directory", name: "05-DISCOVER", contents: [] },
		],
	},
]

//#endregion

const populateBody = (page) => {
	let folder = null
	covers.forEach((cover) => {
		folder = cover.name === page ? cover : folder
	})
	//console.log(folder)

	let selector = []
	folder.contents.forEach((element) => {
		selector.push(element.name.slice(3))
	})
	populateSelector(selector)
	//console.log(selector)
	populateSelector(selector[0])
}

const populateSelector = (voices) => {
	/* example selector element
 		<li class="nav-item active">
    		<a id="trending" class="nav-link" onclick="switchTo(event)">TRENDING</a>
    	</li>
	 */

	//clear the selector
	while (document.querySelector("#selector").firstChild) {
		document
			.querySelector("#selector")
			.removeChild(document.querySelector("#selector").firstChild)
	}

	//create and fill the new elements
	let first = true
	voices.forEach((voice) => {
		let ele = document.createElement("li")
		ele.classList.add("nav-item")
		if (first) {
			ele.classList.add("active")
			first = false
		}
		let lnk = document.createElement("a")
		lnk.classList.add("nav-link")
		lnk.innerText = voice.toUpperCase()
		ele.appendChild(lnk)
		document.querySelector("#selector").appendChild(ele)
	})
}

const populateGrids = (selection) => {
	const grid = document.querySelector("#C" + selection)
	console.log(selection)
}
