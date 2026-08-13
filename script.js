/* =====================================================
   TRAVELGO - JAVASCRIPT
===================================================== */


/* =====================================================
   SELECT ELEMENTS
===================================================== */

const body = document.body;

const themeButton = document.getElementById("themeButton");

const mobileMenu = document.getElementById("mobileMenu");
const navMenu = document.querySelector(".nav-menu");

const bookingTabs = document.querySelectorAll(".booking-tab");

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");

const swapButton = document.getElementById("swapButton");

const travelDate = document.getElementById("travelDate");

const travelers = document.getElementById("travelers");

const searchButton = document.getElementById("searchButton");

const exploreButton = document.getElementById("exploreButton");

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const closeLogin = document.getElementById("closeLogin");
const closeSignup = document.getElementById("closeSignup");

const sendLoginOtp = document.getElementById("sendLoginOtp");
const sendSignupOtp = document.getElementById("sendSignupOtp");

const loginPhone = document.getElementById("loginPhone");

const signupName = document.getElementById("signupName");
const signupPhone = document.getElementById("signupPhone");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =====================================================
   CURRENT BOOKING TYPE
===================================================== */

let bookingType = "flight";


/* =====================================================
   TOAST NOTIFICATION
===================================================== */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


/* =====================================================
   MOBILE MENU
===================================================== */

mobileMenu.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    if (navMenu.classList.contains("show")) {
        mobileMenu.textContent = "✕";
    } else {
        mobileMenu.textContent = "☰";
    }

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        mobileMenu.textContent = "☰";

    });

});


/* =====================================================
   BOOKING TABS
===================================================== */

bookingTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        bookingTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        bookingType = tab.dataset.type;

        updateSearchPlaceholders();

        showToast(
            `${capitalize(bookingType)} booking selected`
        );

    });

});


/* =====================================================
   UPDATE PLACEHOLDERS
===================================================== */

function updateSearchPlaceholders() {

    if (bookingType === "flight") {

        fromInput.placeholder = "Delhi";
        toInput.placeholder = "Goa";

    }

    else if (bookingType === "hotel") {

        fromInput.placeholder = "City";
        toInput.placeholder = "Hotel";

    }

    else if (bookingType === "train") {

        fromInput.placeholder = "New Delhi";
        toInput.placeholder = "Mumbai";

    }

    else if (bookingType === "bus") {

        fromInput.placeholder = "Delhi";
        toInput.placeholder = "Jaipur";

    }

}


/* =====================================================
   CAPITALIZE TEXT
===================================================== */

function capitalize(text) {

    return text.charAt(0).toUpperCase() + text.slice(1);

}


/* =====================================================
   SWAP FROM / TO
===================================================== */

swapButton.addEventListener("click", () => {

    const fromValue = fromInput.value;
    const toValue = toInput.value;

    fromInput.value = toValue;
    toInput.value = fromValue;

    showToast("Locations swapped successfully");

});


/* =====================================================
   DATE - MINIMUM TODAY
===================================================== */

const today = new Date();

const year = today.getFullYear();

const month = String(
    today.getMonth() + 1
).padStart(2, "0");

const day = String(
    today.getDate()
).padStart(2, "0");

const todayString =
    `${year}-${month}-${day}`;

travelDate.min = todayString;


/* =====================================================
   SEARCH
===================================================== */

searchButton.addEventListener("click", () => {

    const from = fromInput.value.trim();
    const to = toInput.value.trim();

    const date = travelDate.value;

    const numberOfTravelers =
        travelers.value;


    /* Check From */

    if (!from) {

        showToast(
            "Please enter your starting location."
        );

        fromInput.focus();

        return;
    }


    /* Check To */

    if (!to) {

        showToast(
            "Please enter your destination."
        );

        toInput.focus();

        return;
    }


    /* Check same location */

    if (
        from.toLowerCase() ===
        to.toLowerCase()
    ) {

        showToast(
            "From and To locations cannot be the same."
        );

        return;
    }


    /* Check Date */

    if (!date) {

        showToast(
            "Please select your travel date."
        );

        travelDate.focus();

        return;
    }


    /* Check past date */

    if (date < todayString) {

        showToast(
            "Please select a future date."
        );

        return;
    }


    /* Success */

    showToast(
        `${capitalize(bookingType)} search: ${from} → ${to}`
    );

    console.log("TravelGo Search");

    console.log({
        type: bookingType,
        from: from,
        to: to,
        date: date,
        travelers: numberOfTravelers
    });

});


/* =====================================================
   EXPLORE BUTTON
===================================================== */

