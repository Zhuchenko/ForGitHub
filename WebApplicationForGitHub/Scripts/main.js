function Main() {
    let res = new ResponseHandler();
    let grp = new GraphicHandler();

    this.preparations = function (activeTab) {
        grp.clear();
        grp.checkTabs(activeTab);
    };

    this.issues = function() {
        let url = "https://api.github.com/" + 'repos/' + info.owner + '/' + info.repo + '/issues';

        let rqs = new Request();
        rqs.get(url)
            .then(function (response) {
                grp.clear();
                res.createListOfIssues(response);
            });
    }

    this.commits = function() {
        let url = "https://api.github.com/" + 'repos/' + info.owner + '/' + info.repo + '/commits';

        let rqs = new Request();
        rqs.get(url)
            .then(function (response) {
                grp.clear();
                res.createListOfCommits(response);
            });
    }

    this.notifications = function() {
        let url = "https://api.github.com/" + 'notifications';

        let rqs = new Request();
        rqs.get(url)
            .then(function (response) {
                grp.clear();
                res.createListOfNotifications(response);
            });
    }
}