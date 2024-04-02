const postsList = document.querySelector('.posts-list');

postsList.addEventListener('click', async (e) => {

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
