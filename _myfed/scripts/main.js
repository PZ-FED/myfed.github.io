var mobile = false;

// var facebookShare = function () {
//
//     <!-- Load Facebook SDK for JavaScript -->
//     (function (d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) return;
//         js = d.createElement(s);
//         js.id = id;
//         js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1";
//         js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";
//         fjs.parentNode.insertBefore(js, fjs);
//     }(document, 'script', 'facebook-jssdk'));
// }
// facebookShare();



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


var checkIfMobile = function () {
    var windowScreenWidth = $(window).width();
    var mainWrapper = $('#main-wrapper');

    // console.log(windowScreenWidth);

    if (windowScreenWidth < 769) {
        mainWrapper.addClass('mobile');
        return true;
    } else {
        mainWrapper.removeClass('mobile');
        return false;
    }
}

var setEmailLink = function () {
// function replacing addres email for users
    if ($('.email').length > 0) {
        var emailAddress = $('.email').text().replace('{at}', '@');
        $('.email').html('<a class="email" href="mailto:' + emailAddress + '>subject=Contact_from_myfed.github.io">' + emailAddress + '</a>');

    }
}

var showMore = function (e) {
    // e.preventDefault();
    // e.stopPropagation();
    if (mobile) {
        var clickedElement = $(e.target);
        clickedElement.toggleClass('shown').next('.show-more-content').toggleClass('shown');
    }


}



$(document).ready(function () {

    mobile = checkIfMobile();

    $(window).resize(function () {
        mobile = checkIfMobile();
    });
    setEmailLink();


    $('.content-wrapper').find('.show-more').bind('click', showMore);

    $('#main-menu').children('a').bind('click', menuActions);

});
