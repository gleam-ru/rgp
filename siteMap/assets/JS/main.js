function makeParameterString(string, parameter) {}
window.str = "Класс #%classId%";
window.parameter = "34";


window.tree = {
	name: "root",
	classes: {
		name: "Информационная модель",
		editAttribute: {
			name: "Информация об атрибуте",
		}
	},
	items: {
		name: "Список объектов класса %className%",
		editItem: {
			name: "Редактирование экземпляра #%itemId%",
			attributeValues: {
				//TODO: что это? зачем нужно? почему доступ возможен и через меню?
				name: "Отчет"
			}
		}
	},
	roadMaps: {
		name: "Маршрутные карты",
		roadMap: {
			name: "Маршрутная карта #%roadMapId%",
			step: {
				name: "Этап #%stepId%",
				stepItems: {
					name: "Осматриваемое оборудование и точки",
					stepItemAttribute: {
						//TODO: как сюда попасть?
						name: "",
					}
				}
			}
		}
	},
	barcodes: {
		name: "Метки",
		barcode: {
			name: "Метка #%barcodeId%",
		}
	},
	rounds: {
		name: "Обходы",
		round: {
			name: "Обход #%roundId%"
		}
	},
	//TODO: тут должны быть "отчеты", но зачем они нужны - пока неизвестно...
	comments: {
		name: "Комментарии для класса: %className%",
	},
	users: {
		name: "Пользователи",
		user: {
			name: "Пользователь: %userName%",
		}
	},
	settings: {
		name: "Настройки",

	},
	login: {
		name: "Авторизация",

	},
	index: {
		name: "Добро пожаловать!",
	}
}


var BCCreator = function() {}

function getNames(tree) {
	if(tree) {
		var namesList = [];
		if(tree.name) {
			namesList.push(tree.name);
			for (var key in tree) if(tree.hasOwnProperty(key)) {
				namesList = namesList.concat(getNames(tree[key]));
			}
		}
		return namesList;
	}
	else {
		return undefined;
	}
}

function getPath(name, tree) {
	if(tree) {
		var namesList = [];
		if(tree.name) {
			if(tree.name == name) {
				return namesList.push(name);
			}
			else {
				for(var key in tree) if(tree.hasOwnProperty(key)) {
					return getPath(name, tree[key]);
				}
			}
			return namesList;
		}
	}
	else {
		return undefined;
	}
}

$(document).ready(function() {
	console.log('1');
});