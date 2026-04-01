/* =========================================================
   EARLIER CLASS EXERCISES
========================================================= */
var x = 5
var y = 7
var z = x + y

console.log(z)

var A = "Hello "
var B = "world!"
var C = A + B

console.log(C)

function summPrint(x1, x2) {
    var result = x1 + x2
    console.log(result)
}

summPrint(x, y)
summPrint(A, B)

if (C.length > z) {
    console.log(C)
}
else if (C.length < z) {
    console.log(z)
}
else {
    console.log("good job!")
}

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"]
var L2 = ["Apple", "Banana", "Kiwi", "Orange"]

/* =========================================================
   GLOBAL DATE / GREETING
========================================================= */
var now = new Date()
var hour = now.getHours()

function greeting(h) {
    var greetElement = document.getElementById("greeting")

    if (!greetElement) {
        return
    }

    if (h < 5 || h >= 20) {
        greetElement.innerHTML = "Good night"
    }
    else if (h < 12) {
        greetElement.innerHTML = "Good morning"
    }
    else if (h < 18) {
        greetElement.innerHTML = "Good afternoon"
    }
    else {
        greetElement.innerHTML = "Good evening"
    }
}

greeting(hour)

function addYear() {
    var year = new Date().getFullYear()
    var yearElement = document.getElementById("copyYear")

    if (yearElement) {
        yearElement.innerHTML = "© " + year + " MonoMuse Museum. All rights reserved."
    }
}

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */
function ActiveNav() {
    const navLinks = document.querySelectorAll(".nav_bar a")

    navLinks.forEach(link => {
        if (window.location.href.includes(link.getAttribute("href"))) {
            link.classList.add("active")
        }
    })
}

ActiveNav()

/* =========================================================
   JQUERY READ MORE / READ LESS
   External library source:
   https://code.jquery.com/
========================================================= */
if (typeof $ !== "undefined") {
    $("#readMore").click(function() {
        $("#longIntro").show()
        $("#readLess").show()
        $("#readMore").hide()
    })

    $("#readLess").click(function() {
        $("#longIntro").hide()
        $("#readLess").hide()
        $("#readMore").show()
    })
}

/* =========================================================
   MOBILE NAVIGATION MENU
========================================================= */
function toggleMenu() {
    const nav = document.getElementById("navLinks")
    if (nav) {
        nav.classList.toggle("active")
    }
}

/* =========================================================
   LEAFLET MAP
   External library source:
   https://leafletjs.com/
   Tile source:
   https://www.openstreetmap.org/
========================================================= */
function initializeMap() {
    const mapElement = document.getElementById("map")

    if (!mapElement || typeof L === "undefined") {
        return
    }

    const map = L.map("map").setView([40.6936, -89.5888], 16)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map)

    L.marker([40.6936, -89.5888]).addTo(map)
        .bindPopup("MonoMuse Museum<br>222 SW Washington St<br>Peoria, IL 61602")
        .openPopup()
}

/* =========================================================
   TICKETS PAGE: REDIRECT USER TO CHECKOUT WITH CHOSEN DATE
========================================================= */
function goToCheckout(date) {
    localStorage.setItem("selectedDate", date)
    window.location.href = "checkout.html"
}

/* =========================================================
   CHECKOUT PAGE: PRICE CALCULATION AND VALIDATION
========================================================= */
function updatePrice() {
    var ticketType = document.getElementById("ticketType")
    var quantity = document.getElementById("quantity")
    var totalPrice = document.getElementById("totalPrice")

    if (!ticketType || !quantity || !totalPrice) {
        return
    }

    var qty = parseInt(quantity.value)

    if (!ticketType.value || isNaN(qty) || qty < 1 || qty > 10) {
        totalPrice.innerHTML = "Total: $0"
        return
    }

    var total = qty * 18
    totalPrice.innerHTML = "Total: $" + total
}

function clearCheckoutErrors() {
    var errorIds = ["dateError", "typeError", "quantityError", "emailError", "zipError"]

    errorIds.forEach(function(id) {
        var el = document.getElementById(id)
        if (el) {
            el.innerHTML = ""
        }
    })
}

