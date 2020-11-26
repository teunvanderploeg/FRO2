const uitvoer = document.getElementById("boeken");
const xhr = new XMLHttpRequest();

//checkbox pakken taal filter
const taalKeuze = document.querySelectorAll('.besturing__cb-taal');
const keuzenSort = document.querySelector('.besturing__select');

const aantalInWinkelWagen = document.querySelector('.ww__aantal');

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let resultaat = JSON.parse(xhr.responseText);
    boeken.filteren(resultaat);
    boeken.uitvoeren();
  }
};
xhr.open("GET", "boeken.json", true);
xhr.send();

//Onze ww object
//     met properties: bestelde_boeken
//     en methods: boekToevoegen, dataOphalen, uitvoeren

const ww = {
  bestelling: [],
  
    boekToevoegen(obj){
      let gevonden = this.bestelling.filter( b => b.ean == obj.ean);
      if (gevonden.length == 0){
        
        obj.besteldAantal++;
        ww.bestelling.push(obj);
      }
      else{
        gevonden[0].besteldAantal++;
      }
      
      
      localStorage.wwBestelling = JSON.stringify(this.bestelling);
      this.uitvoeren();
    },

  dataOphalen(){
    // data uit Local Storage halen
    if(localStorage.wwBestelling){
    this.bestelling = JSON.parse(localStorage.wwBestelling);
    }
    this.uitvoeren();
  },
  uitvoeren(){

    let html = `<table>`;
    let totaal = 0;
    let totaalbesteld = 0;
    this.bestelling.forEach( boekje =>{
      let CompleteTitel = "";
      if (boekje.voortitel) {
        CompleteTitel += boekje.voortitel + " ";
      }
      CompleteTitel += boekje.titel;

      html += `<tr>`;
      html += `<td><img class="bestelformulier__cover" src="${boekje.cover}" alt="${CompleteTitel}"></td>`;
      html += `<td>${CompleteTitel}</td>`;
      html += `<td class="bestelformulier__aantal">
      <i class="fas fa-arrow-left bestelformulier__verlaag" data-role="${boekje.ean}"></i>
      ${boekje.besteldAantal}
      <i class="fas fa-arrow-right bestelformulier__verhoog" data-role="${boekje.ean}"></i>
      </td>`;
      html += `<td>${boekje.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'})}</td>`;
      html += `<td><i class="fas fa-trash-alt bestelformulier__trash" data-rol="${boekje.ean}"></i></td>`;
      html += `</tr>`;
      totaal += boekje.prijs * boekje.besteldAantal;
      totaalbesteld += boekje.besteldAantal;
    })
    html += `<tr><td colspan="3">Totaal:</td><td>${totaal.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'})}</td></tr>`;
    html += `</table>`;
    document.getElementById('uitvoer').innerHTML = html;
    aantalInWinkelWagen.innerHTML = totaalbesteld;
    this.trashActiveren()
    this.hogerLagerActiveren();
  },
  hogerLagerActiveren(){
    let hogerknoppen = document.querySelectorAll('.bestelformulier__verhoog')
    hogerknoppen.forEach(knop => {
      knop.addEventListener('click', e =>{
        let ophoogID = e.target.getAttribute('data-role');
        let opTeHogenBoek = this.bestelling.filter(boek => boek.ean == ophoogID);
        if(opTeHogenBoek[0].besteldAantal >= 10000){

        }else{
          opTeHogenBoek[0].besteldAantal ++;
        }
        
        localStorage.wwBestelling = JSON.stringify(this.bestelling);
        this.uitvoeren();
      })
    })

    //verlaag knop
    let lagerknoppen = document.querySelectorAll('.bestelformulier__verlaag')
    lagerknoppen.forEach(knop => {
      knop.addEventListener('click', e =>{
        let verlaagID = e.target.getAttribute('data-role');
        let teVerLagenAantal = this.bestelling.filter(boek => boek.ean == verlaagID);
        if(teVerLagenAantal[0].besteldAantal > 1){
          teVerLagenAantal[0].besteldAantal --;
        }else{
          //boek verwijderen
          this.bestelling = this.bestelling.filter( bk => bk.ean != verlaagID);
        }
        localStorage.wwBestelling = JSON.stringify(this.bestelling);
        this.uitvoeren();
      })
    })
  },
  trashActiveren() {
    document.querySelectorAll('.bestelformulier__trash').forEach(trash =>{
      trash.addEventListener('click', e => {
        let teVerwijderenBoekID = e.target.getAttribute('data-rol');
        this.bestelling = this.bestelling.filter( bk => bk.ean != teVerwijderenBoekID);
        // localstorage bijwerken
        localStorage.wwBestelling = JSON.stringify(this.bestelling);
        this.uitvoeren();
      })
    })
  }

}

// data uit Local Storage halen
ww.dataOphalen();


