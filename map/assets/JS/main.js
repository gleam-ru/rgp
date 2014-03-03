// костыли...
window.legalBodyClick = false;

/***
* ITEM-CLASS
* ({
*	name: "",
*	review: "", // html-code
*	layout: "", // name of layout, contains this item
*	images: ["", ""], // list of names of images, which are located in the (images/items/)
* })
* .activate(); // makes item visible on map
* .disable(); // hide item from map
*/
	var Item = function(obj) {
		this.pos = {x: obj.pos[0]||0, y: obj.pos[1]||0};

		this.name = obj.name || "Noname";

		review = obj.review || "";
		review = review.replace("<a ", "<a onclick=baloonLinkClicked(event) ");
		this.review = review;
		
		this.layout = obj.layout || "default";

		this.images = [];
		if(obj.images) {
			for(var i = 0; i < obj.images.length; i++) {
				this.images.push("<img src='images/items/"+obj.images[i]+"' />");
			}
		}
		else {
			this.images.push("<img src='images/items/noImage.jpg' />");
		}

		this.active = false;
		// this.active = true;

		return this;
	}
	Item.prototype.activate = function() {this.active = true;}
	Item.prototype.disable = function() {this.active = false;}





/***
* LAYOUT-CLASS
* ({
*	name: "",
*	icon: "", // http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/option.presetStorage.xml
*	image: "", // name of image, which is located in the (images/layouts/)
* })
* .addItem(item); // adds item into layout
*/
	var Layout = function(obj) {
		this.name = obj.name || "default";

		this.icon = obj.icon || "twirl#greyDotIcon";

		if(obj.image) {
			this.image = "images/layouts/"+obj.image;
		}
		else {
			this.image = "images/layouts/default.jpg";
		}

		this.items = [];

		return this;
	}
	Layout.prototype.addItem = function(item) {
		if(!item) return;
		this.items.push(item);
	}
	// TODO: redraw EACH layout - bad idea, rly...
	Layout.prototype.show = function() {};
	Layout.prototype.hide = function() {};





