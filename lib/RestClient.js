var request = require('request');
var queryString = require('query-string');
var _ = require('lodash');
var OAuth   = require('oauth-1.0a');

var oauth;
var options = {
    baseUrl: false,
    deviceId: 'nodelib'
};

function RestClient(opts) {

    options = _.assignIn(options, opts);

    oauth = OAuth({
        consumer: {
            public: options.consumerKey,
            secret: options.consumerSecret
        },
        signature_method: 'HMAC-SHA1'
    });

}

RestClient.prototype.get = function(url, opts, callback) {
    var client = this;
    var data = {};

    if (typeof opts == 'function') {
        callback = opts;
    }

    if (typeof opts == 'object') {
        data = _.assignIn({
            deviceid: options.deviceId
        }, opts);
    }

    var request_data = {
        url: options.baseUrl + url + '?' + queryString.stringify(data),
        method: 'GET',
        // data: data
    };

    var requestOptions = {
        uri: request_data.url,
        method: request_data.method,
        qs: request_data.data,
    };

    if (opts.oauth !== false) {
        requestOptions.headers = oauth.toHeader(oauth.authorize(request_data));
    }


    request(requestOptions, function(error, response, body){

        if (error || response.statusCode != 200) {
            callback(error, response, body);
            return;
        }else{
            try {
                body = JSON.parse(body);
            } catch(e){
                error = 'Unable to parse JSON response';
                callback(error, response, body);
                return;
            }

            if (body.status == 'fail' && body.result.errors.length) {
                error = body.result.errors.map(function(item){
                    return item.message;
                }).join('\n');

                callback(error, response, body);
                return;
            }

            callback(error, response, body);

        }

    });

};


module.exports = RestClient;