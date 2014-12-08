var redis = require("redis"), 
	client = redis.createClient();
var http = require('http');
http.createServer(function (req, res) {
  var q = parseQueryString(req.url.substring(req.url.indexOf('?') + 1));
  if (typeof(q["q"]) != 'undefined'){
	  var query = decodeURI(q["q"]);
	  console.log("query: " + query);
	  client.zrangebylex('icd9', '[' + query, '[' + query + '\\xff', 
		function(err, reply){
		if (err !== null){
		  console.log("error: " + err);
		} else {
		  res.writeHead(200, {'Content-Type': 'text/html'});
		  var str = '<select style="width:600px;">';
		  for(var i = 0; i< reply.length; i++){
			var data = reply[i].split("$");
			str += '<option value="' + data[1].split(' - ')[0] + '">' 
				+ data[1] + '</option>';
		  }
		  str += "</select>";
		  res.end(str);
		}
	  });
  }
}).listen(1337, '127.0.0.1');

var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    queries = queryString.split("&");
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};

console.log('Server running at http://127.0.0.1:1337/');
