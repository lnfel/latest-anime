document.addEventListener('DOMContentLoaded', function() {

	function select(selector) {
		return document.querySelector(selector);
	}

	function _getAll(selector) {
		var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

		return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
	}

	const menuBtn = select(".menu-btn");
	const mainMenu = select(".main-menu");
	const overlay = select(".overlay");

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
					var active = select(".active");
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
});