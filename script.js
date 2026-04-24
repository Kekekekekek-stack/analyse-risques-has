const risques = {
    "Nucléaire": ["Incident technique", "Exposition potentielle", "Défaut de procédure"],
    "Environnemental": ["Inondation", "Incendie", "Pollution", "Tempête"],
    "Psycho-sociaux": ["Stress", "Burn-out", "Conflit", "Isolement"],
    "Humain": ["Fugue", "Violence physique", "Violence verbale", "Auto-agressivité"]
};

const protocoles = {
    "Fugue": "Protocole HAS : conduite à tenir en cas de fugue",
    "Violence physique": "Protocole HAS : prévention et gestion de la violence",
    "Violence verbale": "Protocole HAS : désescalade verbale",
    "Auto-agressivité": "Protocole HAS : prévention du risque suicidaire",
    "Incident technique": "Procédure interne de sécurité nucléaire",
    "Exposition potentielle": "Protocole HAS : exposition accidentelle",
    "Défaut de procédure": "Audit interne + formation",
    "Inondation": "Plan de gestion des risques environnementaux",
    "Incendie": "Protocole incendie + évacuation",
    "Pollution": "Protocole environnemental HAS",
    "Tempête": "Plan de continuité d'activité",
    "Stress": "Prévention RPS – HAS",
    "Burn-out": "Suivi psychologique + aménagement",
    "Conflit": "Médiation + protocole RPS",
    "Isolement": "Surveillance renforcée + protocole RPS"
};

let historique = JSON.parse(localStorage.getItem("frequences") || "{}");

function goToPage2() {
    if (!professionnel.value) return alert("Choisir un professionnel");
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
}

function goToPage3() {
    if (!risqueType.value) return alert("Choisir un type de risque");
    page2.classList.add("hidden");

    if (risqueType.value === "Humain") {
        page3.classList.remove("hidden");
    } else {
        goToPage4();
    }
}

function goToPage4() {
    if (risqueType.value === "Humain" && !jeune.value)
        return alert("Choisir un jeune");

    page3.classList.add("hidden");
    page4.classList.remove("hidden");

    checkboxContainer.innerHTML = "";
    risques[risqueType.value].forEach(r => {
        checkboxContainer.innerHTML += `
            <label><input type="checkbox" value="${r}"> ${r}</label><br>
        `;
    });
}

function generateTable() {
    const pro = professionnel.value;
    const type = risqueType.value;
    const j = type === "Humain" ? jeune.value : "-";

    const checked = [...document.querySelectorAll("#checkboxContainer input:checked")].map(c => c.value);
    if (checked.length === 0) return alert("Sélectionner au moins un sous-risque");

    const tbody = document.querySelector("#resultTable tbody");
    tbody.innerHTML = "";

    checked.forEach(r => {
        historique[r] = (historique[r] || 0) + 1;
        localStorage.setItem("frequences", JSON.stringify(historique));

        const freq = historique[r];
        const action = freq >= 3
            ? "⚠️ Alerte : formation / sensibilisation nécessaire"
            : "Surveillance";

        tbody.innerHTML += `
            <tr>
                <td>${pro}</td>
                <td>${type}</td>
                <td>${j}</td>
                <td>${r}</td>
                <td>${protocoles[r]}</td>
                <td>${freq}</td>
                <td>${action}</td>
            </tr>
        `;
    });

    page4.classList.add("hidden");
    page5.classList.remove("hidden");
}
