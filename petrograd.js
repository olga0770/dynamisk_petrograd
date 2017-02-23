window.addEventListener("load", sidenVises);

function sidenVises() {
console.log("siden vises");

//læs produktliste
$.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
}

function visProduktListe( listen ){
console.table( listen );
listen.forEach( visProdukt );
}


function visProdukt( produkt ) {
    console.log( produkt );

    //klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);


    //indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil( produkt.pris - (produkt.pris*produkt.rabatsats/100) );
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/img/petroimgs/imgs/small/" + produkt.billede + "-sm.jpg";

    if( produkt.udsolgt == false ){
    //produktet er ikke udsolgt
    //udsolgttekst skal fjernes
    var udsolgttekst = klon.querySelector(".udsolgttekst");
    udsolgttekst.parentNode.removeChild( udsolgttekst );
    } else {
    klon.querySelector(".pris").classList.add("udsolgt");
    }


    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
    }






//$.getJSON("petrograd.json", jegHarFåetData);
//
//function jegHarFåetData(retter){
//    console.log(data)
//
//
//}
//
//
//
//
//
//
// function dataErHentet(data){
// //console.log(data.personer[1].fornavn);
// //2. hent data for enkelt person
// data.personer.forEach(visPerson);
// }
// function visPerson(person){
// //3. klon template så der kan indsættes data
// var klon = document.querySelector("#personinfo_template").content.cloneNode(true);
//
// //4. hvilke data skal med?
// klon.querySelector(".data_fornavn").textContent = person.fornavn;
// klon.querySelector(".data_efternavn").textContent = person.efternavn;
//
// //sæt tekst ind i modal boks
//klon.querySelector(".data_navn").textContent = person.email;
//klon.querySelector(".data_beskrivelse").textContent = person.alder;
//klon.querySelector(".data_udsolgtstatus").textContent = person.hobby;
//klon.querySelector(".data_rabatpris").textContent = person.civilStatus;
//klon.querySelector(".data_vegetaregnethed").textContent = person.job;
//
//
// //find modal-boks sæt id
// klon.querySelector(".modal").id="myModal"+person.id;
// klon.querySelector("button.modalknap").dataset.target = "#myModal"+person.id;
// console.log(person.id);
// //5. tilføj html fra template til DOM
// document.querySelector(".persondata").appendChild(klon);
//
//}


