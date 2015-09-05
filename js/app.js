var host = "swimmanager.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";


function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


var app = angular.module('SwimManager', ["ui.bootstrap"]);


app.directive("navbarswim", function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        templateUrl: "../Otras/navbar.html",
        compile: function (element, attrs) {
            var li, liElements, links, index, length;

            liElements = $(element).find("#navigation-tabs li");
            for (index = 0, length = liElements.length; index < length; index++) {
                li = liElements[index];
                links = $(li).find("a"); // (3)
                if (links[0].textContent === attrs.currentTab) $(li).addClass("active");
            }
        }
    };
});