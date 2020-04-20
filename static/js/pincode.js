function goToNextInput(e) {
  var key = e.which,
    t = $(e.target),
    sib = t.next("input");

  if (t.attr("class").includes("pincode")) {
    if (key != 9 && (key < 48 || key > 191)) {
      e.preventDefault();
      return false;
    }

    if (key === 9) {
      return true;
    }

    if (!sib || !sib.length) {
      sib = body.find("input").eq(0);
    }
    sib.select().focus();
  }
}

function onKeyDown(e) {
  var key = e.which;
  t = $(e.target);

  if (key === 9 || (key >= 48 && key <= 191)) {
    return true;
  }

  if (t.attr("class").includes("pincode")) {
    e.preventDefault();
    return false;
  }
}

function onFocus(e) {
  $(e.target).select();
}

var body = $("body");

body.on("keyup", "input", goToNextInput);
body.on("keydown", "input", onKeyDown);
body.on("click", "input", onFocus);