const usersList = document.querySelector('.users-list');

// Delete user handler
usersList.addEventListener('click', async (e) => {
    if(!e.target.classList.contains('trash-can')) return;

    const { action, id } = e.target.dataset;
    if(action === 'delete-user') {
        await handleDelete('/api/users/', id);
    }
});