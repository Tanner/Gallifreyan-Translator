function GNumber(number) {
	const SMALLEST_RADIUS_RATIO = 0.2;

	const STROKE = 2;
	const BOLD_STROKE = 4;

	// Ensure the number we store is a string
	if (!_.isNumber(number)) {
		this.number = number;
	} else {
		this.number = number.toString();
	}

	// Detect the decimal position, if it exists within the string
	this.decimal_position = -1;

	for (var i = 0; i < this.number.length; i++) {
		if (this.number.charAt(i) == '.') {
			this.decimal_position = i;
		}
	}

	this.rings = [];

	this.draw = function(paper, x, y, radius) {
		var num_circles = this.number.length;

		// If no decimal is present in the number, e.g. 10, then we need an extra circle
		if (this.decimal_position < 0) {
			num_circles++;
		}

		var spacing = (radius - radius * SMALLEST_RADIUS_RATIO) / num_circles;

		var current_radius = radius;

		// Draw the circles for the number from the outside in
		var outer_circle = null;
		var number;
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

			if (number == null) {
				number = parseInt(this.number.charAt(i));
			}

			if (outer_circle != null) {
				this.rings.push({
					inner: c,
					outer: outer_circle,
					number: number
				});
			}

			number = this.number.charAt(i) != '.' ? parseInt(this.number.charAt(i)) : null;

			current_radius -= spacing;
			outer_circle = c;
		}
	}
}