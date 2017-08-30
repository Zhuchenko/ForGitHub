$(document).ready(function () {
    $('#tab-bar a').click(function () {
        let url = $(this).attr('href');

        if (url !== window.location) {
            window.history.pushState(null, null, url);
        }

        let id = $(this).attr('id');
        let obj = new Main();
        obj.Start(id);

        return false;
    });
});

function Main() {
    this.Start = function (typeOfTab) {
        let grp = new GraphicHandler();
        grp.clear();
        grp.checkTabs(typeOfTab);

        switch (typeOfTab) {
            case "issues":
                issues();
                break;
            case "commits":
                commits();
                break;
            case "notifications":
                notifications();
                break;
            default:
                alert('undefined type of tag');
        }
    };
}

function issues() {
    let url = "https://api.github.com/" + 'repos/' + info.owner + '/' + info.repo + '/issues';

    let rqs = new Request();
    rqs.get(url)
        .then(function (response) {
            let res = new ResponseHandler();
            res.createListOfIssues(response);
        });
}

function commits() {
    let url = "https://api.github.com/" + 'repos/' + info.owner + '/' + info.repo + '/commits';

    let rqs = new Request();
    rqs.get(url)
        .then(function (response) {
            let res = new ResponseHandler();
            res.createListOfCommits(response);
        });
}

function notifications() {
    let url = "https://api.github.com/" + 'notifications';

    let rqs = new Request();
    rqs.get(url)
        .then(function (response) {
            let res = new ResponseHandler();
            res.createListOfNotifications(response);
        });
}