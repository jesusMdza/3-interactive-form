/* TechDegree Project 3 - Form Validation! */

/*

This project is attempting to receive an "Exceeds Expectations" grade.

 */
$(document).ready(function () {

  const $nameInput = $('#name').focus();

  const toggleOtherInput = () => {
    const $jobRoleSelect = $('#title');
    const $otherInput = $('<input id="other-title" placeholder="Your Job Role">');

    $jobRoleSelect.on('change', function () {
      const $value = $(this).val();

      if ($value === 'other') {
        $jobRoleSelect.after($otherInput);
      } else if ($value !== 'other') {
        $otherInput.remove();
      }
    });
  };

  const matchShirtOptions = () => {
    const $designSelect = $('#design');
    const $colorSelect = $('#color');
    const jsPunsRegex = /[jJ][sS] [pP]\w{3}/;
    const jsLoveRegex = /[I] \W JS/;
    let $designOptionValue;

    $designSelect.on('change', function () {
      $designOptionValue = $(this).val();

      // show only "js puns" shirt colors
      if ($designOptionValue === 'js puns') {
        $colorSelect.children().each(function (index, element) {
          if (jsPunsRegex.test($(element).text()) === true) {
            $(element).show();
          } else {
            $(element).hide();
          }
        });

        $('#color').find('option:not(:hidden):eq(0)');
      }

      // show only "I <3 js" shirt colors
      if ($designOptionValue === 'heart js') {
        $colorSelect.children().each(function (index, element) {
          if (jsLoveRegex.test($(element).text()) === true) {
            $(element).show();
          } else {
            $(element).hide();
          }
        });

        $('#color').find('option:not(:hidden):eq(0)');
      }
    });
  };

  const compareActivities = () => {
    const $checkBoxes = $('input[type="checkbox"]');
    const dayTimeRegex = /\w* \d\w+\W\d*\w+/;

    $checkBoxes.on('change', (event) => {
      const $boxesChecked = $('input[type="checkbox"]:checked');
      const $boxesUnchecked = $('input[type="checkbox"]').not(':checked');
      let $selected = $(event.target);
      let $selectedText = $(event.target).parent().text();
      let $dayAndTime = $selectedText.match(dayTimeRegex);

      $checkBoxes.each(function (index, element) {
        let $allActivities = $(element).parent().text();
        let $allDayAndTime = $allActivities.match($dayAndTime);

        const enableDisableMatchedActivities = () => {
          if ($selected.prop('checked') === true && $(element).prop('checked') === false) {
            if ($allDayAndTime) {
              $(element).prop('disabled', true);
              console.log($(element).parent().text());
            }
          } else if ($selected.prop('checked') === false && $(element).prop('checked') === false) {
            if ($allDayAndTime) {
              $(element).prop('disabled', false);
              console.log($(element).parent().text());
            }

          }
        }

        enableDisableMatchedActivities();
      });

    });
  };

  toggleOtherInput();
  matchShirtOptions();
  compareActivities();
});

/*d
1. Set focus on the first text field
a. When the page first loads, the first text field should be in focus by default.

2. ”Job Role” section
  a. Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
  b. Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".

Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work
when JS is disabled, which is a requirement below.


3. ”T-Shirt Info” section
  a. For the T-Shirt "Color" menu, only display the color options that match the design selected in the "Design" menu.
  b. If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
  c. If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
  d. When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.


4. ”Register for Activities” section
  a. Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the
     same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
  b. When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
  c. As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference",
     then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.


5. "Payment Info" section
  a. Display payment sections based on the payment option chosen in the select menu.
  b. The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information.
     Payment option in the select menu should match the payment option displayed on the page.
  c. When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should
     be hidden.
  d. When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should
     be hidden.

NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu,
because the user should not be able to submit the form without a chosen payment option.


6. Form validation
  If any of the following validation errors exist, prevent the user from submitting the form:
    a. Name field can't be blank.
    b. Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that
       it's formatted like one: dave@teamtreehouse.com for example.
    c. User must select at least one checkbox under the "Register for Activities" section of the form.
    d. If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value
       before the form can be submitted.
          - Credit Card field should only accept a number between 13 and 16 digits.
          - The Zip Code field should accept a 5-digit number.
          - The CVV should only accept a number that is exactly 3 digits long.

NOTE: Don't rely on the built in HTML5 validation by adding the required attribute to your DOM elements.
You need to actually create your own custom validation checks and error messages.

NOTE: Avoid using snippets or plugins for this project. To get the most out of the experience, you should be writing all of your own code
for your own custom validation.

NOTE: Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.


7. Form validation messages
  Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or even better
  for the user would be if a red text message appeared near the field.

  The following fields should have some obvious form of an error indication:
    a. Name field
    b. Email field
    c. Register for Activities checkboxes (at least one must be selected)
    d. Credit Card number (Only if Credit Card payment method is selected)
    e. Zip Code (Only if Credit Card payment method is selected)
    f. CVV (Only if Credit Card payment method is selected)

Note: Error messages or indications should not be visible by default. They should only show upon submission, or after some user interaction.


8. Form works without JavaScript - Progressive Enhancement
  The user should still have access to all form fields and payment information if JS isn't working for whatever reason.
  For example, when the JS is removed from the project:
    a. The “Other” text field under the "Job Role" section should be visible
    b. All information for Bitcoin, PayPal or Credit Card payments should be visible.




/*   /////     EXTRA Credit      ///////


1. T Shirt Section
  a. Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.

2. Conditional Error Message
  a. Program at least one of your error messages so that more information is provided depending on the error.
    For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads
    “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads “Please enter a
    number that is between 13 and 16 digits long.”

3. Real-time Error Messages
  a. Program your form so that it provides a real-time validation error message for at least one text input field. Rather than
  providing an error message on submit, your form should check for errors and display messages as the user begins typing inside a text field.
  For example, if the user enters an invalid email address, the error appears as the user begins to type, and disappears as soon as
  the user has entered a complete and correctly formatted email address. You must accomplish this will your own JavaScript code.
  Do not rely on HTML5's built-in email validation.

NOTE: If you implement the above exceeds requirements in your form, make sure you detail in your submission notes which
input will have different error messages depending on the error, and which input will have "real time" validation messages, so your reviewer
won't miss them by accident.


NOTE: Getting exceeds

To get an "Exceeds Expectations" grade for this project, you'll need to complete each of the items in this section. See the rubric in the "How You'll Be Graded" tab above for details on how you'll be graded.
If you’re shooting for the "Exceeds Expectations" grade, it is recommended that you mention so in your submission notes.
Passing grades are final. If you try for the "Exceeds Expectations" grade, but miss an item and receive a "Meets Expectations" grade, you won’t get a second chance. Exceptions can be made for items that have been misgraded in review.
 */
