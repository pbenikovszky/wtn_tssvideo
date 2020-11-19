window.addEventListener(
  "load",
  function() {
    document.addEventListener("touchstart", {});
  },
  false
);

var submitProgress = false;
var productTaxRates = "";
var productTaxRateDefault = "";
var taxRateVat = "";
var taxRateBrutto = "";
var taxRateVatSum = "";
var shippingTaxRates = "";
var shippingTaxRateDefault = "";
var recaptchaResponse = "";
var localTimeZone = Intl
  ? Intl.DateTimeFormat().resolvedOptions().timeZone
  : "Europe/Budapest";
glsPontok = "";
mmjQuery = jQuery.noConflict();

mmjQuery(window).load(function() {
  var parent_url = decodeURIComponent(document.location.hash.replace(/^#/, "")),
    link;

  var error = false;
  var emailuniquefail = false;
  var emailuniquecheck = false;
  var checkNum = 0;

  function setHeight(extraHeight) {
    try {
      messaging.postMessage(
        {
          if_height: parseInt(mmjQuery.getDocHeight()) + extraHeight,
          form_id: 180624
        },
        parent_url,
        parent
      );
      /* Set referer hidden field */
      if (
        mmjQuery("#mssysform1806241562750927 input[name='mssys_referer_page']")
          .length == 0
      ) {
        mmjQuery("#mssysform1806241562750927").append(
          '<input type="hidden" name="mssys_referer_page" value="' +
            parent_url +
            '">'
        );
      }
    } catch (err) {
      /* There is no parent window */
    }
  }

  var prevent_multiple_submit_code =
    Math.floor(Date.now() / 1000) +
    "" +
    Math.floor(Math.random() * 9999999999 + 1);
  mmjQuery("#mssysform1806241562750927 input[name='mssys_submit_params']").val(
    prevent_multiple_submit_code
  );

  mmjQuery(".mezo863053").hide();

  mmjQuery(
    "#mmform-container1562750927 > fieldset.submitpart > div.submitcontainer"
  ).click(function(e) {
    if (mmjQuery("#local-time-zone-input").length === 0) {
      var localInput = document.createElement("input");
      localInput.type = "hidden";
      localInput.id = "local-time-zone-input";
      localInput.name = "local-time-zone";
      localInput.value = localTimeZone;
      mmjQuery("#mmform-container1562750927").append(localInput);
    }

    vatCheck = false;

    if (mmjQuery(this).attr("id") == "want_upsell") {
      mmjQuery(
        "#mssysform1806241562750927 input[name='mssys_want_upsell']"
      ).val("1");
    } else if (mmjQuery(this).attr("id") == "dont_want_upsell") {
      mmjQuery(
        "#mssysform1806241562750927 input[name='mssys_want_upsell']"
      ).val("0");
    }
    mmjQuery("#mssysform1806241562750927").trigger("submit");
  });
  if (mmjQuery("#mmform-container1562750927 .postalsamechk").length > 0) {
    if (mmjQuery("#mmform-container1562750927 .postalsamechk").is(":checked")) {
      mmjQuery(
        "#mmform-container1562750927 div[id^='containermssys_postal_']"
      ).hide();
    }
  }
  mmjQuery("#mmform-container1562750927 .postalsamechk").click(function() {
    if (mmjQuery(this).prop("checked")) {
      mmjQuery(
        "#mmform-container1562750927 div[id^='containermssys_postal_']"
      ).hide();
    } else {
      mmjQuery(
        "#mmform-container1562750927 div[id^='containermssys_postal_']"
      ).show();
    }
    setHeight(0);
  });
  if (mmjQuery("#mmform-container1562750927 .billsamechk").length > 0) {
    if (mmjQuery("#mmform-container1562750927 .billsamechk").is(":checked")) {
      mmjQuery(
        "#mmform-container1562750927 div[id^='containermssys_bill_']"
      ).hide();
    }
  }
  mmjQuery("#mmform-container1562750927 .billsamechk").click(function() {
    if (mmjQuery(this).prop("checked")) {
      mmjQuery(
        "#mmform-container1562750927 div[id^='containermssys_bill_']"
      ).hide();
    } else {
      mmjQuery(
        "#mmform-container1562750927 div[id^='containermssys_bill_']"
      ).show();
    }
    setHeight(0);
  });

  mmjQuery("#mssysform1806241562750927").submit(function(event) {
    if (submitProgress) {
      event.preventDefault();
      return false;
    }
    error = false;
    emailuniquefail = false;
    submitProgress = true;

    var osm_shipping_method_type = mmjQuery(
      "#mmform-container1562750927 input[name='shipping_method']:checked"
    ).attr("osm_shipping_methods");

    mmjQuery("#mmform-container1562750927 .error-container").hide();
    mmjQuery("#mmform-container1562750927 .error-field").removeClass(
      "error-field"
    );

    /*mmjQuery("input[name='form_submit']").attr('disabled',true);*/
    if (mmjQuery("#mmform-container1562750927 .submitbutton img").length == 0) {
      mmjQuery("#mmform-container1562750927 .submitbutton").html(
        "Feldolgozás..."
      );
    }
    if (
      mmjQuery("#mmform-container1562750927 .postalsamechk").prop("checked") &&
      osm_shipping_method_type != "pickpackpont" &&
      osm_shipping_method_type != "shipping_glspont" &&
      osm_shipping_method_type != "mplpont"
    ) {
      mmjQuery("#mmform-container1562750927 #mssys_postal_company").val(
        mmjQuery("#mmform-container1562750927 #mssys_bill_company").val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_postal_country").val(
        mmjQuery(
          "#mmform-container1562750927 #mssys_bill_country option:selected"
        ).val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_postal_zip").val(
        mmjQuery("#mmform-container1562750927 #mssys_bill_zip").val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_postal_city").val(
        mmjQuery("#mmform-container1562750927 #mssys_bill_city").val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_postal_address").val(
        mmjQuery("#mmform-container1562750927 #mssys_bill_address").val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_postal_state").val(
        mmjQuery("#mmform-container1562750927 #mssys_bill_state").val()
      );
    }
    if (mmjQuery("#mmform-container1562750927 .billsamechk").prop("checked")) {
      if (
        osm_shipping_method_type == "pickpackpont" ||
        osm_shipping_method_type == "shipping_glspont" ||
        (osm_shipping_method_type == "mplpont" &&
          (mmjQuery("#mmform-container1562750927 #mssys_lastname").val() !=
            "" ||
            mmjQuery("#mmform-container1562750927 #mssys_firstname").val() !=
              ""))
      ) {
        mmjQuery("#mmform-container1562750927 #mssys_bill_company").val(
          mmjQuery("#mmform-container1562750927 #mssys_lastname").val() +
            " " +
            mmjQuery("#mmform-container1562750927 #mssys_firstname").val()
        );
      } else {
        mmjQuery("#mmform-container1562750927 #mssys_bill_company").val(
          mmjQuery("#mmform-container1562750927 #mssys_postal_company").val()
        );
      }
      mmjQuery("#mmform-container1562750927 #mssys_bill_country").val(
        mmjQuery(
          "#mmform-container1562750927 #mssys_postal_country option:selected"
        ).val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_bill_zip").val(
        mmjQuery("#mmform-container1562750927 #mssys_postal_zip").val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_bill_city").val(
        mmjQuery("#mmform-container1562750927 #mssys_postal_city").val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_bill_address").val(
        mmjQuery("#mmform-container1562750927 #mssys_postal_address").val()
      );
      mmjQuery("#mmform-container1562750927 #mssys_bill_state").val(
        mmjQuery("#mmform-container1562750927 #mssys_postal_state").val()
      );
    }

    mmjQuery('input[type="file"]').each(function() {
      var errormsg = "";
      if (!checkExtension(mmjQuery(this).val())) {
        errormsg = "A feltöltendő fájl kiterjesztése nem engedélyezett.";
        error = true;
        mmjQuery(this).focus();
      }
      if (errormsg != "") {
        alert(errormsg);
      }
    });

    if (!emailuniquecheck) {
      if (
        mmjQuery(
          "#mmform-container1562750927 #containeremail input[name='email']"
        ).val() != ""
      ) {
        mmjQuery.ajax({
          type: "GET",
          url:
            "https://sw.marketingszoftverek.hu/api/check-email-uniqueness-json.php",
          data: {
            ns_id: "180624",
            token:
              "gmCVaRdYxMWpFIYkjVHN5WIbTTuJZr6MNyzu4qGWpzuHQQJZos1562680440",
            email: mmjQuery(
              "#mmform-container1562750927 input[name='email']"
            ).val()
          },
          cache: false,
          dataType: "jsonp",
          jsonp: "jsonp_callback",
          async: false,
          success: function(msg) {
            /*mmjQuery("input[name='form_submit']").removeAttr("disabled");*/
            if (msg.response == "1") {
              mmjQuery(
                "#mmform-container1562750927 #containeremail .error-container"
              )
                .show()
                .html("Ezzel az email címmel már feliratkozott korábban!");

              mmjQuery("#mmform-container1562750927 .submitbutton").removeClass(
                "mm-submit-disabled"
              );
              mmjQuery("#mmform-container1562750927 .submitbutton").html(
                "Feliratkozok"
              );
              emailuniquefail = true;
              submitProgress = false;
              mmjQuery(
                "#mmform-container1562750927 input[name='email']"
              ).focus();
            } else {
              if (!error) {
                emailuniquecheck = true;
                emailuniquefail = false;
                submitProgress = false;
                mmjQuery("#mssysform1806241562750927").trigger("submit");
                mmjQuery(
                  "#mmform-container1562750927 #containeremail .error-container"
                ).hide();
              } else {
                emailuniquecheck = false;
                mmjQuery(
                  "#mmform-container1562750927 input[name='email']"
                ).focus();
              }
            }
          }
        });
        event.preventDefault();
      }
    }

    if (emailuniquefail) {
      mmjQuery(
        "#mmform-container1562750927 #containeremail .error-container"
      ).show();
      mmjQuery("#mmform-container1562750927 input[name='email']").addClass(
        "error-field"
      );

      error = true;
    }

    if (
      !checkMail(
        mmjQuery("#mmform-container1562750927 input[name='email']").val()
      )
    ) {
      mmjQuery(
        "#mmform-container1562750927 #containeremail .error-container"
      ).show();
      mmjQuery("#mmform-container1562750927 input[name='email']")
        .addClass("error-field")
        .focus();

      error = true;
    }

    var tmp_input_val = mmjQuery(
      "#mmform-container1562750927 #containermssys_firstname input[type='text']," +
        "#mmform-container1562750927 #containermssys_firstname [type='email']," +
        "#mmform-container1562750927 #containermssys_firstname [type='url']," +
        "#mmform-container1562750927 #containermssys_firstname [type='number']," +
        "#mmform-container1562750927 #containermssys_firstname [type='password']," +
        "#mmform-container1562750927 #containermssys_firstname [type='tel']"
    ).val();
    if (
      mmjQuery("#mmform-container1562750927 #containermssys_firstname").is(
        ":visible"
      ) &&
      (tmp_input_val == "" ||
        tmp_input_val == "0000-00-00" ||
        tmp_input_val == "0000.00.00")
    ) {
      mmjQuery(
        "#mmform-container1562750927 #containermssys_firstname .error-container"
      ).show();

      mmjQuery("#mmform-container1562750927 #containermssys_firstname input")
        .addClass("error-field")
        .focus();
      error = true;
    }

    if (
      mmjQuery(
        "#mmform-container1562750927 #containeradatkezelesi_nyilatkozat"
      ).is(":visible") &&
      !mmjQuery(
        "#mmform-container1562750927 #containeradatkezelesi_nyilatkozat input[type='checkbox']"
      ).prop("checked")
    ) {
      mmjQuery(
        "#mmform-container1562750927 #containeradatkezelesi_nyilatkozat .error-container"
      ).show();
      mmjQuery(
        "#mmform-container1562750927 #containeradatkezelesi_nyilatkozat input[type='checkbox']:first"
      ).focus();

      error = true;
    }

    setHeight(0);

    if (error) {
      submitProgress = false;
      /*mmjQuery("input[name='form_submit']").removeAttr("disabled");*/
      mmjQuery("#mmform-container1562750927 .submitbutton").removeClass(
        "mm-submit-disabled"
      );
      if (
        mmjQuery("#mmform-container1562750927 .submitbutton img").length == 0
      ) {
        mmjQuery("#mmform-container1562750927 .submitbutton").html(
          "Feliratkozok"
        );
      }
      return false;
    } else {
      /*mmjQuery("input[name='form_submit']").removeAttr("disabled");*/

      messaging.postMessage({ setmmcookie: 1 }, parent_url, parent);
      return true;
    }
  });

  mmjQuery("#mssys-character-encoding").val("utf-8");
  mmjQuery(
    "#mmform-container1562750927 .prodqty,#mmform-container1562750927 .shippingmethodradio,#mmform-container1562750927 .prodchk,#mmform-container1562750927 input[name='prod_id']"
  ).trigger("change");
  setHeight(0);
  setTimeout(function() {
    setHeight(0);
  }, 1000);
  mmUtility.saveUtmParams();
});
mmjQuery.getDocHeight = function() {
  return Math.max(
    mmjQuery(document).height(),
    mmjQuery(window).height(),
    /* For opera: */
    document.documentElement.clientHeight
  );
};

function mmNumberFormat(number, decimals, dec_point, thousands_sep) {
  var n = number,
    c = isNaN((decimals = Math.abs(decimals))) ? 2 : decimals;
  var d = dec_point == undefined ? "," : dec_point;
  var t = thousands_sep == undefined ? "." : thousands_sep,
    s = n < 0 ? "-" : "";
  var i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : "")
  );
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

mmjQuery(document).ready(function() {
  mmjQuery(".formrowcontainer").each(function() {
    var placeHolder = mmjQuery(this)
      .children("label")
      .text();
    if (placeHolder != "") {
      if (
        mmjQuery(this)
          .find('input[type="text"]')
          .prop("class") != "date" &&
        mmjQuery(this)
          .find('input[type="text"]')
          .prop("class") != "time"
      ) {
        mmjQuery(this)
          .find('input[type="text"]')
          .prop("placeholder", placeHolder);
      }

      mmjQuery(this)
        .find('input[type="email"]')
        .prop("placeholder", placeHolder);
      mmjQuery(this)
        .find('input[type="tel"]')
        .prop("placeholder", placeHolder);
      mmjQuery(this)
        .find('input[type="url"]')
        .prop("placeholder", placeHolder);

      if (
        mmjQuery(this).parents("#braintree-paymentinfo-container").length ==
          0 &&
        mmjQuery(this)
          .find("input")
          .prop("type") != "checkbox" &&
        mmjQuery(this)
          .find("input")
          .prop("type") != "radio" &&
        mmjQuery(this)
          .find("input")
          .prop("class") != "date" &&
        mmjQuery(this)
          .find("input")
          .prop("class") != "time" &&
        mmjQuery(this).find("select").length == 0 &&
        mmjQuery(this)
          .find("input")
          .prop("type") != "file" &&
        mmjQuery(this).find("textarea").length == 0
      ) {
        mmjQuery(this)
          .children("label")
          .remove();
      }
    }
  });

  function setRadioButton(type, selector) {
    if (type == "interact") {
      mmjQuery('input[type="radio"]:checked')
        .parent()
        .next("td")
        .find("label")
        .addClass("radio-selected")
        .removeClass("radio-label");
      mmjQuery('input[type="radio"]:not(:checked)')
        .parent()
        .next("td")
        .find("label")
        .addClass("radio-label")
        .removeClass("radio-selected");

      if (
        mmjQuery(selector).prop("name") === "shipping_method" ||
        mmjQuery(selector).prop("name") === "online_payment_method"
      ) {
        mmjQuery('input[type="radio"]:checked')
          .next("label")
          .addClass("radio-selected")
          .removeClass("radio-label");
        mmjQuery('input[type="radio"]:not(:checked)')
          .next("label")
          .addClass("radio-label")
          .removeClass("radio-selected");
      }
    } else {
      mmjQuery('input[type="radio"]:checked')
        .parent()
        .next("td")
        .find("label")
        .addClass("radio-selected")
        .removeClass("radio-label");
      mmjQuery('input[type="radio"]:not(:checked)')
        .parent()
        .next("td")
        .find("label")
        .addClass("radio-label")
        .removeClass("radio-selected");
      mmjQuery(
        'input[name="shipping_method"], input[name="online_payment_method"]'
      ).each(function() {
        mmjQuery("label[for=" + mmjQuery(this).prop("id") + "]").addClass(
          "radio-label-payment"
        );
      });
    }
  }

  function setCheckbox(type, selector) {
    if (type == "interact") {
      var checkboxSelector = mmjQuery(selector).prop("id");
      if (mmjQuery(selector).is(":checked")) {
        mmjQuery(
          "label.checkbox-formlabel[for=" + checkboxSelector + "]"
        ).addClass("checkbox-checked");
      } else {
        mmjQuery("label.checkbox-checked[for=" + checkboxSelector + "]")
          .removeClass("checkbox-checked")
          .addClass("checkbox-formlabel");
      }
    } else {
      var checkboxSelector = mmjQuery(selector).prop("id");
      if (mmjQuery(selector).is(":checked")) {
        mmjQuery(
          "label.checkbox-formlabel[for=" + checkboxSelector + "]"
        ).addClass("checkbox-checked");
      } else {
        mmjQuery("label.checkbox-checked[for=" + checkboxSelector + "]")
          .removeClass("checkbox-checked")
          .addClass("checkbox-formlabel");
      }

      mmjQuery('input[type="checkbox"]').each(function() {
        var checkboxSelector = mmjQuery(this).prop("id");

        if (mmjQuery(this).is(":checked")) {
          mmjQuery(
            "label.checkbox-formlabel[for=" + checkboxSelector + "]"
          ).addClass("checkbox-checked");
        } else {
          mmjQuery("label.checkbox-checked[for=" + checkboxSelector + "]")
            .removeClass("checkbox-checked")
            .addClass("checkbox-formlabel");
        }
      });
    }
  }

  mmjQuery('input[type="radio"]').change(function() {
    setRadioButton("interact", mmjQuery(this));
  }); /* Set radio buttons */

  mmjQuery('input[type="checkbox"]').change(function() {
    setCheckbox("interact", mmjQuery(this));
  }); /* Set checkboxes */

  setRadioButton("initial");
  setCheckbox("initial");

  if (mmjQuery(".postalsamechk").is(":checked")) {
    mmjQuery(
      "label.checkbox-formlabel[for=" +
        mmjQuery(".postalsamechk").prop("id") +
        "]"
    ).addClass("checkbox-checked");
  }
  if (mmjQuery(".billsamechk").is(":checked")) {
    mmjQuery(
      "label.checkbox-formlabel[for=" +
        mmjQuery(".billsamechk").prop("id") +
        "]"
    ).addClass("checkbox-checked");
  }
});
