var menuActions = function (e) {
    e.preventDefault();
    e.stopPropagation();

    // show or hide memy
    if ($(e.currentTarget).prop("tagName") == 'A' && $(e.currentTarget).is(':first-child')) {

        // check if menu is shown
        var mainWrapper = $('#main-wrapper');
        mainWrapper.toggleClass('nav-opened');
    }
}


// $(document).ready(function(){
//     $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
//         $(this).toggleClass('open');
//     });
// });





$(document).ready(function () {
    $('#main-menu').children('a').bind('click', menuActions);
});
