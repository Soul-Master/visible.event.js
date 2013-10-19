/// <reference path="jquery-2.0.3.js" />
/// <reference path="jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js" />
/// <reference path="attrchange/attrchange.js" />

(function ($)
{
    $(function ()
    {
        $("#tabs").tabs();

        var tab = $('#tabs-2');
        var label = $('#lVisibility');

        label.text(tab.is(':visible'));
        tab.onVisibleChanged(function (e, isVisible)
        {
            label.text(isVisible);
        });
    });
})(jQuery);