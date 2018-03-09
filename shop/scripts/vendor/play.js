function initPlay() {
	var
		$player = $('#player'),
		$play = $('#play');
		var player = $player[0];
		var $timer = $('#timer');
		var $allTimer = $('#allTimer');
		var
			$progressBar = $('#progressBar'),
			$innerBar = $('#innerBar');

	//$allTimer.text(convertTime(player.duration));

	//$play.attr("src", "http://101.200.176.217/app/videos/cars.mp4");

	$play
		.on('click', function() {
			if (player.paused) {
				player.play();
				$(this).removeClass('myPlay').addClass('myPause');
			} else {
				player.pause();
				$(this).removeClass('myPause').addClass('myPlay');
			}
		});


	$progressBar.on('click', function(e) {
			var w = $(this).width(),
				x = e.offsetX;
			window.per = (x / w).toFixed(3); //全局变量

			var duration = player.duration;
			player.currentTime = (duration * window.per).toFixed(0);

			$innerBar.css('width', x + 'px');
		});

	$player
		.on('timeupdate', function() {
			//秒数转换
			var time = player.currentTime.toFixed(1),
				minutes = Math.floor((time / 60) % 60),
				seconds = Math.floor(time % 60);

			if (seconds < 10) {
				seconds = '0' + seconds;
			}
			$timer.text(minutes + ':' + seconds);

			var w = $progressBar.width();
			if (player.duration) {
				var per = (player.currentTime / player.duration).toFixed(3);
				window.per = per;
			} else {
				per = 0;
			}
			$innerBar.css('width', (w * per).toFixed(0) + 'px');

			if (player.ended) { //播放完毕
				$('#play').removeClass('myPause').addClass('myPlay');
				//$(this).removeClass('myPause').addClass('myPlay');
			}
		});

}
function convertTime(long){
	//秒数转换
	var time = long.toFixed(1),
		minutes = Math.floor((time / 60) % 60),
		seconds = Math.floor(time % 60);

	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	return minutes + ':' + seconds;
}
function convertTime2(long){
	//秒数转换
	long=parseInt(long);
	var time = long.toFixed(1),
		minutes = Math.floor((time / 60) % 60),
		seconds = Math.floor(time % 60);
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	return minutes + ':' + seconds;
}
