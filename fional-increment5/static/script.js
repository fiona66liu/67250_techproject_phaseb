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

// function findTheBanana(arr) {
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] === "Banana") {
//             alert("Banana found!")
//         }
//     }
// }

// findTheBanana(L1)
// findTheBanana(L2)

// function findTheBanana(arr) {
//     arr.forEach(function(item) {
//         if (item === "Banana") {
//             alert("Banana found!")
//         }
//     })
// }

// findTheBanana(L1)
// findTheBanana(L2)


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

function ActiveNav() {
    const navLinks = document.querySelectorAll('.nav_bar a');

    navLinks.forEach(link => {
        if (window.location.href.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

ActiveNav();

if (typeof $ !== "undefined") {
    $("#readMore").click(function() {
        $("#longIntro").show();
        $("#readLess").show();
        $("#readMore").hide();
    });

    $("#readLess").click(function() {
        $("#longIntro").hide();
        $("#readLess").hide();
        $("#readMore").show();
    });
}

function showPurchaseForm(date) {
    var form = document.getElementById("purchaseForm");
    var selectedDateInput = document.getElementById("selectedDate");

    if (form) {
        form.style.display = "block";
    }

    if (selectedDateInput) {
        selectedDateInput.value = date;
    }
}

function submitPurchase() {
    alert("Redirecting to payment system.");
}

function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

function initializeMap() {
    const mapElement = document.getElementById("map");

    if (!mapElement || typeof L === "undefined") {
        return;
    }

    const map = L.map("map").setView([40.6936, -89.5888], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([40.6936, -89.5888]).addTo(map)
        .bindPopup("MonoMuse Museum<br>222 SW Washington St<br>Peoria, IL 61602")
        .openPopup();
}

document.addEventListener("DOMContentLoaded", initializeMap);