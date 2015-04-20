yattoApp.controller('CalculatorController',
	function($scope, $http, $cookies) {
		var something = "something";

		$scope.sortableOptions = {
  		'ui-floating': false,
  		'axis': 'y',
  		'containment': "parent",
  		'handle': '> .myHandle',
		};

		$scope.steps = [];
		// {'index': 11, 'cost': 5236, 'name': "Hero's Thrust", 'cumulative': 5236, 'level': 190}
		// {'index': 13, 'cost': 978, 'name': "Knight's Shield", 'cumulative': 6214, 'level': 125}
		// {'index': 26, 'cost': 1962, 'name': 'Universal Fissure', 'cumulative': 8176, 'level': 130}
		// {'index': 9, 'cost': 4772, 'name': 'Drunken Hammer', 'cumulative': 12948, 'level': 197}
		// {'index': 11, 'cost': 5283, 'name': "Hero's Thrust", 'cumulative': 18231, 'level': 191}

		$scope.summary_steps = [];
		// {'index': 9, 'cost': 4772, 'name': 'Drunken Hammer', 'level': 197}
		// {'index': 26, 'cost': 1962, 'name': 'Universal Fissure', 'level': 130}
		// {'index': 11, 'cost': 10519, 'name': "Hero's Thrust", 'level': 191}
		// {'index': 13, 'cost': 978, 'name': "Knight's Shield", 'level': 125}
		
		// re-ordering http://codepen.io/SimeonC/pen/AJIyC

		// cookie stuff
		//   $scope.lastVal = $cookieStore.get('tab');

  //     $scope.changeTab = function(tabName){
  //         $scope.lastVal = tabName;
  //         $cookieStore.put('tab', tabName);
  //     };



		$scope.artifacts = [
			{name: "Amulet of the Valrunes",  index: 0, value: 1},
			{name: "Axe of Resolution",       index: 1, value: 1},
			{name: "Barbarian's Mettle",      index: 2, value: 1},
			{name: "Chest of Contentment",    index: 3, value: 1},
			{name: "Crafter's Elixir",        index: 4, value: 1},
			{name: "Crown Egg",               index: 5, value: 1},
			{name: "Dark Cloak of Life",      index: 6, value: 1},
			{name: "Death Seeker",            index: 7, value: 1},
			{name: "Divine Chalice",          index: 8, value: 1},
			{name: "Drunken Hammer",          index: 9, value: 1},
			{name: "Future's Fortune",        index: 10, value: 1},
			{name: "Hero's Thrust",           index: 11, value: 1},
			{name: "Hunter's Ointment",       index: 12, value: 1},
			{name: "Knight's Shield",         index: 13, value: 1},
			{name: "Laborer's Pendant",       index: 14, value: 1},
			{name: "Ogre's Gauntlet",         index: 15, value: 1},
			{name: "Otherworldly Armor",      index: 16, value: 1},
			{name: "Overseer's Lotion",       index: 17, value: 1},
			{name: "Parchment of Importance", index: 18, value: 1},
			{name: "Ring of Opulence",        index: 19, value: 1},
			{name: "Ring of Wondrous Charm",  index: 20, value: 1},
			{name: "Sacred Scroll",           index: 21, value: 1},
			{name: "Saintly Shield",          index: 22, value: 1},
			{name: "Savior Shield",           index: 23, value: 1},
			{name: "Tincture of the Maker",   index: 24, value: 1},
			{name: "Undead Aura",             index: 25, value: 1},
			{name: "Universal Fissure",       index: 26, value: 1},
			{name: "Warrior's Revival",       index: 27, value: 1},
			{name: "Worldly Illuminator",     index: 28, value: 1}];

		$scope.weapons = [
			{name: "Takeda the Blade Assassin",       index: 0, value: 0},
			{name: "Contessa the Torch Wielder",      index: 1, value: 0},
			{name: "Hornetta, Queen of the Valrunes", index: 2, value: 0},
			{name: "Mila the Hammer Stomper",         index: 3, value: 0},
			{name: "Terra the Land Scorcher",         index: 4, value: 0},
			{name: "Inquisireaux the Terrible",       index: 5, value: 0},
			{name: "Charlotte the Special",           index: 6, value: 0},
			{name: "Jordaan, Knight of Mini",         index: 7, value: 0},
			{name: "Jukka, Master of Axes",           index: 8, value: 0},
			{name: "Milo and Clonk-Clonk",            index: 9, value: 0},
			{name: "Macelord the Ruthless",           index: 10, value: 0},
			{name: "Gertrude the Goat Rider",         index: 11, value: 0},
			{name: "Twitterella the Tweeter",         index: 12, value: 0},
			{name: "Master Hawk, Lord of Luft",       index: 13, value: 0},
			{name: "Elpha, Wielder of Gems",          index: 14, value: 0},
			{name: "Poppy, Daughter of Ceremony",     index: 15, value: 0},
			{name: "Skulptor, Protector of Bridges",  index: 16, value: 0},
			{name: "Sterling the Enchantor",          index: 17, value: 0},
			{name: "Orba the Foreseer",               index: 18, value: 0},
			{name: "Remus the Noble Archer",          index: 19, value: 0},
			{name: "Mikey the Magician Apprentice",   index: 20, value: 0},
			{name: "Peter Pricker the Prickly Poker", index: 21, value: 0},
			{name: "Teeny Tom, Keeper of the Castle", index: 22, value: 0},
			{name: "Deznis the Cleanser",             index: 23, value: 0},
			{name: "Hamlette, Painter of Skulls",     index: 24, value: 0},
			{name: "Eistor the Banisher",             index: 25, value: 0},
			{name: "Flavius and Oinksbjorn",          index: 26, value: 0},
			{name: "Chester the Beast Tamer",         index: 27, value: 0},
			{name: "Mohacas the Wind Warrior",        index: 28, value: 0},
			{name: "Jaqulin the Unknown",             index: 29, value: 0},
			{name: "Pixie the Rebel Fairy",           index: 30, value: 0},
			{name: "Jackalope the Fireballer",        index: 31, value: 0},
			{name: "Dark Lord, Punisher of All",      index: 32, value: 0}];
		$scope.wprobability = 0;

		$scope.customizations = [
			{name: "All Damage",      index: 0, value: 0},
			{name: "Critical Damage", index: 1, value: 0},
			{name: "Gold Dropped",    index: 2, value: 0},
			{name: "Chest Gold",      index: 3, value: 0},
			{name: "Critical Chance", index: 4, value: 0},
			{name: "Tap Damage",      index: 5, value: 0}];

		$scope.methods = [
			{name: "Gold",          index: 0, value: false},
			{name: "All Damage",    index: 1, value: false},
			{name: "Tap Damage",    index: 2, value: true},
			{name: "K",             index: 3, value: false},
			{name: "Relics/second", index: 4, value: false},
			{name: "Stages/second", index: 5, value: false}];

		$scope.relics = 50;
		$scope.nsteps = 10;
		$scope.greedy = 1;

		var transformScopeArray = function(scopeArray) {
			var newArray = newZeroes(scopeArray.length);
			for (var x in scopeArray) { 
				var thing = scopeArray[x];
				newArray[thing.index] = thing.value;
			}
			return newArray;
		}

		$scope.calculate = function() {
			console.log($scope.artifacts);
			console.log($scope.weapons);
			console.log($scope.customizations);

			var info = {"artifacts"      : $scope.artifacts, 
						"weapons" 	     : $scope.weapons, 
						"customizations" : $scope.customizations,
						"methods"        : $scope.methods,
						"relics"         : $scope.relics,
						"nsteps"         : $scope.nsteps,
						"greedy"         : $scope.greedy}
			console.log("controller");
			console.log(info);

			var artifacts = transformScopeArray($scope.artifacts);
			var weapons = transformScopeArray($scope.weapons);
			var customizations = transformScopeArray($scope.customizations);
			var methods = [];
			for (var m in $scope.methods) {
				if ($scope.methods[m].value) {
					methods.push($scope.methods[m].index);
				}
			}

			artifacts = [35, 118, 10, 200, 150, 200, 25, 25, 50, 209, 38, 201, 10, 135, 0, 130, 10, 10, 101, 82, 25, 10, 10, 25, 69, 190, 139, 10, 5];
			weapons = [5, 4, 2, 4, 3, 3, 4, 6, 7, 5, 5, 6, 4, 2, 1, 2, 2, 1, 3, 3, 5, 2, 3, 2, 2, 6, 3, 5, 1, 6, 2, 4, 4];
			customizations = [0.65, 0.81, 0.59, 1.02, 0.02, 0.44];
			$scope.relics = 134640;
			$scope.nsteps = 0;

			var response = get_steps(artifacts, weapons, customizations, methods, $scope.relics, $scope.nsteps, $scope.greedy);
			console.log("holy crap a response");
			console.log(response);

			$scope.steps = response["2"]["steps"];
			$scope.summary_steps = response["2"]["summary"];

			// $http({
			// 	method: "POST",
			// 	url: "calculate",
			// 	data: {"info": info}
			// }).success(function(data, status, headers, config) {
   //    			// console.log($scope.roadmaps);
   //    			console.log("yay stuff: " + data.content);
   //    			var pyres = JSON.parse(data.content);
   //    			console.log("pyres is: " + pyres);
   //    			console.log(typeof pyres);
   //    			console.log("------------------");
   //    			console.log(pyres["2"]);
   //    			console.log(pyres["2"]["steps"]);
   //    			$scope.steps = pyres["2"]["steps"];
   //    			$scope.summary_steps = pyres["2"]["summary"];
   //    			console.log("now is");
   //    			console.log($scope.summary_steps);
   //    		}).error(function(data, status, headers, config) {
   //    			console.log("boo error");
   //    		});
  		};

  		$scope.weaponProbability = function() {
  			console.log("controller - weapon probability");
  			var weapon_list = Array.apply(null, new Array($scope.weapons.length)).map(Number.prototype.valueOf,0);
  			console.log("scope weapons is: ");
  			console.log($scope.weapons);
  			for (var weapon in $scope.weapons) {
  				var w = $scope.weapons[weapon];
  				weapon_list[w["index"]] = w["value"];
  			}
  			console.log("sending: " + weapon_list);
  			$http({
  				method: "POST",
  				url: "wprobability",
  				data: {"weapons": weapon_list}
  			}).success(function(data, status, headers, config) {
  				console.log("response: " + data.content);
  				$scope.wprobability = data.content;
  			}).error(function(data, status, headers, config) {
  				console.log("w probability error");
  			});
  		};
	}
);