/// <reference path="../test/scripts/jquery-2.0.3.js" />

(function($)
{    
    // Display affect from parent and itself.
    $.fn.onComputedDisplayChanged = function(callback, delay)
    {
        this.each(function()
        {
            var el = $(this);
            var isVisible = el.is(':visible');
            delay = delay || 25;
        
            // Order from top to bottom (include itself).
            var nodes = el.add(el.parents());
        
            nodes.onDisplayChanged(function(e, isNodeVisible)
            {
                if (isVisible === isNodeVisible) return;
                if (isNodeVisible !== el.is(':visible')) return;

                isVisible = isNodeVisible;
                    
                callback.call(this, e, isNodeVisible);
            }, delay);
        });

        return this;
    };
    $.fn.offComputedDisplayChanged = function()
    {
            var el = $(this);

            this.each(function()
            {
                var nodes = el.add(el.parents());

                nodes.offDisplayChanged();
            });
    
            return this;
    };

    // Trigger-based Display detection.
    // Browser Support
    // http://caniuse.com/#search=MutationObserver
    $.fn.onDisplayChanged = function(callback, delay)
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

    $.fn.offDisplayChanged = function()
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