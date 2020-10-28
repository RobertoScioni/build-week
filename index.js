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

const coversRoot = "assets/img/covers"

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
		if (element.type === "directory") {
			selector.push(element.name.slice(3))
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

const populateGrids = (selection, page) => {
	/**
	 * example target container <div id="Ctrending" class="container-fluid section">
	 *
	 * id MUST be in the form of capital letter C followed by the lowercase selection name
	 *
	 */
	const grid = document.querySelector(
		"#C" + selection[0].name.slice(3).toLowerCase()
	)

	const rowLabels = []

	let category = selection[0]
	//console.log(rowLabels)
	//console.log("first grid", selection[0])
	//console.log(grid)
	//clear the container
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild)
	}
	//instantiate rows
	category.contents.forEach((row) => {
		if (row.type === "directory") {
			//rowLabels.push(row.name.slice(3))
			const rowHeading = document.createElement("h3")
			rowHeading.innerText = row.name
			rowHeading.classList.add("text-light")
			grid.appendChild(rowHeading)
			const documentRow = document.createElement("div")
			grid.appendChild(documentRow)
			documentRow.classList.add("row")
			row.contents.forEach((cell) => {
				if (cell.type === "file") {
					let newCard = document.querySelector(".templateCard").cloneNode(true)
					newCard.classList.remove("d-none", "templateCard")
					let src = [coversRoot, page, category.name, row.name, cell.name].join(
						"/"
					)
					console.log("src", src)
					console.log("encode", encodeURIComponent(src))
					newCard.querySelector(".card-img-top").src = encodeURIComponent(
						[coversRoot, page, category.name, row.name, cell.name].join("/")
					)
					newCard.querySelector(".card-img-top").alt = "cover image"
					//	+category.name + "/" + row.name + "/" + cell.name
					newCard.querySelector(".card-title").innerText = cell.name
						.slice(3)
						.slice(0, -4)
					console.log("new card---", newCard)
					documentRow.appendChild(newCard)
				}
			})
		}
	})
}
