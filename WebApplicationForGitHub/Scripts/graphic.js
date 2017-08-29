function GraphicHandler() {
    let worker = new WorkWithDOM();

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

    this.clear = function () {
        worker.removeElement('section');
    };

    this.checkTabs = function (activeTab) {
        worker.removeClassFromElementChildren('tab-bar', 'mdc-tab--active');
        worker.addClassToElement(activeTab, 'mdc-tab--active');
    };
}