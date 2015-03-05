Container = (function(){
	function Container(obj){
		container 	= $('<div></div>')
						.attr('id', 'container-' + obj.id)
						.css('display', 'inline')
						.css('position', 'absolute') // absolute relative
						.css('top', obj.y + 'px')
						.css('left', obj.x + 'px');

		if(!(obj.type == 10 || obj.type == 11 || obj.type == 12)){
			container.css('z-index', '1');
		}

		if(obj.label !== ""){
			label 		= $('<label></label>')
							.attr('for', 'elem-' + obj.id)
							.text(obj.label);

			if(obj.type == 9){
				container = container.append(label);
			}else{
				container = container.append(label).append($('<br/>'));
			}
		}

		// ! : this 'class' returns a jQuery object !
		return container;
	}

	return Container;
})();

Radio = (function(){
	Radio.prototype.obj;
	Radio.prototype.element;

	function Radio(obj){
		this.obj = obj;

		radio = $('<div></div>');

		length = obj.options.length;
		for(i = 0; i < length; i++){
			label = $('<label></label>');
			input = $('<input/>')
						.attr('type', 'radio')
						.attr('name', 'elem-' + obj.id)
						.attr('value', 'option-' + obj.options[i].elementoption_id)
						.prop('checked', obj.options[i]['default'] == '1' ? true : false);

			label.append(input).append(obj.options[i].value);
			radio.append(label).append($('<br/>'));
		}

		this.element = radio;
	}

	Radio.prototype.attrs = function(){
		// TODO
		return this;
	};

	Radio.prototype.get = function(){
		return this.element;
	};

	Radio.prototype.getAnswers = function(){
		values = [];
		this.element.find(':checked').each(function(){
			values.push($(this).val().split('-')[1]);
		});

		return {
					elementId	: this.obj.id,
					values		: values
				};
	}

	Radio.prototype.setAnswers = function(answer){// answer is option id ?
		this.element.find('input')
						.prop('checked', false)
					.filter('input[value=option-' + answer[0] + ']')
						.prop('checked', true);
	};

	return Radio;
})();

Select = (function(){
	Select.prototype.obj;
	Select.prototype.element;

	function Select(obj){
		this.obj = obj;

		div = $('<div></div>');
		select = $('<select></select>');// TODO name ?

		length = obj.options.length;
		for(i = 0; i < length; i++){
			option = $('<option></option>')
						.attr('value', 'option-' + obj.options[i].elementoption_id)
						.prop('selected', obj.options[i]['default'] == '1' ? true : false)
						.text(obj.options[i].value);

			select.append(option);
		}

		this.element = div.append(select);
	}

	Select.prototype.attrs = function(){
		// TODO
		return this;
	};

	Select.prototype.get = function(){
		return this.element;
	};

	Select.prototype.getAnswers = function(){
		return {
					elementId	: this.obj.id,
					values		: [ this.element.find(':selected').val().split('-')[1] ]
				};
	};

	Select.prototype.setAnswers = function(answer){// answer is option id ?
		this.element.find('option')
						.prop('selected', false)
					.filter('option[value=option-' + answer[0] + ']')
						.prop('selected', true);
	};

	return Select;
})();

Multiple = (function(){
	Multiple.prototype.obj;
	Multiple.prototype.element;
	
	function Multiple(obj){
		this.obj = obj;

		multiple = $('<div></div>');

		length = obj.options.length;
		for(i = 0; i < length; i++){
			label = $('<label></label>');
			box = $('<input/>')
						.attr('type', 'checkbox')
						.attr('name', 'elem-' + obj.id)
						.attr('value', 'option-' + obj.options[i].elementoption_id)
						.prop('checked', obj.options[i]['default'] == '1' ? true : false);

			label.append(box).append(obj.options[i].value);
			multiple.append(label).append($('<br/>'));
		}

		this.element = multiple;
	}

	Multiple.prototype.attrs = function(){
		// TODO
		return this;
	};

	Multiple.prototype.get = function(){
		return this.element;
	};

	Multiple.prototype.getAnswers = function(){
		id = this.obj.id;

		return {
			elementId 	: id,
			values		: this.element.find(':checked').map(function(){
																return $(this).val().split('-')[1];
															}).get()
		};
	};

	Multiple.prototype.setAnswers = function(answers){// answer is option id array ?
		this.element.find('input').each(function(){
			id = $(this).val().split('-')[1];
			inAnswers = answers.indexOf(id) >= 0;

			if(inAnswers)
				$(this).prop('checked', true);
			else
				$(this).prop('checked', false);
		});
	};

	return Multiple;
})();

