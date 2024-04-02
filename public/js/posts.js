const postsList = document.querySelector('.posts-list');

postsList.addEventListener('click', async (e) => {
    console.log('submit');

    if(!e.target.classList.contains('trash-can')) return;

    const { action, id } = e.target.dataset;

    if(action !== 'delete-post') return;

    const resp = await fetch(`/api/posts/${id}`, { method: "DELETE" });

    if(resp.status === 204) {
        location.reload();
    } else {
        const html = await resp.text(); 
        document.open();
        document.write(html); 
        document.close(); 
    }
});


const postsForm = document.querySelector('.post-form');
postsForm.addEventListener('submit', (e) => {
    validateElement(postsForm.title, '#title-error');
    validateElement(postsForm.content, '#text-error');

    let invalidElements = document.querySelectorAll(".invalid");
    if (invalidElements.length > 0) {
        e.preventDefault();
    }
});

function validateElement(element, errorElementSelector) {
    let errorElement = document.querySelector(errorElementSelector);

    element.classList.remove("valid");
    element.classList.remove("invalid");
    errorElement.style.visibility = "hidden";

    console.log(element.value.trim().length);

    if(element.value.trim().length > 0) {
        element.classList.add("valid");
    } else {
        element.classList.add("invalid");
        errorElement.style.visibility = "visible";
    }
}
