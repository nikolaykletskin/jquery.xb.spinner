(function ($) {
    var downButton = function(obj, settings) {
        var button = $(settings.button.element);
        button.addClass(settings.button.class + " " + settings.downButton.class).html(settings.downButton.content);

        button.on('click', function() {
            var value = parseFloat(obj.val());

            value -= settings.step;
            value = value.toFixed(settings.significantDigits);

            if (settings.min != null && value < settings.min) {
                obj.val(settings.min);
            } else {
                obj.val(value);
            }
            obj.trigger('change');
        });

        return button;
    };

    var upButton = function(obj, settings) {
        var button = $(settings.button.element);
        button.addClass(settings.button.class + " " + settings.upButton.class).html(settings.upButton.content);

        button.on('click', function() {
            var value = parseFloat(obj.val());

            value += settings.step;
            value = value.toFixed(settings.significantDigits);

            if (settings.max !=null && value > settings.max) {
                obj.val(settings.max);
            } else {
                obj.val(value);
            }
            obj.trigger('change');
        });

        return button;
    };

    $.fn.spinner = function(s) {
        var settings = {
            step: 1, // шаг изменения значения
            significantDigits: 0, // число знаков после запятой
            min: 0, // минимальное значение
            max: null, // максимальное значение
            button: {
                element: '<div/>',
                class: 'spinner__btn'
            },
            downButton: {
                class: 'spinner__btn_down',
                content: ''
            },
            upButton: {
                class: 'spinner__btn_up',
                content: ''
            }
        };

        $.extend(settings, s);
        this.addClass('spinner__count');
        this.before(downButton(this, settings));
        this.after(upButton(this, settings));
        this.on('keyup', function() {
            var el = $(this),
                value = el.val();

            if (settings.max != null && value > settings.max) {
                el.val(settings.max);
            }

            if (settings.min != null && value < settings.min) {
                el.val(settings.min);
            }
        });
        return this;
    };
})(jQuery);