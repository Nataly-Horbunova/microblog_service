const usersList = document.querySelector('.users-list');

// Delete user handler
usersList.addEventListener('click', async (e) => {
    console.log('hello listener');
    if(!e.target.classList.contains('trash-can')) return;

    const { action, id } = e.target.dataset;
    console.log('hello listener', action, id);
    if(action === 'delete-user') {
        await handleDelete('/api/users/', id);
    }
});