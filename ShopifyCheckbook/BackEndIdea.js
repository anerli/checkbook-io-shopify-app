fetch(request)
  .then(response => response.blob())
  .then(blob => {
    image.src = URL.createObjectURL(blob);
  }); 

var url = Request.clone(request);

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    parser.href = url;
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
} 

var urlnew = protocol; 
var urlnew1 = hostname;  
Request(urlnew, urlnew1); 
