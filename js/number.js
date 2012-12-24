function GNumber(number) {
	const SMALLEST_RADIUS_RATIO = 0.2;

	const STROKE = 2;
	const BOLD_STROKE = 4;

	if (!_.isNumber(number)) {
		this.number = number;
	} else {
		this.number = number.toString();
	}

	this.decimal_position = -1;

	for (var i = 0; i < this.number.length; i++) {
		if (this.number.charAt(i) == '.') {
			this.decimal_position = i;
		}
	}

	this.draw = function(paper, x, y, radius) {
		var num_circles = this.number.length;

		if (this.decimal_position < 0) {
			num_circles++;
		}

		var spacing = (radius - radius * SMALLEST_RADIUS_RATIO) / num_circles;

		var current_radius = radius;

		for (var i = 0; i < num_circles; i++) {
			if (this.number.charAt(i) == ',') {
				continue;
			}

			var c = paper.circle(x, y, current_radius);

			if (i == this.decimal_position) {
				c.attr('stroke-width', BOLD_STROKE);
			} else {
				if  (i == num_circles - 1 && this.decimal_position == -1) {
					c.attr('stroke-width', BOLD_STROKE);
				} else {
					c.attr('stroke-width', STROKE);
				}
			}

			current_radius -= spacing;
		}
	}
}