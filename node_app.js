var redis = require("redis"), client = redis.createClient();
var http = require('http');

var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    queries = queryString.split("&");
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};

http.createServer(function (req, res) {
  var q = parseQueryString(req.url.substring(req.url.indexOf('?') + 1));
  if (typeof(q["q"]) != 'undefined'){
	  var query = decodeURIComponent(decodeURI(q["q"])).toLowerCase();
	  var callback = q["callback"];
	  console.log("query: " + query); 
	  client.zrangebylex('icd9', '[' + query, '[' + query + '\xff', 
		function(err, reply){
		if (err !== null){
		  console.log("error: " + err);
		} else {
		  res.writeHead(200, {'Content-Type': 'text/plain'});
		  var replies = [];
		  for(var i = 0; i< reply.length; i++)
			replies.push(reply[i].split("$")[1]);
		  replies = replies.sort();
		  var str = callback + '( ' + JSON.stringify(replies) + ')';
		  res.end(str);
		}
	  });
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
