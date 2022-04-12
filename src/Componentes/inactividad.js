import Cookies from "universal-cookie";
const cookies = new Cookies();

var timeoutID;
export function Rem() {
  
  startTimer();

}
function startTimer() {
  // wait 2 seconds before calling goInactive
  timeoutID = window.setTimeout(goInactive, 3000);
}

function resetTimer(e) {
  window.clearTimeout(timeoutID);

  goActive();
}

function goInactive() {
  // do something
  //alert("inactivo");
  cookies.remove("id_usuario", { path: "/" });
  cookies.remove("rol", { path: "/" });
  window.location.href = "../src/Login.js";
  window.location.reload();
}

function goActive() {
  // do something

  startTimer();
}
