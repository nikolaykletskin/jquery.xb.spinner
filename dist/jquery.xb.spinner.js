(function ($) {
    $.spinner = {
        defaults: {
            step: 1, // шаг изменения значения
            significantDigits: 0, // число знаков после запятой
            min: 0, // минимальное значение
            max: null, // максимальное значение
            button: {
                element: '<div/>',
                className: 'spinner__btn'
            },
            downButton: {
                className: 'spinner__btn_down',
                content: '-'
            },
            upButton: {
                className: 'spinner__btn_up',
                content: '+'
            }
        },
        setDefaults: function (settings) {
            $.extend(true, $.spinner.defaults, settings)
        }
    };

    var downButton = function (obj, settings) {
        var button = $(settings.button.element);
        button.addClass(settings.button.className + " " + settings.downButton.className).html(settings.downButton.content);

        button.on('click', function () {
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

    var upButton = function (obj, settings) {
        var button = $(settings.button.element);
        button.addClass(settings.button.className + " " + settings.upButton.className).html(settings.upButton.content);

        button.on('click', function () {
            var value = parseFloat(obj.val());

            value += settings.step;
            value = value.toFixed(settings.significantDigits);

            if (settings.max != null && value > settings.max) {
                obj.val(settings.max);
            } else {
                obj.val(value);
            }
            obj.trigger('change');
        });

        return button;
    };

    $.fn.spinner = function (s) {
        var settings = $.extend({}, $.spinner.defaults, s);

        return this.each(function () {
            var $this = $(this);
            $this.addClass('spinner__count')
                .before(downButton($this, settings))
                .after(upButton($this, settings))
                .on('keyup', function () {
                    var el = $(this),
                        value = el.val();

                    if (settings.max != null && value > settings.max) {
                        el.val(settings.max);
                    }

                    if (settings.min != null && value < settings.min) {
                        el.val(settings.min);
                    }
                });
        });
    };
})(jQuery);