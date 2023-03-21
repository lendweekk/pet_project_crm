export function isAuthorization() {
    if (document.location.pathname.search("authorization") !== -1) {
        return
    }
    if (!localStorage.isAuthorization) {
        document.location = "/authorization"
    }
}

export function validate (rex, val) {
    return rex.test(val)
}

const containerModal = document.querySelector(".container-modal");

export const modalShow = e => containerModal.classList.add("active");
export const modalHide = e => containerModal.classList.remove("active");

export function createInputsForModal(arr = [], info2) {
    return arr.map((input) => {
        const id = generationID();
        return `<div class="input-line"><label for="${id}">${input}</label><input data-type="${input}" type="text" id="${id}"></div>`
    }).join("")
}

export function generationID() {
    const a = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї', 'ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'];
    const b = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let id = "";
    for (let i = 0; i < 10; i++) {
        id += `${a[Math.floor(Math.random() * a.length)]}${b[Math.floor(Math.random() * b.length)]}`
    }
    return id
}

export function removeElChildren(El){
    let [...arr] = El.children;
    arr.forEach(e => e.remove())
}