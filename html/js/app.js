function getSearchParameter(name) {
  var search = window.location.search.substring(1);
  var pairs = search.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    var key = decodeURIComponent(pair[0]);
    if (name == key) {
			var value = decodeURIComponent(pair[1].replace(/\+/g, " ").replace(/%2B/ig, "\+"));
      return value;
    }
  }
  return "";
}

// function parametersContainKey(keyName) {
//   var search = window.location.search.substring(1);
//   var pairs = search.split('&');
//   for (var i = 0; i < pairs.length; i++) {
//     var pair = pairs[i].split('=');
//     var key = decodeURIComponent(pair[0]);
//     if (key == keyName) {
//       return true;
//     }
//   }
//   return false;
// }