//Onze boeken object
//     met properties: taalFilter, data, eigenshapSort
//     en methods: filteren, sorteren, uitvoeren
const boeken = {

  taalFilter: ['Engels', 'Duits', 'Nederlands'],
  eigenshapSort: 'titel', //sorteereigenschap
  oplopend: 1, //Volgorde van sorteren

  //filteren van de taal
  filteren(gegevens){
    // this.data = gegevens.filter((bk)=> {return bk.taal == this.taalFilter});
    this.data = gegevens.filter((bk)=>{
      let bool = false;
      this.taalFilter.forEach( (taal) => {
        if(bk.taal == taal) {bool = true}
      } )
      return bool;
    })
  },

  //Sorteerfunctie voor de boeken
  sorteren(){
    if(this.eigenshapSort == 'titel'){
      this.data.sort( (a,b) => (a.titel.toUpperCase() > b.titel.toUpperCase() ) ? this.oplopend : -1*this.oplopend);
    }
    else if(this.eigenshapSort == 'paginas Laag->hoog'){
      this.data.sort( (a,b) => (a.paginas > b.paginas ) ? this.oplopend : -1*this.oplopend);
    }
    else if(this.eigenshapSort == 'prijsLaag'){
      this.data.sort( (a,b) => (a.prijs > b.prijs ) ? 1 : -1);
    }
    else if(this.eigenshapSort == 'prijsHoog'){
      this.data.sort( (a,b) => (a.prijs > b.prijs ) ? -1 : 1);
    }
    else if(this.eigenshapSort == 'uitgave'){
      this.data.sort( (a,b) => (a.uitgave > b.uitgave ) ? this.oplopend : -1*this.oplopend);
    }
    else if(this.eigenshapSort == 'auteurs'){
      this.data.sort( (a,b) => (a.auteurs[0].achternaam > b.auteurs[0].achternaam ) ? this.oplopend : -1*this.oplopend);
    }
    
  },

  // eigenschap data aangemaakt regel 7
  uitvoeren() {
    //sorteren
    this.sorteren();
    //uitvoeren
    let html = "";
    this.data.forEach((boek) => {

      // boek eigenschap aantal bestelde boeken
      boek.besteldAantal = 0;

      let CompleteTitel = "";
      if (boek.voortitel) {
        CompleteTitel += boek.voortitel + " ";
      }
      CompleteTitel += boek.titel;

      //lijst met auteurs gaan maken
      let auteurs = "";
      boek.auteurs.forEach((writer, i) => {
        let tussenv = writer.tussenvoegsel ? writer.tussenvoegsel + " ": "";
        let schijdingteken = ", ";
        if (i >= boek.auteurs.length-2){ schijdingteken = " en "; }
        if (i >= boek.auteurs.length-1){ schijdingteken = ""; }
        auteurs += writer.voornaam + " "+ tussenv + writer.achternaam + schijdingteken;
      });

      //html var toevoegen
      html += `<section class="boek">`;
      html += `<img class="boek__cover" src="${boek.cover}" alt="${CompleteTitel}"></img>`;
      html += `<div class="boek__info">`
      html += `<h3 class="boek__kopje">${CompleteTitel}</h3>`;
      html += `<p class="boek__auteurs">${auteurs}</p>`;
      html += `<span class="boek__uitgave">${this.datumOmzetten(boek.uitgave)}</span>`;
      html += `<span class="boek__ean">Ean: ${boek.ean}</span>`;
      html += `<span class="boek__paginas">${boek.paginas} Pagina's</span>`;
      html += `<span class="boek__taal">${boek.taal}</span>`;
      html += `<div class="boek__prijs"> ${boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'})}`;
      html += `<a href="#" class="boek__bestel-knop" data-role="${boek.ean}">bestellen</a></div>`;
      html += `</div>`;
      html += `</section>`;
    });
    uitvoer.innerHTML = html;
    // de gemaakte knoppen voorzien van eventlistener
    document.querySelectorAll('.boek__bestel-knop').forEach( knop => {
      knop.addEventListener('click', e => {
        e.preventDefault();
        let boekID = e.target.getAttribute('data-role');
        console.log(boekID);
        let gekliktBoek = this.data.filter(b => b.ean == boekID);
        ww.boekToevoegen(gekliktBoek[0]);
      })
    });
  },
  datumOmzetten(datumString){
    let datum = new Date(datumString);
    let jaar = datum.getFullYear();
    let maand = this.maakMaandNaam(datum.getMonth());
    return `${maand} ${jaar}`;
  },
  maakMaandNaam(m){
    let maand = "";
    switch (m){
      case 0 : maand = "Januari"; break;
      case 1 : maand = "Februari"; break;
      case 2 : maand = "Maart"; break;
      case 3 : maand = "April"; break;
      case 4 : maand = "Mei"; break;
      case 5 : maand = "Juni"; break;
      case 6 : maand = "Juli"; break;
      case 7 : maand = "Augustus"; break;
      case 8 : maand = "September"; break;
      case 9 : maand = "Oktober"; break;
      case 10 : maand = "November"; break;
      case 11 : maand = "December"; break;
      default: maand = m;
    }
    return maand;
  }

};

const pasFilterAan = () =>{
  let gecheckteTaalKeuze = [];

  taalKeuze.forEach(cb => {
    if(cb.checked) gecheckteTaalKeuze.push(cb.value);
  });
  boeken.taalFilter = gecheckteTaalKeuze;
  boeken.filteren(JSON.parse(xhr.responseText))
  boeken.uitvoeren();
}

const veranderSortEigenschap = () =>{
  boeken.eigenshapSort = keuzenSort.value;
  boeken.uitvoeren();
}

taalKeuze.forEach(cb => cb.addEventListener('change', pasFilterAan));

keuzenSort.addEventListener('change', veranderSortEigenschap);

document.querySelectorAll('.besturing__rb').forEach( rb => rb.addEventListener('change', () =>{
  if (rb.value == 1 || rb.value == -1){
    boeken.oplopend = rb.value;
    boeken.uitvoeren();
  }
  
}))