document.addEventListener('DOMContentLoaded', () => {

	const video = document.querySelector('.bg-video');
	const placeholder = document.querySelector('.bg-video-placeholder');

	function hidePlaceHolder(){ //hide image, show video
		video.muted = true;
		video.play();
		placeholder.style.display = 'none';
	}

	if (video && placeholder) {
		//check if video has loaded its first frame
		if(video.readyState >= 2){
			hidePlaceHolder();
			console.log('loaded video through readyState');
		}else{
			video.addEventListener('loadeddata', () => {
				hidePlaceHolder();
				console.log('loadeddata fired');
			})
		}
	}

	var my_nav = $('.navbar-sticky'); 
	//grab the initial top offset of the navigation 
	var sticky_navigation_offset_top = my_nav.offset().top;
	
	//function that decides weather the navigation bar should have "fixed" css position or not.
	var sticky_navigation = function(){
		var scroll_top = $(window).scrollTop(); // our current vertical position from the top
		
		//if we've scrolled more than the navigation, change its position to fixed to stick to top, otherwise change it back to relative
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
	
	//run function on load
	sticky_navigation();
	
	//and run it again every time user scrolls
	$(window).scroll(function() {
		 sticky_navigation();
		 initio_parallax_animation();
	});

});

//For projects detailing more info on-click
function openPopupESP(popupId) {
	const directory = 'assets/json/projects-es.json';
	fetchPopupContent(directory, popupId);

	//play video if it was paused before
	manageVideo(popupId);
}

function openPopupENG(popupId){
	const directory = 'assets/json/projects-en.json';
	fetchPopupContent(directory, popupId);
	//play video if it was paused before
	manageVideo(popupId);
}

function fetchPopupContent(directory, popupId){
	// Fetch the JSON file
	fetch(directory)
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

function manageVideo(popupId){
	initializePlayerForPopup(popupId);
	//play video if it was paused before
	const video = getPlayerVideo(popupId);
	if(video){
		console.log("Trying to play video");
		video.playVideo(); //Youtube API
	}
}
  
function closePopup(popupId) {
	const popup = document.getElementById(popupId);
	//Pause the video in the popup directly
	const video = getPlayerVideo(popupId);
	if(video){
		video.pauseVideo(); //Youtube API
	}
	popup.classList.remove('show-popup'); //finally, hide popup window
}


//Create players for all embedded videos to be able to pause them on popup close
let players = {};

function initializePlayerForPopup(popupId) {
	const popup = document.getElementById(popupId);
    const iframe = popup.querySelector('iframe');
    if (iframe) {
        const videoId = iframe.src.split('embed/')[1].split('?')[0]; // Extract video ID
		console.log("Initialized video with id"+videoId);
        if (!players[videoId]){ //Only create a new player if it doesn't exist
            players[videoId] = new YT.Player(iframe, {
                'events': {
                    'onReady': onPlayerReady,
                },
            });
        }
    }
}

function onPlayerReady(){
	console.log("video ready");
}

function getPlayerVideo(popupId){
	const popup = document.getElementById(popupId);
	const iframe = popup.querySelector('iframe');
	if(iframe){
		const videoId = iframe.src.split('embed/')[1].split('?')[0]; // Extract video ID from the src
		if (players[videoId] && typeof players[videoId].pauseVideo === 'function') {
			return players[videoId];
		}
	}
}