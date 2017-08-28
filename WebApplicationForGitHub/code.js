$(document).ready(function () {
    $('#tab-bar a').click(function () {
        let url = $(this).attr('href');

        if (url !== window.location) {
            window.history.pushState(null, null, url);
        }

        let id = $(this).attr('id');
        tabChanged(id);

        return false;
    });
});

function tabChanged(typeOfTab) {
    clear();
    checkTabs(typeOfTab);
    let url = createUrl(typeOfTab);
    let doAfter = chooseDoAfter(typeOfTab);

    getRequest(url)
        .then(function (response) {
            doAfter(response);
        });
}

function clear() {
    let section = document.getElementById("section");
    if (section) {
        document.body.removeChild(section);
    }
}

function checkTabs(activeTab) {
    if (activeTab !== "issues")
        doTabNotActive("issues");

    if (activeTab !== "commits")
        doTabNotActive("commits");

    if (activeTab !== "notifications")
        doTabNotActive("notifications");

    let tab = document.getElementById(activeTab);
    tab.className += " mdc-tab--active";
}

function doTabNotActive(tab) {
    document.getElementById(tab).className = "mdc-tab";
}

function createUrl(type) {
    let url = "https://api.github.com/";

    if (type === 'issues') {
        url += 'repos/' + info.owner + '/' + info.repo + '/issues';
    }

    if (type === 'commits') {
        url += 'repos/' + info.owner + '/' + info.repo + '/commits';
    }

    if (type === 'notifications') {
        url += 'notifications';
    }

    return url;
}

function chooseDoAfter(type) {
    let doAfter;

    if (type === 'issues') {
        doAfter = createListIssues;
    }

    if (type === 'commits') {
        doAfter = createListCommits;
    }

    if (type === 'notifications') {
        doAfter = createListNotifications;
    }

    return doAfter;
}

function getRequest(url) {
    let valueOfHeader = "token " + info.token;

    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": valueOfHeader
        }
    })
        .then(function (response) {
            return response.json();
        }).catch(function (ex) {
            alert('error');
        });
}

function createListIssues(response) {
    let list = new Array(10);

    let len = response.length;
    let i = 0;
    let successful = 0;

    while (i < len && successful < 10) {
        if (response[i].state === "open") {
            list[successful] = {
                'url': response[i]['html_url'],
                'text': response[i].title
            }
            successful++;
        }

        i++;
    }

    list.length = successful;

    showTextList(list);
}

function createListCommits(response) {
    let list = new Array(10);

    let len = response.length;
    let i = 0;

    while (i < len && i < 10) {
        list[i] = {
            'url': response[i]['html_url'],
            'text': response[i].commit.committer.date + ' - ' + response[i].commit.committer.name + "\n" + response[i].commit.message
        }
        i++;
    }

    list.length = i;

    showTextList(list);
}

function createListNotifications(response) {
    let list = new Array(10);

    let len = response.length;
    let i = 0;

    while (i < len && i < 10) {
        list[i] = {
            'reason': response[i].reason,
            'url': response[i].subject.url.replace("api.", "").replace("repos/", ""),
            'text': response[i].subject.title
        }

        i++;
    }

    list.length = i;

    showTextListWithAvatar(list);
}

function showTextList(list) {
    let section = document.createElement('section');
    section.id = "section";
    document.body.appendChild(section);

    let ul = document.createElement('ul');
    ul.className = "mdc-list";
    section.appendChild(ul);

    let len = list.length;
    let i = 0;

    while (i < len && i < 10) {
        let li = document.createElement('li');
        li.className = "mdc-list-item withMargin";
        ul.appendChild(li);

        let link = document.createElement('a');
        link.href = list[i].url;
        li.appendChild(link);

        let p = document.createElement('p');
        p.innerText = list[i].text;
        p.className = "listTextItem mds-typography--headline textTwoLines";
        link.appendChild(p);
        i++;
    }
}

function showTextListWithAvatar(list) {
    let section = document.createElement('section');
    section.id = "section";
    document.body.appendChild(section);

    let ul = document.createElement('ul');
    ul.className = "mdc-list mdc-list--avatar-list";
    section.appendChild(ul);

    let len = list.length;
    let i = 0;

    while (i < len && i < 10) {
        let li = document.createElement('li');
        li.className = "mdc-list-item withMargin";
        ul.appendChild(li);

        let img = document.createElement('img');
        img.className = "mdc-list-item__start-detail";

        if (list[i].reason === "assign")
            img.src = "/images/assign.png";
        else img.src = "/images/mention.png";

        li.appendChild(img);

        let link = document.createElement('a');
        link.href = list[i].url;
        li.appendChild(link);

        let p = document.createElement('p');
        p.innerText = list[i].text;
        p.className = "listTextItem mds-typography--headline";
        link.appendChild(p);
    }
    i++;
}