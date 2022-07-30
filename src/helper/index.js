export const iscedula = function (cedula) {
  let array = cedula.split("");
  let num = array.length;
  if (num == 10) {
    let total = 0;
    let digito = array[9] * 1;
    for (let i = 0; i < num - 1; i++) {
      let mult = 0;
      if (i % 2 != 0) {
        total = total + array[i] * 1;
      } else {
        mult = array[i] * 2;
        if (mult > 9) total = total + (mult - 9);
        else total = total + mult;
      }
    }
    let decena = total / 10;
    decena = Math.floor(decena);
    decena = (decena + 1) * 10;
    let final = decena - total;
    if ((final == 10 && digito == 0) || final == digito) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
