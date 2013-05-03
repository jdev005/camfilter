 //webrtc
    var getVideo = true,
        getAudio = true,
 
        video = document.getElementById('webcam');
 
    navigator.getUserMedia ||
        (navigator.getUserMedia = navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia || navigator.msGetUserMedia);
 
    window.audioContext ||
        (window.audioContext = window.webkitAudioContext);
 
    function onSuccess(stream) {
        var videoSource,
            audioContext,
            mediaStreamSource;
 
        if (getVideo) {
            if (window.webkitURL) {
                videoSource = window.webkitURL.createObjectURL(stream);
            } else {
                videoSource = stream;
            }
 
            video.autoplay = true;
            video.src = videoSource;
        }
 
        if (getAudio && window.audioContext) {
            audioContext = new window.audioContext();
            mediaStreamSource = audioContext.createMediaStreamSource(stream);
            mediaStreamSource.connect(audioContext.destination);
        }
	    
streamFeed();
display.width = buffer.width = 520;
display.height = buffer.height = 390;


}
 
    function onError() {
        alert('There has been a problem retreiving the streams - are you running on file:/// or did you disallow access?');
    }
 
    function requestStreams() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                video: getVideo,
                audio: getAudio
            }, onSuccess, onError);
        } else {
            alert('getUserMedia is not supported in this browser.');
        }
    }

   requestStreams();

window.requestAnimationFrame ||
    (window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        });

 var buffer = document.getElementById('buffer'),
        bufferContext = buffer.getContext('2d'),
        display = document.getElementById('display'),
        displayContext = display.getContext('2d');

function streamFeed() {
    requestAnimationFrame(streamFeed);
    bufferContext.drawImage(video, 0, 0, display.width, display.height);
    imageData = bufferContext.getImageData(0, 0, display.width, display.height);
   
	imageData.data=blacknwhite(imageData.data);

	displayContext.putImageData(imageData, 0, 0);
}

function blacknwhite(data){
var length = data.length/4;

for (var i=0;i<length;i++){
	var r = data[i*4+0];
	var g = data[i*4+1];
	var b =	data[i*4+2];

	effectgrey(i,r,g,b,data);
}
	return data;
}

function effectgrey(pos,r,g,b,data){
	var brightness=(3*r+4*g+b)>>>3;
	if(brightness<0) brightness=0
		data[pos*4+0]=brightness;
		data[pos*4+1]=brightness;
		data[pos*4+2]=brightness;
}

