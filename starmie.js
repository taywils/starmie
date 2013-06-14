function Starmie(paramObj) {
	//Used to generate random star ID numbers
	var randNum = Math.floor((Math.random() * 9999) + 1);

	//Ensure paramObj will always be a 'object'
	paramObj = ((typeof paramObj === "undefined") || paramObj === null || (typeof paramObj != "object")) ? {} : paramObj;

	// Assign parameter object values
	var starNumber  = paramObj.starNumber   || 5;
	var idPrefix    = paramObj.idPrefix     || "stars" + randNum.toString();
	var starSize    = paramObj.starSize     || "30px";
	var starTitle   = paramObj.starTitle    || "Click to rate, click again to reset";
	var readOnly    = paramObj.readOnly     || false;
	var starColor  	= paramObj.starColor    || "rgb(255, 215, 0)";
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
	var htmlStar = "&#9733;";
	/**
	 * For a given hex string returns the string equivalent in rgb
	 * notation
	 * @see http://stackoverflow.com/questions/5623838
	 * @params String hex
	 * @return String
	 */
	var printRgbFromHex = function(hex) {
		if(hex[0] === '#') {
			//Trim leading hash
			hex = hex.substr(1, hex.length - 1);
			var bigint = parseInt(hex, 16);
			var r = (bigint >> 16) & 255;
			var g = (bigint >> 8) & 255;
			var b = bigint & 255;

			return "rgb(" + r + ", " + g + ", " + b + ")";
		} else {
			return hex;
		}
	};

	this.getHtml = function() {
		var html = "<div class='" + divClass + "' style='font-size: " + starSize + ";'>\n";
		for(var i = 0; i < starNumber; ++i) {
			html += "<span id='" + idPrefix + "-" + i + "'>" + htmlStar + "</span>";
		}
		html += "\n</div>";
		rendered = true;
		return html;
	};

	this.afterRender = function() {
		if(!rendered) {
			return false;
        } else {
            var $starDivs = jQuery("div." + divClass + " span");

            $starDivs.each(function(index) {
                starIds.push(jQuery(this).attr('id'));
            });

            $starDivs.css({color: 'grey', cursor: 'pointer'});
            $starDivs.attr('title', starTitle);

            if(readOnly) {
                for(idx in starIds) {
                    if(starIds.hasOwnProperty(idx) && idx < readOnlyRating) {
                        jQuery("#" + starIds[idx]).css('color', starColor);
                    }
                }

                theRating = readOnlyRating;
            } else {
                $starDivs.hover(
                    function() { //onMouseOver
                        if(!starLock) {
                            var high = jQuery.inArray(jQuery(this).attr('id'), starIds);
                            for(idx in starIds) {
                                if(starIds.hasOwnProperty(idx) && idx <= high) {
                                    jQuery("#" + starIds[idx]).css('color', starColor);
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

                $starDivs.click(function(){
                    if(!starLock) {
                        starLock = true;
                        var rating = 0;
                        for(idx in starIds) {
                            if(starIds.hasOwnProperty(idx) && printRgbFromHex(starColor) === jQuery("#" + starIds[idx]).css('color')) {
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
        }
	};

	this.getRating = function() {
		return (rendered) ? theRating : -1;
	};
}
