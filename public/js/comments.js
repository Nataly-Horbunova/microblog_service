const postsList = document.querySelector('.posts-list');
const commentsList = document.querySelector('.comments-list');

// Comments form validation
postsList.addEventListener('submit', (e) => { 
    if(!e.target.classList.contains('comment-form')) return;

    const commentForm = e.target;

    validateElement(commentForm.content, '.comment-error');

    let invalidElements = document.querySelectorAll(".invalid");
    if (invalidElements.length > 0) {
        e.preventDefault();
    }
});


// Delete comment handler
commentsList.addEventListener('click', async (e) => {
    if(!e.target.classList.contains('trash-can')) return;

    const { action, id } = e.target.dataset;

    if(action === 'delete-comment') {
        await handleDelete('/api/comments/', id);
    }
});
