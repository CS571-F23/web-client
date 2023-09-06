
function CreateCS571() {
	let overridenBadgerId;

	function setBadgerId(id) {
		overridenBadgerId = id;
	}
	
	function getBadgerId() {
		return overridenBadgerId ? overridenBadgerId : fetchBadgerId()
	}

	function fetchBadgerId() {
        const existId = getCookie("cs571_bid_relay")
		if (existId) {
			return existId
		} else {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://cs571.org/api/auth/what-is-my-bid", false);
            xhr.withCredentials = true;
			xhr.send();
			if (xhr.status === 200) {
				let bid = JSON.parse(xhr.responseText).bid;
                document.cookie = `cs571_bid_relay=${bid}; path=/`
				return bid;
			} else {
				console.error("Failed to aquire Badger ID, are you logged in?");
				console.error("If error persists, try closing all browser windows, disabling your extensions, or using a different browser.");
				return '';
			}
		}
	}

    // https://stackoverflow.com/questions/5968196/how-do-i-check-if-a-cookie-exists
    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        }
        else
        {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
        }
        // because unescape has been deprecated, replaced with decodeURI
        //return unescape(dc.substring(begin + prefix.length, end));
        return decodeURI(dc.substring(begin + prefix.length, end));
    } 

    return {
        setBadgerId: setBadgerId,
        getBadgerId: getBadgerId,
        fetchBadgerId: fetchBadgerId
    }
}

const CS571 = CreateCS571();