const server = false

const switchTo = (E) => {
	document.querySelectorAll("#sections > .section").forEach((section) => {
		section.classList.add("d-none")
	})

	document.querySelectorAll("#selector li").forEach((section) => {
		section.classList.remove("active")
	})
	E.target.classList.toggle("active")
	document.querySelector("#C" + E.target.id).classList.toggle("d-none")
}

const focusCard = (E) => {
	E.target.querySelector(" .open").classList.toggle("d-none")
}
//#region object made by tree -J with a modicum of editing

const myEncoding = (uri) => {
	let components = uri.split("/")
	return components.map((x) => encodeURIComponent(x)).join("/")
}

const coversRoot = "assets/img/covers"

const covers = [
	{
		type: "directory",
		name: "artist",
		contents: [
			{
				type: "directory",
				name: "01-OVERVIEW",
				contents: [
					{
						type: "directory",
						name: "01-ALBUMS",
						contents: [
							{ type: "file", name: "01-Another one bites the dust.jpg" },
							{ type: "file", name: "02-Body Language .jpg" },
							{ type: "file", name: "03-Bohemian Rhapsody.png" },
							{ type: "file", name: "04-Crazy little thing called love.jpg" },
							{ type: "file", name: "05-Flash Gordon.jpg" },
							{
								type: "file",
								name:
									"06-Freddie Mecury and Montserrat Caballé - Barcelona.jpg",
							},
							{ type: "file", name: "07-Queen A Kind Of Magic.png" },
						],
					},
				],
			},
			{
				type: "directory",
				name: "02-RELATED ARTISTS",
				contents: [
					{
						type: "directory",
						name: "01-SIMILAR",
						contents: [
							{ type: "file", name: "01-ALICE COOPER.jpg" },
							{ type: "file", name: "02-JOURNEY.jpg" },
						],
					},
					{
						type: "directory",
						name: "02-INFLUENCED BY",
						contents: [
							{ type: "file", name: "02-BEATLES.jpg" },
							{ type: "file", name: "02-LED ZEPPELIN.jpg" },
							{ type: "file", name: "03-JIMI HENDRIX.jpg" },
						],
					},
				],
			},
			{
				type: "directory",
				name: "03-ABOUT",
				contents: [
					{
						type: "directory",
						name: "01-media",
						contents: [{ type: "file", name: "about.htm" }],
					},
				],
			},
			{ type: "file", name: "QUEEN.jpg" },
		],
	},
	{ type: "file", name: "covers" },
	{ type: "file", name: "covers.json" },
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
						name: "01-#TROWBACKTHURSDAY",
						contents: [
							{ type: "file", name: "01-Italian Karaoke.png" },
							{ type: "file", name: "02-Lyricists.png" },
							{ type: "file", name: "03-Italy's Frequent Rotation.png" },
							{ type: "file", name: "04-00s italia.png" },
							{ type: "file", name: "05-Cocktail Time.png" },
							{ type: "file", name: "06-i love my 90s hip-hop.png" },
						],
					},
					{
						type: "directory",
						name: "02-CLASSIFICHE",
						contents: [
							{ type: "file", name: "Top 50 - Global.png" },
							{ type: "file", name: "Top 50 - Italy.png" },
							{ type: "file", name: "Viral 50 - Global.png" },
							{ type: "file", name: "Viral 50 - Italy.png" },
						],
					},
				],
			},
			{
				type: "directory",
				name: "02-PODCAST",
				contents: [
					{
						type: "directory",
						name: "01-RPG",
						contents: [
							{ type: "file", name: "01-REVIVAL.jpg" },
							{
								type: "file",
								name: "02-hype-space-a-starfinder-real-play-podcast.jpg",
							},
							{ type: "file", name: "03-tabletop-champions.jpg" },
						],
					},
				],
			},
			{
				type: "directory",
				name: "03-MOOD AND GENRES",
				contents: [
					{
						type: "directory",
						name: "01-EPIC",
						contents: [
							{ type: "file", name: "01 Europe the final countdown.jpg" },
							{
								type: "file",
								name: "02 Rhapsody symphony of the enchanted lands.jpg",
							},
							{ type: "file", name: "03 Visions   Stratovarius2.jpg" },
						],
					},
				],
			},
			{
				type: "directory",
				name: "04-NEW RELEASES",
				contents: [
					{
						type: "directory",
						name: "01-Local",
						contents: [{ type: "file", name: "01-BRUTE FORCE.jpg" }],
					},
				],
			},
			{
				type: "directory",
				name: "05-DISCOVER",
				contents: [
					{
						type: "directory",
						name: "01-HOT STUFF",
						contents: [{ type: "file", name: "01-LOL SO FUNNY.jpg" }],
					},
				],
			},
		],
	},
]

