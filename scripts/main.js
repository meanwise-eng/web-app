'use strict';

  if (screen && screen.width > 640) {

  $(function() {
    $('.page').scrolldeck();
    
    $("#typed").typed({
  		strings: ["Creators", "Makers", "Builders", "Artisans", "Designers", "Crafters", "Inventors", "Producers", "Shapers", "Doers"],
      showCursor: false,
  		typeSpeed: 70,
      backSpeed: 5,
      backDelay: 2000,
      loop: true,
      smartBackspace: false,
      shuffle: true
  	});
  });
}