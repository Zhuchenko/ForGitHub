function ResponseHandler() {
    let grp = new GraphicHandler();
    let worker = new WorkWithDOM();
    let self = this;
    let allIssues;

    this.saveListOfIssues = function (response) {
        if (isEmpty(response))
            return;

        let list = new Array(100);

        let len = response.length;
        let i = 0;
        let successful = 0;

        while (i < len) {
            if (response[i].state === "open") {
                list[successful] = {
                    'url': response[i]['html_url'],
                    'text': response[i].title,
                    'labels': response[i].labels,
                    'milestone': response[i].milestone,
                    'number': response[i].number
                };
                successful++;
            }

            i++;
        }

        list.length = successful;

        self.allIssues = list;
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
                'name': milestones[i].title
            };

            i++;
        }
        
        grp.showOptions(listOfLabels, listOfMilestones, self);
    }

    this.createIssuesToShow = function () {
        let labels = worker.getAllSelectedItems('label');
        
        let noLabelOption = false;
        if (labels.length === 0)
            noLabelOption = true;

        let unlabeled = false;
        if (!noLabelOption) {
            if (labels[0] === 'Unlabeled')
                unlabeled = true;
        }

        let listWithLabels = new Array(self.allIssues.length);

        let len = self.allIssues.length;
        let i = 0;
        let successful = 0;

        while (i < len) {
            let answer = true;

            if (!noLabelOption) {
                if (unlabeled) {
                    if (self.allIssues[i].labels.length != 0) {
                        answer = false;
                    }
                }
                else {
                    for (let j = 0, l = labels.length; j < l; j++) {
                        if (!contains(self.allIssues[i].labels,labels[j])) {
                            answer = false;
                        }
                    }
                }
            }

            if (answer) {
                listWithLabels[successful] = self.allIssues[i];
                successful++;
            }
            i++;
        }
        listWithLabels.length = successful;


        let milestone = worker.getSelectedItem('milestone');

        let noMilestoneOption = false;
        if (milestone === 'no object')
            noMilestoneOption = true;

        let noMilestone = false;
        if (milestone === 'Issues no milestone')
            noMilestone = true;

        let listToShow = new Array(10);

        len = listWithLabels.length;
        i = 0;
        successful = 0;

        while (i < len && successful < 10) {
            let answer = true;

            if (!noMilestoneOption) {
                if (noMilestone) {
                    if (listWithLabels[i].milestone)
                        answer = false;
                }
                else {
                    if (!listWithLabels[i].milestone)
                        answer = false
                    else {
                        if (!listWithLabels[i].milestone.title === milestone)
                            answer = false;
                    }
                }
            }

            if (answer) {
                listToShow[successful] = listWithLabels[i];
                successful++;
            }
            i++;
        }
        listToShow.length = successful;

        if (listToShow.length > 0) {
            grp.showTextListWithButton(listToShow);
        }
        else {
            grp.showMessage('List is empty');
        }
    }

    function contains(array, inner) {
        let i = 0;
        let len = array.length;
        
        let isContains = false;
        while (i < len) {
            if (array[i].name === inner) {
                isContains = true;
                break;
            }
            i++;
        }

        return isContains;
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