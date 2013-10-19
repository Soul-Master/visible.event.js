/// <reference path="../test/scripts/jquery-2.0.3.js" />

(function($)
{    
    // Display affect from parent and itself.
    $.fn.onVisibleChanged = function(callback, delay)
    {
        this.each(function()
        {
            delay = delay || 25;

            var el = $(this);
            var isVisible = el.is(':visible');
        
            // Retrieve all elements from top to bottom of DOM tree (include itself).
            var nodes = el.add(el.parents());
        
            nodes.onElementVisibleChanged(function(e, isElementVisible)
            {
                if (isVisible === isElementVisible) return;
                if (isElementVisible !== el.is(':visible')) return;

                isVisible = isElementVisible;
                    
                callback.call(this, e, isElementVisible);
            }, delay);
        });

        return this;
    };
    $.fn.offVisibleChanged = function()
    {
        var el = $(this);

        this.each(function()
        {
            var nodes = el.add(el.parents());

            nodes.offElementVisibleChanged();
        });
    
        return this;
    };

    $.fn.onElementVisibleChanged = function(callback, delay)
    {
        this.each(function()
        {
            var el = $(this);
            var isVisible = el.is(':visible');
            var timeout = null;
            delay = delay || 25;
        
            el.attrchange
            ({
                trackValues: true,
                callback: function(e)
                {
                    if (e.attributeName !== 'style') return;
                    if (delay == 0) return callback.call(this, e);

                    // Prevent rapid fire event while element is animating.
                    if (timeout !== null) clearTimeout(timeout);

                    timeout = setTimeout(function()
                    {
                        var newValue = el.is(':visible');

                        if (newValue === isVisible) return;

                        isVisible = newValue;
                        callback.call(this, e, isVisible);
                    }, delay);
                }
            });
        });
    
        return this;
    };

    $.fn.offElementVisibleChanged = function()
    {
        this.each(function()
        {
            if (this.mutationObserver)
            {
                this.mutationObserver.disconnect(this);
                this.mutationObserver = null;
            }
        });
    };
})(jQuery);