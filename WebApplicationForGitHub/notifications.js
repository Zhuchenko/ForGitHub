(function () {
    fetch("static.txt", {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.status === 200) {
            return response.text();
        }
    }).then(function (text) {
        return JSON.parse(text);
    }).then(function (obj) {
        getRequest(obj);
    }).catch(function (ex) {
        alert('error');
    });
})();

function getRequest(static) {
    let url = "https://api.github.com/notifications";
    let valueOfHeader = "token " + static.token;

    fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": valueOfHeader
        }
    }).then(function (response) {
        if (response.status === 200) {
            return response.json();
        }
    }).then(function (response) {
        show(response);
    }).catch(function (ex) {
        alert('error');
    });
}

function show(response) {
    let section = document.createElement('section');
    document.body.appendChild(section);

    let ul = document.createElement('ul');
    ul.className = "mdc-list mdc-list--avatar-list";
    section.appendChild(ul);

    let len = response.length;
    let i = 0;

    while (i < len && i < 10) {
        if (response[i].unread === true) {
            let li = document.createElement('li');
            li.className = "mdc-list-item withMargin";
            ul.appendChild(li);

            let img = document.createElement('img');
            img.className = "mdc-list-item__start-detail";

            if (response[i].reason === "assign") 
                img.src = "/images/assign.png";
            else img.src = "/images/mention.png";

            li.appendChild(img);

            let link = document.createElement('a');
            link.href = response[i].subject.url.replace("api.", "").replace("repos/", "");
            li.appendChild(link);

            let p = document.createElement('p');
            p.innerText = response[i].subject.title;
            p.className = "listTextItem mds-typography--headline";
            link.appendChild(p);
        }
        i++;
    }
}