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
		var num_digits = 0;

		for (var i = 0; i < this.number.length; i++) {
			var charCode = this.number.charCodeAt(i);
			if (charCode >= 48 && charCode <= 57) {
				num_digits++;
			}
		}

		var spacing = (radius - radius * SMALLEST_RADIUS_RATIO) / num_digits;
		var decimal_present = false;

		var current_radius = radius;

		// Draw all the rings
		for (var i = 0; i < this.number.length; i++) {
			var c = paper.circle(x, y, current_radius);
			c.attr('stroke-width', STROKE);

			if (this.number.charAt(i) == '.') {
				// Decimal
				decimal_present = true;

				c.attr('stroke-width', BOLD_STROKE);
			} else {
				// Number
				var ring = {};

				ring.circle = c;
				ring.number = parseInt(this.number.charAt(i));

				if (i == this.number.length - 1) {
					// This is the inner ring, we must draw two circles
					current_radius -= spacing;
					
					var c = paper.circle(x, y, current_radius);
					c.attr('stroke-width', STROKE);

					ring.inner_circle = c;
				}

				this.rings.push(ring);

				current_radius -= spacing;
			}
		}

		// If no decimal was present, color the last ring's inner circle
		if (!decimal_present) {
			this.rings[this.rings.length - 1].inner_circle.attr('stroke-width', BOLD_STROKE);
		}
	}
}