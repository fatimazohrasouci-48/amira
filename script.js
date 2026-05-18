/* =========================
   DARK MODE
========================= */

function toggleDarkMode(){

  document.body.classList.toggle("dark");

}


/* =========================
   SEARCH
========================= */

function searchSection(){

  const input =

    document.getElementById("searchInput")
    .value
    .toLowerCase();


  if(input.includes("prest")){

    window.location.href = "#prestamos";

  }

  else if(input.includes("van")){

    window.location.href = "#investment";

  }

  else if(input.includes("marg")){

    window.location.href = "#margenes";

  }

  else if(input.includes("contact")){

    window.location.href = "#contacto";

  }

  else{

    alert("Sección no encontrada");

  }

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
    "Calcula préstamos, compara bancos y analiza inversiones."

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
    "Calculate loans, compare banks and analyze investments."

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
    "Calculez des prêts et comparez les banques."

  },


  ar:{

    nav1:"الرئيسية",
    nav2:"القروض",
    nav3:"فان / تير",
    nav4:"الهوامش",
    nav5:"اتصل",

    heroTitle:
    "منصة مالية ذكية",

    heroText:
    "احسب القروض وقارن البنوك بسهولة."

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


  document.getElementById("hero-title").innerHTML =
    t.heroTitle;

  document.getElementById("hero-text").innerHTML =
    t.heroText;

}


/* =========================
   PRESTAMOS
========================= */

function calculateLoan(){

  const capital =

    parseFloat(
      document.getElementById("capital").value
    );

  const months =

    parseInt(
      document.getElementById("months").value
    );

  const annualInterest =

    parseFloat(
      document.getElementById("bankSelect").value
    );


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

    "La cuota mensual es de €" +
    payment.toFixed(2);

}


/* =========================
   VAN / TIR
========================= */

function calculateInvestment(){

  const investment = Number(
    document.getElementById("investment").value
  );

  const cashflow = Number(
    document.getElementById("cashflow").value
  );

  const discount = Number(
    document.getElementById("discount").value
  );


  const van =

    cashflow /

    (1 + discount / 100)

    - investment;


  const tir =

    ((cashflow - investment)

    / investment) * 100;


  document.getElementById("vanResult").innerHTML =

    "€" + van.toFixed(2);


  document.getElementById("tirResult").innerHTML =

    tir.toFixed(2) + "%";


  document.getElementById("investmentExplanation").innerHTML =

    "El proyecto tiene un VAN de €" +

    van.toFixed(2) +

    " y una TIR de " +

    tir.toFixed(2) + "%";

}

/* =========================
   MARGENES
========================= */

function calculateMargin(){

  const income =

    parseFloat(
      document.getElementById("income").value
    );

  const expenses =

    parseFloat(
      document.getElementById("expenses").value
    );


  const profit =
    income - expenses;


  const margin =
    (profit / income) * 100;


  document.getElementById("profitResult").innerHTML =

    "€" + profit.toFixed(2);


  document.getElementById("marginResult").innerHTML =

    margin.toFixed(2) + "%";

}


