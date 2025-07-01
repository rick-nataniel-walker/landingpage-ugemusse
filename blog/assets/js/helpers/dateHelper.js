const formatDate = (dateStr, includeTime = true) => {
    const months = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");

    if (!includeTime) {
        return `${month}, ${day} de ${year}`;
    }

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}, ${day} de ${year} às ${hours}:${minutes}`;
};
