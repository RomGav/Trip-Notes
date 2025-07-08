//Consts and Lets
const select = document.querySelectorAll(`select`);
const value1 = document.querySelector(`#valueOne`);
const value2 = document.querySelector(`#valueTwo`);
const errorMessage = document.querySelector(`#errorMessage`)
const tripNotes = document.querySelector(`#tripNotes`);
const svBtn = document.querySelector(`#svBtn`);
const clearBtn = document.querySelector(`#clearBtn`);
const labelText = document.querySelector(`#labelText`);
const linkText = document.querySelector(`#linkText`);
const noteText = document.querySelector(`#noteText`);
const bottomBox = document.querySelector(`.bottomBox`);
const tempBtn = document.querySelector(`#tempBtn`)
const savedNote = document.querySelector(`.savedNote`);
const allSavedNotes = document.querySelectorAll(`.savedNote`);
const tempNote = document.querySelector(`.tempNote`);
const totalAmount = document.querySelector(`.totalAmount`);
const conversionLabel = document.querySelector(`#conversionLabel`);
const API_KEY = `e990c7feac36bda1a4a786d68737ed4e`;
// Extra API Keys
// `15436e4daf90d72b528f0278911bafd8`;
// `f53a013080c7ccd4e1169aa64a8d9a06`;
// `89dccda9487998421f44a28eaded2ae7`;
// `634798b90a6793362e192d25d9473190`;
// `f9ba900d9ea13678172bd1c94b7a3f46`;
// `b3aceca29d6f7010e13662e60bd889e7`;
const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;
let options = ``;

async function currency () {
    const res = await fetch(API_URL);
    const data = await res.json();

    const arrKeys = Object.keys(data.rates);
    const rates = data.rates;
    arrKeys.map(item => {
        return options += `<option value = ${item}>${item}</option>`
    });

    for(let i=0; i < select.length; i++) {
        select[i].innerHTML=options;
    };

    value1.addEventListener(`keyup`, () => {
        value2.value = Math.round(((value1.value * rates[select[1].value] / rates[select[0].value]) + Number.EPSILON) * 100) /100;
    });

    value2.addEventListener(`keyup`, () => {
        value1.value = Math.round((( value2.value * rates[select[0].value] / rates[select[1].value]) + Number.EPSILON) * 100) /100;
    });

    select[0].addEventListener(`change`, () => {
        value2.value = Math.round(((value1.value * rates[select[1].value] / rates[select[0].value]) + Number.EPSILON) * 100) /100;
    });

    select[1].addEventListener(`change`, () => {
        value2.value = Math.round(((value1.value * rates[select[1].value] / rates[select[0].value]) + Number.EPSILON) * 100) /100;
    });
};
x
currency ()

function clear () {
    value1.value = ``;
    value2.value = ``;
    labelText.value = ``;
    linkText.value = ``;
    noteText.value = ``;
};

tripNotes.addEventListener(`submit`, function(event) {
    event.preventDefault();

    if(!value1.value.trim() || !value2.value.trim()) {
        errorMessage.textContent = `Please enter values for both currencies`
    } else {
        errorMessage.textContent = ``;

        let label = labelText.value.trim()
        let link = linkText.value.trim();
        let note = noteText.value.trim();
        let selectedCurrency1 = select[0].value;
        let selectedCurrency2 =select[1].value;
        let value1Formatted = (value1.valueAsNumber).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2, style: "currency", currency: `${select[0].value}`});
        let value2Formatted = (value2.valueAsNumber).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2, style: "currency", currency: `${select[1].value}`});
        
        function updateConversion() {
            conversionLabel.innerHTML = `Conversion: ${value1Formatted} ${selectedCurrency1} = ${value2Formatted} ${selectedCurrency2}`;
        }

        function deletedConversion() {
            conversionLabel.innerHTML = `Deleted Conversion: ${value1Formatted} ${selectedCurrency1} = ${value2Formatted} ${selectedCurrency2}`;
        }

        updateConversion();

        let newNote = document.createElement(`div`);
        newNote.classList.add(`savedNote`);

        let newH2 = document.createElement(`h2`);
        newNote.appendChild(newH2);

        let newH3 = document.createElement(`h3`);
        newNote.appendChild(newH2);

        let newP = document.createElement(`p`);
        newNote.appendChild(newP);

        let delBtnContainer = document.createElement(`div`);
        delBtnContainer.classList.add(`closeBtn`);

        let delBtn = document.createElement(`button`);
        delBtn.textContent = `X`;
        delBtn.onclick = function () {
            newNote.remove();
            deletedConversion();
        };

        //tempNote.remove();

        delBtnContainer.appendChild(delBtn);
        newNote.appendChild(delBtnContainer);
        bottomBox.appendChild(newNote);

        if (!label) {
            if (!link) {
                if (!note) {
                    newH2.innerHTML = `No Label`;
                    newH2.style.marginBottom = `48px`;
                    newP.innerHTML = `${value1Formatted} ${selectedCurrency1}<br>=<br>${value2Formatted} ${selectedCurrency2}`;
                } else {
                    newH2.innerHTML = `No Label<br> <small>${note}</small>`;
                    newP.innerHTML = `${value1Formatted} ${selectedCurrency1}<br>=<br>${value2Formatted} ${selectedCurrency2}`;
                };
            } else {
                if (!note) {
                    newH2.innerHTML = `<a href = "${link}">No Label</a>`;
                    newH2.style.marginBottom = `48px`;
                    newP.innerHTML = `${value1Formatted} ${selectedCurrency1}<br>=<br>${value2Formatted} ${selectedCurrency2}`;
                } else {
                    newH2.innerHTML = `<a href = "${link}">No Label</a><br><small>${note}</small>`;
                    newP.innerHTML = `${value1Formatted} ${selectedCurrency1}<br>=<br>${value2Formatted} ${selectedCurrency2}`;
                };
            };
        } else {
            if (!link) {
                if (!note) {
                    newH2.innerHTML = `${label}`;
                    newH2.style.marginBottom = `48px`;
                    newP.innerHTML = `${value1Formatted} ${selectedCurrency1}<br>=<br>${value2Formatted} ${selectedCurrency2}`;
                } else {
                    newH2.innerHTML = `${label}<br><small>${note}</small>`;
                    newP.innerHTML = `${value1Formatted} ${selectedCurrency1}<br>=<br>${value2Formatted} ${selectedCurrency2}`;
                };
            } else {
                if (!note) {
                    newH2.innerHTML = `<a href = "${link}">${label}</a>`;
                    newH2.style.marginBottom = `48px`;
                    newP.innerHTML = `${value1Formatted} ${selectedCurrency1}<br>=<br>${value2Formatted} ${selectedCurrency2}`;
                } else {
                    newH2.innerHTML = `<a href = "${link}">${label}</a><br><small>${note}</small>`;
                    newP.innerHTML = `${value1Formatted} ${selectedCurrency1}<br>=<br>${value2Formatted} ${selectedCurrency2}`;
                };
            };
        };
        clear();
    }; 
});

tempBtn.onclick = function () {
    tempNote.remove();
};

clearBtn.onclick = function () {
    tripNotes.addEventListener(`reset`, function(event) {
        event.preventDefault();
    });
    clear ();
};