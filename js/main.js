var paper;

$(document).ready(function() {
	var height = $(window).height() - $('.container').outerHeight() - 80;

	paper = Raphael('paper', $(window).width(), height);

	paper.customAttributes.arc = function (xloc, yloc, value, total, R) {
		var alpha = 360 / total * value;
		var a = (90 - alpha) * Math.PI / 180;
		var x = xloc + R * Math.cos(a);
		var y = yloc - R * Math.sin(a);
		var path;

		if (total == value) {
			path = [
				["M", xloc, yloc - R],
				["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
			];
		} else {
			path = [
				["M", xloc, yloc - R],
				["A", R, R, 0, +(alpha > 180), 1, x, y]
			];
		}

		return {
			path: path
		};
	};

	var num = new GNumber(162);
	num.draw(paper, paper.width / 2, paper.height / 2, Math.min(paper.height * 0.45, paper.width * 0.45));
});