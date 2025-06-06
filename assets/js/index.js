$(document).ready(function () {
    // Toggle drawer on hamburger button click
    $("#hamburger-btn").click(function () {
      $("#nav-drawer").toggleClass("show-drawer");
    });

    // Close drawer when clicking outside of it
    $(document).click(function (event) {
      if (!$(event.target).closest("#nav-drawer, #hamburger-btn").length) {
        $("#nav-drawer").removeClass("show-drawer");
      }
    });

  });
