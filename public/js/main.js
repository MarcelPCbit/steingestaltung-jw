let windowSize = 0;
let menuOpen = false;
let headerNav = document.getElementById("headerNav");
let headerNavMenuButton = document.getElementById("headerNavMenuButton");
let headerMobileNavButtonIcon = document.getElementById("headerMobileNavButtonIcon");

function openMenu() {
    if (menuOpen) {
        hideHaederNav();
    } else {
        showHaederNav();
    }
}

function showHaederNav() {
    headerNav.classList.add("w-full");
    headerMobileNavButtonIcon.innerHTML = "close";
    menuOpen = true;
}
function hideHaederNav() {
    headerNav.classList.remove("w-full");
    headerMobileNavButtonIcon.innerHTML = "menu";
    menuOpen = false;

}

function bodyResize() {
    if (windowSize != getWindowSize()) {
        windowSize = getWindowSize();
        if (windowSize < 3) {
            hideHaederNav();
        }
        if (windowSize >= 3) {
            showHaederNav();
        }
    }
}

function getWindowSize(params) {
    let newWindowSize = "0";

    windowWidth = window.innerWidth;

    if (windowWidth >= 640) {
        // sm
        newWindowSize = "1";
    }
    if (windowWidth >= 768) {
        // md
        newWindowSize = "2";
    }
    if (windowWidth >= 1024) {
        // lg
        newWindowSize = "3";
    }
    if (windowWidth >= 1280) {
        // xl
        newWindowSize = "4";
    }
    if (windowWidth >= 1536) {
        // 2 xl
        newWindowSize = "5";
    }

    return newWindowSize
}

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

window.onload = (event) => {
    headerNav.classList.remove('hidden');
    bodyResize();
    windowSize = getWindowSize();
    if (windowSize < 3) {
        hideHaederNav();
    }
    if (windowSize >= 3) {
        showHaederNav();
    }

    document.addEventListener("click", (evt) => {
        let targetEl = evt.target; // clicked element      
        do {
            if (targetEl == headerNav || targetEl == headerNavMenuButton) {
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

    document.getElementById('closePopup').addEventListener('click', function() {
        console.log('Close Popup');
        closePopup();
    });
});

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