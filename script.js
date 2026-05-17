/* DARK MODE */

function toggleDarkMode(){

  document.body.classList.toggle("dark");

}


/* SEARCH */

function searchSection(){

  const input =

    document.getElementById("searchInput")
    .value
    .toLowerCase();


  if(input.includes("prest")){

    window.location.href = "#prestamos";

  }

  else{

    alert("Sección no encontrada");

  }

}


/* IDIOMAS */

const translations = {

  es:{

    nav1:"Inicio",
    nav2:"Préstamos",
    nav3:"VAN / TIR",
    nav4:"Márgenes",
    nav5:"Contacto"

  },

  en:{

    nav1:"Home",
    nav2:"Loans",
    nav3:"NPV / IRR",
    nav4:"Margins",
    nav5:"Contact"

  },

  fr:{

    nav1:"Accueil",
    nav2:"Prêts",
    nav3:"VAN / TIR",
    nav4:"Marges",
    nav5:"Contact"

  },

  ar:{

    nav1:"الرئيسية",
    nav2:"القروض",
    nav3:"فان / تير",
    nav4:"الهوامش",
    nav5:"اتصل"

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

}


/* PRESTAMOS */

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

}


/* PDF */

async function downloadPDF(){

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();


  const monthly =

    document.getElementById("monthlyPayment")
    .innerText;


  const interest =

    document.getElementById("totalInterest")
    .innerText;


  doc.text(
    "Finance Pro Report",
    20,
    30
  );


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


/* FAQ */

const faqQuestions =

document.querySelectorAll(".faq-question");


faqQuestions.forEach(function(question){

  question.addEventListener("click", function(){

    const faqItem =
      this.parentElement;

    faqItem.classList.toggle("active");

  });

});