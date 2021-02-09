document.addEventListener('DOMContentLoaded', function() {

	function _select(selector) {
		return document.querySelector(selector);
	}

	function _getAll(selector) {
		var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

		return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
	}

	function _setAttributes(el, attrs) {
		for(var key in attrs) {
			el.setAttribute(key, attrs[key]);
		}
	}

	function _create(tag) {
		return document.createElement(tag);
	}

	const menuBtn = _select(".menu-btn");
	const mainMenu = _select(".main-menu");
	const overlay = _select(".overlay");

	menuBtn.addEventListener('click', function(event) {
		overlay.setAttribute("style", "display: block;");
		mainMenu.classList.remove('-translate-x-full');
	});

	overlay.addEventListener('click', function(event) {
		overlay.setAttribute("style", "display: none;");
		mainMenu.classList.add('-translate-x-full');
	});

	var navItems = _getAll(".nav-item");
	if (navItems.length > 0) {
		navItems.forEach(function(el) {
			el.addEventListener('click', function(e) {
				e.preventDefault();
				var active = _select(".active");
				var currentPageLink = active.dataset.target;
				var targetPageLink = this.dataset.target;
				var currentPage = document.querySelector(`[data-page='${currentPageLink}']`);
				var targetPage = document.querySelector(`[data-page='${targetPageLink}']`);
				active.classList.remove("active");
				this.classList.add('active');
				overlay.click();

				setTimeout(function(){
					currentPage.classList.remove("translate-x-0");
					currentPage.classList.add("translate-x-full");

					setTimeout(function() {
						targetPage.classList.remove("translate-x-full");
						targetPage.classList.add("translate-x-0");
					}, 1000);

					// tried to do ala slide but seems needs some more work
					if (currentPageLink > targetPageLink) {
						//alert("currentPage goes right, targetPage comes from left");

					} else if (currentPageLink < targetPageLink) {
						//alert("currentPage goes left, targetPage comes from right");
					}
				}, 1000);
			});
		});
	}

	/*Reading json files: https://stackoverflow.com/a/41478075/12478479*/

	function _readJsonFile(file, callback) {
		let jsonFile = new XMLHttpRequest();
		jsonFile.overrideMimeType("application/json; charset=utf-8");
		jsonFile.open("GET", file, true);
		jsonFile.onreadystatechange = function() {
			if (jsonFile.readyState === 4 && jsonFile.status == "200") {
				callback(jsonFile.responseText);
			}
		}
		jsonFile.send(null);
	}

	/*
	readTextFile("DATA.json", function(text){
		var data = JSON.parse(text);
		console.log(data); 
	});
	/* usage */

	let fetchJson = function() {
		return new Promise(function(resolve, reject) {
			_readJsonFile("js/live-chart-data.json", function(json) {
				//json.replace(, "'");
				let data = JSON.parse(json);
				console.log("Fetching JSON data...");
				console.log(data);
				_menu(data);
				//_cards(data);
				resolve("fetchJson done.");
			});
		});
	};

	Promise.race([fetchJson()])
		.then(function(fromResolve) {
			console.log("fromResolve");
			console.log(fromResolve);
		});

	function _menu(data) {
		let menu = [];
		let navLi = [];
		let seasons = Object.keys(data);
		console.log(seasons);
		let winterList = seasons.filter(s => s.includes('Winter'));
		let springList = seasons.filter(s => s.includes('Spring'));
		let summerList = seasons.filter(s => s.includes('Summer'));
		let fallList = seasons.filter(s => s.includes('Fall'));
		menu = menu.concat([winterList, springList, summerList, fallList]);
		let winterLi = _select(".winter-list");
		let springLi = _select(".spring-list");
		let summerLi = _select(".summer-list");
		let fallLi = _select(".fall-list");
		navLi = navLi.concat([winterLi, springLi, summerLi, fallLi]);
		console.log(winterList);
		console.log(fallList);
		console.log(menu);
		console.log(navLi);

		// loop through object keys and insert menu list
		menu.forEach(function(item, index) {
			if (item.length > 0) {
				let list = navLi[index];
				let chevronDown = _create("i");
				let chevronUp = _create("i");
				
				_setAttributes(chevronDown, {
					"class": "fas fa-chevron-down"
				});
				_setAttributes(chevronUp, {
					"class": "fas fa-chevron-up hidden"
				});

				list.children[0].children[1].appendChild(chevronUp);
				list.children[0].children[1].appendChild(chevronDown);

				console.log(list);
				console.log(item.length);

				menu[index].forEach(function(item, index) {
					console.log(data[item]);
					let html = `
					<li class="${index == winterList.length - 1 ? '' : 'mb-2' }"><a class="pl-10 flex items-center" href="#">${item} <i class="far fa-spin fa-star"></i></a></li>
					`;
					list.children[1].insertAdjacentHTML("beforeend", html);
				});
			}
		});

		let dropdown = _getAll(".dropdown");
		console.log(dropdown);
		if (dropdown.length > 0) {
			dropdown.forEach(function(el) {
				let switcher = false;
				el.addEventListener('click', function(e) {
					if (switcher === true) {
						this.children[0].classList.add("hidden");
						this.children[1].classList.remove("hidden");
						switcher = false;
						this.parentNode.parentNode.children[1].classList.add("hidden");
						this.parentNode.parentNode.children[1].classList.remove("block");
					} else {
						this.children[1].classList.add("hidden");
						this.children[0].classList.remove("hidden");
						switcher = true;
						this.parentNode.parentNode.children[1].classList.add("block");
						this.parentNode.parentNode.children[1].classList.remove("hidden");
					}
				});
			});
		}

		console.log("Winter 2020 Anime" in data);
	}

	function _cards(data) {
		let seasons = Object.keys(data);
		console.log(seasons);
		let types = Object.keys(data[seasons[0]])
		console.log(types);
		console.log(data[seasons[0]][types[0]].length);

		let grid = _select(".winter");
		console.log(grid);

		for (let i = 0; i < data[seasons[0]][types[0]].length; i++) {
			console.log(data[seasons[0]][types[0]][i]["anime-synopsis"]);
			let html = `
			<div class="flex bg-white rounded overflow-hidden mb-4 md:mb-0">
				<div class="relative pr-48">
					<img class="absolute h-full w-full object-cover" src="${data[seasons[0]][types[0]][i]["poster-img-link"]}">
				</div>
				<div class="flex flex-col">
					<div class="p-4">
						<h4 class="text-lg font-bold">${data[seasons[0]][types[0]][i]["main-title"]}</h4>
						<span class="text-sm text-gray-400">${data[seasons[0]][types[0]][i]["anime-tags"].join(" · ")}</span>
					</div>
					<div class="overflow-auto h-36 pl-4 flex-grow">
						${data[seasons[0]][types[0]][i]["anime-synopsis"].map((item, index) => `
							<p class="mb-2 ${item['className']}">${item['text']}</p>
						`.trim()).join('')}
					</div>
				</div>
			</div>
			`;

			grid.insertAdjacentHTML("beforeend", html);
		}
	}
});