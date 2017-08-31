function ResponseHandler() {
    let grp = new GraphicHandler();

    this.createListOfIssues = function (response) {
        if (isEmpty(response))
            return;

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

        grp.showTextList(list);
    };

    this.createListOfCommits = function (response) {
        if (isEmpty(response))
            return;

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

        grp.showTextList(list);
    };

    this.createListOfNotifications = function (response) {
        if (isEmpty(response))
            return;

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

        grp.showTextListWithAvatar(list);
    }

    function isEmpty(response) {
        if (response.length === 0)
        {
            grp.showMessage('List is empty');
            return true;
        }

        return false;
    };
}