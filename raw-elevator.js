$(document).ready(function(){

	var cur_floor= 1;
	queue=[];
	moving = false;

	$('.part:not(.glow)').click(function () {
		$(this).addClass('glow');
		var floorNumber = $(this).attr('floor-number');
		if (floorNumber == cur_floor) return;
		if(queue.indexOf(floorNumber) == -1 ){
			queue.push(floorNumber);
			checkAndRun();
		}
		
		
	});

	function checkAndRun(){
		if (moving === false && queue.length > 0)
			moveToFloor(queue.shift());
	}

	function moveToFloor(targetFloor){
		moving = true;
		var direction = 1;
		var $indicator = $('#up');
		if (targetFloor < cur_floor){
				direction = -1;
				$indicator = $('#down');
			}
		$indicator.animate({opacity:1}, 500);

		var timer = setInterval(function(){
			cur_floor += direction;
			$('#floor-number').fadeOut(500,function(){
				$('#floor-number').html(cur_floor).fadeIn(500);
			});

			if(cur_floor == targetFloor){
				clearInterval(timer);
				setTimeout(function(){
					$indicator.animate({opacity:0}, 500, function(){
						//$('.part[floor-number="'+targetFloor+'"]').removeClass('glow');
						$('.part[floor-number="'+targetFloor+'"]').removeClass('glow');
						moving = false;
						setTimeout(function(){
							checkAndRun();
						}, 1000);
					});

				},500);

			}








		}, 1500);


	}

});