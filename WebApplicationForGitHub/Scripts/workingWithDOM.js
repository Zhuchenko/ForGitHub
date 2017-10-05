function WorkWithDOM() {
    let self = this;

    this.removeElement = function (id) {
        let element = document.getElementById(id);
        if (element) {
            document.body.removeChild(element);
        }
    };

    this.removeClassFromElementChildren = function (id, className) {
        let element = document.getElementById(id);
        let len = element.children.length;
        let i = 0;

        while (i < len) {
            element.children[i].classList.remove(className);
            i++;
        }
    };

    this.addClassToElement = function (id, className) {
        let element = document.getElementById(id);
        element.classList.add(className);
    };

    this.createElement = function (tag, id, idOfParent) {
        let element = document.createElement(tag);

        if (id)
            element.id = id;

        if (idOfParent) {
            let parent = document.getElementById(idOfParent);
            parent.appendChild(element);
        }
        else
            document.body.appendChild(element);
    };

    this.addAttribute = function (id, name, value) {
        let element = document.getElementById(id);
        element[name] = value;
    };

    this.addAttributeOnchande = function (id, func) {
        let element = document.getElementById(id);
        element.onchange = func;
    };

    this.unselectItem = function (id) {
        let element = document.getElementById(id);
        if (element) {
            element.selected = false;
            return true;
        }
        return false;
    }

    this.copy = function () {
        let index = this.id.slice(-1);

        let link = document.getElementById('link' + index).href;

        self.createElement('input', 'textForCopying');
        self.addAttribute('textForCopying', 'value', link)

        document.querySelector('#textForCopying').select();
        document.execCommand('copy');

        self.removeElement('textForCopying');
    }

    this.getAllSelectedItems = function (id) {
        let len = 50;
        let list = new Array(len);
        let i = 0;
        let successful = 0;
        while (i < len) {
            let element = document.getElementById(id + i);
            if (!element)
                break;
            if (element.selected) {
                list[successful] = element.innerText;
                successful++;
            }
            i++;
        }
        list.length = successful;
        return list;
    };

    this.getSelectedItem = function (id) { 
        let element = document.getElementById('default' + id);
        if (element.selected) {
            return element.innerText;
        }

        element = document.getElementById('no' + id);
        if (element.selected) {
            return element.innerText;
        }

        let i = 0;
        let len = 100;
        while (i < len) {
            element = document.getElementById(id + i);
            if (element) {
                if (element.selected) {
                    return element.innerText.replace(id, '');
                }
            }
            i++;
        }
    };
}