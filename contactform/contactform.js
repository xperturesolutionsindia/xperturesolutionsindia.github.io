"use strict";

jQuery(document).ready(function ($) { 
  // Contact form submission
  $("form.contactForm").submit(function () {
    var f = $(this).find(".form-group"),
      ferror = false,
      emailExp = /^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i;

    // Validate inputs
    f.children("input").each(function () {
      var i = $(this); // Current input
      var rule = i.attr("data-rule");
      if (rule !== undefined) {
        var ierror = false; // Error flag for current input
        var pos = rule.indexOf(":");
        var exp = pos >= 0 ? rule.slice(pos + 1) : null;
        rule = pos >= 0 ? rule.slice(0, pos) : rule;

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;
          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
          case "email":
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
          case "checked":
            if (!i.is(":checked")) {
              ferror = ierror = true;
            }
            break;
          case "regexp":
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
          default:
            console.warn(`Unknown rule: ${rule}`);
        }
        i.next(".validation")
          .html(ierror ? i.attr("data-msg") || "Wrong Input" : "")
          .show("blind");
      }
    });

    // Validate textareas
    f.children("textarea").each(function () {
      var i = $(this);
      var rule = i.attr("data-rule");
      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(":");
        var exp = pos >= 0 ? rule.slice(pos + 1) : null;
        rule = pos >= 0 ? rule.slice(0, pos) : rule;

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;
          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
          default:
            console.warn(`Unknown rule: ${rule}`);
        }
        i.next(".validation")
          .html(ierror ? i.attr("data-msg") || "Wrong Input" : "")
          .show("blind");
      }
    });

    // If errors exist, stop form submission
    if (ferror) return false;

    // Prepare form data
    var str = $(this).serialize();
    console.log('action is'+$(this).attr("action"));
    var action = $(this).attr("action") || "contactform.php"; 
    // AJAX form submission
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function (msg) {  
        if (msg === "Your message has been sent successfully.") {
            $("#sendmessage").addClass("show");
            $("#errormessage").removeClass("show");
            $('.contactForm').find("input, textarea").val("");
          } else {
            $("#sendmessage").removeClass("show");
            $("#errormessage").addClass("show").html(msg);
          }
      },
    });

    return false;
  });
});