/***
* VIEWER-CLASS
* (wrapper to be iserted to)
* .addItem(item); // adds item into Viewer
* .addLayout(layout); // adds layout into Viewer
* 
* .activateItem(layoutName, itemName); // makes item active (able to show on the map)
* .disableItem(layoutName, itemName); // ...
*
* .init(); // inits yandex-maps (contains defaul values inside) !!!!!!!!!
* .update(); // redraws EVERY layout (with items)
* 
* .createView(); // creates view (item-selector)
* 	  .createLayoutsUL();
* 		  .createItemsUL();
*/
	var Viewer = function(elElement) {
		if(elElement) {
			this.el = elElement;
			this.layouts = {};
			this.addLayout(new Layout({
				name: "default",
				icon: "twirl#grayDotIcon"
			}));
			return this;
		}
		else {
			console.error("unable to create Viewer - HTML element is not given");
		}
	}

	// adds item into viewer
	Viewer.prototype.addItem = function(item) {
		if(item) {
			var itemLayoutName = item.layout;
			var added = false;
			for(var key in this.layouts) {
				if(this.layouts.hasOwnProperty(key)) {
					var currentLayout = this.layouts[key];
					if(currentLayout.name == itemLayoutName) {
						currentLayout.addItem(item);
						added = true;
						break;
					}
				}
			}
			if(!added) { // unknown layout -> default 
				this.layouts["default"].addItem(item);
			}
		}
	}
	// adds new layout into viewer
	Viewer.prototype.addLayout = function(layout) {
		if(!layout) return;
		this.layouts[layout.name] = layout;
	}

	Viewer.prototype.activateItem = function(layoutName, itemName) {
		var currentLayout = this.layouts[layoutName];
		if(currentLayout) {
			for(var i = 0; i < currentLayout.items.length; i++) {
				var currentItem = currentLayout.items[i];
				if(currentItem.name == itemName) currentItem.activate();
			}
		}
		this.update();
	}
	Viewer.prototype.disableItem = function(layoutName, itemName) {
		var currentLayout = this.layouts[layoutName];
		if(currentLayout) {
			for(var i = 0; i < currentLayout.items.length; i++) {
				var currentItem = currentLayout.items[i];
				if(currentItem.name == itemName) currentItem.disable();
			}
		}
		this.update();
	}

	// initial map position, zoom, etc...
	Viewer.prototype.init = function() {
		this.map = new ymaps.Map(this.el.attr("id"), {
			center: [56.735987, 37.211286],
			zoom: 12,
			behaviors: ["default", "scrollZoom"]
		});

		this.map.controls
			// .add('zoomControl')
			.add('typeSelector');
	}
	// redraws EACH layout
	Viewer.prototype.update = function() {
		var currentViewer = this;
		this.map.geoObjects.each(function(geoObject) { //remove all geoObjects from map
			geoObject.getParent().remove(geoObject);
		});

		for(var key in this.layouts) {
			if(this.layouts.hasOwnProperty(key)) {
				var currentLayout = this.layouts[key];
				for (var j = 0; j < currentLayout.items.length; j++) {
					var currentItem = currentLayout.items[j];
					if(currentItem.active) {
						var placemark = new ymaps.Placemark(
							[currentItem.pos.x, currentItem.pos.y],
							{
								hintContent: currentItem.layout+": "+currentItem.name,
								// balloonContent: currentItem.review
							},
							{
								preset: currentLayout.icon
							}
						);
						placemark.events.add('click', placemarkClicked, {item:currentItem, layout:currentLayout})
						function placemarkClicked() {
						    window.legalBodyClick = true;
						    showFullReview(currentViewer.createItemView(this.layout, this.item));
						}
						this.map.geoObjects.add(placemark);
					}
				};
			}
		}
	}



	Viewer.prototype.createItemView = function(layout, item) {
		var view = "";
		view += "<h1>";
			view += "Категория: <span id='layoutName'>"
				view += layout.name;
			view += "</span><br />"
			view += "Объект: <span id='itemName'>"
				view += item.name;
			view += "</span>"
		view += "</h1>";
		view += "<div class='flexsliderWrapper'>";
			view += "<div class='flexslider'>";
				view += "<ul class='slides'>";
					for(var j = 0; j < item.images.length; j++) {
						view += "<li>"
							view += item.images[j];
						view += "</li>"
					}
				view += "</ul>"
			view += "</div>"
		view += "</div>"
		view += item.review;
		return view;
	}
	Viewer.prototype.createItemsUL = function(layout) {
		var ul = "";
		ul += "<ul class='itemsContainer'>"
		for(var i = 0; i < layout.items.length; i++) {
			window.currentItem = layout.items[i];
			ul += "<li>"
				ul += "<input type='checkbox' checked/>";
				ul += "<div class='itemName' onclick=itemClicked(this)>";
					ul += currentItem.name
				ul += "</div>";
			ul += "</li>"
		}
		ul += "</ul>"
		return ul;
	}
	Viewer.prototype.createLayoutsUL = function() {
		var ul = "";
		ul += "<ul class='layoutsContainer'>"
		for(var key in this.layouts) if(this.layouts.hasOwnProperty(key)) {
			var currentLayout = this.layouts[key];
			if(currentLayout.items.length) { // disable empty layouts
					ul += "<li>";
						ul += "<div class='expand'></div>";
						ul += "<input type='checkbox' checked/>";
						ul += "<div class='layoutName'>";
							ul += currentLayout.name;
						ul += "</div>";
						ul += this.createItemsUL(currentLayout);
					ul += "</li>"
				ul += "</div>";
			}
		}
		ul += "</ul>"
		return ul;
	}
	Viewer.prototype.createView = function() {
		var ul = this.createLayoutsUL();
		$('#categories').append($(ul));
	}





