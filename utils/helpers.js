function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = new Date(date);
    const month = months[formattedDate.getMonth()];
    const day = formattedDate.getDate();
    const year = formattedDate.getFullYear();
    return `${month} ${day}, ${year}`;
}

module.exports = {
    formatDate
}