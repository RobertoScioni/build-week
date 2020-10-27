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
const covers = [
	{
		type: "directory",
		name: "assets/img/covers/artist",
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
		name: "assets/img/covers/home",
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
const populateSelector = (voices) => {}

const populateGrids = (grids) => {}
