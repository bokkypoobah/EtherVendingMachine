function formatNumber(n) {
    return n == null ? "" : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function logIt(s, t) {
  console.log(new Date().toLocaleTimeString() + " " + s + ":" + t);
}
