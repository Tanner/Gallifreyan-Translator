function GNumber(number) {
	const SMALLEST_RADIUS_RATIO = 0.2;

	const STROKE = 2;
	const BOLD_STROKE = 4;

	if (!_.isNumber(number)) {
		this.number = number;
	} else {
		this.number = number.toString();
	}

	this.draw = function(paper, x, y, radius) {
		var spacing = (radius - radius * SMALLEST_RADIUS_RATIO) / this.number.length;

		var current_radius = radius;

		for (var i = 0; i < this.number.length; i++) {
			if (this.number.charAt(i) == ',') {
				continue;
			}

			var c = paper.circle(x, y, current_radius);

			if (this.number.charAt(i) == '.') {
				c.attr('stroke-width', BOLD_STROKE);
			} else {
				c.attr('stroke-width', STROKE);
			}

			current_radius -= spacing;
		}
	}
}