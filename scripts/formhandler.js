var did_modal_pop = false;
var achievers = [];

(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var email = $("#emailInput").val();
            var strength = $("#strengthLevel").val();
            var flavor = $("#flavorshot").find(":selected").val();
            var size = $("input[name=size]:checked").val();
            if ((strength > 66 && flavor != '' && size === 'coffeezilla' && did_modal_pop === false) || (achievers.indexOf(email) === 0 && did_modal_pop === false)) {
                //HANDLE MODAL
                did_modal_pop = true;
                achievers.push(email);
                $("#myModal").modal('show');
            } else {
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
                did_modal_pop = false;
                $("#powerBar").hide();
                $("#range-label").empty();
                $("#range-label").append('Caffeine Rating: 30');
                $("#range-label").css("color", "green");
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);

$("#strengthLevel").change(function(event) {
    var label = document.getElementById("['range-label']");
    $("#range-label").empty();
    $("#range-label").append('Caffeine Rating: ' + this.value);
    if (this.value <= 33) {
        $("#range-label").css("color", "green");
    } else if (this.value > 33 && this.value <= 66) {
        $("#range-label").css("color", "yellow");
    } else {
        $("#range-label").css("color", "red");
    }
})

$("#claim-bonus").on("click", function() {
    $("#myModal").modal('hide');
    $("#powerBar").show();
})

$("#no-bonus").on("click", function() {
    $("#myModal").modal('hide');
})
