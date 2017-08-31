$(document).ready(function () {
    $('#issues').click(function () {
        let url = $(this).attr('href');
        common(url, 'issues')

        return false;
    });
});

$(document).ready(function () {
    $('#commits').click(function () {
        let url = $(this).attr('href');
        common(url, 'commits');

        return false;
    });
});

$(document).ready(function () {
    $('#notifications').click(function () {
        let url = $(this).attr('href');
        common(url, 'notifications');

        return false;
    });
});

function common(url, typeOfTag) {
    if (url !== window.location) {
        window.history.pushState(null, null, url);
    }

    let main = new Main();
    main.preparations(typeOfTag);

    let grp = new GraphicHandler();
    grp.showProgressBar();



    main[typeOfTag]();
}