var Controller = function(model) {
	if(!model) {
		console.error('unknown model');
		return;
	}
	this.model = model;

	/***
	* Заполнение модели
	**/
		this.addCategory(new Category({
			name: "Гостиницы",
			icon: "twirl#campingIcon",
			image: "red.jpg"
		}));

			this.addItem(new Item({
				category: "Гостиницы",
				pos: [56.744071, 37.174236],
				name: "Гостинница Дубна корпус 3",
				review: "" +
					"<p><a href='http://www.hotel-dubna.ru/'>Сайт гостиницы</a></p>",
				images: [
					"gost_du_c3.png"
				]
			}));
			this.addItem(new Item({
				category: "Гостиницы",
				pos: [56.754125, 37.126338],
				name: "Парк Отель",
				review: "" +
					"<p><a href='http://www.parkhoteldubna.ru/'>Сайт гостиницы</a></p>",
				images: [
					"park_otel.png"
				]
			}));
			this.addItem(new Item({
				category: "Гостиницы",
				pos: [56.753978, 37.163217],
				name: "Резидент Отель",
				review: "" +
					"<p><a href='http://hotel.oezdubna.ru/'>Сайт гостиницы</a></p>",
				images: [
					"rez_otel.png"
				]
			}));
			this.addItem(new Item({
				category: "Гостиницы",
				pos: [37.174236, 37.192915],
				name: "Гостинница Дубна корпус 1",
				review: "" +
					"<p><a href='http://www.hotel-dubna.ru/'>Сайт гостиницы</a></p>",
				images: [
					"gost_du_c1.png"
				]
			}));



		this.addCategory(new Category({
			name: "Музеи",
			icon: "twirl#houseIcon",
			image: "red.jpg"
		}));

			this.addItem(new Item({
				category: "Музеи",
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
			this.addItem(new Item({
				category: "Музеи",
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




		this.addCategory(new Category({
			name: "Развлечения",
			icon: "twirl#theaterIcon",
			image: "red.jpg"
		}));

			this.addItem(new Item({
				category: "Развлечения",
				pos: [56.735821, 37.157360],
				name: "ТЦ МАЯК",
				review: "торговый центр, кинотеатр 'Волга-Волга'"
			}));
			this.addItem(new Item({
				category: "Развлечения",
				pos: [56.739368, 37.168872],
				name: "ТЦ Атак '105 элемент'",
				review: "бильярд, боулинг"
			}));
			this.addItem(new Item({
				category: "Развлечения",
				pos: [56.754432, 37.125382],
				name: "'Патриот'",
				review: "ночной клуб"
			}));
			this.addItem(new Item({
				category: "Развлечения",
				pos: [56.735152, 37.157950],
				name: "'Три Кия'",
				review: "бильярд"
			}));
			this.addItem(new Item({
				category: "Развлечения",
				pos: [56.749043, 37.188246],
				name: "ДК 'Мир'",
				review: "дом культуры, фотоклуб "
			}));
			this.addItem(new Item({
				category: "Развлечения",
				pos: [56.757264, 37.131953],
				name: "ДК 'Октябрь'",
				review: "дом культуры"
			}));
			this.addItem(new Item({
				category: "Развлечения",
				pos: [56.737220, 37.165427],
				name: "'ЧайнаТаун'",
				review: "антикафе, настольные игры"
			}));
			this.addItem(new Item({
				category: "Развлечения",
				pos: [56.729046, 37.142390],
				name: "'Антикафе'",
				review: "мастер-классы, настольные игры"
			}));



		this.addCategory(new Category({
			name: "Спорт",
			icon: "twirl#gymIcon",
			image: "red.jpg"
		}));

			this.addItem(new Item({
				category: "Спорт",
				pos: [56.747473, 37.183211],
				name: "'Архимед'",
				review: "бассейн"
			}));
			this.addItem(new Item({
				category: "Спорт",
				pos: [56.753470, 37.157734],
				name: "СК 'Радуга'",
				review: "бассейн, игровой зал, тренажерный зал"
			}));
			this.addItem(new Item({
				category: "Спорт",
				pos: [56.724905, 37.147058],
				name: "СК 'Руслан'",
				review: "игровой зал"
			}));
			this.addItem(new Item({
				category: "Спорт",
				pos: [56.734301, 37.151657],
				name: "'Валентина'",
				review: "тренажерный зал"
			}));
			this.addItem(new Item({
				category: "Спорт",
				pos: [56.752663, 37.196392],
				name: "'ЮнаСпорт'",
				review: "тренажерный зал"
			}));
			this.addItem(new Item({
				category: "Спорт",
				pos: [56.742778, 37.178635],
				name: "'Шоколад'",
				review: "тренажерный зал, йога"
			}));



		this.addCategory(new Category({
			name: "Аптеки",
			icon: "twirl#hospitalIcon",
			image: "red.jpg"
		}));

			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.728388, 37.141625],
				name: "Ригла",
				review: "проспект Боголюбова, 45"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.729869, 37.145016],
				name: "Аптека #1",
				review: "Дубна, проспект Боголюбова, 39"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.731056, 37.148126],
				name: "Фармадок",
				review: "Дубна, проспект Боголюбова, 33А"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.729576, 37.149945],
				name: "Аптека #2",
				review: "Дубна, улица 9-го Мая, 7В"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.730516, 37.154241],
				name: "Аптека Аве",
				review: "Московская обл., Дубна, ул. Попова, 10"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.733307, 37.155438],
				name: "Фарм-сервис",
				review: "Московская обл., Дубна г., просп. Боголюбова, 27"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.73527, 37.159155],
				name: "А5",
				review: "Дубна, проспект Боголюбова, 19А"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.736022, 37.158039],
				name: "Старый Лекарь",
				review: "141980, Московская обл., Дубна г., просп. Боголюбова, 24а, ТРЦ МАЯК"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.737053, 37.165034],
				name: "Фармсервис",
				review: "Дубна, проспект Боголюбова, 15"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.738107, 37.167159],
				name: "Мелодия здоровья",
				review: "141980, Московская обл., Дубна г., просп. Боголюбова, 15а"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.74027, 37.173534],
				name: "Аптека Вита",
				review: "141980, Московская обл., Дубна г., просп. Боголюбова, 7"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.741561, 37.173934],
				name: "Аптека #3",
				review:" "
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.745813, 37.186362],
				name: "Кор",
				review: "Московская обл., Дубна г., ул. Сахарова, 4"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.746884, 37.199062],
				name: "Мособлфармация",
				review: "141980, Московская обл., Талдомский р-н, Дубна г., ул. Курчатова, 14"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.749422, 37.202758],
				name: "Будь Здоров",
				review: "Московская обл., Дубна, ул. Ленинградская, 22"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.756288, 37.14082],
				name: "Мособлфармация",
				review: "141980, Московская обл., Дубна г., ул. Володарского, 2б/21"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.757269, 37.138468],
				name: "Будь Здоров",
				review: "141980, Московская обл., Дубна г., ул. Центральная, 18а"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.757619, 37.141537],
				name: "Социальная аптека",
				review: "141980, Московская обл., Дубна г., ул. Центральная, 24/21"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.757631, 37.133046],
				name: "Аптека #4",
				review: "Дубна, 2-й Театральный проезд, 4"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.760864, 37.132112],
				name: "Аптечный пункт Фармадок",
				review: "141980, Московская обл., Дубна г., ул. Тверская, 22а"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.762876, 37.142777],
				name: "Аптека Кор",
				review: "141980, Московская обл., Дубна г., ул. Тверская, 4б"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.757611, 37.141276],
				name: "Аптека А5",
				review: "141983, Московская обл., Дубна г., ул. Центральная, 24/21"
			}));



		this.addCategory(new Category({
			name: "Банкоматы",
			icon: "twirl#bankIcon",
			image: "red.jpg"
		}));

			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.739392, 37.168653],
				name: "Юниаструм Банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 14"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.739392, 37.168653],
				name: "Московский индустриальный банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 14"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738440, 37.168396],
				name: "Росбанк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 13"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738440, 37.168396],
				name: "МДМ Банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 13"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738440, 37.168396],
				name: "Райффайзенбанк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 13"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738799, 37.167040],
				name: "Московский Залоговый банк АКБ",
				review:" "
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738747, 37.167073],
				name: "Интеркоммерц Банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 16"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738747, 37.167073],
				name: "Восточный экспресс банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 16"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738747, 37.167073],
				name: "Мособлбанк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 16"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738032, 37.165033],
				name: "УРАЛСИБ Банк",
				review: "Московская обл., Дубна г., просп. Боголюбова, 18"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.738032, 37.165033],
				name: "Огни Москвы",
				review: "Московская обл., Дубна г., просп. Боголюбова, 18"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.737867, 37.164194],
				name: "ВТБ 24",
				review: "Московская обл., Дубна г., просп. Боголюбова, 20"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.737375, 37.165986],
				name: "Сбербанк России",
				review: "Московская обл., округ Дубна, Дубна, просп. Боголюбова, 15"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.737375, 37.165986],
				name: "Банк Москвы",
				review: "Московская обл., округ Дубна, Дубна, просп. Боголюбова, 15"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.740873, 37.168260],
				name: "Мособлбанк",
				review: "Московская обл., округ Дубна, Дубна, ул. Понтекорво, 8, корп.1"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.744121, 37.174462],
				name: "Сбербанк",
				review: "Дубна, Московская, 2"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.744823, 37.182914],
				name: "МДМ Банк",
				review: "Московская обл., Дубна г., ул. Сахарова, 8"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.745814, 37.186337],
				name: "Банк Русский Стандарт",
				review: "Московская обл., округ Дубна, Дубна, ул. Сахарова, 4"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.745814, 37.186337],
				name: "Московский индустриальный банк",
				review: "Московская обл., округ Дубна, Дубна, ул. Сахарова, 4"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.747246, 37.184750],
				name: "Дополнительный офис Дубна Филиала Московская областная дирекция УРАЛСИБ",
				review: "Московская обл., Дубна г., улица Строителей, 4"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "Банк Возрождение",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "Интеркоммерц Банк",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "МДМ Банк",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "Международный Промышленный банк",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.748364, 37.197112],
				name: "Сбербанк России",
				review: "Московская обл., Дубна г., ул. Мира, 13, МСЧ №9"
			}));
	
	return this;
}





	
// adds new category into Stuff
Controller.prototype.addCategory = function(category) {
	if(!category) {
		console.error('unknown category');
		return;
	}
	this.model.categories[category.name] = category;
}

