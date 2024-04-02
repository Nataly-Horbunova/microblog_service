const postsList = document.querySelector('.posts-list');

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
