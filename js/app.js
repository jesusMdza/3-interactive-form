/************************************* 
TechDegree Project 3 - Form Validation - TREEHOUSE STYLED FORM



. This project is attempting to receive an "Exceeds Expectations" grade.

. Note to Reviewer:
  - The "Name" field will be the only field that has 2 error messages. 
    a. Blank input error
    b. Incorrect name error

  - All required input fields will have "real-time" validation messages.




 *************************************/


$(document).ready(function () {

  const $jobRoleSelect = $('#title');
  const $otherField = $('#other-title');
  const $designSelect = $('#design');
  const $colorSelect = $('#color');
  const $colorDiv = $('#colors-js-puns');
  const $paymentSelect = $('#payment');
  const $creditCardDiv = $('#credit-card');
  const $paypalDiv = $creditCardDiv.next();
  const $bitcoinDiv = $creditCardDiv.next().next();
  const $checkBoxes = $('input[type="checkbox"]');
  const $nameField = $('#name');
  const $emailField = $('#mail');
  const $activitiesFieldset = $('.activities');
  const $submitButton = $('button');
  const $ccField = $('#cc-num');
  const $zipField = $('#zip');
  const $cvvField = $('#cvv');
  $nameField.focus();
  $otherField.hide();

  const $nameErr = $('<p>Name field can\'t be blank</p>');
  const $nameErr2 = $('<p>Please insert a name with only letters</p>');
  const $emailErr = $('<p>Please insert a correct email "example@source.com/gov/net/org"</p>');
  const $activityErr = $('<p>Please select at least one activity</p>');
  const $ccErr = $('<p>Credit card must be between 13 and 16 digits long</p>');
  const $zipErr = $('<p>Zip code must be at least 5 digits long</p>');
  const $cvvErr = $('<p>CVV must be exactly 3 digits long</p>');

// Creates, styles, and appends error messages to their respective input fields. Error messages are hidden.
  const createErr = () => {
    const styleErr = () => {
      $nameErr.css('color', 'red').css('margin', '0 0 10px 0');
      $nameErr2.css('color', 'red').css('margin', '0 0 10px 0');
      $emailErr.css('color', 'red').css('margin', '0 0 10px 0');
      $activityErr.css('color', 'red').css('margin', '0 0 10px 0');
      $ccErr.css('color', 'red').css('margin', '0 0 10px 0');
      $zipErr.css('color', 'red').css('margin', '0 0 10px 0');
      $cvvErr.css('color', 'red').css('margin', '0 0 10px 0');

      $nameErr.hide();
      $nameErr2.hide();
      $emailErr.hide();
      $activityErr.hide();
      $ccErr.hide();
      $zipErr.hide();
      $cvvErr.hide();
    }

    const appendErr = () => {
      $nameField.after($nameErr);
      $nameField.after($nameErr2);
      $emailField.after($emailErr);
      $activitiesFieldset.append($activityErr);
      $creditCardDiv.append($ccErr);
      $creditCardDiv.append($zipErr);
      $creditCardDiv.append($cvvErr);
    }

    styleErr();
    appendErr();
  }

  // Displays the "other" input field when "Job Role: other" is selected. Hides if unselected.
  const toggleOtherField = () => {
    $jobRoleSelect.on('change', function () {
      const $value = $(this).val();

      if ($value === 'other') {
        $otherField.show();
        $otherField.val('');
      } else if ($value !== 'other') {
        $otherField.hide();
      }
    });
  };

  const matchShirtOptions = () => {
    const jsPunsRegex = /[jJ][sS] [pP]\w{3}/;
    const jsLoveRegex = /[I] \W JS/;
    let $designOptionValue;
    $colorDiv.hide();

    $designSelect.on('change', function () {
      $designOptionValue = $(this).val();

      // Shows the "color" div when a t-shirt theme is selected
      const showColorsDiv = () => {
        if ($designOptionValue === 'js puns' || $designOptionValue === 'heart js') {
          $colorDiv.show();
        }
      }

      /* Searches through t-shirt colors using regex and displays only "JS Puns" t-shirt colors*/
      const displayJSPunsColors = () => {
        if ($designOptionValue === 'js puns') {
          $colorSelect.children().each(function (index, element) {
            if (jsPunsRegex.test($(element).text()) === true) {
              $(element).show();
            } else {
              $(element).hide();
            }
  
            if (index === 0) {
              $(element).attr('selected', true);
            } else {
              $(element).attr('selected', false);
            }
          });
        }
      }

       /* Searches through t-shirt colors using regex and displays only "I <3 JS" t-shirt colors*/
      const displayHeartJSColors = () => {
        if ($designOptionValue === 'heart js') {
          $colorSelect.children().each(function (index, element) {
            if (jsLoveRegex.test($(element).text()) === true) {
              $(element).show();
            } else {
              $(element).hide();
            }
  
            if (index === 3) {
              $(element).attr('selected', true);
            } else {
              $(element).attr('selected', false);
            }
          });
        }
      }

      showColorsDiv();
      displayJSPunsColors();
      displayHeartJSColors();
    });
  };

  const compareActivities = () => {
    const dayTimeRegex = /\w* \d\w+\W\d*\w+/;
    const priceRegex = /[0-9]{3}/;
    let total = 0;
    $activitiesFieldset.append(`<p class="total">Total: $${total}.00</p>`);

    $checkBoxes.on('change', (event) => {
      const $selected = $(event.target);
      const $selectedText = $(event.target).parent().text();
      const $dayAndTime = $selectedText.match(dayTimeRegex);
      const $price = $selectedText.match(priceRegex);

      /* Disables activities with the same day and time of user's selected activities*/
      const enableDisableMatchedActivities = () => {
        $checkBoxes.each((index, element) => {
          const $allActivities = $(element).parent().text();
          const $allDayAndTime = $allActivities.match($dayAndTime);

          if ($selected.prop('checked') === true && $(element).prop('checked') === false) {
            if ($allDayAndTime) {
              $(element).prop('disabled', true);
              $(element).parent().css('color', '#ccc');
            }
          } else if ($selected.prop('checked') === false && $(element).prop('checked') === false) {
            if ($allDayAndTime) {
              $(element).prop('disabled', false);
              $(element).parent().css('color', '#000');
            }
          }

        });
      };

      /* Gets and updates total cost of selected activities */
      const getAndUpdateTotal = () => {
        if ($selected.prop('checked')) {
          total += parseInt($price);
        } else {
          total -= parseInt($price);
        }

        $('.activities p.total').text(`Total: $${total}.00`);
      };

      enableDisableMatchedActivities();
      getAndUpdateTotal();
    });
  };

  /* Shows and hides payment divs according to the selected payment option */
  const togglePaymentDivs = () => {
    const showPaymentDetails = () => {
      $paymentSelect.on('change', (event) => {
        if ($paymentSelect.val() === 'credit card') {
          $creditCardDiv.show();
        } else {
          $creditCardDiv.hide();
        }

        if ($paymentSelect.val() === 'paypal') {
          $paypalDiv.show();
        } else {
          $paypalDiv.hide();
        }

        if ($paymentSelect.val() === 'bitcoin') {
          $bitcoinDiv.show();
        } else {
          $bitcoinDiv.hide();
        }
      });

      // disables "select method" option
      $paymentSelect.val('credit card').trigger('change');
      $('#payment option[value="select_method"]').prop('disabled', true);
    };

    showPaymentDetails();
  };

  const validateForm = () => {
    createErr();
    const nameRegex = /^([a-z]|[A-Z])*\s?([a-z]|[A-Z])*$/;
    const emailRegex = /\b[\w\d]+[@]\w+\.(com|net|gov|org)\b/;
    const ccRegex = /\b\d{13,16}\b/;
    const zipRegex = /\d{5,}/;
    const cvvRegex = /\b\d{3}\b/;

    let $inputName;
    let $inputEmail;
    let validName;
    let validEmail;

    let $ccInput;
    let $zipInput;
    let $cvvInput;
    let validCC;
    let validZip;
    let validCVV;

    /* checks for incorrect inputs on name and email fields */
    /* name field can display 2 error messages */
    const validateNameEmail = () => {
      $nameField.on('input', (event) => {
        $inputName = $(event.target).val();
        validName = nameRegex.test($inputName);

        if (!$inputName || $inputName === ' ') {
          $nameErr.show();
        } else {
          $nameErr.hide();
        }

        if (!validName) {
          $nameErr2.show();
        } else {
          $nameErr2.hide();
        }
      });
  
      $emailField.on('input', (event) => {
        $inputEmail = $(event.target).val();
        validEmail = emailRegex.test($inputEmail);

        if (!$inputEmail || !validEmail) {
          $emailErr.show();
        } else {
          $emailErr.hide();
        }
      });

      $submitButton.on('click', (event) => {
        if (!$inputName || !validName) {
          event.preventDefault();
          $nameErr.show();
        } 
        
        if (!$inputEmail || !validEmail) {
          event.preventDefault();
          $emailErr.show();
        } 
      });
    }

    /* Checks length of selected activities and displays error if none are selected */
    const checkForActivitySelection = () => {
      let check = $('input[type="checkbox"]:checked');

      $checkBoxes.on('click', function (event) {
        check = $('input[type="checkbox"]:checked');
        if (check.length === 0) {
          $activityErr.show();
        } else {
          $activityErr.hide();
        }
      });

      $submitButton.on('click', (event) => {
        if (check.length === 0) {
          event.preventDefault();
          $activityErr.show();
        } else {
          $activityErr.hide();
        }
      });
    }

    /* Uses regex's to search for correctly inputted payment info */
    const validateCCInfo = () => {
      $ccField.on('input', (event) => {
        $ccInput = $(event.target).val();
        validCC = ccRegex.test($ccInput);
        
        if (!$ccInput || !validCC) {
          $ccErr.show();
        } else {
          $ccErr.hide();
        }
      });
  
      $zipField.on('input', (event) => {
        $zipInput = $(event.target).val();
        validZip = zipRegex.test($zipInput);

        if (!$zipInput || !validZip) {
          $zipErr.show();
        } else {
          $zipErr.hide();
        }
      });

      $cvvField.on('input', (event) => {
        $cvvInput = $(event.target).val();
        validCVV = cvvRegex.test($cvvInput);

        if (!$cvvInput || !validCVV) {
          $cvvErr.show();
        } else {
          $cvvErr.hide();
        }
      });

      $submitButton.on('click', (event) => {
        if ($paymentSelect.val() === 'credit card') {
          if (!$ccInput || !validCC) {
            event.preventDefault();
            $ccErr.show();
          }
  
          if (!$zipInput || !validZip) {
            event.preventDefault();
            $zipErr.show();
          }
  
          if (!$cvvInput || !validCVV) {
            event.preventDefault();
            $cvvErr.show();
          }
        }
      });
    }
  
    validateNameEmail();
    checkForActivitySelection();
    validateCCInfo();
  }

  toggleOtherField();
  matchShirtOptions();
  compareActivities();
  togglePaymentDivs();
  validateForm();
});
