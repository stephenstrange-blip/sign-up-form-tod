const form = document.querySelector("form");
const password = document.getElementById("password");
const cfm_password = document.getElementById("cfm-password");
const cfmPasswordError = document.querySelector(".error.cfm");

const phoneFields = document.querySelectorAll("div > input[type=tel]");
const phoneRegex = new RegExp("/[0-9]{4}-[0-9]{3}-[0-9]{4}/");
const phoneError = document.querySelector(".error.phone");
const phoneNum = [];


form.addEventListener("input", (event) => {
    if (password.validity.valueMissing) {
        cfmPasswordError.textContent = "Invalid Password Input"
    }
    else if (password.value != cfm_password.value) {
        cfmPasswordError.textContent = "Password does not match!"
        cfm_password.style['boxShadow'] = "rgba(255, 115, 0, 0.8) 0 0 .4rem"
        cfm_password.style['borderColor'] = "rgba(255, 115, 0, 0.8)"
    }
    else {
        cfmPasswordError.textContent = "Passwords Match"
        Object.assign(cfm_password.style, {
            borderColor: "rgba(0, 182, 0, 0.8)",
            boxShadow: "rgba(0, 182, 0, .8) 0 0 .4rem"
        })
    }
})

form.addEventListener("submit", (event) => {
    let phoneNum = combinePhoneFields();
    console.log(phoneNum);
    console.log(phoneRegex.test(phoneNum));
    if (!phoneRegex.test(phoneNum)) {
        phoneError.textContent = "Invalid Pattern";
        event.preventDefault();
    }
})

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
    let phone = phoneNum.join("-");
    console.log(phone);
    return phone
}

const autoTab = (current, length, next) => {
    const currentInput = document.querySelector('.' + current)
    // console.log(currentInput.value.length, current)
    if (currentInput.value.length === length) {
        document.querySelector("." + next).focus();
    }
}