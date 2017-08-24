$(document).ready(function () {
    $('#tab-bar a').click(function () {
        var url = $(this).attr('href');

        $.ajax({
            url: url + '?ajax=1',
            success: function (r) {
                $('#content').html(r);
            }
        });

        if (url !== window.location) {
            window.history.pushState(null, null, url);
        }

        tabChanged(url);

        return false;
    });

    $(window).bind('popstate', function () {
        $.ajax({
            url: location.pathname + '?ajax=1',
            success: function (r) {
                $('#content').html(r);
            }
        });
    });
});

function tabChanged(url) {
    clear();

    let type = url.replace("/", "");
    document.getElementById(type + "Link").className += " mdc-tab--active";

    getInfo(type);
}

function clear() {
    let section = document.getElementById("issues");
    if (section) {
        document.getElementById("issuesLink").className = "mdc-tab";
        document.body.removeChild(section);
        return;
    }

    section = document.getElementById("commits");
    if (section) {
        document.getElementById("commitsLink").className = "mdc-tab";
        document.body.removeChild(section);
        return;
    }

    section = document.getElementById("notifications");
    if (section) {
        document.getElementById("notificationsLink").className = "mdc-tab";
        document.body.removeChild(section);
        return;
    }
}

function getInfo(type) {
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
    }).then(function (info) {
        showSection(info, type);
    }).catch(function (ex) {
        alert('error');
    });
}

function showSection(info, type) {
    let url = createUrl(info, type);

    let doAfter;

    if (type === 'issues')
        doAfter = showIssues;
    else {
        if (type === 'commits')
            doAfter = showCommits;
        else
            doAfter = showNotifications;
    }

    getRequest(url, info.token, doAfter);
}

function createUrl(info, type) {
    let url = "https://api.github.com/";

    if (type !== 'notifications') {
        url += 'repos/' + info.owner + '/' + info.repo + '/';
    }

    url += type;

    return url;
}

function getRequest(url, token, doAfter) {
    let valueOfHeader = "token " + token;

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
        doAfter(response);
    }).catch(function (ex) {
        alert('error');
    });
}

function showIssues(response) {
    let section = document.createElement('section');
    section.id = "issues";
    document.body.appendChild(section);

    let ul = document.createElement('ul');
    ul.className = "mdc-list";
    section.appendChild(ul);

    let len = response.length;
    let i = 0;

    while (i < len && i < 10) {
        if (response[i].state === "open") {
            let li = document.createElement('li');
            li.className = "mdc-list-item";
            ul.appendChild(li);

            let link = document.createElement('a');
            link.href = response[i]['html_url'];
            li.appendChild(link);

            let p = document.createElement('p');
            p.innerText = response[i].title;
            p.className = "listTextItem mds-typography--headline";
            link.appendChild(p);
        }
        i++;
    }
}

function showCommits(response) {
    let section = document.createElement('section');
    section.id = "commits";
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

function showNotifications(response) {
    let section = document.createElement('section');
    section.id = "notifications";
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