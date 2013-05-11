## Demo

[See the jsFiddle]((http://jsfiddle.net/uBy63/)

## Dependencies 
- [jQuery](http://jquery.com/)

## How To Use

1. Create a new Starmie object and give it some initial values
2. Then extract the HTML and inject it wherever you like on your page
3. Once rendered, call the `afterRender()` method to enable it
4. Use the `getRating()` method to return the current star-rating

```javascript
var stars = new Starmie({
  starNumber: 10,
  idPrefix: "mystars",
  starSize: "40px",
  starTitle: "Thanks for using Starmie.js"
});

$('body').append(stars.getHtml());
stars.afterRender();
stars.getRating(); // Can be used with Ajax, within callbacks etc...
```

## ReadOnly mode

- Create a new Starmie object and set `readOnly: true` and assign `readOnlyRating:` to some integer value

```javascript
  var fixedStars = new Starmie({
    readOnly: true,
    readOnlyRating: 1,
    starTitle: "I give this crap 1 star",
  });
```

## Starmie Parameter List

Name | Type | Default | Description
---- | ---- | ------- | -----------
starNumber | number | 5 | The total number of stars shown
idPrefix | string | "stars" + randomNumber.toString() | The id attribute for use with DOM selectors, filter by the prefix
starSize | string | "30px" | How large in pixels the stars will be
starTitle | string | "Click to rate, click again to reset" | Text that shows up when the mouse hovers
readOnly | boolean | false | Makes the stars readOnly
readOnlyRating | number | 0 if negative or starNumber if too large | The number of stars filled in

