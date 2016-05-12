var client = require('../lib')({
    consumerKey: '8925DE28-88C5-427D-B67B-10C35772EB00',
    consumerSecret: '0246CFCF-29C6-4889-9458-3B07535DF58E',
    baseUrl: 'https://jbapi.pxlpro.co.uk/restapi'
});

client.get('/jobinfo/search/', function(error, response, json){
    if (error || response.statusCode != 200) {
        console.log('Error', error || response.statusCode);
    } else {
        console.log('Can successfully search! Count:', json.result.jobs.length);
    };
});

// client.get('/taxonomy', {
//  oauth: false
// }, function(error, response, json){
//     if (error || response.statusCode != 200) {
//         console.log('Error', error || response.statusCode);
//     } else {
//         console.log('Taxonomy:', json.result);
//     };
// });

// client.get('/oauth/request',{
//     data: {
//         trackid:1
//     },
//     oauth: {
//         oauth_callback: 'oob'
//     }
// }, function(error, response, json){
//     if (error || response.statusCode != 200) {
//         console.log('Error', error || response.statusCode);
//     } else {
//         console.log('Taxonomy:', json.result);
//     };
// });

