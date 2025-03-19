let windowSize = 0;
let menuOpen = false;
headerNavDekstop = document.getElementById("headerNavDekstop");
headerNavMobile = document.getElementById("headerNavMobile");
headerNavMenuButton = document.getElementById("headerNavMenuButton");
headerMobileNavButtonIcon = document.getElementById("headerMobileNavButtonIcon");

window.onload = (event) => {
    bodyResize();

    document.addEventListener("click", (evt) => {
        let targetEl = evt.target; // clicked element      
        do {
            if (targetEl == headerNavMobile || targetEl == headerNavMenuButton) {
                // This is a click inside, does nothing, just return.
                return;
            }
            // Go up the DOM
            targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.
        if (menuOpen && getWindowSize() < 3) {
            hideHaederNav();
        }
    });
    
    window.addEventListener("resize", (evt) => {
        bodyResize();
    });
};

document.addEventListener('DOMContentLoaded', function() {   

    imgWithPopup = document.getElementsByClassName('imgWithPopup');
    
    for (let index = 0; index < imgWithPopup.length; index++) {
        const element = imgWithPopup[index];
        element.addEventListener('click', function() {
            console.log('Image was clicked!');
            openPopup(element.src);
        });
    };

    if(window.location.href.includes('galerie.html')) { 
        console.log('Galerie Page');
        document.getElementById('closePopup').addEventListener('click', function() {
            console.log('Close Popup');
            closePopup();
        });
    }
});

// Nav
function toggleNav() {
    if (menuOpen) {
        hideHaederNav();
    } else {
        showHaederNav();
    }
}
function showHaederNav() {
    console.log("show mobile Nav");
    headerNavMobile.classList.add("w-full");
    headerMobileNavButtonIcon.innerHTML = "close";
    menuOpen = true;
}
function hideHaederNav() {
    console.log("hide mobile Nav");
    headerNavMobile.classList.remove("w-full");
    headerMobileNavButtonIcon.innerHTML = "menu";
    menuOpen = false;
}

function hideHaederNavDesktop() { 
    document.getElementById("headerNavDesktop").classList.add("hidden");
}
function showHaederNavDesktop() { 
    document.getElementById("headerNavDesktop").classList.remove("hidden");
}

// Resize
function bodyResize() {
    if (windowSize != getWindowSize()) {
        windowSize = getWindowSize();
        if (windowSize < 3) {
            hideHaederNavDesktop();
        }
        if (windowSize >= 3) {
            showHaederNavDesktop();
        }
    }
}
function getWindowSize(params) {
    let newWindowSize = "0";

    windowWidth = window.innerWidth;
    // console.log(windowWidth);

    if (windowWidth >= 640) {
        // sm
        // console.log("Window Size: sm");
        newWindowSize = "1";
    }
    if (windowWidth >= 768) {
        // md
        // console.log("Window Size: md");
        newWindowSize = "2";
    }
    if (windowWidth >= 1024) {
        // lg
        // console.log("Window Size: lg");
        newWindowSize = "3";
    }
    if (windowWidth >= 1280) {
        // xl
        // console.log("Window Size: xl");
        newWindowSize = "4";
    }
    if (windowWidth >= 1536) {
        // 2 xl
        // console.log("Window Size: 2 xl");
        newWindowSize = "5";
    }

    return newWindowSize
}

// mail
function sendMail() {
    function addMailBodyText(text) {
        var newLine = "%0D%0A";
        body += text + newLine;
    }

    /** reset error text */
    document.getElementById("errorInfo").classList.add("hidden");

    var recipient = "info@stuckateur-metsch.de";
    var subject = "Anfrage Internetformular";
    var body = "";
    var error = 0;

    /** add header to mail text */
    addMailBodyText("Nachricht vom Internetformular:")
    addMailBodyText("");

    /** add name to mail text */
    if (document.getElementById("name").value == "" && error == 0) {
        error = 1; // no name
    } else {
        addMailBodyText("Name: " + document.getElementById("name").value);
    }

    /** add email to mail text */
    if(document.getElementById("email").value == "" && error == 0) {
        error = 2;
    } else {
        addMailBodyText("E-Mail: " + document.getElementById("email").value);
    }

    /** add phone number to mail text */
    if (document.getElementById("phone").value == "" && error == 0) {
        error = 4;
    } else {
        addMailBodyText("Telefon: " + document.getElementById("phone").value);
    }

    /** add city to mail text */
    addMailBodyText("Wohnort: " + document.getElementById("city").value);

    /** add message to mail text */
    if (document.getElementById("message").value == "" && error == 0) {
        error = 3; // no message
    } else {
        addMailBodyText("Nachricht: " + document.getElementById("message").value);
    }
    addMailBodyText("");

    if (error == 0) {
        /** send mail */
        window.open('mailto:' + recipient + '?subject=' + subject + '&body=' + body, '_blank');
        
        /** reload page */        
        window.location.reload(); 

    } else {
        /** handle error Values */
        var errorInfoDiv = document.getElementById("errorInfo");
        errorInfoDiv.classList.remove("hidden");
        switch (error) {
            case 1:
                errorInfoDiv.innerHTML = "Bitte geben sie einen Namen ein!";
                break;
            case 2:
                errorInfoDiv.innerHTML = "Bitte geben sie eine E-Mail-Adresse ein!";
                break;
            case 3:
                errorInfoDiv.innerHTML = "Bitte geben sie eine Nachricht ein!";
                break;
            case 4:
                errorInfoDiv.innerHTML = "Bitte geben sie eine Telefonnummer ein!";
                break;  
            default:
                errorInfoDiv.innerHTML = "Unbekannter fehler. Versuchen sie es erneut!";
                break;
        }
    }

}

// Popup
openPopup = function(src) {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popupImg').src = src;
}
closePopup = function() {
    document.getElementById('popup').style.display = 'none';
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});
document.addEventListener('click', function(event) {
    if (event.target.id === 'popup') {
        closePopup();
    }
});