/***
* INITIATORS
* accordionInit()
* flexSliderInit()
*/
	function accordionInit() {
	    // $(function() {
	    // 	$('.accordion').click(function(event) {
	    // 		event.stopPropagation();
	    // 	});
	    //     $('.accordion > li').hover(
	    //         function () {
	    //             var $this = $(this);
	    //             $this.stop().animate({'width':'700px'},300);
	    //             $('.heading',$this).stop(true,true).fadeOut();
	    //             $('.bgDescription',$this).stop(true,true).slideDown(300);
	    //             $('.description',$this).stop(true,true).fadeIn();
	    //         },
	    //         function () {
	    //             var $this = $(this);
	    //             $this.stop().animate({'width':'125px'},500);
	    //             $('.heading',$this).stop(true,true).fadeIn();
	    //             $('.description',$this).stop(true,true).fadeOut(250);
	    //             $('.bgDescription',$this).stop(true,true).slideUp(350);
	    //         }
	    //     );
	    // });
	}

	function flexSliderInit() {
		$('.flex-control-nav').remove();
		$('.flex-direction-nav').remove();
		$('.flexslider').flexslider();
	}





/***
* CLICK-EVENTS
* baloonLinkClicked
*     createCinemaView
*     destroyCinemaView
* itemClicked
*     showFullReview
*         addItemOnMap
*         removeItemFromMap
*     hideFullReview
* bodyClicked
*/
	// creates cinema-view or simply leaves the page
	function baloonLinkClicked(event) {
		event.preventDefault ? event.preventDefault() : (event.returnValue=false);
		event.stopPropagation ? event.stopPropagation() : (event.returnValue=false);
		el = event.target;
		if(el.href.match(/youtube\.com/gi)) { // it`s youtube link
			createCinemaView(el.href);
		}
		else {
			location.href = el.href;
		}
	}
	function createCinemaView(ytLink) {
		var body = $("body");
		if($("#shadow")) {
			$("#shadow").css("display", "block");
			$("#shadow").unbind().click(function(event) {
				event.stopPropagation();
				destroyCinemaView();
			});
		}
		var ytLayer = $("#ytLayer");
		if(ytLayer) {
			ytLayer.css("z-index", "40");
			var ytVideoId = ytLink.match(/\?v=([\w\d]+)/gi)[0].substring(3);
			var ytFrame = ""+
				"<iframe " +
					"width='640' "+
					"height='360' "+
					"src='http://www.youtube.com/embed/"+ytVideoId+"?"+
					"&autoplay=1"+
				"'><iframe>"
			$(ytFrame).appendTo(ytLayer);
			ytLayer.css("display", "block");
		}
		else {
			console.error("unable to show YT video - there is no '#ytLayer' containter");
		}
	}
	function destroyCinemaView() {
		$("#ytLayer").css("display", "none");
		$("#ytLayer").empty();
		$("#shadow").css("display", "none");
	}



	function itemClicked(el) {
		showFullReview($(el).parent().find($('.invisible')).html());
	}

	function showFullReview(HTMLText) {
		$('#fullReview .content').html(HTMLText);
		$("#fullReview").css("display", "block");
		$("#fullReview").click(function(event) {
			event.stopPropagation();
		});
		flexSliderInit();
	}

	function hideFullReview() {
		$("#fullReview").css("display", "none");
	}
	function addItemOnMap(el) {
		layoutName = $(el).parent().find("#layoutName").text();
		itemName = $(el).parent().find("#itemName").text();
		map.activateItem(layoutName, itemName);
		hideFullReview();
	}
	function removeItemFromMap(el) {
		layoutName = $(el).parent().find("#layoutName").text();
		itemName = $(el).parent().find("#itemName").text();
		map.disableItem(layoutName, itemName);
		hideFullReview();
	}



	function bodyClicked() {
		if(!window.legalBodyClick) {
			hideFullReview();
			destroyCinemaView();
		}
		window.legalBodyClick = false;
	}










