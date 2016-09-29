var menuActions = function (e) {
    e.stopPropagation();

    // show or hide memy
    if ($(e.currentTarget).prop("tagName") == 'A' && $(e.currentTarget).is(':first-child')) {
        e.preventDefault();
        // check if menu is shown
        var mainWrapper = $('#main-wrapper');
        mainWrapper.toggleClass('nav-opened');
    }
}

var setEmailLink = function () {
console.log('setEmailLink');
    if ($('.email').length > 0) {
        var emailAddress = $('.email').text().replace('{at}', '@');
        $('.email').html('<a class="email" href="mailto:' + emailAddress + '>subject=Contact_from_myfed.github.io">' + emailAddress + '</a>');

    }
}

$(document).ready(function () {
    setEmailLink();

    $('#main-menu').children('a').bind('click', menuActions);

});
