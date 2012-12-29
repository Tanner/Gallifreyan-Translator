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

		// Draw the circles
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

		// Draw the lines
		var changes = false;
		do {
			changes = false;

			for (var i = 0; i < this.rings.length; i++) {
				var ring = this.rings[i];

				if (ring.number >= 1) {
					changes = true;

					var angle = Math.random() * 2 * Math.PI;

					var start = {
						x: ring.inner_circle.attr('cx') + Math.cos(angle) * ring.outer_circle.attr('r'),
						y: ring.inner_circle.attr('cy') - Math.sin(angle) * ring.outer_circle.attr('r')
					}

					if (i == this.rings.length - 1) {
						// This is the last ring
						var end = {
							x: ring.inner_circle.attr('cx') + Math.cos(angle) * ring.inner_circle.attr('r'),
							y: ring.inner_circle.attr('cy') - Math.sin(angle) * ring.inner_circle.attr('r')
						}

						paper.path('M' + start.x + ',' + start.y + 'L' + end.x + ',' + end.y).attr('stroke-width', STROKE);

						ring.number--;
					} else {
						for (var j = i + 1; j < this.rings.length; j++) {
							var ring_b = this.rings[j];

							if (ring_b.number < 1 || j == this.rings.length - 1) {
								// Final end
								if (ring_b.number < 1) {
									end = {
										x: ring_b.inner_circle.attr('cx') + Math.cos(angle) * ring_b.outer_circle.attr('r'),
										y: ring_b.inner_circle.attr('cy') - Math.sin(angle) * ring_b.outer_circle.attr('r')
									}

									// Decrease all numbers between i and j
									for (var k = i; k < j; k++) {
										this.rings[k].number--;
									}
								} else if (j == this.rings.length - 1) {
									var end = {
										x: ring_b.inner_circle.attr('cx') + Math.cos(angle) * ring_b.inner_circle.attr('r'),
										y: ring_b.inner_circle.attr('cy') - Math.sin(angle) * ring_b.inner_circle.attr('r')
									}

									// Decrease all numbers between i and j
									for (var k = i; k <= j; k++) {
										this.rings[k].number--;
									}
								}

								paper.path('M' + start.x + ',' + start.y + 'L' + end.x + ',' + end.y).attr('stroke-width', STROKE);

								break;
							}
						}
					}
				}
			}
		} while (changes);
	}
}