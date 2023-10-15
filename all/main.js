let x, y, r;

$(document).ready(function () {
    $.post("main.php", {
        'state': 1
    }).done(function (data) {
        $('#result-table tr:first').after(data);
    });
});

function chooseR(element) {
    r = element.value;
    [...document.getElementsByClassName("r-button")].forEach(function (btn) {
        btn.style.transform = "";
    });
    element.style.transform = "scale(1.1)";
}

function submit() {
    $('#errors').empty();
    $('tr.hit-no').empty();
    $('tr.hit-yes').empty();

    x = document.querySelector("input[name=number]:checked").value;
    if (validateY() & validateR()) {
        $.post("main.php", {
            'x': x,
            'y': y,
            'r': r,
            'timezone': new Date().getTimezoneOffset(),
            'state': 0
        }).done(function (data) {
            $('#result-table tr:first').after(data);
        });
    } else {
        $.post("main.php", {
            'state': 1
        }).done(function (data) {
            $('#result-table tr:first').after(data);
        });
    }
}

function clearTable() {
    $('#errors').empty();
    $('tr.hit-no').empty();
    $('tr.hit-yes').empty();

    $.post("main.php", {
        'state': 2
    });
}

function validateY() {
    y = document.querySelector("input.y").value.replace(",", ".");
    if (y==""){
        showError("Error: y is empty!");
        return false;
    }
    if (y == undefined) {
        showError("Error: Type y!");
        return false;
    }
    if (!isNumeric(y)) {
        showError("Error: y is not numeric!");
        return false;
    }
    if (!((y >= -5) && (y <= 5))) {
        showError("Error: Y does not fit in range of allowable values!");
        return false;
    }
    return true;
}

function validateR() {
    if (r)
        return true;

    showError("Error: Choose R!");
    return false;
}
r
function showError(message) {
    $('#errors').append(`<li>${message}</li>`);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}



