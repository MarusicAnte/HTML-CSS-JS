// Referenciranje elemenata iz HTML-a
const papir = document.getElementById("paper");
const skare = document.getElementById("scissors");
const kamen = document.getElementById("rock");
const button = document.getElementById("play");
const rezultatHTML = document.getElementById("result");

// Varijable za score i trenutan odabir
let pobjede = 0;
let gubitci = 0;
let izjedancenja = 0;
let trenutanOdabir = "";

// Dodavanje slušača na elemente i poziva funkcije onClicked
papir.addEventListener("click", () => onChoice("papir"));
skare.addEventListener("click", () => onChoice("skare"));
kamen.addEventListener("click", () => onChoice("kamen"));
button.addEventListener("click", () => onButtonClicked());

// Funkcija koja se poziva kada odaberemo predmet
function onChoice(odabir) {
    trenutanOdabir = odabir;
    // Preinaka CSS-a za klasu .shapeactive
    papir.classList.remove("shapeactive");
    skare.classList.remove("shapeactive");
    kamen.classList.remove("shapeactive");
    switch (odabir) {
        case "papir":
            papir.classList.add("shapeactive");
            break;
        case "skare":
            skare.classList.add("shapeactive");
            break;
        case "kamen":
            kamen.classList.add("shapeactive");
    }
}
// Funkcija koja dalje obrađuje ono što smo kliknuli
function onButtonClicked() {
    if (trenutanOdabir === "") {
        const ishodHTML = rezultatHTML.children[1];
        ishodHTML.innerHTML = "Nije ništa odabrano!";
        return;
    }
    const predmeti = ["papir", "skare", "kamen"];
    const broj = Math.floor(Math.random() * 3);
    const randomPredmet = predmeti[broj];

    if (trenutanOdabir === randomPredmet) {
        dovrsiIgru("izjednacenje", randomPredmet);
    }
    else if (trenutanOdabir === "papir" && randomPredmet === "kamen"
        || trenutanOdabir === "skare" && randomPredmet === "papir"
        || trenutanOdabir === "kamen" && randomPredmet === "skare") {
        dovrsiIgru("pobjeda", randomPredmet);
    }
    else {
        dovrsiIgru("gubitak", randomPredmet);
    }
}

// Funkcija koja prikazuje rezultat igre na ekranu
function dovrsiIgru(ishod, protivnik) {
    // Ažuriranje score-a te formatiranje rezultata koji će se prikazati korisniku na ekranu
    let prikazaniIshod;
    switch (ishod) {
        case "pobjeda":
            pobjede++;
            prikazaniIshod = "Pobjeda!"
            break;
        case "gubitak":
            gubitci++;
            prikazaniIshod = "Izgubili ste!"
            break;
        case "izjednacenje":
            izjedancenja++;
            prikazaniIshod = "Izjednačeno!"
            break;
    }
    let prikazaniProtivnik;
    switch (protivnik) {
        case "papir":
            prikazaniProtivnik = "Papir"
            break;
        case "skare":
            prikazaniProtivnik = "Škare"
            break;
        case "kamen":
            prikazaniProtivnik = "Kamen"
            break;
    }
    // Uzimanje elemenata iz HTML-a u koje će se spremati rezultati
    const protivnikHTML = rezultatHTML.children[0];
    const ishodHTML = rezultatHTML.children[1];
    const scoreHTML = rezultatHTML.children[2];
    protivnikHTML.innerHTML = "Igrate protiv: " + prikazaniProtivnik;
    ishodHTML.innerHTML = prikazaniIshod;
    scoreHTML.innerHTML = "Pobjede: " + pobjede + " Porazi: " + gubitci + " Izjednačenja: " + izjedancenja;
    console.log(rezultatHTML.children);
}