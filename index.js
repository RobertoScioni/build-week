const switchTo = (E) => {
	document.querySelectorAll("#sections > .section").forEach((section) => {
		section.classList.add("d-none")
	})
	document.querySelector("#C" + E.target.id).classList.toggle("d-none")
}
