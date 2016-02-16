/* 
 * Cookie Consent
 */
cookieConsent = {
    
    cookieName: "<set cookie name>",
    
    options: {
        message:            "This website uses cookies to ensure you get the best experience on our website.",
        buttonText:         "Got It!",
        buttonColour:       "#3a78e6",
        backgroundColour:   "#222",
        position:           "top",
        linkName:           "More Info.",
        linkColour:         "grey",
        linkHoverColour:    "white",
        link:               "https://www.google.com/policies/technologies/cookies/"

    },
    
    init: function(){
        
        if(!this.cookie.check(this.cookieName, "true")){
            // show the div
            this.createDiv();
        }
        
    },
    
    createDiv: function(){
        
        var div = document.createElement("div");
        div.id = "cookieconsent";
        div.style.width = "100%";
        div.style.padding = "15px 15px 15px 15px";
        div.style.background = this.options.backgroundColour;
        div.style.zIndex = "99999";
        div.innerHTML = "<style>#cookieconsent {color: white} #cookieconsent p a { color: " + this.options.linkColour + " !important;} #cookieconsent p a:hover { color: " + this.options.linkHoverColour + " !important; text-decoration: none !important; border-bottom: none} #cookieconsent p { vertical-align: middle; font-size: 14px; margin-top: 7px !important; display: block; } @media all and (max-width: 800px){ #cookieconsent p { font-size: 12px !important; } #cookieconsent button { font-size: 12px; }  } @media all and (max-width: 600px){ #cookieconsent { padding: 10px !important }  }</style>" +
                        "<button id='consentButton' class='btn' style='display: block; float: right; margin: 0 0 0 10px !important; background: " + this.options.buttonColour + "'>" + this.options.buttonText + "</button>" +
                        "<p>" + this.options.message + " <a href=" + this.options.link + ">" + this.options.linkName + "</a></p>";
        div.style.position = "fixed";
        div.style.bottom = "0px";
        document.body.appendChild(div);
        
        //set listener for button
        var button = document.getElementById('consentButton');
        button.addEventListener("click", function(){
            div.style.display = "none";
            cookieConsent.cookie.set(cookieConsent.cookieName, "true", 365);
        });
        
        
    },
    
    cookie: {
        
        set: function(cookieName, cookieValue, expiryDays){
                var d = new Date();
                d.setTime(d.getTime() + (expiryDays*24*60*60*1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/;";
        },
        
        get: function(cookieName){
            var name = cookieName + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
        },
        
        check: function(cookieName, cookieValue){
                var username = cookieConsent.cookie.get(cookieName);
            if (username === cookieValue) {
                return true; // visited before
            } else {
                return false; // not visited before
            }
        }

    }
    
};
document.addEventListener("DOMContentLoaded", function(event) { 
    cookieConsent.init();
});
