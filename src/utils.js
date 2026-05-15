export function generateID() {
    return Date.now();
}

export function formatDate(date) {
    return new Date(date).toLocaleString();
}
