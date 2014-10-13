//
//    dynamicScrollBar ver: 1 ott-2014
//
//         Default Options:
//         scrollableContent: 'table',   //element inside
//         scrollBarClass: '',           //scrollbar class element
//         style: {                     //scrollbar style
//             'bottom': '0',
//             'height': '17px',
//             'overflow': 'scroll',
//             'position': 'fixed'
//         }
//
//
(function($) {
    $.fn.dynamicScrollBar = function(options) {
        var opts = $.extend({}, $.fn.dynamicScrollBar.defaults, options);
        var scrollBars = [];
        return this.each(function() {
            console.log(this);
            $this = $(this);
            var contenitore = $this;
            var contenuto = $this.find(opts.scrollableContent);
            var myScrollBar = $("<div>").addClass(opts.scrollBarClass).css(opts.style).width(contenitore.width()).hide().append($("<div>").width(contenuto.width()).html("&nbsp;"));

            myScrollBar.scroll(function() {
                contenitore.scrollLeft($(this).scrollLeft());
            });
            scrollBars.push({
                'myScrollBar': myScrollBar,
                'contenuto': contenuto,
                'contenitore': contenitore
            });
            contenitore.append(myScrollBar);

            var wpos = $(window).scrollTop() + $(window).height();
            var elmPos = contenitore.position().top;
            var elmHeight = contenitore.height();
            if ((wpos > (elmPos + 100)) && (wpos < (elmPos + elmHeight))) {
                myScrollBar.find("div").width(contenuto.width());
                myScrollBar.fadeIn(20);
                myScrollBar.scrollLeft(contenitore.scrollLeft());
            } else {
                myScrollBar.fadeOut(20);
            }
            $(window).scroll(function() {
                var wpos = $(window).scrollTop() + $(window).height();

                $.each(scrollBars, function(key, bar) {
                    var elmPos = bar.contenitore.position().top;
                    var elmHeight = bar.contenitore.height();
                    if ((wpos > (elmPos + 100)) && (wpos < (elmPos + elmHeight))) {
                        bar.myScrollBar.find("div").width(bar.contenuto.width());
                        bar.myScrollBar.fadeIn(20);
                        bar.myScrollBar.scrollLeft(bar.contenitore.scrollLeft());
                    } else {
                        bar.myScrollBar.fadeOut(20);
                    }
                });
            });
        });
    }
    $.fn.dynamicScrollBar.defaults = {
        scrollableContent: 'table',
        scrollBarClass: '',
        style: {
            'bottom': '0',
            'height': '17px',
            'overflow': 'scroll',
            'position': 'fixed'
        }
    };

})(jQuery);
