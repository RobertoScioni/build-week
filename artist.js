window.onload = Body

function Body(pagep) {
	fetchArtists()

	/*	console.log(shelf)
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
	populateGrids(folder.contents, page)*/
}

const Selector = (voices) => {
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

const Grids = (selection, page) => {
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
