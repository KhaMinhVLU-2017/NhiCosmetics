var mvd = document.getElementById('myVideo');
var btn_play = document.getElementById('btn_play');
var six = document.getElementsByClassName("six");
btn_play.addEventListener("click",playVideo);
function playVideo(){
	console.log("playVideo");
	mvd.play();
	six[0].style.visibility="hidden";
}
mvd.addEventListener("click",pauseVideo);
function pauseVideo(){
	console.log("Pause");
	mvd.pause();
	six[0].style.visibility="visible";
}

var btn_start = document.getElementById('btn_start');

btn_start.addEventListener("click",RootCall);
var playMeo;
function RootCall(){
	playMeo = setInterval(function(){ScrollMeo()},5);
}
var size = 100;
function ScrollMeo(){	
	size +=10;
	document.documentElement.scrollTop=size;
	if(size >=1250){
		clearInterval(playMeo);
		size=0;
	}
}

