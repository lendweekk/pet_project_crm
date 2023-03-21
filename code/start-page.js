import { modalHide, modalShow, createInputsForModal, generationID, removeElChildren } from "./functions.js";

const btnShowMadal = document.querySelector(".add"),
    btnCloseModal = document.getElementById("close"),
    btnSaveModal = document.getElementById("save"),
    select = document.getElementById("select"),
    formInfo = document.querySelector(".form-info"),
    store = ["Назва продукту", "Вартість продукту", "Посилання на зображення", "Опис продукту", "Ключеві слова (Розділяти комою)"],
    //мій код
    restotation = ["Назва продукту", "Вага продукту", "Інгредієнти", "Ціна", 
    "Посилання на зображення", "Ключеві слова (Розділяти комою)", "Вага","Вікові обмеження"],
    video = ["Назва","Посилання","Жанр відео",
    "Країна походження відео","Актори які приймали участь","Опис відео","Рік публікації відео"]

let typeCategory = null;

btnShowMadal.addEventListener("click", modalShow);
btnCloseModal.addEventListener("click", modalHide);

select.addEventListener("change", () => {
    typeCategory = select.value;

    if (select.value === "Магазин") {
        removeElChildren(formInfo);
        formInfo.insertAdjacentHTML("beforeend", createInputsForModal(store));
    } else if (select.value === "Відео хостинг") {
        removeElChildren(formInfo);
        formInfo.insertAdjacentHTML("beforeend", createInputsForModal(video));
    } else if (select.value === "Ресторан") {
        removeElChildren(formInfo);
        formInfo.insertAdjacentHTML("beforeend", createInputsForModal(restotation));
    } else {
        console.error("Жоден з пунктів не валідний.")
        return
    }
})

