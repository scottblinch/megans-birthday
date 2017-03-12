$(function() {
    function nextSlide() {
        var timeout = 0;

        if (false === $activeSlide) {
            $activeSlide = $slide.first();
        }

        if ($activeSlide.hasClass('active')) {
            if ($activeSlide.hasClass('fade')) {
                timeout = 500;
                $activeSlide.removeClass('in');
            }

            setTimeout(function() {
                $activeSlide.removeClass('active');
                $activeSlide = $activeSlide.next();
            }, timeout);

            timeout += 500;
        }

        setTimeout(function() {
            $activeSlide.addClass('active');

            setTimeout(function() {
                if ($activeSlide.hasClass('fade')) {
                    $activeSlide.addClass('in');
                }

                var $slideFaders = $activeSlide.find('.fade');

                var faderTimeout = 0;

                $slideFaders.each(function() {
                    var $this = $(this);

                    setTimeout(function() {
                        $this.addClass('in');
                    }, faderTimeout);

                    faderTimeout += 2000;
                });

                if ($activeSlide.hasClass('no-action')) {
                    setTimeout(function() {
                        nextSlide();
                    }, 3000);
                }
            });
        }, timeout);
    }

    function validateFormControl() {
        var $this = $(this);
        var answer = $this.attr('data-answer');
        var value = $this.val().toLowerCase();
        var errorLength = $this.attr('data-error-length');

        console.log(answer);
        console.log(value);

        if (value.length) {
            $this.addClass('filled');
        } else {
            $this.removeClass('filled');
        }

        if (value === answer) {
            $this.addClass('valid');
            $this.removeClass('error');

            setTimeout(function() {
                nextSlide();
            }, 1000);
        } else {
            $this.removeClass('valid');

            if (value.length >= errorLength) {
                $this.addClass('error');
            } else {
                $this.removeClass('error');
            }
        }
    }

    function rightAnswer() {

    }

    function wrongAnswer() {
        var $this = $(this);
        wrongAnswers++;

        $this.text('Wrong.');
        $this.attr('disabled', 'disabled');
    }

    function rightAnswer() {
        var $this = $(this);
        wrongAnswers++;

        $this.addClass('correct');
        $this.siblings('button').attr('disabled', 'disabled');

        setTimeout(function() {
            nextSlide();
        }, 1000);
    }

    var $site = $('html');
    var $body = $site.find('body');
    var $slide = $body.find('.slide');
    var $activeSlide = false;
    var $button = $('[data-action="nextSlide"]');
    var $rightButton = $('[data-action="rightAnswer"]');
    var $wrongButton = $('[data-action="wrongAnswer"]');
    var $formControl = $('.form-control');
    var wrongAnswers = 0;

    $button.click(nextSlide);
    $rightButton.click(rightAnswer);
    $wrongButton.click(wrongAnswer);

    $formControl.on('input', validateFormControl);


    setTimeout(function() {
        nextSlide();
    }, 1000);
});
