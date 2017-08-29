function WorkWithDOM() {
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
}