btnSaveModal.addEventListener("click", () => {
    const [...inputs] = document.querySelectorAll(".form-info input");

    const objStore = {
        id: "",
        status: false,
        productName: "",
        porductPrice: 0,
        productImage: "",
        productDescription: "",
        productQuantity: 0,
        keywords: []
    }

    const objRestor = {
        id: 0,
        productName: "",
        productWeiht: "",
        ingredients: "",
        price: 0,
        productImageUrl: "",
        keywords: [],
        weiht : 0,
        stopList : false,
        ageRestrictions : false,
        like : 0,
        productQuantity: 0,
        restrictions: 0 
    }, 
    objVideo = {
        id: 0,
        videoLink: "",
        videoName: "",
        videoGenre: [],
        videoCountry: [],
        videoActors: [],
        videoDescription: "",
        videoYearReleased: 0
    }

    if (typeCategory === "Магазин") {
        objStore.id = generationID();
        inputs.forEach((input) => {
            if (input.value.length > 3) {
                if (input.dataset.type === "Назва продукту") {
                    objStore.productName = input.value;
                } else if (input.dataset.type === "Вартість продукту") {
                    objStore.porductPrice = parseFloat(input.value);
                } else if (input.dataset.type === "Посилання на зображення") {
                    objStore.productImage = input.value;
                } else if (input.dataset.type === "Опис продукту") {
                    objStore.productDescription = input.value;
                } else if (input.dataset.type === "Ключеві слова (Розділяти комою)") {
                    objStore.keywords.push(...input.value.split(","))
                }
                input.classList.remove("error");
            } else {
                input.classList.add("error");
                return
            }
        })
        objStore.date = new Date();
        if(objStore.productQuantity <= 0){
            objStore.status = false;
        }else{
            objStore.status = true;
        }
        const store = JSON.parse(localStorage.BDStore);
        store.push(objStore);
        localStorage.BDStore = JSON.stringify(store);

    }else if(typeCategory === "Ресторан"){
        inputs.forEach((input) => {
            if (input.value.length > 0) {
                if (input.dataset.type === "Назва продукту") {
                    if (isNaN(input.value)){
                        objRestor.productName = input.value;
                    }else{
                        return input.classList.add("error");
                    }
                } else if (input.dataset.type === "Вага продукту") {
                    if (isNaN(parseFloat(input.value))){
                        return input.classList.add("error"); 
                    }else{
                        objRestor.productWeiht = parseFloat(input.value);
                    }
                } else if (input.dataset.type === "Інгредієнти") {
                    if (isNaN(input.value)){
                        objRestor.ingredients = input.value;
                    }else{
                        return input.classList.add("error");
                    }
                } else if (input.dataset.type === "Ціна") {
                    if (isNaN(parseFloat(input.value))){
                        return input.classList.add("error"); 
                    }else{
                        objRestor.price = parseFloat(input.value);
                    }
                } else if (input.dataset.type === "Посилання на зображення") {
                    if (isNaN(input.value)){
                        objRestor.productImageUrl = input.value;
                    }else{
                        return input.classList.add("error");
                    }
                }  else if (input.dataset.type === "Ключеві слова (Розділяти комою)") {
                    if (isNaN(input.value)){
                        objRestor.keywords.push(...input.value.split(","))
                    }else{
                        return input.classList.add("error");
                    }
                } else if (input.dataset.type === "Вага") {
                    if (isNaN(parseFloat(input.value))){
                        return input.classList.add("error");
                    }else{
                        objRestor.weiht = parseFloat(input.value);
                    }
                } else if (input.dataset.type === "Вікові обмеження") {
                    if (isNaN(parseFloat(input.value))){
                        return input.classList.add("error");
                    }else{
                        objRestor.restrictions = parseFloat(input.value);
                    }
                }
                input.classList.remove("error");
            } else {
                return input.classList.add("error");
            }
        });
        
        let checkSucces = 0;
        inputs.forEach(e =>{
            if (e.classList.value !== "error"){
                checkSucces +=1;
            }else{
                return
            };
            if(checkSucces === inputs.length){
                objRestor.id = generationID();
            };
        });

        objRestor.productQuantity <= 0? objRestor.stopList = true: objRestor.stopList = false;
        objRestor.restrictions > 0? objRestor.ageRestrictions = true: objRestor.ageRestrictions = false;
        objRestor.data = new Date();

        const restor = JSON.parse(localStorage.BDRestor);
        restor.push(objRestor);
        localStorage.BDRestor = JSON.stringify(restor);

    }else if(typeCategory === "Відео хостинг"){
        inputs.forEach((input) => {
            if (input.value.length > 3){
                if (input.dataset.type === "Назва"){
                    if (isNaN(input.value)){
                        objVideo.videoName = input.value;
                    }else{
                        return input.classList.add("error");
                    }
                }else if(input.dataset.type === "Рік публікації відео"){
                    if (isNaN(parseFloat(input.value))){
                        return input.classList.add("error"); 
                    }else{
                        objVideo.videoYearReleased = parseFloat(input.value);
                    }
                }else if(input.dataset.type === "Посилання"){
                    if (isNaN(input.value)){
                        objVideo.videoLink = input.value;
                    }else{
                        return input.classList.add("error");
                    }
                }else if(input.dataset.type === "Опис відео"){
                    if (isNaN(input.value)){
                        objVideo.videoDescription = input.value;
                    }else{
                        return input.classList.add("error");
                    }
                }else if (input.dataset.type === "Жанр відео") {
                    if (isNaN(input.value)){
                        objVideo.videoGenre.push(...input.value.split(","))
                    }else{
                        return input.classList.add("error");
                    }
                }else if (input.dataset.type === "Країна походження відео") {
                    if (isNaN(input.value)){
                        objVideo.videoCountry.push(...input.value.split(","))
                    }else{
                        return input.classList.add("error");
                    }
                }else if (input.dataset.type === "Актори які приймали участь") {
                    if (isNaN(input.value)){
                        objVideo.videoActors.push(...input.value.split(","))
                    }else{
                        return input.classList.add("error");
                    }
                }
                input.classList.remove("error");
            }else {
                return input.classList.add("error");
            }
        });

        let checkSucces = 0;
        inputs.forEach(e =>{
            if (e.classList.value !== "error"){
                checkSucces +=1;
            }else{
                return
            };
            if(checkSucces === inputs.length){
                objVideo.id = generationID();
            };
        });
        
        objVideo.data = new Date();

        const video = JSON.parse(localStorage.BDRVideo);
        video.push(objVideo);
        localStorage.BDRVideo = JSON.stringify(video);
    };
});