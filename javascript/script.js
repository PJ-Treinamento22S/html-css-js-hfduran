function getDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yy = today.getFullYear();
    yy = String(yy).slice(2,4);

    today = dd + '/' + mm + '/' + yy;

    return today;
}


// adiciona eventos aos novo piu
function addInteractions($piu){
    const $like = $piu.querySelector(".like");
    const $highlight = $piu.querySelector(".highlight");

    $like.querySelector("img").addEventListener('click', () => {
        $like.classList.toggle("active");

        let nLikes = parseInt($like.querySelector('span').innerText);
        if($like.classList.contains("active")){
            nLikes++;
        }else{
            nLikes--;
        }
        $like.querySelector("span").innerText = String(nLikes);
    })

    $highlight.addEventListener('click', () => {
        $highlight.classList.toggle("active");

        if($highlight.classList.contains("active")){
            $piu.style.order = -1;
        }else{
            $piu.style.order = 0;
        }
    })
}

function addPiu(img, name, user, text, date){
    const piuBody = document.createElement("li");
    const piuImg = document.createElement("img");
    const piuInfo = document.createElement("div");
    const piuName = document.createElement("strong");
    const piuUser = document.createElement("span");
    const piuText = document.createElement("p");
    const piuActions = document.createElement("div");
    const piuHighlight = document.createElement("a");
    const piuLike = document.createElement("a");
    const piuNLikes = document.createElement("span");
    const piuDate = document.createElement("span");

    piuImg.src = img;
    piuName.innerText = name + " ";
    piuUser.innerText = "@" + user;
    piuText.innerText = text;
    piuDate.innerText = date;
    
    let nLikes = Math.floor(Math.random() * 10);
    nLikes = String(nLikes);
    piuLike.innerHTML = '<img src="../images/heart.svg">';
    piuNLikes.innerHTML = nLikes;
    piuHighlight.innerHTML = '<img src="../images/highlight.svg">';

    piuInfo.classList.add("info");
    piuActions.classList.add("actions");
    piuDate.classList.add("date");
    piuHighlight.classList.add("highlight");
    piuLike.classList.add("like");

    const pius = document.querySelector("ul.pius");
    pius.insertBefore(piuBody, pius.firstChild);
    piuBody.appendChild(piuImg);
    piuBody.appendChild(piuInfo);
    piuInfo.appendChild(piuName);
    piuName.appendChild(piuUser);
    piuInfo.appendChild(piuText);
    piuInfo.appendChild(piuActions);
    piuActions.appendChild(piuHighlight);
    piuActions.appendChild(piuLike);
    piuLike.appendChild(piuNLikes); 
    piuBody.appendChild(piuDate);

    addInteractions(piuBody);
}

function formatDate(date){
    date = date.slice(0, 10)
    date = date.split("-");
    date = date.reverse();
    date[2] = date[2].slice(2,4);
    date = date.join("/");
    return date;
}

async function getData(){
    const response = await fetch(
        "https://api.json-generator.com/templates/BQZ3wDrI6ts0/data?access_token=n7lhzp6uj5oi5goj0h2qify7mi2o8wrmebe3n5ad"
    );

    let data = await response.json();

    console.log(data);
    console.log(data[0].user.email);

    //precisei colocar os pius na ordem reversa
    for(let i = data.length - 1; i >= 0; i--){
        const name = data[i].user.first_name + " " + data[i].user.last_name;

        let date = formatDate(data[i].created_at);

        addPiu(data[i].user.photo, name, data[i].user.username, data[i].text, date);
    }
}
getData();

(() => {
    //contador de palavras
    const $txt = document.getElementById("txt");
    const $piarButton = document.querySelector(".write button");
    const $alert = document.querySelector("#alert");

    $txt.addEventListener("input", () => {
        const counter = document.getElementById("counter");
        counter.innerHTML = $txt.value.length + "/140";
        if($txt.value.length > 140){
            $txt.classList.add("invalid");
            counter.classList.add("invalid");
            $alert.classList.add("active");
        }else{
            $txt.classList.remove("invalid");
            counter.classList.remove("invalid");
            $alert.classList.remove("active");
        }
    })

    $piarButton.addEventListener('click', () => {
        let today = getDate();
        if($txt.value.length < 141 && $txt.value != ""){
            addPiu("images/avatar.jpg", "Henrique Duran", "petrrusko", $txt.value, today);
            $txt.value = "";
            counter.innerHTML = "0/140";
        }
    }); 
})();

(() => {
    const $search = document.querySelector("#search");
    $search.addEventListener('input', () => {
        console.log("oi");
        let $names = document.querySelectorAll("ul.pius li .info strong");
        let searchTxt = $search.value.toLowerCase();
        $names.forEach(name => {
            console.log(name);
            if(name.innerText.toLowerCase().includes(searchTxt)){
                name.parentNode.parentNode.classList.remove("hide");
            }
            else{
                name.parentNode.parentNode.classList.add("hide");
            }
        })
    });
})();