function Main() {
    let res = new ResponseHandler();
    let grp = new GraphicHandler();
    let worker = new WorkWithDOM();
    let self = this;

    this.preparations = function (activeTab) {
        grp.clear();
        grp.checkTabs(activeTab);
    };
    
    this.issues = function () {
        getOptions();
    };

    this.getIssues = function () {
        let url = "https://api.github.com/" + 'repos/' + info.owner + '/' + info.repo + '/issues?state=open';

        let labels = worker.getAllSelectedItems('label');
        
        if (labels.length !== 0) {
            if (labels[0] !== 'Unlabeled') {
                url += '&labels=' + labels[0];
                for (let i = 1, l = labels.length; i < l; i++) {
                    url += ',' + labels[i];
                }
            }
        }

        let milestone = worker.getSelectedItem('milestone');
        
        if (milestone !== 'no object') {
            url += '&milestone=';
            if (milestone === 'Issues no milestone') {
                url += 'none';
            }
            else {
                url += milestone.number;
            }

        }
        
        let rqs = new Request();
        rqs.get(url)
            .then(function (response) {
                res.showListOfIssues(response);
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
                        self.getIssues();
                    });
            });
    }
}