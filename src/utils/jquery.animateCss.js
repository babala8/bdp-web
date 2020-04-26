$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    },
    transitionEnd: function (callback) {
        var transitionEnd = 'webkitTransitionEnd msTransitionEnd oTransitionEnd transitionend';
        this.one(transitionEnd, callback);
        return this;
    },
    transitionOnce: function (cssMap) {
        var transitionEnd = 'webkitTransitionEnd msTransitionEnd oTransitionEnd transitionend';
        var that=this;
        this.one(transitionEnd, function(){
            that.css({'transition':''});
        }).css(cssMap);
        return this;
    }
});
