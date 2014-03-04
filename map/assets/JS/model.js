var Item = function(obj) {
	this.pos = {x: obj.pos[0]||0, y: obj.pos[1]||0};

	// TODO: где-то забыл про экранирование :(
	this.name = obj.name.replace(/'/g, '*') || "Noname";

	// TODO: автоматическая расстановка параграфов
	review = obj.review || "";
	this.review = review;
	
	this.category = obj.category || "default";

	this.images = [];
	if(obj.images) {
		for(var i = 0; i < obj.images.length; i++) {
			this.images.push("<img src='images/items/"+obj.images[i]+"' />");
		}
	}
	// else {
	// 	this.images.push("<img src='images/items/noImage.jpg' />");
	// }

	this.active = false;
	// this.active = true;

	return this;
}





var Category = function(obj) {
	this.name = obj.name || "default";

	// http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/option.presetStorage.xml
	this.icon = obj.icon || "twirl#greyDotIcon";

	this.items = [];

	return this;
}
Category.prototype.addItem = function(item) {
	if(!item) return;
	this.items.push(item);
}





var Stuff = function() {
	var defaultCategory = new Category({
		name: "default",
		icon: "twirl#grayDotIcon"
	});
	this.categories = {'default': defaultCategory};
	this.categories = {}

	return this;
}
