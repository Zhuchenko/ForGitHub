function ResponseHandler() {
    let grp = new GraphicHandler();
    let worker = new WorkWithDOM();

    this.showListOfIssues = function (response) {
        if (isEmpty(response))
            return;

        let list = new Array(10);

        let len = response.length;
        let i = 0;
        let successful = 0;

        while (i < len) {
                list[successful] = {
                    'url': response[i]['html_url'],
                    'text': response[i].title
                };
                successful++;
            
            i++;
        }

        list.length = successful;

        grp.showTextListWithButton(list);
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
            };
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
            };

            i++;
        }

        list.length = i;
        
        grp.showTextListWithAvatar(list);
    }

    this.createListsOfOptions = function (labels, milestones)
    {
        let len = labels.length;
        let i = 0;

        let listOfLabels = new Array(len);

        while (i < len) {
            listOfLabels[i] = {
                'name': labels[i].name
            };

            i++;
        }

        len = milestones.length;
        i = 0;

        let listOfMilestones = new Array(len);

        while (i < len && i < 10) {
            listOfMilestones[i] = {
                'title': milestones[i].title,
                'number': milestones[i].number
            };

            i++;
        }
        
        grp.showOptions(listOfLabels, listOfMilestones, self);
    }

    function isEmpty(response) {
        if (response.length === 0)
        {
            grp.showMessage('List is empty');
            return true;
        }

        return false;
    }
}