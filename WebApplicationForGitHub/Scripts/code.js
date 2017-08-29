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

        let useful = new UsefulInfo();
        let url = useful.getUrl(typeOfTab);
        let doAfter = useful.getDoAfter(typeOfTab);

        let rqs = new Request();
        rqs.get(url)
            .then(function (response) {
                doAfter(response);
            });
    };
}

function UsefulInfo() {
    this.getUrl = function (type) {
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
    };

    this.getDoAfter = function (type) {
        let res = new ResponseHandler();
        let doAfter;

        if (type === 'issues') {
            doAfter = res.createListOfIssues;
        }

        if (type === 'commits') {
            doAfter = res.createListOfCommits;
        }

        if (type === 'notifications') {
            doAfter = res.createListOfNotifications;
        }

        return doAfter;
    };
}