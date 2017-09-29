function Main() {
    let res = new ResponseHandler();
    let grp = new GraphicHandler();
    let self = this;

    this.preparations = function (activeTab) {
        grp.clear();
        grp.checkTabs(activeTab);
    };
    
    this.issues = function () {
        let url = "https://api.github.com/" + 'repos/' + info.owner + '/' + info.repo + '/issues';

        let rqs = new Request();
        rqs.get(url)
            .then(function (response) {
                res.saveListOfIssues(response);
                getOptions();
            });
    };

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

    this.addLabelToIssue = function () {
        let index = this.id.slice(-1);

        let link = document.getElementById('link' + index).href;

        let url = link.replace('github.com', 'api.github.com/repos');
        url += '/labels';
        let request = new Request();
        request.post(url, "resolved");
    }

    function getOptions() {
        let url = "https://api.github.com/" + 'repos/' + info.owner + '/' + info.repo + '/';
        
        let rqs = new Request();
        rqs.get(url + 'labels')
            .then(function (labels) {
                grp.clear();
                rqs.get(url + 'milestones')
                    .then(function (milestones) {
                        res.createListsOfOptions(labels, milestones);
                    });
            });
    }
}