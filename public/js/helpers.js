function validateElement(element, errorElementSelector) {
    let errorElement = document.querySelector(errorElementSelector);

    element.classList.remove("valid");
    element.classList.remove("invalid");
    errorElement.style.visibility = "hidden";

    if(element.value.trim().length > 0) {
        element.classList.add("valid");
    } else {
        element.classList.add("invalid");
        errorElement.style.visibility = "visible";
    }
}