Element = (function(){
	Element.prototype.element;
	Element.prototype.obj;
	Element.prototype.disabled;

	function Element(obj, id){

		element = '';
		switch(parseInt(obj.type, 10)){
			case 1:
				element = $('<input/>').attr('type', 'text');
				obj.type = 1;
				break;
			case 2:
				element = $('<input/>').attr('type', 'number')
										.attr('min', obj.min)
										.attr('max', obj.max);
				obj.type = 2;
				break;
			case 4:
				element = $('<input/>').attr('type', 'date');
				obj.type = 3;
				break;
			case 3:
				element = $('<input/>').attr('type', 'time');
				obj.type = 4;
				break;
			case 5:
				element = $('<input/>').attr('type', 'tel');
				obj.type = 5;
				break;
			case 8:
				element = $('<textarea></textarea>')
							// .css('height', obj.height + 'px')
							.css('resize', 'none');
				obj.type = 6;
				break;
			case 7:
				element = obj.big ? new Select(obj) : new Radio(obj);
				obj.type = 7;
				break;
			case 6:
				element = new Multiple(obj);
				obj.type = 8;
				break;
			case 9:
				element = $('<span></span>');
				obj.type = 9;
				break;
			case 10:
				element = $('<div></div>').addClass("square");
				obj.type = 10;
				break;
			case 11:
				element = $('<div></div>').addClass("circle");
				obj.type = 11;
				break;
			case 12:
				element = $('<img/>').attr("src", obj.img);
				obj.type = 12;
				break;
			default:
				element = $('<p>Element inconnu (' + obj.type + ')</p>');
				obj.type = 0;
				break;
		}

		this.obj = obj;
		this.element = element;
		this.disabled = false;
		this.attrs();

		container = new Container(obj);

		// element.get() : 
		// 		case obj.type = 1-6 : jQuery function;
		// 		case obj.type = 7-8 : Class method.
		// :] 
		container.append(element.get()).appendTo(id);
	}

	Element.prototype.disable = function(){
		this.disabled = true;
		this.element.prop('disabled', true);
	};

	Element.prototype.attrs = function() {
		obj = this.obj;

		switch(obj.type){
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 9:
			case 10:
			case 11:
			case 12:
				this.element
					.attr('id', 'elem-' + obj.id)
					.attr('placeholder', obj.placeholder)
					.attr('required', obj.required)
					.css('height', obj.height + 'px')
					.css('width', obj.width + 'px');
				break;
			case 7:
			case 8:
				this.element.attrs();
				break;
			default:
				break;
		}
	};

	Element.prototype.get = function() {
		return this.element;
	};

	Element.prototype.answers = function(answers) {
		get = typeof answers == 'undefined';

		if(!get && answers.length === 0) // if we load no answers, don't set values to nothing
			return this;

		res = '';

		switch(this.obj.type){
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				res = get ? this.getAnswers() : this.setAnswers(answers);
				break;
			case 7:
			case 8:
				res = get ? this.element.getAnswers() : this.element.setAnswers(answers);
				break;
			default:// 9 10 11 12
				res = get ? {elementId: this.obj.id, values: []} : null;
				break;
		}

		return get ? res : this;
	};

	Element.prototype.getAnswers = function() {
		return {
					elementId 	: this.obj.id,
					values		: [ this.element.val() ]
				};
	};

	Element.prototype.setAnswers = function(answer) {
		this.element.val(answer[0]);
	};

	return Element;
})();

function getAnswers(elems){
	answers = [];

	for(i = 0; i < elems.length; i++){
		elem = elems[i];
		if(elem.disabled == false){
			answers.push(elem.answers());
		}
	}

	return answers;
}

function disableForm(id){
	form = $(id);
	form.find('input').prop('disabled', true);
	form.find('textarea').prop('disabled', true);
	form.find('select').prop('disabled', true);
}