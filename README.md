# Project-Andromeda
A project by Kupid Ltd.

Dates displayed with availability


Booking is put together and prices calculated
Upon clicking payment link, the JavaScript passes booking variables to the php script booking.php

The customer then proceeds to PayPal in order to make a payment.  PayPal returns to the website.

If a customer doesn't pay the the OTG team can call them to try to take payment before deleting the order. (Or sending an email asking why)


BEFORE THE data is passed to booking.php a final check must be made for availability using a fresh version of the JSON data. Or check is changes have been made to that data during the booking process.

Are there Electricity Hookup in glamping pods - yes as standard, not an extra.

Variables to pass to booking.php

Arrival date
No of nights
Adults
Children
Dogs
Electricity
Name
Email
Phone number
Total amount

http://stackoverflow.com/questions/15461786/pass-javascript-variable-to-php-via-ajax

NEWBOOKING.PHP

Received variables from JS via POST (AJAX)
Creates a new booking and writes the info to the bookings table
Takes the same info from staff input through back end