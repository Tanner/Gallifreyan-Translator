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

				ring.outer_circle = c;
				ring.number = parseInt(this.number.charAt(i));

				if (this.rings.length > 0) {
					this.rings[this.rings.length - 1].inner_circle = c;
				}

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

		for (var i = 0; i < this.rings.length; i++) {
			var ring = this.rings[i];

			while (ring.number >= 5) {
				var spacing = Math.abs(ring.inner_circle.attr('r') - ring.outer_circle.attr('r'));

				var angle = Math.floor(Math.random() * 2 * Math.PI);

				var x = ring.inner_circle.attr('cx') + Math.cos(angle) * (ring.outer_circle.attr('r') - spacing / 2);
				var y = ring.inner_circle.attr('cy') - Math.sin(angle) * (ring.outer_circle.attr('r') - spacing / 2);

				paper.circle(x, y, spacing / 2).attr('stroke-width', STROKE);

				ring.number -= 5;
			}
		}
	}
}