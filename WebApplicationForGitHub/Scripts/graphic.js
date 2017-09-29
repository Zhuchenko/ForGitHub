function GraphicHandler() {
    let worker = new WorkWithDOM();
    let forOnchange;
    
    this.showProgressBar = function () {
        worker.createElement('figure', 'figure');

        worker.createElement('div', 'progressbar', 'figure');
        worker.addAttribute('progressbar', 'role', 'progressbar');
        worker.addClassToElement('progressbar', 'mdc-linear-progress');
        worker.addClassToElement('progressbar', 'mdc-linear-progress--indeterminate');

        worker.createElement('div', 'div-buffering-dots', 'progressbar');
        worker.addClassToElement('div-buffering-dots', 'mdc-linear-progress__buffering-dots');

        worker.createElement('div', 'div-buffer', 'progressbar');
        worker.addClassToElement('div-buffer', 'mdc-linear-progress__buffer');

        worker.createElement('div', 'div-primary-bar', 'progressbar');
        worker.addClassToElement('div-primary-bar', 'mdc-linear-progress__bar');
        worker.addClassToElement('div-primary-bar', 'mdc-linear-progress__primary-bar');

        worker.createElement('span', 'span-for-primary-bar', 'div-primary-bar');
        worker.addClassToElement('span-for-primary-bar', 'mdc-linear-progress__bar-inner');

        worker.createElement('div', 'div-secondary-bar', 'progressbar');
        worker.addClassToElement('div-secondary-bar', 'mdc-linear-progress__bar');
        worker.addClassToElement('div-secondary-bar', 'mdc-linear-progress__secondary-bar');

        worker.createElement('span', 'span-for-secondary-bar', 'div-secondary-bar');
        worker.addClassToElement('span-for-secondary-bar', 'mdc-linear-progress__bar-inner');
    };

    this.showTextListWithButton = function (list) {
        worker.removeElement('section');
        worker.createElement('section', 'section');

        worker.createElement('ul', 'list', 'section');
        worker.addClassToElement('list', 'mdc-list');

        let len = list.length;
        let i = 0;

        while (i < len && i < 10) {
            worker.createElement('li', 'element' + i, 'list');
            worker.addClassToElement('element' + i, 'mdc-list-item');
            worker.addClassToElement('element' + i, 'withMargin');

            worker.createElement('a', 'link' + i, 'element' + i);
            worker.addAttribute('link' + i, 'href', list[i].url);

            worker.createElement('button', 'copy' + i, 'element' + i);
            worker.addAttribute('copy' + i, 'textContent', 'Copy');
            worker.addAttribute('copy' + i, 'onclick', worker.copy);

            let main = new Main();
            worker.createElement('button', 'addLabel' + i, 'element' + i);
            worker.addAttribute('addLabel' + i, 'textContent', "Add 'resolved'");
            worker.addAttribute('addLabel' + i, 'onclick', main.addLabelToIssue);

            worker.createElement('p', 'text' + i, 'link' + i);
            worker.addAttribute('text' + i, 'innerText', list[i].text);
            worker.addClassToElement('text' + i, 'listTextItem');
            worker.addClassToElement('text' + i, 'mds-typography--headline');
            worker.addClassToElement('text' + i, 'textTwoLines');

            i++;
        }
    };

    this.showTextList = function (list) {
        worker.createElement('section', 'section');

        worker.createElement('ul', 'list', 'section');
        worker.addClassToElement('list', 'mdc-list');

        let len = list.length;
        let i = 0;

        while (i < len && i < 10) {
            worker.createElement('li', 'element' + i, 'list');
            worker.addClassToElement('element' + i, 'mdc-list-item');
            worker.addClassToElement('element' + i, 'withMargin');

            worker.createElement('a', 'link' + i, 'element' + i);
            worker.addAttribute('link' + i, 'href', list[i].url);

            worker.createElement('p', 'text' + i, 'link' + i);
            worker.addAttribute('text' + i, 'innerText', list[i].text);
            worker.addClassToElement('text' + i, 'listTextItem');
            worker.addClassToElement('text' + i, 'mds-typography--headline');
            worker.addClassToElement('text' + i, 'textTwoLines');

            i++;
        }
    };

    this.showTextListWithAvatar = function (list) {
        worker.createElement('section', 'section');

        worker.createElement('ul', 'list', 'section');
        worker.addClassToElement('list', 'mdc-list');

        let len = list.length;
        let i = 0;

        while (i < len && i < 10) {
            worker.createElement('li', 'element' + i, 'list');
            worker.addClassToElement('element' + i, 'mdc-list-item');
            worker.addClassToElement('element' + i, 'withMargin');

            worker.createElement('img', 'image' + i, 'element' + i);
            worker.addClassToElement('image' + i, 'mdc-list-item__start-detail')
            let valueOfSrc;
            if (list[i].reason === "assign")
                valueOfSrc = "/images/assign.png";
            else valueOfSrc = "/images/mention.png";
            worker.addAttribute('image' + i, 'src', valueOfSrc);


            worker.createElement('a', 'link' + i, 'element' + i);
            worker.addAttribute('link' + i, 'href', list[i].url);

            worker.createElement('p', 'text' + i, 'link' + i);
            worker.addAttribute('text' + i, 'innerText', list[i].text);
            worker.addClassToElement('text' + i, 'listTextItem');
            worker.addClassToElement('text' + i, 'mds-typography--headline');
            worker.addClassToElement('text' + i, 'textTwoLines');
        }
        i++;
    };

    this.showOptions = function (labels, milestones, res) {
        worker.createElement('section', 'options');

        forOnchange = res;

        showLabels(labels);
        showMilestones(milestones);   

        res.createIssuesToShow();
    };

    function showLabels(list) {
        worker.createElement('select', 'label', 'options');
        worker.addAttribute('label', 'multiple', true);

        worker.addAttributeOnchande('label', optionProcessor);

        worker.createElement('option', 'label0', 'label');
        worker.addAttribute('label0', 'innerText', 'Unlabeled');

        for (let i = 0, len = list.length; i < len; i++) {
            worker.createElement('option', 'label' + (i + 1), 'label');
            worker.addAttribute('label' + (i+1), 'innerText', list[i].name);
        }
    }

    function showMilestones(list) {
        worker.createElement('select', 'milestone', 'options');

        worker.addAttributeOnchande('milestone', optionProcessor);

        worker.createElement('option', 'milestone0', 'milestone');
        worker.addAttribute('milestone0', 'innerText', 'no object');
        worker.addAttribute('milestone0', 'selected', true);

        worker.createElement('option', 'milestone1', 'milestone');
        worker.addAttribute('milestone1', 'innerText', 'Issues no milestone');

        for (let i = 0, len = list.length; i < len; i++) {
            worker.createElement('option', 'milestone' + (i + 2), 'milestone');
            worker.addAttribute('milestone' + (i + 2), 'innerText', list[i].name);
        }
    }

    function optionProcessor() {
        if (this.id === 'label') {
            if (this.selectedIndex === 0) {
                let i = 1;
                let condition = true;

                while (condition) {
                    condition = worker.unselectItem('label' + i);
                    i++;
                }
            }
        }
        forOnchange.createIssuesToShow();
    }

    this.showMessage = function (text) {
        worker.removeElement('section');
        worker.createElement('section', 'section');

        worker.createElement('p', 'text', 'section');
        worker.addAttribute('text', 'innerText', text);
        worker.addClassToElement('text', 'mds-typography--headline');
        worker.addClassToElement('text', 'center');
    };

    this.clear = function () {
        worker.removeElement('section');
        worker.removeElement('figure');
        worker.removeElement('options');
    };

    this.checkTabs = function (activeTab) {
        worker.removeClassFromElementChildren('tab-bar', 'mdc-tab--active');
        worker.addClassToElement(activeTab, 'mdc-tab--active');
    };
}