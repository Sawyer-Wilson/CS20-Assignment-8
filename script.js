

// function updateQuanity()
// {
//     alert("hello")
// }

// $('.selectQuantity').on('change', function() {
//     alert("hello")
// });

// document.getElementsByClassName('selectQuantity').addEventListener

// .on('change', function() {
//     alert("hello")
// });



// recalculates all the costs based on the quantities selected
function updateCosts() 
{
    order = new Array();
    table = document.querySelector('table')
    subtotal = 0;
    for (i = 0; i < 5; i++) {
        quantity = $('select[name="quan' + i + '"]').val();
        cost = menuItems[i].cost;
        totalCost = table.rows[i + 1].cells[3].querySelector('input');
        totalCost.value = (quantity * cost).toFixed(2);
        subtotal += parseFloat(totalCost.value);
        if (quantity > 0) {
            order.push([quantity, menuItems[i].cost.name, totalCost]);
        }
    }
    tax = subtotal * 0.0625;
    total = subtotal + tax;

    $('input#subtotal').val(subtotal.toFixed(2));
    $('input#tax').val(tax.toFixed(2));
    $('input#total').val(total.toFixed(2));
}


// Hides and shows address input boxes based on selected pickup option
function toggleAddy()
{
    if (this.value == 'pickup') {
        $('.address').css('display', 'none');
    } else {
        $('.address').css('display', 'block');
    }
}

// Adds a leading 0 to numbers less than 10. Used to display time properly 
function pad(num) 
{
    return (num < 10 ? '0' : '') + num;
}

// Validates the entered form content when submitted
function validateForm() 
{
    lastName       = $('.userInfo input[name="lname"]').val();
    number         = $('.userInfo input[name="phone"]').val();
    deliveryOption = $('input[name="p_or_d"]:checked').val();
    street         = $('.userInfo input[name="street"]').val();
    city           = $('.userInfo input[name="city"]').val();
    total          = $('#total').val();

    // verify last name is entered
    if (!lastName) {
        alert('Last name required');
    }

    // verify phone number is entered and has 7-10 numbers
    else if ((!number.match(/\d/g)) ||
             number.match(/\d/g).length < 7 || 
             number.match(/\d/g).length > 10) {
        alert('Phone number must contain 7-10 numbers')
    }

    // verify street and city if delivery
    else if (deliveryOption == 'delivery' && (!street || !city)) {
        alert('Street and city required for delivery');
    }

    // verify user ordered at least one item
    else if (total == 0.00) {
        alert("No items selected to be ordered")
    }

    // no validation issues...
    else {
        date = new Date();
        
        if (deliveryOption == 'delivery') {
            date.setMinutes(date.getMinutes() + 30);
        } else {
            date.setMinutes(date.getMinutes() + 15);
        }
        pickupTime = pad(date.getHours()) + ":" + pad(date.getMinutes());

        alert("Thank you for placing an order!");
        window.details = {
            'order': order,
            'subtotal': subtotal,
            'tax': tax,
            'total': total,
            'pickupTime': pickupTime
        }
        window.open('details.html');
    }
}

// code executes once the page has loaded
$(document).ready(function() {
    // calculates the initial costs and update on change of item quantity
    updateCosts();
    $('select').on('change', updateCosts)

    // shows or hides address input boxes on radio btns click
    $('input[name="p_or_d"]').click(toggleAddy);

    // validate form
    $('input[type="button"]').click(validateForm);
})


