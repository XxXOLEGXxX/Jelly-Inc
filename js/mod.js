let modInfo = {
	name: "Jelly Inc.",
	id: "mymod",
	author: "funny lego guy",
	pointsName: "jellies",
	modFiles: ["tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0.0000001), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "Test 2.1",
	name: "where eric reswordes???7",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>Test 2.1: where eric reswordes???7</h3><br>
		- Buffed some researches.<br>
		- Added back "tree-tab" tabs.<br>
		- Polished design by 2%.<br>
	<h3>Test 2: Revolutionary Invention</h3><br>
		- Added more researches.<br>
		- Added vehicles. (DEADASS)<br>
		- Removed useless "tree-tab" tabs. (for now)<br>
		- Removed cursed milestone popups. (/j)<br>
	<h3>Test 1: Totally not Egg Inc. rip off</h3><br>
		- Added habitats.<br>
		- Added some researches. <br>
		- Added, like, all eg- jellies lmfao. <br>
		- Added useless "tree-tab" tabs`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

function canGenKens(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	for(let i=0;i<19;i++) {
		let eggName = "jelly"+i
		gain = gain.add(player[eggName].jelliesPerSec)
	}
	return gain
}

function getKenAmount() {
	let ken = new Decimal(0)
	for(let i=0;i<19;i++) {
		let eggName = "jelly"+i
		ken = ken.add(player[eggName].jellykens)
	}
	return ken
}

function getKenGen() {
	if(!canGenKens())
		return new Decimal(0)

	let kengain = new Decimal(0)
	for(let i=0;i<19;i++) {
		let eggName = "jelly"+i
		kengain = kengain.add(player[eggName].kensPerSec)
	}
	return kengain
}

function getKenPerMin() {
	let gain = getKenGen()
	return gain.mul(60)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = ["milestonePopups doesn't exist."
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}