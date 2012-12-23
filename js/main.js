var paper;

$(document).ready(function() {
	var height = $(window).height() - $('.container').outerHeight() - 80;

	paper = Raphael('paper', $(window).width(), height);
});