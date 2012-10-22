//Simple html caching
function HtmlCache(opts){
  this.options = opts || {};
  this.cache = {};
  this.isCached = {};
}

HtmlCache.prototype.save = function (route, html){
  console.log('cached html saved for route ' + route);
  this.cache[route] = html;
  this.isCached[route] = true;
}

HtmlCache.prototype.check = function (route){
  if(this.isCached[route])
    return true;
  else
    return false
}

HtmlCache.prototype.get = function (route){
  if(this.cache[route])
    return this.cache[route];
  else
    return false
}
module.exports = HtmlCache;
