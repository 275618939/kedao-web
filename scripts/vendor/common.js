function init() {
	this.showBanner=function(){
		$(".touchslider").touchSlider({
			container: this,
			mouseTouch: true,
			duration: 350, // 动画速度
			delay: 5000, // 动画时间间隔
			namespace: "touchslider",
			autoplay: true
		});
	}
}