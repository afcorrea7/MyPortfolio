jQuery(document).ready(function($) {

	var my_nav = $('.navbar-sticky'); 
	// grab the initial top offset of the navigation 
	var sticky_navigation_offset_top = my_nav.offset().top;
	
	// our function that decides weather the navigation bar should have "fixed" css position or not.
	var sticky_navigation = function(){
		var scroll_top = $(window).scrollTop(); // our current vertical position from the top
		
		// if we've scrolled more than the navigation, change its position to fixed to stick to top, otherwise change it back to relative
		if (scroll_top > sticky_navigation_offset_top) { 
			my_nav.addClass( 'stick' );
		} else {
			my_nav.removeClass( 'stick' );
		}   
	};

	var initio_parallax_animation = function() { 
		$('.parallax').each( function(i, obj) {
			var speed = $(this).attr('parallax-speed');
			if( speed ) {
				var background_pos = '-' + (window.pageYOffset / speed) + "px";
				$(this).css( 'background-position', 'center ' + background_pos );
			}
		});
	}
	
	// run our function on load
	sticky_navigation();
	
	// and run it again every time you scroll
	$(window).scroll(function() {
		 sticky_navigation();
		 initio_parallax_animation();
	});

});

//For projects detailing more info on-click
function openPopupESP(popupId) {
    //Fetch the JSON file
    fetch('assets/json/projects-es.json')
        .then(response => response.json())
        .then(data => {
            //Find the relevant popup data by ID
            const popupData = data.popups.find(popup => popup.id === popupId);
            
			//Select all popup titles and descriptions
			const titles = document.querySelectorAll('.popup-title');
			const descriptions = document.querySelectorAll('.popup-description');
			const usesLists = document.querySelectorAll('.popup-useslist');

			//Clear previous content by class
			titles.forEach(title => title.innerText = '');
			descriptions.forEach(description => description.innerText = '');
			usesLists.forEach(useslist => useslist.innerText = '');

			//Insert the popup content into the HTML for the current popup only
			const currentTitle = document.querySelector(`#${popupId} .popup-title`);
			const currentDescription = document.querySelector(`#${popupId} .popup-description`);
			const currentUsesList = document.querySelector(`#${popupId} .popup-useslist`);

			if (currentTitle) {
				currentTitle.innerText = popupData.title;
			}
			if (currentDescription) {
				currentDescription.innerText = popupData.description;
				currentDescription.innerHTML = popupData.description.replace(/\n/g, "<br>");
			}
			if (currentUsesList) {
				currentUsesList.innerText = popupData.useslist;
				currentUsesList.innerHTML = popupData.useslist.replace(/\n/g, "<br>");
			}
            
            //Show the popup (assuming you have some show/hide logic)
            document.getElementById(popupId).classList.add('show-popup');
        })
        .catch(error => console.error('Error loading popup content:', error));
}

function openPopupENG(popupId){
	// Fetch the JSON file
	fetch('assets/json/projects-en.json')
	.then(response => response.json())
	.then(data => {
		//Find the relevant popup data by ID
		const popupData = data.popups.find(popup => popup.id === popupId);
		
		//Select all popup titles and descriptions
		const titles = document.querySelectorAll('.popup-title');
		const descriptions = document.querySelectorAll('.popup-description');
		const usesList = document.querySelectorAll('.popup-useslist');

		//Clear previous content by class
		titles.forEach(title => title.innerText = '');
		descriptions.forEach(description => description.innerText = '');
		usesList.forEach(usesList => usesList.innerText = '');

		//Insert the popup content into the HTML for the current popup only
		const currentTitle = document.querySelector(`#${popupId} .popup-title`);
		const currentDescription = document.querySelector(`#${popupId} .popup-description`);
		const currentUsesList = document.querySelector(`#${popupId} .popup-useslist`);

		if (currentTitle) {
			currentTitle.innerText = popupData.title;
		}
		if (currentDescription) {
			currentDescription.innerText = popupData.description;
			currentDescription.innerHTML = popupData.description.replace(/\n/g, "<br>");
		}
		if (currentUsesList) {
			currentUsesList.innerText = popupData.usesList;
			currentUsesList.innerHTML = popupData.useslist.replace(/\n/g, "<br>");
		}
		
		//Show the popup (assuming you have some show/hide logic)
		document.getElementById(popupId).classList.add('show-popup');
	})
	.catch(error => console.error('Error loading popup content:', error));
}
  
  function closePopup(popupId) {
	document.getElementById(popupId).classList.remove('show-popup');
}