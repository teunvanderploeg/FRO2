const uitvoer = document.getElementById("boeken");
const xhr = new XMLHttpRequest();

//checkbox pakken taal filter
const taalKeuze = document.querySelectorAll('.besturing__cb-taal');

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let resultaat = JSON.parse(xhr.responseText);
    boeken.filteren(resultaat);
    boeken.uitvoeren();
  }
};
xhr.open("GET", "boeken.json", true);
xhr.send();

const boeken = {

  taalFilter: ['Engels', 'Duits', 'Nederlands'],

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

  // eigenschap data aangemaakt regel 7
  uitvoeren() {
    let html = "";
    this.data.forEach((boek) => {
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
      html += `<h3 class="boek__kopje">${CompleteTitel}</h3>`;
      html += `<p class="boek__auteurs">${auteurs}</p>`;
      html += `<span class="boek__uitgave">${this.datumOmzetten(boek.uitgave)}</span>`;
      html += `<span class="boek__ean">Ean: ${boek.ean}</span>`;
      html += `<span class="boek__paginas">${boek.paginas} Pagina's</span>`;
      html += `<span class="boek__taal">${boek.taal}</span>`;
      html += `<div class="boek__prijs"> ${boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'})}</div>`;
      html += `</section>`;
    });
    uitvoer.innerHTML = html;
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

taalKeuze.forEach(cb => cb.addEventListener('change', pasFilterAan));
