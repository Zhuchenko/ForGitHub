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
    let url = "https://api.github.com/repos/" + static.owner + '/' + static.repo + "/commits";
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
    ul.className = "mdc-list";
    section.appendChild(ul);

    let len = response.length;
    let i = 0;

    while (i < len && i < 10) {
        let li = document.createElement('li');
        li.className = "mdc-list-item withMargin";
        ul.appendChild(li);

        let link = document.createElement('a');
        link.href = response[i]['html_url'];
        li.appendChild(link);

        let p = document.createElement('p');
        p.innerText = response[i].commit.committer.date + ' - ' + response[i].commit.committer.name + "\n" + response[i].commit.message;
        p.className = "listTextItem textTwoLines mds-typography--headline";
        link.appendChild(p);

        i++;
    }
}