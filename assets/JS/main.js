$(document).ready(function() {
	var auth = $("#auth");
	var main = $("#main");
	$("#login").click(function(event) {
		showAuth(auth, main);
	});
	$("#cancel_button").click(function(event) {
		event.preventDefault();
		hideAuth(auth, main);
	});
	auth.find("p>input").click(function(){$(this).select();})
});

function authIsVisible(auth) {return auth.css("display") == "block";}
function showAuth(auth, clickZone) {
	// auth.css("display", "block");
	auth.show(300);
	clickZone.animate({
		opacity: 0.3
	}, 300);

	clickZone.mouseup(function() {
		hideAuth(auth, clickZone)
	});

}
function hideAuth(auth, clickZone) {
	auth.hide(300);
	clickZone.animate({
		opacity: 1
	}, 300);
	clickZone.unbind("mouseup");
}