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

	this.rings = [];

	this.draw = function(paper, x, y, radius) {
		var spacing = (radius - radius * SMALLEST_RADIUS_RATIO) / this.number.length;
		var decimal_present = false;

		var current_radius = radius;

		for (var i = 0; i < this.number.length; i++) {
			if (this.number.charAt(i) == '.') {
				// Decimal
				decimal_present = true;
			} else {
				// Number
				var ring = {};

				var c = paper.circle(x, y, current_radius);
				c.attr('stroke-width', STROKE);

				ring.circle = c;
				ring.number = parseInt(this.number.charAt(i));

				if (this.rings.length == 0) {
					// This is the outer ring, we must draw two circles
					current_radius -= spacing;
					
					var c = paper.circle(x, y, current_radius);
					c.attr('stroke-width', STROKE);
				}

				this.rings.push(ring);

				current_radius -= spacing;
			}
		}
	}
}