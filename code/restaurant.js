const tbody = document.querySelector("tbody");
const restor = JSON.parse(localStorage.BDRestor);


function createElementTable (restor) {
    return restor.map((el, i) => {
        return `
        <tr>
            <td>${i + 1}</td>
            <td>${el.productName}</td>
            <td title="При настиску сортувати.">${el.productQuantity}</td>
            <td title="При настиску сортувати.">${el.price} грн.</td>
            <td>&#128397;</td>
            <td>${el.stopList ? "&#10060;" : "&#9989;" }</td>
            <td>${el.data}</td>
            <td>&#128465;</td>
        </tr>
        `
    }).join("");
};

tbody.insertAdjacentHTML("beforeend", createElementTable(restor));