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
		jellykens: new Decimal(0),
		piggyBank: new Decimal(0),
		piggyLevel: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
	}},
	tabFormat: {
		"Upgrades": {
		},
		"Prestige": {
		},
		"Epic Shop": {
			content: [["display-text", function() {return "<h1>YOU HAVE "+player[this.layer].goldenEggs+" GOLDEN JELLIES HOLY SHIT WAAAAAHOOOOOOO</h1><br><br><h2>Epic Shop: Giant Enemy Piggy Bank!</h2><br><h4>Epic Researches are essentially Researches that don't get reset. Ever... Sort of.<br>In order to buy Epic Researches, one must gather Golden Jellies from Piggy Bank. Upon breaking Piggy Bank, you gain them at the cost of resetting your progress.<br><br>also cracking piggy bank at it's limit levels it up"}], "blank", "buyables"]
		},
		"Main Hub": {
			content: [["display-text", function() {return "<h2>There's not much you can do here. Go back to the farm."}]]
		},
		"Statistics": {
			content: [["display-text", function() {return "<h2>You've made "+format(player[this.layer].total)+" jellies in total<br>Your best jelly amount is "+format(player[this.layer].best)+"<br>You currently have "+format(player[this.layer].jellykens)+" jellykens<br>You currently have "+format(player[this.layer].goldenEggs)+" golden jellies<br><br></h2><h3>If your jelliees were the size of jelly bean, they wouldn't even come close surpassing Tree Of Life's timewall."}]]
		},
		"Achievements": {
			content: [["display-text", function() {return "idk lol"}], "blank", "achievements"]
		},
		"Trophies": {
			content: [["display-text", function() {return "<h2>Trophies: The only achievements that truly matter in this game.</h2><br><br><br><br><br><br><br><br>... ahem, cough. you're not going to get 10 million jellykens anytime soon"}]]
		}
	},
	buyables: {
		11: {
			cost() { return new Decimal(1) },
			limit() { return new Decimal(7500).add(player[this.layer].piggyLevel.mul(1000))},
			display() { return "piggy bank :)<br>level "+formatWhole(player[this.layer].piggyLevel.add(1))+"<br>"+format(player[this.layer].piggyBank)+"/"+formatWhole(this.limit()) },
			canAfford() { return true },
			buy() {
				for(let dietz=0; dietz<19; dietz++){
					layerDataReset("jelly"+dietz, true)
				}
				if (player[this.layer].piggyBank.gte(this.limit())) player[this.layer].piggyLevel = player[this.layer].piggyLevel.add(1)
				player[this.layer].goldenEggs = player[this.layer].piggyBank
				player[this.layer].piggyBank = new Decimal(0)
			},
			unlocked() { return true },
		},
		21: {
			cost() { return new Decimal(15).mul(Decimal.pow(1.15, player[this.layer].buyables[this.id])) },
			effect() {return Decimal.add(1, Decimal.div(player[this.layer].buyables[this.id], 20))},
			display() { return "<h2>Super WIP" },
			//canAfford() { return player.points.gte(this.cost()) && !player[this.layer].buyables[this.id].gte(75) },
			canAfford() { return false },
			buy() {
				player[this.layer].goldenEggs = player[this.layer].goldenEggs.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			unlocked() { return true },
			style() {return {'width': '300px', 'height': '100px'}}
		},
	},
	achievements: {
		11: {
			name: "It ain't much, but it's honest work",
			tooltip: "Reach 6 jellykens",
			done() {return player["tree-tab"].jellykens.gte(6)}
		},
		12: {
			name: "Full House",
			tooltip: "Upgrade all Habitats once",
			done() {let magic = true
					for(let ih=1;ih<7;ih++){
						if(!player.jelly0.buyables[30+ih].gte(1)) magic = false
				}
				return magic
			}
		},
		13: {
			name: "so cool<br>so cool<br>so cool<br>so cool<br>so cool<br>so cool<br>so cool<br>so cool<br>so cool<br>so cool<br>so cool",
			tooltip: "Upgrade all Vehicles once",
			done() {let magic = true
					for(let iv=1;iv<9;iv++){
						if(!player.jelly0.buyables[40+iv].gte(1)) magic = false
				}
				return magic
			}
		},
	},
	update(diff){
		player[this.layer].jellykens = getKenAmount()
		if(player[this.layer].piggyBank.gte(tmp[this.layer].buyables[11].limit)) player[this.layer].piggyBank = tmp[this.layer].buyables[11].limit
		player[this.layer].total = player[this.layer].total.add(getPointGen().times(diff))
		player[this.layer].best = player[this.layer].best.max(player.points)
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
				rechargeTime: new Decimal(0),
				eggsPerSec: new Decimal(0),
				jelliesPerSec: new Decimal(0),
				kensPerSec: new Decimal(0),
				capacity: new Decimal(0),
				vehicle: new Decimal(0),
				researchLevels: new Decimal(0)
			}},
			tabFormat: {
				"Researches": {
					content: [["display-text", function() {return "<h2>Researches: AKA Not-So-Permanent Upgrades</h2><br><h4>Researches are upgrades with level cap that enhance various attributes, such as your jelly value, jelly's generation or jellyken's reproduction. Each Tier has 4 upgrades each and to unlock next Tier, you need to reach the required total amount of research levels.<br><Br>Researches from different Tiers compound with each other btw.</h4><br><br><h1>Tier 1"}], "blank", "blank", ["buyable", 51], ["buyable", 52], ["buyable", 53], ["buyable", 54], ["display-text", function() {return "<br><br><h1>Tier 2</h1><h3>"+(player[this.layer].researchLevels.gte(60)?"<br><br>":"<br>You need "+formatWhole(new Decimal(60).sub(player[this.layer].researchLevels))+" more research levels to unlock Tier 2.")}], "blank", ["buyable", 55],["buyable", 56],["buyable", 57],["buyable", 58]],
					buttonStyle() {return {'border-color': 'white'}}
				},
				"Habitats": {
					content: [["display-text", function() {return player[this.layer].capacity}],["row", [["buyable", 31], ["buyable", 32], ["buyable", 33]]], ["row", [["buyable", 34], ["buyable", 35], ["buyable", 36]]]],
					buttonStyle() {return {'border-color': 'white'}}
				},
				[eggResource[i]+' Inc.']: {
					content: [["display-text", function() {return "<h4>You currently have "+formatWhole(player[this.layer].jellykens)+" "+eggResource[i]+" jellykens, generating "+format(player[this.layer].eggsPerSec)+" "+eggResource[i]+" jellies per second.<br>Current "+eggResource[i]+" jelly-to-jelly ratio: "+player[this.layer].value+" jellies"}], () => player[eggName].points.gte(1) ? "" : "prestige-button", "blank", ["row", [["buyable", 11], "blank", "blank", ["bar", "bigBar"]]], "blank", ["buyable", 21]],
					buttonStyle() {return {'border-color': 'white'}}
				},
				"Vehicles": {
					content: [["display-text", function() {return player[this.layer].vehicle}],["row", [["buyable", 41],["buyable", 42],["buyable", 43],["buyable", 44]]],["row", [["buyable", 45],["buyable", 46],["buyable", 47],["buyable", 48]]]],
					buttonStyle() {return {'border-color': 'white'}}
				},
				"Artifacts": {
					buttonStyle() {return {'border-color': 'white'}}
				},
			},
			componentStyles: {
				"prestige-button"() { return {'background-color': 'white'} },
				"buyable"() { return {'background-color': 'rgb(255, 255, 255);'} }
			},
			color: "#4BDC13",
			prestigeButtonText() {return "Unlock "+eggResource[i]+" jelly"},
			requires(){return eggRequirement[i]}, // Can be a function that takes requirement increases into account
			resource(){return eggResource[i]+" eggs"}, // Name of prestige currency
			milestonePopups: false,
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
				player[this.layer].rechargeTime = player[this.layer].rechargeTime.add(diff)
			    player[this.layer].vehicle = new Decimal(0)
				tmp[this.layer].color = "white"
				if(player.tab==eggName) tmp[this.layer].color = "#4BDC13"
				player[this.layer].vehicle = player[this.layer].vehicle.add(tmp[this.layer].buyables[41].vehicle).add(tmp[this.layer].buyables[42].vehicle).add(tmp[this.layer].buyables[44].vehicle).add(tmp[this.layer].buyables[44].vehicle).add(tmp[this.layer].buyables[45].vehicle).add(tmp[this.layer].buyables[46].vehicle).add(tmp[this.layer].buyables[47].vehicle).add(tmp[this.layer].buyables[48].vehicle).times(buyableEffect(this.layer, 52)).times(buyableEffect(this.layer, 56))
				let fuckOFF = player[this.layer].vehicle
			    player[this.layer].value = new Decimal(eggValue[i]).mul(buyableEffect(this.layer, 51)).mul(buyableEffect(this.layer, 58))
			    player[this.layer].capacity = new Decimal(0)
				player[this.layer].researchLevels = new Decimal(player[this.layer].buyables[51]).add(player[this.layer].buyables[52]).add(player[this.layer].buyables[53]).add(player[this.layer].buyables[54])
				player[this.layer].kensPerSec = tmp[eggName].buyables[55].effect.div(60)
				player[this.layer].capacity = player[this.layer].capacity.add(tmp[this.layer].buyables[31].capacity).add(tmp[this.layer].buyables[32].capacity).add(tmp[this.layer].buyables[33].capacity).add(tmp[this.layer].buyables[34].capacity).add(tmp[this.layer].buyables[35].capacity).add(tmp[this.layer].buyables[36].capacity)
				player[this.layer].limit = new Decimal(10).add(tmp[this.layer].buyables[53].effect)
				player[this.layer].time = player[this.layer].time.add(diff)
				if(player[this.layer].hatch.lt(player[this.layer].limit) && player[this.layer].time.gte(1)) player[this.layer].hatch = player[this.layer].hatch.add(Decimal.mul(Decimal.mul(diff, buyableEffect(this.layer, 57)), player[this.layer].limit).div(100))
				if(player[this.layer].hatch.gte(player[this.layer].limit)) player[this.layer].hatch = new Decimal(10)
				player[this.layer].eggsPerSec = player[this.layer].jellykens.mul(buyableEffect(this.layer, 54))
				if(player[this.layer].eggsPerSec.gte(player[this.layer].vehicle)) player[this.layer].eggsPerSec = fuckOFF
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
					display() { return "<h2>The Almighty Button</h2><br><br><h3>Generates "+formatWhole(tmp[this.layer].buyables[21].effect)+" jellyken in this floor<br><br>Current Cooldown: 1 second" },
					canAfford() { return player[this.layer].hatch.gte(tmp[this.layer].buyables[21].effect) && player[this.layer].rechargeTime.gte(1) && player[this.layer].jellykens.lt(player[this.layer].capacity) },
					buy() {
						player[this.layer].jellykens = player[this.layer].jellykens.add(tmp[this.layer].buyables[21].effect)
						player[this.layer].hatch = player[this.layer].hatch.sub(tmp[this.layer].buyables[21].effect)
						player[this.layer].time = new Decimal(0)
						player[this.layer].rechargeTime = new Decimal(0)
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
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(22.5) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(25)
					},
				},
				32: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(45) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(25)
					},
				},
				33: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(81) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(25)
					},
				},
				34: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(129.6) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(25)
					},
				},
				35: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(181.44) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(25)
					},
				},
				36: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(217.728) },
					capacity() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>Capacity: "+format(this.capacity())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(25)
					},
				},
				41: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(40) },
					vehicle() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>vehicle: "+format(this.vehicle())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(20)
					},
				},
				42: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(80) },
					vehicle() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>vehicle: "+format(this.vehicle())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(20)
					},
				},
				43: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(148.5714286) },
					vehicle() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>vehicle: "+format(this.vehicle())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(20)
					},
				},
				44: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(254.6938776) },
					vehicle() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>vehicle: "+format(this.vehicle())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(20)
					},
				},
				45: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(400.2332362) },
					vehicle() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>vehicle: "+format(this.vehicle())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(20)
					},
				},
				46: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(571.7617659) },
					vehicle() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>vehicle: "+format(this.vehicle())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(20)
					},
				},
				47: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(735.1222703) },
					vehicle() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>vehicle: "+format(this.vehicle())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(20)
					},
				},
				48: {
					cost() { return Decimal.mul(64, Decimal.pow(1.271828, player[this.layer].buyables[this.id])).pow(player[this.layer].buyables[this.id]).mul(840.1397373) },
					vehicle() {return [1,10,70,350,5000,25000,150000,2345000,22000000,300000000][player[this.layer].buyables[this.id]||0]},
					display() { return "<h2>"+(["Factory Foundation", "Small Well", "Megajelly Storage", "Magic Volcano", "Tree Garden", "Egg Gate", "Ken-nado Windmill", "Ancient Treasure Chest", "Wish Granting Fountain", "Portal Warper"][player[this.layer].buyables[this.id]||0])+"<br><br>vehicle: "+format(this.vehicle())+"<br>"+(player[this.layer].buyables[this.id].gte(9)?"":"Next Level Cost: "+format(this.cost())+" jellies") },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(9) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(20)
					},
				},
				51: {
					cost() { return new Decimal(15).mul(Decimal.pow(1.15, player[this.layer].buyables[this.id])) },
					effect() {return Decimal.add(1, Decimal.div(player[this.layer].buyables[this.id], 10))},
					display() { return "<h2>Better Flavour</h2><h4>level: "+formatWhole(player[this.layer].buyables[this.id])+"/75</h4><h3>Effect: +"+format(this.effect().times(100).sub(100))+"% "+eggResource[i]+" jelly value (+1.1x)<br>Cost Scaling: (1.15^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) && !player[this.layer].buyables[this.id].gte(75) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(3)
					},
					style() {return {'width': '300px', 'height': '100px'}}
				},
				52: {
					cost() { return new Decimal(80).mul(Decimal.pow(1.35, player[this.layer].buyables[this.id])) },
					effect() {return Decimal.add(1, Decimal.div(player[this.layer].buyables[this.id], 10))},
					display() { return "<h2>Faster Vehicles</h2><h4>level: "+formatWhole(player[this.layer].buyables[this.id])+"/30</h4><h3>Effect: +"+format(this.effect().times(100).sub(100))+"% vehicle capacity (+1.1x)<br>Cost Scaling: (1.35^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) && !player[this.layer].buyables[this.id].gte(30) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(3)
					},
					style() {return {'width': '300px', 'height': '100px'}}
				},
				53: {
					cost() { return new Decimal(25).mul(Decimal.pow(1.3, player[this.layer].buyables[this.id])) },
					effect() {return player[this.layer].buyables[this.id]},
					display() { return "<h2>HATCHERY?!?!?!? WTF</h2><h4>level: "+formatWhole(player[this.layer].buyables[this.id])+"/15</h4><h3>Effect: "+format(this.effect())+" hatchery limit (+1)<br>Cost Scaling: (1.3^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) && !player[this.layer].buyables[this.id].gte(15) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(3)
					},
					style() {return {'width': '300px', 'height': '100px'}}
				},
				54: {
					cost() { return new Decimal(100).mul(Decimal.pow(1.25, player[this.layer].buyables[this.id])) },
					effect() {return Decimal.add(1, Decimal.div(player[this.layer].buyables[this.id], 6.6667))},
					display() { return "<h2>Faster Egging lmfao</h2><h4>level: "+formatWhole(player[this.layer].buyables[this.id])+"/40</h4><h3>Effect: +"+format(this.effect().times(100).sub(100))+"% "+eggResource[i]+" jellies/sec (+1.15x)<br>Cost Scaling: (1.25^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) && !player[this.layer].buyables[this.id].gte(40) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(3)
					},
					style() {return {'width': '300px', 'height': '100px'}}
				},
				55: {
					cost() { return new Decimal(1417.5).mul(Decimal.pow(1.5, player[this.layer].buyables[this.id])) },
					effect() {let gain = new Decimal(0)
							  if(player[this.layer].buyables[31].gte(1)) gain = gain.add(1)
							  if(player[this.layer].buyables[32].gte(1)) gain = gain.add(1)
							  if(player[this.layer].buyables[33].gte(1)) gain = gain.add(1)
							  if(player[this.layer].buyables[34].gte(1)) gain = gain.add(1)
							  if(player[this.layer].buyables[35].gte(1)) gain = gain.add(1)
							  if(player[this.layer].buyables[36].gte(1)) gain = gain.add(1)
							  return gain.mul(player[this.layer].buyables[this.id])},
					display() { return "<h2>Reproduction ig</h2><h4>level: "+formatWhole(player[this.layer].buyables[this.id])+"/5</h4><h3>Effect: "+format(this.effect())+" "+eggResource[i]+" jellykens/minute per upgraded habitat<br>Cost Scaling: (1.5^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].researchLevels.gte(60) && !player[this.layer].buyables[this.id].gte(5) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(3)
					},
					style() {return {'width': '300px', 'height': '100px'}}
				},
				56: {
					cost() { return new Decimal(2563).mul(Decimal.pow(1.65, player[this.layer].buyables[this.id])) },
					effect() {return Decimal.add(1, Decimal.div(player[this.layer].buyables[this.id], 6.6667))},
					display() { return "<h2>Bigger Vehicles</h2><h4>level: "+formatWhole(player[this.layer].buyables[this.id])+"/20</h4><h3>Effect: +"+format(this.effect().times(100).sub(100))+"% vehicle capacity (+1.15x)<br>Cost Scaling: (1.65^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].researchLevels.gte(60) && !player[this.layer].buyables[this.id].gte(20) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(3)
					},
					style() {return {'width': '300px', 'height': '100px'}}
				},
				57: {
					cost() { return new Decimal(10485.76).mul(Decimal.pow(1.8, player[this.layer].buyables[this.id])) },
					effect() {return Decimal.add(1, Decimal.div(player[this.layer].buyables[this.id], 2))},
					display() { return "<h2>Hatchery Rooster</h2><h4>level: "+formatWhole(player[this.layer].buyables[this.id])+"/4</h4><h3>Effect: +"+format(this.effect().times(100).sub(100))+"% "+eggResource[i]+" hatchery base production (+1.5x)<br>Cost Scaling: (1.8^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].researchLevels.gte(60) && !player[this.layer].buyables[this.id].gte(4) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(3)
					},
					style() {return {'width': '300px', 'height': '100px'}}
				},
				58: {
					cost() { return new Decimal(3616.565).mul(Decimal.pow(1.45, player[this.layer].buyables[this.id])) },
					effect() {return Decimal.add(1, Decimal.div(player[this.layer].buyables[this.id], 4))},
					display() { return "<h2>Polished Jelly</h2><h4>level: "+formatWhole(player[this.layer].buyables[this.id])+"/15</h4><h3>Effect: +"+format(this.effect().times(100).sub(100))+"% "+eggResource[i]+" jelly value (+1.25x)<br>Cost Scaling: (1.45^x)<br>Cost: "+format(this.cost())+" jellies" },
					canAfford() { return player.points.gte(this.cost()) && player[this.layer].researchLevels.gte(60) && !player[this.layer].buyables[this.id].gte(15) },
					buy() {
						player.points = player.points.sub(this.cost())
						setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
						player["tree-tab"].piggyBank = player["tree-tab"].piggyBank.add(3)
					},
					style() {return {'width': '300px', 'height': '100px'}}
				},
			},
		})
	}
}

dotheFunny()