async function downloadPDF(){

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();


  const bank =

    document.getElementById("bankSelect")
    .options[
      document.getElementById("bankSelect")
      .selectedIndex
    ].text;


  const capital =

    document.getElementById("capital").value;


  const months =

    document.getElementById("months").value;


  const monthly =

    document.getElementById("monthlyPayment")
    .innerText;


  const interest =

    document.getElementById("totalInterest")
    .innerText;


  const now = new Date();


  /* =========================
     HEADER
  ========================= */

  doc.setFillColor(11,44,106);

  doc.rect(
    0,
    0,
    210,
    40,
    "F"
  );


  doc.setTextColor(255,255,255);

  doc.setFontSize(28);

  doc.text(
    "Finance Pro Report",
    20,
    25
  );


  /* =========================
     BODY
  ========================= */

  doc.setTextColor(0,0,0);

  doc.setFontSize(16);


  doc.setFillColor(239,246,255);

  doc.roundedRect(
    15,
    55,
    180,
    110,
    8,
    8,
    "F"
  );


  doc.text(
    "Banco: " + bank,
    25,
    75
  );


  doc.text(
    "Capital: €" + capital,
    25,
    95
  );


  doc.text(
    "Meses: " + months,
    25,
    115
  );


  doc.text(
    "Cuota Mensual: " + monthly,
    25,
    135
  );


  doc.text(
    "Intereses Totales: " + interest,
    25,
    155
  );


  /* =========================
     DATE
  ========================= */

  doc.setFontSize(13);

  doc.text(
    "Fecha: " +
    now.toLocaleDateString(),
    20,
    200
  );


  doc.text(
    "Hora: " +
    now.toLocaleTimeString(),
    20,
    210
  );


  /* =========================
     SIGNATURE
  ========================= */

  doc.text(
    "Firma:",
    20,
    250
  );


  doc.line(
    45,
    250,
    120,
    250
  );


  /* =========================
     FOOTER
  ========================= */

  doc.setFillColor(11,44,106);

  doc.rect(
    0,
    280,
    210,
    20,
    "F"
  );


  doc.setTextColor(255,255,255);

  doc.setFontSize(11);

  doc.text(
    "Finance Pro © 2026",
    75,
    292
  );


  doc.save("finance-pro-report.pdf");

}

/* =========================
   ALERT
========================= */

setTimeout(function(){

  document.getElementById("alertBox")
  .style.display = "none";

}, 6000);


/* =========================
   FAQ
========================= */

const faqQuestions =

document.querySelectorAll(".faq-question");


faqQuestions.forEach(function(question){

  question.addEventListener("click", function(){

    const faqItem =
      this.parentElement;

    faqItem.classList.toggle("active");

  });

});


/* =========================
   BANK COMPARE
========================= */

function compareBank(bank, rate){

  alert(
    bank + " ofrece una tasa de " + rate
  );

}


/* =========================
   NEWS
========================= */

const news = [

  {

    title:
    "Nueva Hipoteca Inteligente",

    text:
    "Los bancos ofrecen nuevas soluciones digitales.",

    image:
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1400"

  },


  {

    title:
    "Fintech y IA",

    text:
    "La inteligencia artificial transforma las finanzas.",

    image:
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1400"

  }

];


function mostrarNoticias(){

  const container =

    document.getElementById("newsContainer");


  news.forEach(function(item){

    container.innerHTML += `

      <div class="news-card">

        <img src="${item.image}">

        <div class="news-overlay">

          <span class="news-category">
            Finanzas
          </span>

          <h3>
            ${item.title}
          </h3>

          <p>
            ${item.text}
          </p>

        </div>

      </div>

    `;

  });

}


mostrarNoticias();
/* =========================
   CHART
========================= */

const ctx =

document.getElementById("financeChart");


new Chart(ctx, {

  type:'line',

  data:{

    labels:[
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio'
    ],

    datasets:[{

      label:'Ingresos',

      data:[
        1200,
        1900,
        3000,
        2500,
        4200,
        5000
      ],

      borderColor:'#2563eb',

      backgroundColor:
      'rgba(37,99,235,0.2)',

      tension:0.4,

      fill:true

    }]

  },

  options:{

    responsive:true

  }

});
function calculateInvestment(){

  const investment =

    parseFloat(
      document.getElementById("investment").value
    );

  const cashflow =

    parseFloat(
      document.getElementById("cashflow").value
    );

  const discount =

    parseFloat(
      document.getElementById("discount").value
    );


  if(

    isNaN(investment) ||

    isNaN(cashflow) ||

    isNaN(discount)

  ){

    alert(
      "Introduce todos los datos"
    );

    return;

  }


  /* =========================
     VAN
  ========================= */

  const van =

    cashflow /

    (1 + discount / 100)

    - investment;


  /* =========================
     TIR
  ========================= */

  const tir =

    ((cashflow - investment)

    / investment) * 100;


  document.getElementById("vanResult").innerHTML =

    "€" + van.toFixed(2);


  document.getElementById("tirResult").innerHTML =

    tir.toFixed(2) + "%";


  document.getElementById("investmentExplanation").innerHTML =

    "El proyecto tiene un VAN de €" +

    van.toFixed(2) +

    " y una TIR de " +

    tir.toFixed(2) + "%";

}