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

async function handleDelete(url, id) {
    const resp = await fetch(url + id, { method: "DELETE" });

    if(resp.status === 204) {
        location.reload();
    } else {
        const html = await resp.text(); 
        document.open();
        document.write(html); 
        document.close(); 
    }
}