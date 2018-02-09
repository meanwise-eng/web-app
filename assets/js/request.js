(function() {
    function RequestPaginator(url, itemCount) {
        this.url = url;
        this.nextUrl = null;
        this.previousUrl = null;
    };

    RequestPaginator.prototype.prime = function() {
        return this.request(this.url);
    };

    RequestPaginator.prototype.request = function(url) {
        var request = $.get(url);
        request.done(function(resp) {
            this.nextUrl = resp.forward;
            this.previousUrl = resp.backward;
        }.bind(this));

        return request;
    };

    RequestPaginator.prototype.previous = function() {
        var previousUrl = this.getPreviousUrl();

        return this.request(previousUrl);
    };

    RequestPaginator.prototype.next = function() {
        var nextUrl = this.getNextUrl();

        return this.request(nextUrl);
    };

    RequestPaginator.prototype.getNextUrl = function() {
        return this.nextUrl;
    };

    RequestPaginator.prototype.getPreviousUrl = function() {
        return this.previousUrl;
    };

    RequestPaginator.prototype.hasPrevious = function() {
        return this.previousUrl != null;
    };

    RequestPaginator.prototype.hasNext = function() {
        return this.nextUrl != null;
    };

    window.RequestPaginator = RequestPaginator;
})();
