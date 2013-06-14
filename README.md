## Demo

[See the jsFiddle](http://jsfiddle.net/uBy63/4/)

## Dependencies 
- [jQuery](http://jquery.com/)

## Why Starmie?
- Why not... just kidding.
- I needed an easy to use(not necessarily simple) library for rendering star rating via javascript.
- The current offerings suffered from one or more of the following...
  - Too feature packed. Starmie does one thing and thats it.
  - Required some backend service to work. Starmie is just javascript, no database required.  
  - Relied upon static image assets or were just vanilla CSS3. Starmie uses the browser star icon, nothing more.
  - Needed to manually change existing html. With Starmie you inject the HTML, no need to update any view logic.

## How To Use

1. Create a new Starmie object and give it some initial values
2. Then extract the HTML and inject it wherever you like on your page
3. Once rendered, call the `afterRender()` method to enable it
4. Use the `getRating()` method to return the current star-rating
5. Access the star-rating with jQuery by selecting on `$('.idPrefix-starmie-rating')`

```javascript
var stars = new Starmie({
  starNumber: 10,
  idPrefix: "mystars",
  starSize: "40px",
  starTitle: "Thanks for using Starmie.js"
});

$('body').append(stars.getHtml()); // Example of HTML injection

stars.afterRender(); // Begins the rating jQuery events

stars.getRating(); // Can be captured with Ajax, within callbacks etc...

$('.mystars-starmie-rating'); // Gives you the <div>...</div> with the star rating
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
starColor | String | "rgb(255, 215, 0)" | Sets the star color from a valid hex or rgb string

## TODO
1. Some sort of testing, there are so many Javascript testing tools I can't decide which one to use
