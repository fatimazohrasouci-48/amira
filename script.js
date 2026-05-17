/* =========================
   PRESTAMOS
========================= */

function calculateLoan(){

  const object =
    document.getElementById("object").value;

  const capital =
    parseFloat(document.getElementById("capital").value);

  const months =
    parseInt(document.getElementById("months").value);

  const annualInterest =
    parseFloat(document.getElementById("bankSelect").value);


  if(isNaN(capital) || isNaN(months)){

    alert("Introduce valores válidos");

    return;

  }


  const monthlyInterest =
    annualInterest / 100 / 12;


  const payment =
    (capital * monthlyInterest) /
    (1 - Math.pow(1 + monthlyInterest, -months));


  const totalPayment =
    payment * months;


  const totalInterest =
    totalPayment - capital;


  document.getElementById("monthlyPayment").innerHTML =
    "€" + payment.toFixed(2);

  document.getElementById("totalInterest").innerHTML =
    "€" + totalInterest.toFixed(2);

  document.getElementById("loanExplanation").innerHTML =

  `
  El préstamo para ${object}
  tendrá una cuota mensual de
  €${payment.toFixed(2)} durante
  ${months} meses.
  `;

}



/* =========================
   VAN / TIR
========================= */

function calculateInvestment(){

  const investment =
    parseFloat(document.getElementById("investment").value);

  const cashflow =
    parseFloat(document.getElementById("cashflow").value);

  const discount =
    parseFloat(document.getElementById("discount").value) / 100;


  const van =
    (cashflow / (1 + discount)) - investment;


  const tir =
    ((cashflow - investment) / investment) * 100;


  document.getElementById("vanResult").innerHTML =
    "€" + van.toFixed(2);

  document.getElementById("tirResult").innerHTML =
    tir.toFixed(2) + "%";

}



/* =========================
   MARGENES
========================= */

function calculateMargin(){

  const income =
    parseFloat(document.getElementById("income").value);

  const expenses =
    parseFloat(document.getElementById("expenses").value);


  const profit =
    income - expenses;


  const margin =
    (profit / income) * 100;


  document.getElementById("profitResult").innerHTML =
    "€" + profit.toFixed(2);

  document.getElementById("marginResult").innerHTML =
    margin.toFixed(2) + "%";

}



/* =========================
   DARK MODE
========================= */

function toggleDarkMode(){

  document.body.classList.toggle("dark");

}



/* =========================
   IDIOMAS
========================= */

const translations = {

  es:{

    nav1:"Inicio",
    nav2:"Préstamos",
    nav3:"VAN / TIR",
    nav4:"Márgenes",
    nav5:"Contacto",

    heroTitle:
    "Plataforma Financiera Inteligente",

    heroText:
    "Calcula préstamos, compara bancos y analiza inversiones.",

    heroBtn:
    "Comenzar"

  },


  en:{

    nav1:"Home",
    nav2:"Loans",
    nav3:"NPV / IRR",
    nav4:"Margins",
    nav5:"Contact",

    heroTitle:
    "Smart Financial Platform",

    heroText:
    "Calculate loans, compare banks and analyze investments.",

    heroBtn:
    "Start"

  },


  fr:{

    nav1:"Accueil",
    nav2:"Prêts",
    nav3:"VAN / TIR",
    nav4:"Marges",
    nav5:"Contact",

    heroTitle:
    "Plateforme Financière Intelligente",

    heroText:
    "Calculez des prêts, comparez les banques et analysez les investissements.",

    heroBtn:
    "Commencer"

  },


  ar:{

    nav1:"الرئيسية",
    nav2:"القروض",
    nav3:"فان / تير",
    nav4:"الهوامش",
    nav5:"اتصل بنا",

    heroTitle:
    "منصة مالية ذكية",

    heroText:
    "احسب القروض وقارن البنوك وحلل الاستثمارات.",

    heroBtn:
    "ابدأ"

  }

};



function changeLanguage(lang){

  const t = translations[lang];


  document.getElementById("nav1").innerHTML =
    t.nav1;

  document.getElementById("nav2").innerHTML =
    t.nav2;

  document.getElementById("nav3").innerHTML =
    t.nav3;

  document.getElementById("nav4").innerHTML =
    t.nav4;

  document.getElementById("nav5").innerHTML =
    t.nav5;


  /* HERO */

  document.getElementById("hero-title").innerHTML =
    t.heroTitle;

  document.getElementById("hero-text").innerHTML =
    t.heroText;

  document.getElementById("hero-btn").innerHTML =
    t.heroBtn;

}



/* =========================
   NOVEDADES
========================= */

const noticias = [

  {

    categoria:
      "FINANZAS",

    titulo:
      "Nuevas oportunidades de inversión",

    texto:
      "Expertos financieros recomiendan nuevas estrategias.",

    imagen:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1400"

  },

  {

    categoria:
      "BANCOS",

    titulo:
      "Los bancos reducen intereses",

    texto:
      "BBVA e ING anuncian cambios importantes.",

    imagen:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400"

  },

  {

    categoria:
      "LOGÍSTICA",

    titulo:
      "Nuevas soluciones para transporte",

    texto:
      "Las empresas apuestan por la digitalización logística.",

    imagen:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1400"

  }

];


const newsContainer =
document.getElementById("newsContainer");


function mostrarNoticias(){

  if(!newsContainer) return;

  noticias.forEach(function(noticia){

    newsContainer.innerHTML +=

    `
    <div class="news-card">

      <img src="${noticia.imagen}">

      <div class="news-overlay">

        <span class="news-category">

          ${noticia.categoria}

        </span>

        <h3>

          ${noticia.titulo}

        </h3>

        <p>

          ${noticia.texto}

        </p>

      </div>

    </div>
    `;

  });

}


mostrarNoticias();
/* =========================
   COMPARE BANKS
========================= */

function compareBank(bank, rate){

  alert(

    "Banco: " + bank +

    "\nTasa de interés: " + rate +

    "\nComparación disponible."

  );

}
/* =========================
   ALERT AUTO HIDE
========================= */

setTimeout(function(){

  const alertBox =
    document.getElementById("alertBox");

  if(alertBox){

    alertBox.style.display = "none";

  }

}, 5000);
/* =========================
   DOWNLOAD PDF
========================= */

async function downloadPDF(){

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();


  const monthly =
    document.getElementById("monthlyPayment").innerText;

  const interest =
    document.getElementById("totalInterest").innerText;


  doc.setFontSize(22);

  doc.text(
    "FINANCE PRO REPORT",
    20,
    30
  );


  doc.setFontSize(16);

  doc.text(
    "Cuota Mensual: " + monthly,
    20,
    60
  );


  doc.text(
    "Intereses Totales: " + interest,
    20,
    80
  );


  doc.save("finance-report.pdf");

}