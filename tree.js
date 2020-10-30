const path = "assets"
let exec = require("child_process").exec
let tree = []
exec("tree -J", (stdout) => {
	tree = stdout
})
console.log(tree)
