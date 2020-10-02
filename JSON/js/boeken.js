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
      html += `<h3> ${CompleteTitel} </h3>`;
      html += `</section>`;
    });
    uitvoer.innerHTML = html;
  },
};
