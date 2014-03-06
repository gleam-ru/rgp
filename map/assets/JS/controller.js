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
			icon: "twirl#campingIcon"
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
			icon: "twirl#houseIcon"
		}));

			this.addItem(new Item({
				category: "Музеи",
				pos: [56.744467, 37.193683], 
				name: "Музей истории науки и техники ОИЯИ (Объединенного института ядерных исследований)",
				review: "" +
					"<p>Музей посвящен непосредственно истории, научным достижениям и научно-просветительской деятельности института. В экспозиции макеты научных установок, приборы, фото и пр. материалы, в том числе личный микроскоп И.В. Курчатова.</p>",
				images: [ 
					"mysei_jinr.png"
				]
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
			icon: "twirl#theaterIcon"
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
			icon: "twirl#gymIcon"
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
			icon: "twirl#hospitalIcon"
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
				name: "Мособлфармация (Курчатова)",
				review: "141980, Московская обл., Талдомский р-н, Дубна г., ул. Курчатова, 14"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.749422, 37.202758],
				name: "Будь Здоров (Ленинградская)",
				review: "Московская обл., Дубна, ул. Ленинградская, 22"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.756288, 37.14082],
				name: "Мособлфармация (Володарского)",
				review: "141980, Московская обл., Дубна г., ул. Володарского, 2б/21"
			}));
			this.addItem(new Item({
				category: "Аптеки",
				pos: [56.757269, 37.138468],
				name: "Будь Здоров (Центральная)",
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
			icon: "twirl#bankIcon"
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
				name: "Московский индустриальный банк (Боголюбова)",
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
				name: "МДМ Банк (Боголюбова)",
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
				name: "Интеркоммерц Банк (Боголюбова)",
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
				name: "Мособлбанк (Боголюбова)",
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
				name: "Сбербанк России (Боголюбова)",
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
				name: "Мособлбанк (Понтекорво)",
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
				name: "МДМ Банк (Сахарова)",
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
				name: "Московский индустриальный банк (Сахарова)",
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
				name: "Интеркоммерц Банк (Жолио Кюри)",
				review: "Московская обл., Дубна г., ул. Жолио Кюри, 13"
			}));
			this.addItem(new Item({
				category: "Банкоматы",
				pos: [56.745220, 37.192688],
				name: "МДМ Банк (Жолио Кюри)",
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
				name: "Сбербанк России (Мира)",
				review: "Московская обл., Дубна г., ул. Мира, 13, МСЧ №9"
			}));
	


		this.addCategory(new Category({
			name: "Еда",
			icon: "twirl#cafeIcon"
		}));

			this.addItem(new Item({
				category: "Еда",
				pos: [56.739757, 37.223526], 
				name: "Паб 'Churchill'",
				review: "" +
					"<h1>Паб 'Черчилль'</h1>" +
					"<p>К услугам наших гостей предлагаются четыре комфортных зала (курящие и некурящие)!, богатый выбор СВЕЖЕГО ПИВА, наивкуснейшие напитки, изысканная кухня, НАСТОЛЬНЫЕ ИГРЫ и вообще все то, что нужно для отличного и приятного отдыха.</p>",
				images: [ 
					"Churchill.png"
				]
			}));

			this.addItem(new Item({
				category: "Еда",
				pos: [56.740379, 37.173948], 
				name: "Бар 'Why not'",
				review: "" +
					"<h1>Бар 'Why not' – steak-house</h1>" +
					"<p>Режим работы:\
					Воскресение - Четверг\
					11:00 - 02:00\
					Пятница - Суббота\
					11:00 - 04:00\
					</p>",
				images: [ 
					"Whynot.png"
				]
			}));

			this.addItem(new Item({
				category: "Еда",
				pos: [56.754283, 37.125484], 
				name: "Ресторан 'Камелот'",
				review: "" +
					"<h1>Ресторан 'Камелот'</h1>" +
					"<p>Ресторан 'КАМЕЛОТ' в Дубне предлагает своим гостям окунуться в средневековую замковую атмосферу, побывать в сказочных уголках 'вечного города' и насладиться блюдами средневековой и современной кухни.</p>",
				images: [ 
					"Kamelot.png"
				]
			}));

			this.addItem(new Item({
				category: "Еда",
				pos: [56.757949, 37.139624], 
				name: "Кофепиццабар 'Централле'",
				review: "" +
					"<h1>КофеПиццаБар 'Централе'</h1>" +
					"<p>Недавно открытый ресторан располагается на двух этажах современного нового здания. Ресторан предлагает блюда итальянской кухни, тщательно подобранный выбор вин, разливное пиво, выпекает пиццу.</p>",
				images: [ 
					"Centrale.png"
				]
			}));

			this.addItem(new Item({
				category: "Еда",
				pos: [56.734504, 37.152766], 
				name: "Пиццерия 'OlimPizza'",
				review: "" +
					"<h1>Пиццерия 'OlimPizza'</h1>" +
					"<p>Уютное кафе в отдельном здании на Большой Волге. Специализируются на пицце и суши. Вполне подойдет для детей, так как нет курящей зоны.</p>",
				images: [ 
					"Olimpizza.png"
				]
			}));

			this.addItem(new Item({
				category: "Еда",
				pos: [56.743133, 37.178521], 
				name: "Кофейня 'Fresh Cup'",
				review: "" +
					"<h1>Кофейня 'Fresh Cup'</h1>" +
					"<p>Кухни: русская, итальянская, японская. Wi-Fi.</p>",
				images: [ 
					"Freshcup.png"
				]
			}));

			this.addItem(new Item({
				category: "Еда",
				pos: [56.732889, 37.155452], 
				name: "Кафе 'Стулья'",
				review: "" +
					"<h1>Кафе 'Стулья'</h1>" +
					"<p>«Стулья» — это городское кафе с домашней кухней. Мы всё готовим из свежих продуктов и с душой. Знакомые каждому с детства вкусы и блюда собраны в одном меню: домашние котлеты, пельмени ручной лепки, соленья, рыбные и мясные блюда в элегантной ресторанной подаче.</p>",
				images: [ 
					"Stulia.png"
				]
			}));



		this.addCategory(new Category({
			name: "Памятники",
			icon: "twirl#mushroomIcon"
		}));

			this.addItem(new Item({
				category: "Памятники",
				pos: [56.731517, 37.124033], 
				name: "Памятник Ленину",
				review: "" +
					"<p>Считается самым высоким в мире памятником Ленину. Высота фигуры - 37 метров. Установлен у канала им. Москвы.</p>",
				images: [ 
					"lenin.png"
				]
			}));

			this.addItem(new Item({
				category: "Памятники",
				pos: [56.7463, 37.188483], 
				name: "Настенные рисунки г. Дубна",
				review: "" +
					"<p>Достаточно интересные настенные рисунки встречаются по всему городу в самых неожиданных местах. Самым интересным зданием, со всех сторон украшенных 'росписями' является книжный магазин на ул. Сахарова, д. 1, стр. 2.</p>",
				images: [ 
					"nastennye_risunki.png"
				]
			}));

			this.addItem(new Item({
				category: "Памятники",
				pos: [56.749961, 37.187583], 
				name: "Памятник М.Г. Мещерякову",
				review: "" +
					"<p>Открыт в 2010 г. к 100-летию выдающегося физика-экспериментатора. Ученый изображен сидящим на скамейке.</p>",
				images: [ 
					"mesheryakov.png"
				]
			}));

			this.addItem(new Item({
				category: "Памятники",
				pos: [56.748883, 37.18935], 
				name: "Памятник Высоцкому",
				review: "" +
					"<p>Открыт в 2008 г. Скульптор - Яновский. Рядом аллея Высоцкого, названная в честь выступлений артиста в ДК 'Мир'' (сама аллея появилась в 1950-х гг.).</p>",
				images: [ 
					"vysotskii.png"
				]
			}));


			this.addItem(new Item({
				category: "Памятники",
				pos: [56.7271, 37.1782], 
				name: "Гигантский стул",
				review: "" +
					"<p>Считается самым высоким в мире памятником Ленину. Высота фигуры - 37 метров. Установлен у канала им. Москвы.</p>" +
					"<p><a href='http://www.youtube.com/watch?v=c1hlM6ZwNf0'>Видео</a></p>",
				images: [ 
					"stul.png"
				]
			}));

			this.addItem(new Item({
				category: "Памятники",
				pos: [56.747867, 37.191067], 
				name: "Памятник М. И. Глинке",
				review: "" +
					"<p>Расположен между музеем ОИЯИ и музыкальной школой № 1.</p>",
				images: [ 
					"glinka.png"
				]
			}));

			this.addItem(new Item({
				category: "Памятники",
				pos: [56.74575, 37.195983], 
				name: "Памятник И.В.Курчатову",
				review: "" +
					"<p>Открыт в 2002г. Скульптор-Сагателян.</p>",
				images: [ 
					"kurchatov.png"
				]
			}));



		this.addCategory(new Category({
			name: "Сооружения",
			icon: "twirl#buildingsIcon"
		}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.736383, 37.120833], 
				name: "Водосливная плотина Иваньковской ГЭС",
				review: "" +
					"<p>Длина плотины более 200 м , высота - порядка 29 метров. Расположена на р. Волга</p>",
				images: [ 
					"plotina.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.781775 ,37.238079], 
				name: "Архитектура Дубны",
				review: "" +
					"<p>Сохранилось достаточно много построек времен начала строительства научного городка ( ок 1947 г). Интерес представляет исторический центр города, ул Курчатова, ул. Векслера, ул. Франка и т.д., а так же ул. Дачная.</p>",
				images: [ 
					"arhitektura.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.716183, 37.132017], 
				name: "Паромная переправа №1 через канал им. Москвы, заградительные ворота и маяк",
				review: "" +
					"<p>Переправа небольшой грузоподъемности. Рядом на канале заградительные ворота и маяк. Архитектурные особенности сооружений типичны для сталинской эпохи.</p>",
				images: [ 
					"parom.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.697533, 37.175267], 
				name: "Пересечение р. Сестра и канала им. Москвы",
				review: "" +
					"<p>Место расположено на въезде в г. Дубна. Интересно инженерным решением, когда весь поток реки заведен в трубу и пропущен под каналом. Высота дамбы порядка 18 м.</p>",
				images: [ 
					"Peresechenie_rek.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.784031, 37.196868], 
				name: "Женьшеневая плантация",
				review: "" +
					"<p>Плантация площадью в один гектар находится в поселке Крева на окраине Дубны. Хозяйка покажет вам плантацию и расскажет про все тайны женьшеня.</p>",
				images: [ 
					"zhenshen.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.829917, 37.062517], 
				name: "Брошенный купол антенны локатора ('шар')",
				review: "" +
					"<p>Конструкция из стеклопластика в нескольких километрах от Дубны в лесу. Предположительно, утерян в 80-е годы во время транспортировки из-за обрыва троса. Диаметр составляет около 18 м.</p>",
				images: [
					"shar.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.724683, 37.1851], 
				name: "Храм Всех святых",
				review: "" +
					"<p>2007 г. Действующий.</p>",
				images: [ 
					"hram_vseh_svyatyh.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.735843,37.251385], 
				name: "Центр космической связи 'Дубна'",
				review: "" +
					"<p>Филиал ФГУП 'Космическая связь' работает с 1980 г. и является крупнейшим телепортом России и одним из крупнейших в Европе.</p>",
				images: [ 
					"cks.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.754758, 37.151596], 
				name: "Храм Смоленской иконы Божией матери",
				review: "" +
					"<p>Деревянный храм современной постройки.</p>",
				images: [ 
					"hram_smolenskoi_ikony.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.730283, 37.141117], 
				name: "Храм рождества Иоанна Предтечи",
				review: "" +
					"<p>Нач. строительства - 2000 г. Действующий.</p>",
				images: [ 
					"hram_rozhdestva_predtechi.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.740204, 37.224982], 
				name: "Международный университет природы, общества и человека 'Дубна'",
				review: "" +
					"<p>Оригинальный комплекс зданий 1990-х годов постройки.</p>",
				images: [ 
					"mupoch.png"
				]
			}));

			this.addItem(new Item({
				category: "Сооружения",
				pos: [56.730283, 37.140983], 
				name: "Этнографическо-туристический центр 'Иваньковское подворье'",
				review: "" +
					"<p>Амбициозный туристический проект на территории г. Дубна. Планировался интерактивный музей деревянного зодчества под открытым небом, гостиница на 70 мест, музей верхневолжского быта и пр. инфраструктура. В настоящее время представляет из себя брошенную стройплощадку, огороженную высоким забором.</p>",
				images: [ 
					"tsentr_ivankovskoe_podvore.png"
				]
			}));



	/***
	* Прокладывание маршрутов
	**/
	$.cookie('cookie_name', 'cookie_value', {
		path: '/',
	});

	return this;
}



/********
***
*** FILLING OF THE MODEL
***
*********/

// adds new category into contents of model
Controller.prototype.addCategory = function(category) {
	if(!category) {
		console.error('unknown category');
		return;
	}
	this.model.categories[category.name] = category;
}

// adds new category into into contents of model
Controller.prototype.addItem = function(item) {
	if(item) {
		var itemCategoryName = item.category;
		var added = false;
		for(var key in this.model.categories) if(this.model.categories.hasOwnProperty(key)) {
			var currentCategory = this.model.categories[key];
			if(currentCategory.name == itemCategoryName) {
				// TODO: возможность работы с одинаковыми именами
				var ableToAdd = true; // объекта с таким именем еще нет в категории
				for(var i = 0; i < currentCategory.items.length; i++) {
					if(currentCategory.items[i].name == item.name) {
						ableToAdd = false;
						break;
					}
				}
				if(ableToAdd) {
					currentCategory.items.push(item);
					added = true;
				}
				else {
					console.log("unable to add item: ", item);
					console.log("item with this name is already added");
				}
				break;
			}
		}
		if(!added && ableToAdd) { // unknown category -> default 
			this.model.categories["default"].items.push(item);
		}
	}
}



/********
***
*** MANIPULATING WITH THE MODEL
***
*********/

// activates items in the model
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
			// it is only NAMES of category and item, not class-objects...
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



/********
***
*** MANIPULATING WITH USER DATA
***
*********/
Controller.prototype.addItemToRoute = function(categoryName, itemName) {

}