//#endregion
const testQuery = () => {
	let search = window.location.search
	let out
	console.log(typeof search)
	if (window.location.search === "") {
		out = "home"
	} else {
		out = search
	}

	/*let out =
		window.location.search === ""
			? "home"
			: window.location.search.slice(1)
*/
	console.log(out)
}

const populateBody = (pagep) => {
	let page =
		window.location.search === "" ? "home" : window.location.search.slice(1)
	let folder = null
	covers.forEach((cover) => {
		folder = cover.name === page ? cover : folder
	})
	//console.log(folder)
	//clear colors?
	let singleBody = document.querySelector(".singleBody")
	singleBody.classList.forEach((cssClass) => {
		if (cssClass.startsWith("page-")) {
			singleBody.classList.remove(cssClass)
		}
	})
	//link correct colors
	singleBody.classList.add("page-" + page)
	let selector = []
	folder.contents.forEach((element) => {
		if (element.type === "directory") {
			selector.push(element.name.slice(3))
		} else {
			let banner = document.querySelector(".banner")
			banner.classList.toggle("d-none")
			banner.querySelector(".artistName").innerText = element.name.slice(0, -4)
		}
	})

	//console.log(selector)
	populateSelector(selector)
	//console.log(selector)
	populateGrids(folder.contents, page)
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

	//and the grids
	while (document.querySelector("#sections").firstChild) {
		document
			.querySelector("#sections")
			.removeChild(document.querySelector("#sections").firstChild)
	}

	//create and fill the new elements
	let first = true
	voices.forEach((voice) => {
		let ele = document.createElement("li")
		ele.classList.add("nav-item")
		let sel = document.createElement("div")
		sel.classList.add("container-fluid", "section", "d-none")
		sel.id = "C" + voice.toLowerCase().replace(/\s/g, "")
		if (first) {
			ele.classList.add("active")
			sel.classList.toggle("d-none")
			first = false
		}
		//let lnk = document.createElement("a")
		//lnk.id = voice.toLowerCase()
		//lnk.classList.add("nav-link")
		//lnk.innerText = voice.toUpperCase()
		//lnk.addEventListener("click", switchTo)
		ele.id = voice.toLowerCase().replace(/\s/g, "")
		ele.innerText = voice.toUpperCase()
		ele.addEventListener("click", switchTo)
		ele.classList.add("nav-link")
		//ele.appendChild(lnk)
		document.querySelector("#selector").appendChild(ele)
		document.querySelector("#sections").appendChild(sel)
	})
	//let sel = document.createElement("hr")
	//document.querySelector("#selector").appendChild(sel)
}

const populateGrids = (selection, page) => {
	/**
	 * example target container <div id="Ctrending" class="container-fluid section">
	 *
	 * id MUST be in the form of capital letter C followed by the lowercase selection name
	 *
	 */
	let category = selection[0]
	selection.forEach((category) => {
		if (category.type === "directory") {
			const grid = document.querySelector(
				"#C" + category.name.slice(3).toLowerCase().replace(/\s/g, "")
			)
			//clear the container
			if (grid) {
				while (grid.firstChild) {
					grid.removeChild(grid.firstChild)
				}
			}
			//instantiate rows
			category.contents.forEach((row) => {
				if (row.type === "directory") {
					//rowLabels.push(row.name.slice(3))
					const rowHeading = document.createElement("h3")
					rowHeading.innerText = row.name.slice(3)
					rowHeading.classList.add("text-light")
					grid.appendChild(rowHeading)
					const documentRow = document.createElement("div")
					grid.appendChild(documentRow)
					documentRow.classList.add("row", "m-0")
					row.contents.forEach((cell) => {
						if (cell.type === "file") {
							if (cell.name.substring(cell.name.length - 4) === ".htm") {
								console.log("found an anomaly")
								let frame = document.createElement("iframe")
								let src = [
									coversRoot,
									page,
									category.name,
									row.name,
									cell.name,
								].join("/")
								frame.src = myEncoding(src)
								frame.classList.add("infoBox")
								documentRow.style.height = "99%"
								documentRow.appendChild(frame)
							} else {
								let newCard = document
									.querySelector(".templateCard")
									.cloneNode(true)
								newCard.classList.remove("d-none", "templateCard")
								let src = [
									coversRoot,
									page,
									category.name,
									row.name,
									cell.name,
								].join("/")
								//console.log("src", src)
								//console.log("encode", encodeURIComponent(src))
								newCard.querySelector(".card-img-top").src = myEncoding(src)
								newCard.querySelector(".card-img-top").alt = "cover image"
								//	+category.name + "/" + row.name + "/" + cell.name
								newCard.querySelector(
									".card-title"
								).innerText = cell.name.slice(3).slice(0, -4)
								//console.log("new card---", newCard)
								documentRow.appendChild(newCard)
							}
						}
					})
				}
			})
		}
	})
}