function initializeCheckoutPage() {
    var visitDate = document.getElementById("visitDate")
    var ticketType = document.getElementById("ticketType")
    var quantity = document.getElementById("quantity")
    var checkoutForm = document.getElementById("checkoutForm")

    if (!checkoutForm) {
        return
    }

    /* Allow only the dates offered on the tickets page */
    var allowedDates = ["2026-04-05", "2026-04-12", "2026-04-19", "2026-04-26"]

    /* Preselect the date that was chosen on the tickets page */
    var savedDate = localStorage.getItem("selectedDate")
    var dateMap = {
        "April 5, 2026": "2026-04-05",
        "April 12, 2026": "2026-04-12",
        "April 19, 2026": "2026-04-19",
        "April 26, 2026": "2026-04-26"
    }

    if (visitDate && savedDate && dateMap[savedDate] && !visitDate.value) {
        visitDate.value = dateMap[savedDate]
    }

    if (ticketType) {
        ticketType.addEventListener("change", updatePrice)
    }

    if (quantity) {
        quantity.addEventListener("input", updatePrice)
    }

    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault()
        clearCheckoutErrors()

        var isValid = true

        var email = document.getElementById("email")
        var zip = document.getElementById("zip")
        var mailingList = document.getElementById("mailingList")

        /* Save current values so nothing gets lost on validation errors */
        var currentDate = visitDate.value
        var currentType = ticketType.value
        var currentQuantity = quantity.value
        var currentEmail = email.value
        var currentZip = zip.value
        var currentMailingList = mailingList.checked

        if (!visitDate.value) {
            document.getElementById("dateError").innerHTML = "Please select a visit date."
            isValid = false
        }
        else if (!allowedDates.includes(visitDate.value)) {
            document.getElementById("dateError").innerHTML = "Please select one of the available museum dates."
            isValid = false
        }

        if (!ticketType.value) {
            document.getElementById("typeError").innerHTML = "Please select a ticket type."
            isValid = false
        }

        var qty = parseInt(quantity.value)
        if (isNaN(qty) || qty < 1 || qty > 10) {
            document.getElementById("quantityError").innerHTML = "Please enter a quantity from 1 to 10."
            isValid = false
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.value || !emailPattern.test(email.value)) {
            document.getElementById("emailError").innerHTML = "Please enter a valid email address."
            isValid = false
        }

        if (zip.value && !/^\d{5}$/.test(zip.value)) {
            document.getElementById("zipError").innerHTML = "Zip code must be exactly 5 digits."
            isValid = false
        }

        if (!isValid) {
            /* Restore all values so the user does not have to re-enter anything */
            visitDate.value = currentDate
            ticketType.value = currentType
            quantity.value = currentQuantity
            email.value = currentEmail
            zip.value = currentZip
            mailingList.checked = currentMailingList

            updatePrice()
            return
        }

        var total = qty * 18
        localStorage.setItem("orderTotal", total)
        localStorage.setItem("orderDate", visitDate.value)
        localStorage.setItem("orderType", ticketType.options[ticketType.selectedIndex].text)
        localStorage.setItem("orderQuantity", qty)

        window.location.href = "confirmation.html"
    })

    updatePrice()
}

/* =========================================================
   CONFIRMATION PAGE CONTENT
========================================================= */
function initializeConfirmationPage() {
    var confirmationMessage = document.getElementById("confirmationMessage")

    if (!confirmationMessage) {
        return
    }

    var rawDate = localStorage.getItem("orderDate")
    var orderDate = rawDate ? new Date(rawDate).toLocaleDateString() : ""
    var orderType = localStorage.getItem("orderType")
    var orderQuantity = localStorage.getItem("orderQuantity")
    var orderTotal = localStorage.getItem("orderTotal")

    if (orderDate && orderType && orderQuantity && orderTotal) {
        confirmationMessage.innerHTML =
            "Thank you for your order. Your " + orderType.toLowerCase() +
            " ticket purchase for " + orderQuantity +
            " ticket(s) on " + orderDate +
            " has been confirmed. Your total is $" + orderTotal + "."
    }
}

/* =========================================================
   EXPLORE PAGE: IMAGE SLIDESHOW / GALLERY
========================================================= */
var galleryImages = [
    "../images/gallery1.jpg",
    "../images/gallery2.jpg",
    "../images/gallery3.jpg"
]

var galleryAltText = [
    "Featured MonoMuse exhibition image one",
    "Featured MonoMuse exhibition image two",
    "Featured MonoMuse exhibition image three"
]

var currentGalleryIndex = 0

function updateGallery() {
    var galleryImage = document.getElementById("galleryImage")
    var galleryCounter = document.getElementById("galleryCounter")

    if (!galleryImage || !galleryCounter) {
        return
    }

    galleryImage.src = galleryImages[currentGalleryIndex]
    galleryImage.alt = galleryAltText[currentGalleryIndex]
    galleryCounter.innerHTML = (currentGalleryIndex + 1) + " / " + galleryImages.length
}

function nextSlide() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length
    updateGallery()
}

function previousSlide() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length
    updateGallery()
}

function initializeGallery() {
    if (document.getElementById("galleryImage")) {
        updateGallery()
    }
}

/* =========================================================
   PAGE INITIALIZATION
========================================================= */
document.addEventListener("DOMContentLoaded", function() {
    initializeMap()
    initializeCheckoutPage()
    initializeConfirmationPage()
    initializeGallery()
})