$(document).ready(function() {
	$("body").bind('click', bodyClicked);

	ymaps.ready(function(){
		window.map = new Viewer($("#viewer"));
		map.init();



		map.addLayout(new Layout({
			name: "Гостиницы",
			icon: "twirl#campingIcon",
			image: "red.jpg"
		}));

			map.addItem(new Item({
				layout: "Гостиницы",
				pos: [56.744071, 37.174236],
				name: "Гостинница Дубна корпус 3",
				review: "" +
					"<p><a href='http://www.hotel-dubna.ru/'>Сайт гостиницы</a></p>",
				images: [
					"gost_du_c3.png"
				]
			}));
			map.addItem(new Item({
				layout: "Гостиницы",
				pos: [56.754125, 37.126338],
				name: "Парк Отель",
				review: "" +
					"<p><a href='http://www.parkhoteldubna.ru/'>Сайт гостиницы</a></p>",
				images: [
					"park_otel.png"
				]
			}));
			map.addItem(new Item({
				layout: "Гостиницы",
				pos: [56.753978, 37.163217],
				name: "Резидент Отель",
				review: "" +
					"<p><a href='http://hotel.oezdubna.ru/'>Сайт гостиницы</a></p>",
				images: [
					"rez_otel.png"
				]
			}));
			map.addItem(new Item({
				layout: "Гостиницы",
				pos: [37.174236, 37.192915],
				name: "Гостинница Дубна корпус 1",
				review: "" +
					"<p><a href='http://www.hotel-dubna.ru/'>Сайт гостиницы</a></p>",
				images: [
					"gost_du_c1.png"
				]
			}));



		map.addLayout(new Layout({
			name: "Музеи",
			icon: "twirl#houseIcon",
			image: "red.jpg"
		}));

			map.addItem(new Item({
				layout: "Музеи",
				pos: [56.743891, 37.17442],
				name: "Музей замка",
				review: "" +
					"<h1>ЗАМОК И КЛЮЧ: АКСЕССУАРЫ ИСТОРИИ</h1>" +
					"<p>История  человеческого  бытия  сопровождается  вещами, материальными  остатками. Определенные  артефакты, созданные  человечеством  на  заре  цивилизации, так  и  продолжают  бытовать в  обществе  на  протяжении  тысячелетий. Они  меняют  форму, материал изготовления, стилистику  оформления, но неизменно  сохраняют в  своей  первозданности  содержание, «бытовую  природу», т.е.  функциональное  назначение предмета. История хозяйственной  деятельности  человека  насчитывает  множество  подобных  предметов. Пожалуй, одним  из  наиболее ярких  примеров  универсального  бытования артефактов в  истории  хозяйства  являются  замки  и  ключи. </p>" +
					"<p>Статистика бюро находок  подтверждает - одной  из  наиболее  распространенных    пропаж  являются ключи, что подтверждает их значение в  жизни  человека.</p>" +
					"<p>В русском языке слово «Ключ» является одним из самых богатых на различные значения. Современные толковые словари предлагают 10-ть значений этого слова. Помимо общеизвестных определений предлагаются и такие: «Верхний клинообразный камень, которым замыкается свод или арка здания (в архитектуре)» и «Во время военных действий - местность, пункт, высота и т.п., овладение которыми меняет создавшееся положение, обеспечивает победу» (Брокгауз и  Эфрон). </p>" +
					"<p>Очевидно, что  условия  появления предметов  с  охранной  функцией имущества  были  созданы  еще  в  период родоплеменного  строя. Племена  и  роды, враждовавшие  между  собой, подвергали  территорию  врага  опустошительным  набегам. Конфликты  и  борьба  за  добычу  приводили  к  необходимости  сохранения племенем (родом) орудий  труда, предметов  культа, запасов  провизии, украшений и  вооружения. Безусловно, это явление  на  конкретном  отрезке  истории не  носило перманентный  характер,  не  принимало  законченные  формы. Закономерно  утверждать, что  своему  появлению  бытовые  предметы, связанные  с утилитарной охранной  функцией имущества - замки  и  ключи (как  дополнение  к  замкам) -  обязаны  возникновению институту  частной  собственности. Имущественная  дифференциация  в  общине приводит в  дальнейшем  к  социальной  стратификации (появлению  отдельных страт, слоев) и  расслоению родоплеменной общности  на  отдельные  социальные  ячейки – семьи. Как  только у  семьи/ее  членов  появляется обособленное  имущество, то  возникает  необходимость  его  охраны  от  посторонних: внешних (иноземцы)  и  внутренних  врагов (воры-соплеменники). Таким  образом, замок и ключ – это исторический  продукт, связанный как с  определенным  этапом  развития  общества, социальной психологией человека и предмет бытовой необходимости.  В  этой  связи  в  научном прикладном  аспекте  замок  и  ключ, равно  как  и  другие  объекты  материальной  культуры, могут  являться  историческим  источником, который  может  в  известной  степени  сообщать  нам тип общественных  отношений, технологию  производства и  развитие  ремесла, особенности художественного  стиля  эпохи и  т.д. </p>" +
					"<p>От  кого  должны  были  охранять замки и ключи на заре развития социума, на  стадии родоплеменных отношений? Очевидно, человека от  человека. Как  уже  было  сказано, это  мог  быть целенаправленный  умысел (воровство  добра  у  иноплеменников) или охрана домашнего  имущества (как  вариант, взрослые  от  детей или же  от соплеменников).</p>",
				images: [
					"Музей Археологии и краеведение.png"
				]
			}));
			map.addItem(new Item({
				layout: "Музеи",
				pos: [56.747295, 37.200983],
				name: "Музей археологии и краеведения",
				review: "" +
					"<p>Экспозиция городского музея археологии и краеведения освещает историю Дубненского края с древнейших времен для наших дней. Она включает в себя несколько разделов: палеонтология – окаменелые остатки древних животных; археология – от древнейшей эпохи камня до позднего средневековья; этнография – предметы повседневной культуры, собранные в деревнях, находившихся на территории современного города; новейшая история – строительство канала и «тридцатки»; военные годы; создание первых дубненских ускорителей и научного поселка, ставшего основой институтской части современной Дубны.</p>" +
					"<p>Особый интерес для посетителей представляет богатая археологическая коллекция, включающая в себя древние орудия и оружие; керамическую посуду; украшения из камня, бронзы, железа, стекла и других материалов. Уникальной является представленная в музее коллекция находок, происходящих из культурного слоя древнерусского города Дубна, исторического предшественника современной Дубны, располагавшегося в XII – первой трети XIII вв. на Ратминской стрелке. Здесь можно увидеть свинцовые печати и торговые пломбы русских князей, предметы вооружения дружинников, нательные кресты и иконы, прекрасные украшения, которые носили женщины в то далёкое время. Музей располагается по адресу: ул. Моховая, 11, вход со стороны улицы Вавилова, часы работы: с 10.00 до 19.00, обед – с 14.00 до 15.00; в четверг – с 13.00 до 21.00 без обеда; в субботу и воскресенье – с 11.00 до 17.00, без обеда; выходной – понедельник.</p>" +
					"<p>Экспозиция левобережного отделения краеведческого музея посвящена истории Дубненского машиностроительного завода и МКБ «Радуга», он находится в школе № 5 по адресу: ул. Карла Маркса, 9а, и работает с 13.00 до 18.00, выходные – суббота и воскресенье.</p>" +
					"<p>Приглашаем посетить краеведческий музей учащихся дубненских школ, студентов, и всех интересующихся историей Дубны жителей и гостей нашего города!</p>",
				images: [
					"Музей замка.png"
				]
			}));




		map.addLayout(new Layout({
			name: "Развлечения",
			icon: "twirl#theaterIcon",
			image: "red.jpg"
		}));

			map.addItem(new Item({
				layout: "Развлечения",
				pos: [56.735821, 37.157360],
				name: "ТЦ МАЯК",
				review: "торговый центр, кинотеатр 'Волга-Волга'"
			}));
			map.addItem(new Item({
				layout: "Развлечения",
				pos: [56.739368, 37.168872],
				name: "ТЦ Атак '105 элемент'",
				review: "бильярд, боулинг"
			}));
			map.addItem(new Item({
				layout: "Развлечения",
				pos: [56.754432, 37.125382],
				name: "'Патриот'",
				review: "ночной клуб"
			}));
			map.addItem(new Item({
				layout: "Развлечения",
				pos: [56.735152, 37.157950],
				name: "'Три Кия'",
				review: "бильярд"
			}));
			map.addItem(new Item({
				layout: "Развлечения",
				pos: [56.749043, 37.188246],
				name: "ДК 'Мир'",
				review: "дом культуры, фотоклуб "
			}));
			map.addItem(new Item({
				layout: "Развлечения",
				pos: [56.757264, 37.131953],
				name: "ДК 'Октябрь'",
				review: "дом культуры"
			}));
			map.addItem(new Item({
				layout: "Развлечения",
				pos: [56.737220, 37.165427],
				name: "'ЧайнаТаун'",
				review: "антикафе, настольные игры"
			}));
			map.addItem(new Item({
				layout: "Развлечения",
				pos: [56.729046, 37.142390],
				name: "'Антикафе'",
				review: "мастер-классы, настольные игры"
			}));



		map.addLayout(new Layout({
			name: "Спорт",
			icon: "twirl#gymIcon",
			image: "red.jpg"
		}));

			map.addItem(new Item({
				layout: "Спорт",
				pos: [56.747473, 37.183211],
				name: "'Архимед'",
				review: "бассейн"
			}));
			map.addItem(new Item({
				layout: "Спорт",
				pos: [56.753470, 37.157734],
				name: "СК 'Радуга'",
				review: "бассейн, игровой зал, тренажерный зал"
			}));
			map.addItem(new Item({
				layout: "Спорт",
				pos: [56.724905, 37.147058],
				name: "СК 'Руслан'",
				review: "игровой зал"
			}));
			map.addItem(new Item({
				layout: "Спорт",
				pos: [56.734301, 37.151657],
				name: "'Валентина'",
				review: "тренажерный зал"
			}));
			map.addItem(new Item({
				layout: "Спорт",
				pos: [56.752663, 37.196392],
				name: "'ЮнаСпорт'",
				review: "тренажерный зал"
			}));
			map.addItem(new Item({
				layout: "Спорт",
				pos: [56.742778, 37.178635],
				name: "'Шоколад'",
				review: "тренажерный зал, йога"
			}));



		map.addLayout(new Layout({
			name: "Аптеки",
			icon: "twirl#hospitalIcon",
			image: "red.jpg"
		}));

			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.728388, 37.141625],
				name: "Ригла",
				review: "проспект Боголюбова, 45"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.729869, 37.145016],
				name: "Аптека #1",
				review: "Дубна, проспект Боголюбова, 39"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.731056, 37.148126],
				name: "Фармадок",
				review: "Дубна, проспект Боголюбова, 33А"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.729576, 37.149945],
				name: "Аптека #2",
				review: "Дубна, улица 9-го Мая, 7В"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.730516, 37.154241],
				name: "Аптека Аве",
				review: "Московская обл., Дубна, ул. Попова, 10"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.733307, 37.155438],
				name: "Фарм-сервис",
				review: "Московская обл., Дубна г., просп. Боголюбова, 27"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.73527, 37.159155],
				name: "А5",
				review: "Дубна, проспект Боголюбова, 19А"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.736022, 37.158039],
				name: "Старый Лекарь",
				review: "141980, Московская обл., Дубна г., просп. Боголюбова, 24а, ТРЦ МАЯК"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.737053, 37.165034],
				name: "Фармсервис",
				review: "Дубна, проспект Боголюбова, 15"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.738107, 37.167159],
				name: "Мелодия здоровья",
				review: "141980, Московская обл., Дубна г., просп. Боголюбова, 15а"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.74027, 37.173534],
				name: "Аптека Вита",
				review: "141980, Московская обл., Дубна г., просп. Боголюбова, 7"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.741561, 37.173934],
				name: "Аптека #3",
				review:" "
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.745813, 37.186362],
				name: "Кор",
				review: "Московская обл., Дубна г., ул. Сахарова, 4"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.746884, 37.199062],
				name: "Мособлфармация",
				review: "141980, Московская обл., Талдомский р-н, Дубна г., ул. Курчатова, 14"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.749422, 37.202758],
				name: "Будь Здоров",
				review: "Московская обл., Дубна, ул. Ленинградская, 22"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.756288, 37.14082],
				name: "Мособлфармация",
				review: "141980, Московская обл., Дубна г., ул. Володарского, 2б/21"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.757269, 37.138468],
				name: "Будь Здоров",
				review: "141980, Московская обл., Дубна г., ул. Центральная, 18а"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.757619, 37.141537],
				name: "Социальная аптека",
				review: "141980, Московская обл., Дубна г., ул. Центральная, 24/21"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.757631, 37.133046],
				name: "Аптека #4",
				review: "Дубна, 2-й Театральный проезд, 4"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.760864, 37.132112],
				name: "Аптечный пункт Фармадок",
				review: "141980, Московская обл., Дубна г., ул. Тверская, 22а"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.762876, 37.142777],
				name: "Аптека Кор",
				review: "141980, Московская обл., Дубна г., ул. Тверская, 4б"
			}));
			map.addItem(new Item({
				layout: "Аптеки",
				pos: [56.757611, 37.141276],
				name: "Аптека А5",
				review: "141983, Московская обл., Дубна г., ул. Центральная, 24/21"
			}));



		map.addLayout(new Layout({
			name: "Банкоматы",
			icon: "twirl#bankIcon",
			image: "red.jpg"
		}));

			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.739392, 37.168653],
				name: "Юниаструм Банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 14"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.739392, 37.168653],
				name: "Московский индустриальный банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 14"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738440, 37.168396],
				name: "Росбанк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 13"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738440, 37.168396],
				name: "МДМ Банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 13"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738440, 37.168396],
				name: "Райффайзенбанк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 13"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738799, 37.167040],
				name: "Московский Залоговый банк АКБ",
				review:" "
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738747, 37.167073],
				name: "Интеркоммерц Банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 16"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738747, 37.167073],
				name: "Восточный экспресс банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 16"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738747, 37.167073],
				name: "Мособлбанк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 16"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738032, 37.165033],
				name: "УРАЛСИБ Банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 18"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.738032, 37.165033],
				name: "Огни Москвы",
				review: "Московская обл., Дубна г., просп. Боголюбова, 18"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.737867, 37.164194],
				name: "ВТБ 24",
				review: "Московская обл., Дубна г., просп. Боголюбова, 20"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.737375, 37.165986],
				name: "Сбербанк России",
				review: "Московская обл., округ Дубна, Дубна, просп. Боголюбова, 15"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.737375, 37.165986],
				name: "Банк Москвы",
				review: "Московская обл., округ Дубна, Дубна, просп. Боголюбова, 15"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.740873, 37.168260],
				name: "Мособлбанк",
				review: "Московская обл., округ Дубна, Дубна, ул. Понтекорво, 8, корп.1"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.744121, 37.174462],
				name: "Сбербанк",
				review: "Дубна, Московская, 2"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.744823, 37.182914],
				name: "МДМ Банк",
				review: "Московская обл., Дубна г., ул. Сахарова, 8"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.745814, 37.186337],
				name: "Банк Русский Стандарт",
				review: "Московская обл., округ Дубна, Дубна, ул. Сахарова, 4"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.745814, 37.186337],
				name: "Московский индустриальный банк",
				review: "Московская обл., округ Дубна, Дубна, ул. Сахарова, 4"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.747246, 37.184750],
				name: "Дополнительный офис Дубна Филиала Московская областная дирекция УРАЛСИБ",
				review: "Московская обл., Дубна г., улица Строителей, 4"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "Банк Возрождение",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "Интеркоммерц Банк",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "МДМ Банк",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "Международный Промышленный банк",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			map.addItem(new Item({
				layout: "Банкоматы",
				pos: [56.748364, 37.197112],
				name: "Сбербанк России",
				review: "Московская обл., Дубна г., ул. Мира, 13, МСЧ №9"
			}));






		map.update();
		map.createView();


		$(".expand").on('click', function(event) {
		    var el = $(event.target);

		    var layoutNode = el.parent();
		    window.itemsNode = layoutNode.find(".itemsContainer");
		    itemsNode.parent().toggleClass("opened");
		    itemsNode.toggle('fast', function() {});
		});

	});
});




