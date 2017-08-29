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
}