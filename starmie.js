function Starmie(paramObj) {
	//Used to generate random star ID numbers
	var randNum = Math.floor((Math.random() * 1000) + 1);

	//Ensure paramObj will always be a 'object'
	paramObj = ((typeof paramObj === "undefined") || paramObj === null || (typeof paramObj != "object")) ? {} : paramObj;

	// Assign parameter object values
	var starNumber  = paramObj.starNumber   || 5;
	var idPrefix    = paramObj.idPrefix     || "stars" + randNum.toString();
	var starSize    = paramObj.starSize     || "30px";
	var starTitle   = paramObj.starTitle    || "Click to rate, click again to reset";
	var readOnly    = paramObj.readOnly     || false;
	if(readOnly) {
		var readOnlyRating = (paramObj.readOnlyRating >= starNumber) ? starNumber : paramObj.readOnlyRating;
		readOnlyRating = (readOnlyRating < 0 ) ? 0 : readOnlyRating;
	}

	// Used by Starmie functions
	var starLock = false;
	var starIds = [];
	var theRating = 0;
	var divClass = idPrefix + '-starmie-rating';
	var rendered = false;

	this.getHtml = function() {
		var html = "<div class='" + divClass + "' style='font-size: " + starSize + ";'>\n";
		for(var i = 0; i < starNumber; ++i) {
			html += "<span id='" + idPrefix + "-" + i + "'>&#9733;</span>";
		}
		html += "\n</div>";
		rendered = true;
		return html;
	};

	this.afterRender = function() {
		if(!rendered)
			return false;

		var selector = "div." + divClass + " span";

		jQuery(selector).each(function(index) {
			starIds.push(jQuery(this).attr('id'));
		});

		jQuery(selector).css({color: 'grey', cursor: 'pointer'});
		jQuery(selector).attr('title', starTitle);

		if(readOnly) {
			for(idx in starIds) {
				if(starIds.hasOwnProperty(idx) && idx < readOnlyRating) {
					jQuery("#" + starIds[idx]).css('color', 'gold');
				}
			}

			theRating = readOnlyRating;
		}

		if(!readOnly) {
			jQuery(selector).hover(
				function() { //onMouseOver
					if(!starLock) {
						var high = jQuery.inArray(jQuery(this).attr('id'), starIds);
						for(idx in starIds) {
							if(starIds.hasOwnProperty(idx) && idx <= high) {
								jQuery("#" + starIds[idx]).css('color', 'gold');
							}
						}
					}
				},
				function() { //onMouseOff
					if(!starLock) {
						for(idx in starIds) {
							if(starIds.hasOwnProperty(idx)) {
								jQuery("#" + starIds[idx]).css('color', 'grey');
							}
						}
					}
				}
			);

			jQuery(selector).click(function(){
				if(!starLock) {
					starLock = true;
					var rating = 0;
					var rgbGold = "rgb(255, 215, 0)";
					for(idx in starIds) {
						if(starIds.hasOwnProperty(idx) && rgbGold === jQuery("#" + starIds[idx]).css('color')) {
							rating += 1;
						}
					}
					theRating = rating;
				} else {
					theRating = 0;
					starLock = false;
				}
			});
		}
	};

	this.getRating = function() {
		return (rendered) ? theRating : -1;
	};
}