Controller.prototype.addItem = function(item) {
	if(item) {
		var itemCategoryName = item.category;
		var added = false;
		for(var key in this.model.categories) if(this.model.categories.hasOwnProperty(key)) {
			var currentCategory = this.model.categories[key];
			if(currentCategory.name == itemCategoryName) {
				currentCategory.items.push(item);
				added = true;
				break;
			}
		}
		if(!added) { // unknown category -> default 
			this.model.categories["default"].items.push(item);
		}
	}
}






// active items are shown on the map
// [[category, item], [..., ...]]
Controller.prototype.setItemsState = function(categoryItemList, state) {
	state = (typeof(state) === "undefined") ? true : state;
	if(!categoryItemList) {
		console.error('unable to activate items');
		return;
	}
	for(var i = 0; i < categoryItemList.length; i++) {
		var currentCategory = categoryItemList[i][0];
		var currentItem = categoryItemList[i][1];
		if(typeof(currentCategory.name) === "undefined") {
			// it is only NAMES of category and item...
			currentCategory = this.model.categories[currentCategory];
			for(var ii = 0; ii < currentCategory.items.length; ii++) {
				if(currentCategory.items[ii].name == currentItem) {
					currentItem = currentCategory.items[ii];
					break;
				}
			}
		}
		currentItem.active = state;
	}
}






/***
* CLICK-EVENTS
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



function bodyClicked() {
	if(!window.legalBodyClick) {
		hideFullReview();
		destroyCinemaView();
	}
	window.legalBodyClick = false;
}
