const postsForm = document.querySelector('.post-form');

// Post form validation
postsForm.addEventListener('submit', (e) => {
    console.log(postsForm.title);

    validateElement(postsForm.title, '#title-error');
    validateElement(postsForm.content, '#text-error');

    let invalidElements = document.querySelectorAll(".invalid");
    if (invalidElements.length > 0) {
        e.preventDefault();
    }
});

// Delete post handler
postsList.addEventListener('click', async (e) => {
    if(!e.target.classList.contains('trash-can')) return;

    const { action, id } = e.target.dataset;

    if(action === 'delete-post') {
        await handleDelete('/api/posts/', id);
    }
});


