const uitvoer = document.getElementById("boeken");
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let resultaat = JSON.parse(xhr.responseText);
    boeken.data = resultaat;
    boeken.uitvoeren();
  }
};
xhr.open("GET", "boeken.json", true);
xhr.send();

const boeken = {
  // eigenschap data aangemaakt regel 7
  uitvoeren() {
    let html = "";
    this.data.forEach((boek) => {
      let CompleteTitel = "";
      if (boek.voortitel) {
        CompleteTitel += boek.voortitel + " ";
      }
      CompleteTitel += boek.titel;

      //html var toevoegen
      html += `<section class="boek">`;
      html += `<img class="boek__cover" src="${boek.cover}" alt="${CompleteTitel}"></img>`;
      html += `<h3 class="boek__kopje"> ${CompleteTitel} </h3>`;
      html += `<span class="boek__uitgave">${boek.uitgave}</span>`;
      html += `<span class="boek__ean">Ean: ${boek.ean}</span>`;
      html += `<span class="boek__paginas">${boek.paginas} Pagina's</span>`;
      html += `<span class="boek__taal">${boek.taal}</span>`;
      html += `<div class="boek__prijs">&euro; ${boek.prijs}</div>`;
      html += `</section>`;
    });
    uitvoer.innerHTML = html;
  },
};
