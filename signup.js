const form = document.querySelector("form");
const password = document.getElementById("password");
const cfmPassword = document.getElementById("cfm-password");
const cfmPasswordError = document.querySelector(".error.cfm");

const phoneFields = document.querySelectorAll("div > input[type=tel]");
const phoneRegex = new RegExp("/[0-9]{4}-[0-9]{3}-[0-9]{4}/");
const phoneError = document.querySelector(".error.phone");
const phoneNum = [];

// Password Mismatch handling
form.addEventListener("input", (event) => {
    if (password.validity.valueMissing) {
        cfmPasswordError.textContent = "Invalid Password Input"
    }
    else if (password.value != cfmPassword.value) {
        cfmPasswordError.textContent = "Password does not match!"

        // Setting each styling attribute individually (Method #1)
        cfmPassword.style['boxShadow'] = "rgba(255, 115, 0, 0.8) 0 0 .4rem"
        cfmPassword.style['borderColor'] = "rgba(255, 115, 0, 0.8)"
    }
    else {
        cfmPasswordError.textContent = "Passwords Match"

        // Setting each styling attribute at once (Method #2)
        Object.assign(cfmPassword.style, {
            borderColor: "rgba(0, 182, 0, 0.8)",
            boxShadow: "rgba(0, 182, 0, .8) 0 0 .4rem"
        })
    }
})

// Phone Number handling on submit when all phone fields combined
form.addEventListener("submit", (event) => {
    //  field inputs are initially separate when collected from the DOM
    let phoneNum = combinePhoneFields();

    //  TODO - Fix the regex matching function
    //  It is finding a match (returning True) as early as 
    //  the input is XXXX-.
    if (!phoneRegex.test(phoneNum)) {
        phoneError.textContent = "Invalid Pattern";
        event.preventDefault();
    }
})

// Phone Number handling on input for each separate field
phoneFields.forEach((field) => {
    field.addEventListener("input", (event) => {
        if (field.validity.valueMissing) {
            phoneError.textContent = "Input Required"
        }
        else if (field.validity.tooShort) {
            phoneError.textContent = "Missing Input values"

        } else {
            phoneError.textContent = ""
        }
    })
})

function combinePhoneFields() {
    phoneFields.forEach((field) => {
        phoneNum.push(field.value);
    })
    //Pattern is XXXX-XXX-XXX
    let phone = phoneNum.join("-");
    return phone
}

// Text cursor "tabs" automatically to next 
// phone field if current is filled to max
const autoTab = (current, length, next) => {
    const currentInput = document.querySelector('.' + current)
    if (currentInput.value.length === length) {
        document.querySelector("." + next).focus();
    }
}