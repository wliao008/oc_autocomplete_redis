var redis = require("redis"), 
	client = redis.createClient();
var http = require('http');
http.createServer(function (req, res) {
  var q = parseQueryString(req.url.substring(req.url.indexOf('?') + 1));
  //console.log(q);
  //console.log("q: " + q["q"]);
  if (typeof(q["q"]) != 'undefined'){
	  var query = decodeURI(q["q"]);
	  console.log("query: " + query);
	  client.zrangebylex('icd9', '[' + query, '[' + query + '\\xff', function(err, reply){
		if (err !== null){
		  console.log("error: " + err);
		} else {
		  res.writeHead(200, {'Content-Type': 'text/html'});
		  var str = '<select style="width:600px;">';
		  //res.end(reply.toString());
		  //var objs = console.dir(reply);
		  //console.log(reply);
		  //console.log(reply.length);
		  for(var i = 0; i< reply.length; i++){
			var data = reply[i].split("$");
			str += '<option value="' + data[0] + '">' + data[1] + '</option>';
			//console.log(obj.split("$")[1]);
		  }
		  str += "</select>";
		  res.end(str);
		}
	  });
  }
}).listen(1337, '127.0.0.1');

var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
 
    // Split into key/value pairs
    queries = queryString.split("&");
 
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
 
    return params;
};

console.log('Server running at http://127.0.0.1:1337/');
