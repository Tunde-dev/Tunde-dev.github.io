let root = document.querySelector("#root");
console.log(root);

let createLoading = () => {
    let loadingDiv = createNode("div", root, "loading");
    let containerDiv = createNode("div", loadingDiv, "loading-container" );
    for (let i = 0; i < 8; i++) {
        createNode("div", containerDiv, "loading-div" );
    }
};

let createNode = (type, parent, className = "", content= "" ) => {
    let elementDiv = document.createElement(type);
    if (className != "") elementDiv.classList.add(className);
    elementDiv.innerText = content
    parent.appendChild(elementDiv);
    return elementDiv;
};

createLoading()

let endLoading = () => {
    let loading = document.querySelector(".loading");
    loading.classList.add("hidden");
    let del = document.querySelector(".hidden");
    window.setTimeout(() => root.removeChild(del), 1000);

    let header = document.querySelector('header');
    createNode("div", header, "", "Knights");
    let headerDiv = createNode("div", header);
    createNode("span", headerDiv, "", "of the Second Table");
};

window.addEventListener("load", endLoading);

let createIMG = (parent, src, alt) => {
    let image = document.createElement("img");
    image.setAttribute("src", src);
    image.setAttribute("alt", alt);
    parent.appendChild(image);
}; 


let createCard = (card, parent) => {
    let cardDiv = createNode("div", parent, "card");
    let descDiv = createNode("div", cardDiv, "description");
    createNode("h2", descDiv, "", card.title);
    createNode("h3", descDiv, "", card.subtitle);
    createNode("p", descDiv, "", card.para);
    let imageDiv = createNode("div", cardDiv, "image");
    imageDiv.setAttribute("tabindex", -1);
    imageDiv.onclick = focusOnImage;
    createIMG(imageDiv, card.imgSrc, card.imgAlt);
    
    return cardDiv;
}

const focusOnImage = (e) => {
    root.scrollBy({
        top: e.target.getBoundingClientRect().top - (window.innerHeight / 2 - e.target.clientHeight),
        behavior: "smooth"
    });
    e.target.focus();
}

const bubblingCircles = () => {
    let header = document.querySelector('header')
    let i = 80;
    while(i){
        let circleCont = createNode("div", root, "circle-container");
        circleCont.style.setProperty("--travel-height", Math.max(root.scrollHeight, root.clientHeight) + "px");
        createNode("div", circleCont, "circle");
        i--
    }
}

let cardDivs = [];
let createMainContent = () => {
    createNode("header", root);
    
    let main = createNode("main", root);
    for (card of cards) {
        cardDivs.push(createCard(card, main));
    }
    let footer = createNode("footer", root);
    createNode("span", footer, "copy", "Copyright: Our stuff, don't touch!");
}

createMainContent();
setTimeout(() => {
    bubblingCircles();
    
}, 10);


