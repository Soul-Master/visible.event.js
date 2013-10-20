[visible.event.js](https://github.com/Soul-Master/visible.event.js) - jQuery-based functions
==================================================

Set of JavaScript functions that provide ability to detect visibility changing of any element based on `DOM Attribute Modified API` that should **support any browsers (IE6+ or later)**.
For more information about attribute change detection please visit the following GitHub project.

https://github.com/meetselva/attrchange

General Methods
--------------------------------------

```bash
$('[selector]').onVisibleChanged(callbackFn, [delay]);
```
**onVisibleChanged** function will detect visibility change on any element and execute assosiated callback function.

`callbackFn (e, isElementVisible)` is function that will be executed when visibility is changed. This function will be called with 2 arguments. 

- `e` is Mutation Record object (for modern browsers that support MutationObserver) or other object that is returned from [attrchange](https://github.com/meetselva/attrchange) function.
- `isElementVisible` is boolean value that represent visiblity state. It will be `true` when element is visible and `false` when element is hidden.

`delay` is optional parameter for delay visiblity detection (execute `':visible'` filter and compare with the old value). This trick is really useful for animated element that rapidlly fire attribute change event. The default `delay` value is **25ms** that should be large enough to ignore any animating element (normal duration between frame of 60Hz animation should be 16.67ms).

```bash
$('[selector]').offVisibleChanged();
```
**offVisibleChanged** function use to disable visibility detection on any element. This function will stop mutation observer object that assosiate with this element.

Additional Methods
-------------------------------------

```bash
$('[selector]').onElementVisibleChanged(callbackFn, [delay]);
```
**onElementVisibleChanged** function will detect visibility change on **single element**. This function will only focus at visibility change on current element and **will not monitor** visibility change on parent or upper element in DOM element tree. All paramters are eqaul with `onVisibleChanged` function.

```bash
$('[selector]').offElementVisibleChanged();
```
**offElementVisibleChanged** function use to disable visibility detection on **single element**.

Example Usage
--------------------------------------

1. This is a hello world example of [visible.event.js](https://github.com/Soul-Master/visible.event.js) function. This example show how this function normally work.

http://jsbin.com/ETiGIre/7
