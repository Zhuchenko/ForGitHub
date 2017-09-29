function Request() {
    let valueOfHeader = "token " + info.token;

    this.get = function (url) {
        return fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": valueOfHeader
            }
        })
            .then(function (response) {
                return response.json();
            }).catch(function (ex) {
                alert('error');
            });
    };

    this.post = function (url, object) {
        var data = '["' + object + '"]';
        
        return fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": valueOfHeader
            },
            method: "POST",
            body: data
        })
            .then(function (response) {
                return response.json();
            }).catch(function (ex) {
                alert('error');
            });
    };
}