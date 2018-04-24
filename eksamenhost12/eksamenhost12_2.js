//@ts-check
function setup() {
    let inpOvelse = document.getElementById("ovelse");
    let inpDeltaker = document.getElementById("deltaker");
    let inpPoeng = document.getElementById("poeng");

    let btnOvelse = document.getElementById("regOvelse");
    let btnDeltaker = document.getElementById("regDeltaker");
    let btnRegPoeng = document.getElementById("regPoeng");
    let btnBesteDeltaker = document.getElementById("finnBeste");

    let spnOvelserRegistrert = document.getElementById("ovelserRegistrert");
    let spnDeltakereRegistrert = document.getElementById("deltakereRegistrert");
    let spnBesteSvar = document.getElementById("besteSvar");

    let divRegistrering = document.getElementById("registrering");
    let divSelect = document.getElementById("select");

    btnOvelse.addEventListener("click", regOvelse);
    btnDeltaker.addEventListener("click", regDeltaker);
    btnRegPoeng.addEventListener("click", registrerPoeng);
    btnBesteDeltaker.addEventListener("click", besteDeltaker);

    let ovelseArray = ["sykling", "kasting", "aking"];
    function regOvelse() {
        if (ovelseArray.length === 3) {
            inpOvelse.value = "maks grense nådd";
            return;
        }
        let ovelse = inpOvelse.value;
        if (ovelse === "") {
            inpOvelse.value = "skriv en øvelse";
            return;
        }
        ovelseArray.push(ovelse);
        spnOvelserRegistrert.innerHTML = `${ovelseArray.length} registrert`;
        if (ovelseArray.length === 3 && deltakerArray.length === 6) {
            visPoengRegistrering();
        }
    }

    let deltakerArray = ["Bendik", "Roger", "Kasper", "Kenneth", "Lars"];
    function regDeltaker() {
        if (deltakerArray.length === 6) {
            inpDeltaker.value = "maks grense nådd";
            return;
        }
        let deltaker = inpDeltaker.value;
        if (deltaker === "") {
            inpDeltaker.value = "skriv et navn";
            return;
        }
        deltakerArray.push(deltaker);
        spnDeltakereRegistrert.innerHTML = `${deltakerArray.length} registrert`
        if (ovelseArray.length === 3 && deltakerArray.length === 6) {
            visPoengRegistrering();
        }
    }

    let deltakerSelect = `<select id="selectDeltaker">`;
    let ovelseSelect = `<select id="selectOvelse">`;
    function visPoengRegistrering() {
        for (let d of deltakerArray) {
            deltakerSelect += `<option value="${d}">${d}</option>`;
        }
        for (let o of ovelseArray) {
            ovelseSelect += `<option value="${o}">${o}</option>`;
        }
        deltakerSelect += `</select>`;
        ovelseSelect += `</select>`;
        divSelect.innerHTML = "" + deltakerSelect + ovelseSelect + "";
        divRegistrering.style.display = "inline";
    }
    let qwer = document.getElementById("qwer");
    let qwerty = document.getElementById("qwerty");
    qwerty.addEventListener("click", registrerPoeng);
    let deltaker1 = {};
    let deltaker2 = {};
    let deltaker3 = {};
    let deltaker4 = {};
    let deltaker5 = {};
    let deltaker6 = {};
    let array = [deltaker1, deltaker2, deltaker3, deltaker4, deltaker5, deltaker6];

    let selectOvelse;
    let selectDeltaker;
    let ovelse1 = "";
    let ovelse2 = "";
    let ovelse3 = "";
    let ovelse1t = false;
    let ovelse2t = false;
    let ovelse3t = false;
    function registrerPoeng() {
        selectOvelse = document.getElementById("selectOvelse");
        selectDeltaker = document.getElementById("selectDeltaker");
        let person = selectDeltaker.value;
        let aktivitet = selectOvelse.value;
        if (aktivitet !== ovelse1 && !ovelse1t) {
            ovelse1 = aktivitet;
            ovelse1t = true;
        } else if (aktivitet !== ovelse2 && aktivitet !== ovelse1 && !ovelse2t) {
            ovelse2 = aktivitet;
            ovelse2t = true;
        } else if (aktivitet !== ovelse3 && aktivitet !== ovelse2 && aktivitet !== ovelse1 && !ovelse3t) {
            ovelse3 = aktivitet;
            ovelse3t = true;
        }
        let poeng = inpPoeng.valueAsNumber;

        for (let i = 0; i < array.length; i++) {
            if (!array[i].navn) {
                array[i].navn = deltakerArray[i];
            }
        }
        let idx = array.findIndex(e => e.navn === `${person}`);
        array[idx].navn = person;
        array[idx][aktivitet] = poeng;
    }
    let arraySum = [];
    let divSoyle1 = document.getElementById("soyle1");
    let divSoyle2 = document.getElementById("soyle2");
    let divSoyle3 = document.getElementById("soyle3");
    let divSoyle4 = document.getElementById("soyle4");
    let divSoyle5 = document.getElementById("soyle5");
    let divSoyle6 = document.getElementById("soyle6");
    function besteDeltaker() {
        for (let i = 0; i < array.length; i++) {
            array[i].sum = array[i][ovelse1] || 0 + array[i][ovelse2] || 0 + array[i][ovelse3] || 0;
            arraySum.push(array[i].sum);
        }
        let copyArraySum = arraySum.slice(0);
        copyArraySum.sort((x, y) => (x - y));
        let idx1 = arraySum.indexOf(copyArraySum[5]);
        let idx2 = arraySum.indexOf(copyArraySum[4]);

        spnBesteSvar.innerHTML = `De to beste deltakerne er:
        ${array[idx1].navn} og ${array[idx2].navn}`;

        divSoyle1.style.width = `${array[0].sum}px`;
        divSoyle2.style.width = `${array[1].sum}px`;
        divSoyle3.style.width = `${array[2].sum}px`;
        divSoyle4.style.width = `${array[3].sum}px`;
        divSoyle5.style.width = `${array[4].sum}px`;
        divSoyle6.style.width = `${array[5].sum}px`;
    }
}