let APIURL = "https://lh-cmadapp.herokuapp.com";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3001";
    break;

  case "https://craftmeadream317.herokuapp.com":
    APIURL = "https://lh-cmadapp.herokuapp.com";
    break;
default: APIURL = "https://lh-cmadapp.herokuapp.com";
        
}

export default APIURL;