exploreButton.addEventListener("click", () => {

    document
        .getElementById("destinations")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =====================================================
   LOGIN MODAL
===================================================== */

loginButton.addEventListener("click", () => {

    loginModal.classList.add("show");

    document.body.classList.add("no-scroll");

});


/* =====================================================
   SIGNUP MODAL
===================================================== */

signupButton.addEventListener("click", () => {

    signupModal.classList.add("show");

    document.body.classList.add("no-scroll");

});


/* =====================================================
   CLOSE LOGIN
===================================================== */

closeLogin.addEventListener("click", () => {

    closeModal(loginModal);

});


/* =====================================================
   CLOSE SIGNUP
===================================================== */

closeSignup.addEventListener("click", () => {

    closeModal(signupModal);

});


/* =====================================================
   CLOSE MODAL FUNCTION
===================================================== */

function closeModal(modal) {

    modal.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

loginModal.addEventListener("click", event => {

    if (event.target === loginModal) {

        closeModal(loginModal);

    }

});


signupModal.addEventListener("click", event => {

    if (event.target === signupModal) {

        closeModal(signupModal);

    }

});


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal(loginModal);

        closeModal(signupModal);

    }

});


/* =====================================================
   PHONE VALIDATION
===================================================== */

function isValidPhone(phone) {

    return /^[6-9]\d{9}$/.test(phone);

}


/* =====================================================
   LOGIN OTP
===================================================== */

sendLoginOtp.addEventListener("click", () => {

    const phone =
        loginPhone.value.trim();


    if (!phone) {

        showToast(
            "Please enter your mobile number."
        );

        loginPhone.focus();

        return;
    }


    if (!isValidPhone(phone)) {

        showToast(
            "Enter a valid 10-digit Indian mobile number."
        );

        loginPhone.focus();

        return;
    }


    /*
       FRONTEND DEMO ONLY

       A real OTP must be generated and
       verified by a backend/SMS service.
    */

    showToast(
        `OTP request prepared for +91 ${phone}`
    );

    console.log(
        "Demo OTP flow requested for:",
        phone
    );

});


/* =====================================================
   SIGNUP OTP
===================================================== */

sendSignupOtp.addEventListener("click", () => {

    const name =
        signupName.value.trim();

    const phone =
        signupPhone.value.trim();


    if (!name) {

        showToast(
            "Please enter your full name."
        );

        signupName.focus();

        return;
    }


    if (name.length < 2) {

        showToast(
            "Please enter a valid name."
        );

        signupName.focus();

        return;
    }


    if (!phone) {

        showToast(
            "Please enter your mobile number."
        );

        signupPhone.focus();

        return;
    }


    if (!isValidPhone(phone)) {

        showToast(
            "Enter a valid 10-digit Indian mobile number."
        );

        signupPhone.focus();

        return;
    }


    /*
       FRONTEND DEMO ONLY
    */

    showToast(
        `OTP request prepared for +91 ${phone}`
    );

    console.log(
        "Signup OTP flow:",
        {
            name: name,
            phone: phone
        }
    );

});


/* =====================================================
   ONLY NUMBERS IN PHONE INPUTS
===================================================== */

[loginPhone, signupPhone].forEach(input => {

    input.addEventListener("input", () => {

        input.value =
            input.value.replace(/\D/g, "");

    });

});


/* =====================================================
   DARK MODE
===================================================== */

let darkMode =
    localStorage.getItem("travelgo-dark-mode") === "true";


function applyTheme() {

    if (darkMode) {

        body.classList.add("dark-mode");

        themeButton.textContent = "☀️";

    } else {

        body.classList.remove("dark-mode");

        themeButton.textContent = "🌙";

    }

}


applyTheme();


themeButton.addEventListener("click", () => {

    darkMode = !darkMode;

    localStorage.setItem(
        "travelgo-dark-mode",
        darkMode
    );

    applyTheme();

    showToast(
        darkMode
            ? "Dark mode enabled"
            : "Light mode enabled"
    );

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-menu a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   DESTINATION CARD CLICK
===================================================== */

document
    .querySelectorAll(".destination-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const destination =
                card.querySelector("h3");

            if (destination) {

                const city =
                    destination.textContent.trim();

                toInput.value = city;

                document
                    .querySelector(".booking-search")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                showToast(
                    `${city} selected as your destination`
                );

            }

        });

    });


/* =====================================================
   OFFER BUTTONS
===================================================== */

document
    .querySelectorAll(".offer-card button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .getElementById("destinations")
                .scrollIntoView({
                    behavior: "smooth"
                });

            showToast(
                "Explore TravelGo destinations and deals."
            );

        });

    });


/* =====================================================
   VIEW ALL
===================================================== */

const viewButton =
    document.querySelector(".view-button");


viewButton.addEventListener("click", () => {

    document
        .getElementById("destinations")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =====================================================
   FOOTER LOGIN
===================================================== */

document
    .querySelectorAll(".footer-column a")
    .forEach(link => {

        link.addEventListener("click", event => {

            const text =
                link.textContent.trim().toLowerCase();


            if (
                text === "login" ||
                text === "register"
            ) {

                event.preventDefault();

                if (text === "login") {

                    loginModal.classList.add("show");

                } else {

                    signupModal.classList.add("show");

                }

                document.body.classList.add(
                    "no-scroll"
                );

            }

        });

    });


/* =====================================================
   INITIAL MESSAGE
===================================================== */

console.log(
    "%cTravelGo loaded successfully!",
    "font-size:18px;font-weight:bold;"
);

console.log(
    "Frontend booking platform initialized."
);