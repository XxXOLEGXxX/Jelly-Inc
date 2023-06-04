var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
	startData() {return {
		goldenEggs: new Decimal(0),
		chocolateBars: new Decimal(0),
		soulEggs: new Decimal(0),
		jellykens: new Decimal(0)
	}},
	tabFormat: {
		"Upgrades": {
		},
		"Prestige": {
		},
		"Epic Shop": {
		},
		"Main Hub": {
		},
		"Statistics": {
		},
		"Achievements": {
		},
		"Trophies": {
		},
	},
	update(diff){
		player[this.layer].jellykens = getKenAmount()
	},
    previousTab: "",
    leftTab: true,
})

function dotheFunny() {
	for(let i=0;i<19;i++) {
			let eggName = "jelly"+i
			let eggResource = ['edible', 'superfood', 'medical', 'rocket fuel', 'super material', 'fusion', 'quantum', 'immortality', 'tachyon', 'graviton', 'dilithium', 'prodigy', 'terraform', 'antimatter', 'dark matter', 'ai', 'nebula', 'universe', 'enlightment']
			let eggSymbol = ['E', 'S', 'M', 'RF', 'SM', 'F', 'Q', 'I', 'T', 'G', 'D', 'P', 'T', 'A', 'DM', 'AI', 'N', 'U', 'EN']
			let eggFirstTime = [0.0000001, 10000000, 840000000, 38000000000, 27000000000000, 8000000000000000, 3600000000000000000, 15000000000000000000000, 27000000000000000000000000, 150000000000000000000000000000, 760000000000000000000000000000000, 2500000000000000000000000000000000000, 3200000000000000000000000000000000000000, 20000000000000000000000000000000000000000000, 190000000000000000000000000000000000000000000000, 5100000000000000000000000000000000000000000000000000, 32000000000000000000000000000000000000000000000000000000, 640000000000000000000000000000000000000000000000000000000000, 57000000000000000000000000000000000000000000000000000000000000000]
			let eggRequirement = [0.0000001, 68000000, 5300000000, 240000000000, 170000000000000, 50000000000000000, 23000000000000000000, 94000000000000000000000, 170000000000000000000000000, 980000000000000000000000000000, 4800000000000000000000000000000000, 16000000000000000000000000000000000000, 20000000000000000000000000000000000000000, 130000000000000000000000000000000000000000000, 1200000000000000000000000000000000000000000000000, 32000000000000000000000000000000000000000000000000000, 200000000000000000000000000000000000000000000000000000000, 4000000000000000000000000000000000000000000000000000000000000, 360000000000000000000000000000000000000000000000000000000000000000]
			let eggValue = [0.25, 1.25, 6.25, 30, 150, 700, 3000, 12500, 50000, 175000, 525000, 1500000, 10000000, 1000000000, 100000000000, 10000000000000, 150000000000000, 1000000000000000, 0.0000001]
		addLayer(eggName, {
			name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
			symbol(){return eggSymbol[i]}, // This appears on the layer's node. Default is the id with the first letter capitalized
			position: i, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
			startData() { return {
				unlocked: false,
				points: new Decimal(0),
				value: eggValue[i],
				jellykens: new Decimal(0),
				hatch: new Decimal(50),
				limit: new Decimal(0),
				time: new Decimal(0),
				eggsPerSec: new Decimal(0),
				jelliesPerSec: new Decimal(0),
				kensPerSec: new Decimal(0),
				capacity: new Decimal(0)
			}},
			tabFormat: {
				"Researches": {
					content: [["buyable", 41], ["buyable", 42], ["buyable", 43]]
				},
				"Habitats": {
					content: [["display-text", function() {return player[this.layer].capacity}],["row", [["buyable", 31], ["buyable", 32], ["buyable", 33]]], ["row", [["buyable", 34], ["buyable", 35], ["buyable", 36]]]]
				},
				[eggResource[i]+' Inc.']: {
					content: [["display-text", function() {return "<h4>You currently have "+formatWhole(player[this.layer].jellykens)+" "+eggResource[i]+" jellykens, generating "+format(player[this.layer].eggsPerSec)+" "+eggResource[i]+" jellies per second.<br>Current "+eggResource[i]+" jelly-to-jelly ratio: "+player[this.layer].value+" jellies"}], () => player[eggName].points.gte(1) ? "" : "prestige-button", "blank", ["row", [["buyable", 11], "blank", "blank", ["bar", "bigBar"]]], "blank", ["buyable", 21]]
				},
				"Vehicles": {
				},
				"Artifacts": {
				},
			},
			color: "#4BDC13",
			prestigeButtonText() {return "Unlock "+eggResource[i]+" jelly"},
			requires(){return eggRequirement[i]}, // Can be a function that takes requirement increases into account
			resource(){return eggResource[i]+" eggs"}, // Name of prestige currency
			baseResource: "points", // Name of resource prestige is based on
			baseAmount() {return player.points}, // Get the current amount of baseResource
			type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
			exponent: Infinity, // Prestige currency exponent
			base: Infinity,
			gainMult() { // Calculate the multiplier for main currency from bonuses
				mult = new Decimal(1)
				return mult
			},
			tooltip(){return eggResource[i]+" jelly"},
			gainExp() { // Calculate the exponent on main currency from bonuses
				return new Decimal(1)
			},
			row: "side", 
			layerShown(){return hasMilestone(eggName, 0)},
			milestonePopups: true,
			update(diff){
			    player[this.layer].value = new Decimal(eggValue[i]).mul(buyableEffect(this.layer, 41))
			    player[this.layer].capacity = new Decimal(0)
				player[this.layer].kensPerSec = tmp[eggName].buyables[42].effect.div(60)
				player[this.layer].capacity = player[this.layer].capacity.add(tmp[this.layer].buyables[31].capacity).add(tmp[this.layer].buyables[32].capacity).add(tmp[this.layer].buyables[33].capacity).add(tmp[this.layer].buyables[34].capacity).add(tmp[this.layer].buyables[35].capacity).add(tmp[this.layer].buyables[36].capacity)
				player[this.layer].limit = new Decimal(10).add(tmp[this.layer].buyables[43].effect)
				player[this.layer].time = player[this.layer].time.add(diff)
				if(player[this.layer].hatch.lt(player[this.layer].limit) && player[this.layer].time.gte(1)) player[this.layer].hatch = player[this.layer].hatch.add(Decimal.mul(diff, player[this.layer].limit).div(100))
				if(player[this.layer].hatch.gte(player[this.layer].limit)) player[this.layer].hatch = new Decimal(10)
				player[this.layer].eggsPerSec = player[this.layer].jellykens
				player[this.layer].jelliesPerSec = player[this.layer].eggsPerSec.mul(player[this.layer].value)
				if(player[this.layer].capacity.gt(player[this.layer].jellykens)) player[this.layer].jellykens = player[this.layer].jellykens.add(Decimal.mul(player[this.layer].kensPerSec, diff))
				if(player[this.layer].capacity.lte(player[this.layer].jellykens)) player[this.layer].jellykens = player[this.layer].capacity
			},
			milestones: {
				0: {
					requirementDescription: "123 waffles",
					effectDescription: "blah",
					done() { return player.points.gte(eggFirstTime[i]) },
					unlocked() { return false}
				},
				1: {
					requirementDescription: "123 waffles",
					effectDescription: "blah",
					done() { return player.points.gte(eggRequirement[i]) },
					unlocked() { return false}
				}
			},
			bars: {
				bigBar: {
					direction: UP,
					width: 64,
					height: 200,
					progress() { return player[this.layer].hatch.div(player[this.layer].limit) },
					display() {return format(player[this.layer].hatch)+"/"+formatWhole(player[this.layer].limit)},
					textStyle() {return {'color': 'red'}}
				},
			},
			buyables: {
				11: {
					cost() { return new Decimal(1) },
					display() { return "<h2>The Almighty Button</h2><br><br><h3>Generates "+formatWhole(tmp[this.layer].buyables[21].effect)+" jellyken in this floor" },
					canAfford() { return player[this.layer].hatch.gte(tmp[this.layer].buyables[21].effect) && player[this.layer].jellykens.lt(player[this.layer].capacity) },
					buy() {
						player[this.layer].jellykens = player[this.layer].jellykens.add(tmp[this.layer].buyables[21].effect)
						player[this.layer].hatch = player[this.layer].hatch.sub(tmp[this.layer].buyables[21].effect)
						player[this.layer].time = new Decimal(0)
					},
				},
				21: {
					cost() { return new Decimal(5000).mul(Decimal.pow(5, player[this.layer].buyables[21])).mul(player[this.layer].buyables[21]+1) },
					effect() {return Decimal.add(1, player[this.layer].buyables[21])},
					display() { return "<h2>Button Enhancer</h2><br><br><h3>Cost Scaling: (5^x)*(x+1)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				31: {
					cost() { return new Decimal(128).pow(player[this.layer].buyables[this.id]) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				32: {
					cost() { return new Decimal(128).pow(player[this.layer].buyables[this.id]) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				33: {
					cost() { return new Decimal(128).pow(player[this.layer].buyables[this.id]) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				34: {
					cost() { return new Decimal(128).pow(player[this.layer].buyables[this.id]) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				35: {
					cost() { return new Decimal(128).pow(player[this.layer].buyables[this.id]) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				36: {
					cost() { return new Decimal(128).pow(player[this.layer].buyables[this.id]) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				41: {
					cost() { return new Decimal(10).mul(Decimal.pow(1.15, player[this.layer].buyables[this.id])) },
					effect() {return Decimal.add(1, Decimal.div(player[this.layer].buyables[this.id], 20))},
					display() { return "<h2>Better Flavour</h2><br><br><h3>Effect: +"+format(this.effect().times(100).sub(100))+"% "+eggResource[i]+" jelly value (+1.05x)<br>Cost Scaling: (1.1^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				42: {
					cost() { return new Decimal(10).mul(Decimal.pow(1.5, player[this.layer].buyables[this.id])) },
					effect() {return player[this.layer].buyables[this.id]},
					display() { return "<h2>Reproduction ig</h2><br><br><h3>Effect: "+format(this.effect())+" "+eggResource[i]+" jellykens/minute (+1)<br>Cost Scaling: (1.5^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
				43: {
					cost() { return new Decimal(25).mul(Decimal.pow(1.3, player[this.layer].buyables[this.id])) },
					effect() {return player[this.layer].buyables[this.id]},
					display() { return "<h2>HATCHERY?!?!?!? WTF</h2><br><br><h3>Effect: "+format(this.effect())+" hatchery limit (+1)<br>Cost Scaling: (1.3^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					},
				},
			},
		})
	}
}

dotheFunny()