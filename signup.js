const password = document.getElementById("password")
const cfm_password = document.getElementById("cfm-password")
const form = document.querySelector("form")
const errorOutput = document.querySelector(".error")
console.log(form);

form.addEventListener("input", (event) => {
    if (password.validity.valueMissing) {
        errorOutput.textContent = "Invalid Password Input"
    }
    else if (password.value != cfm_password.value) {
        errorOutput.textContent = "Password does not match!"
        console.log(cfm_password.style)
        Object.assign(cfm_password.style, {
            boxShadow: "rgba(255, 115, 0, 0.8) 0 0 .4rem",
            borderColor: "rgba(255, 115, 0, 0.8)"
        })
    }
    else {
        errorOutput.textContent = "Passwords Match"
        console.log(cfm_password.style)
        Object.assign(cfm_password.style, {
            borderColor: "rgba(0, 182, 0, 0.8)",
            boxShadow: "rgba(0, 182, 0, .8) 0 0 .4rem"
        })
    }

})
