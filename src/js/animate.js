const updateCardOffsets = () => {
	for (let cardDiv of cardDivs) {
		let top = cardDiv.getBoundingClientRect().top;
		let bot = cardDiv.getBoundingClientRect().bottom;
		cardDiv.style.setProperty("--out-of-view", ((Math.max(0 - top, bot - window.innerHeight, 0)) ** 1.5) / 10 + "px");
	}
};

function throttle (callback, limit) {
	var tick = false;
	return function () {
	  if (!tick) {
		callback.call();
		tick = true;
		setTimeout(function () {
		  tick = false;
		}, limit);
	  }
	}
  }

root.addEventListener("scroll", throttle(updateCardOffsets, 70), {passive: true});
window.addEventListener("resize", updateCardOffsets);