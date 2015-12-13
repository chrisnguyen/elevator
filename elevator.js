$(document).ready(function(){
  var cur_floor=1;
  queue = [];
  moving = false;

  $('.part:not(.glow)').click(function(event){ 
    var floor_number = $(this).attr('floor-number');
    if (floor_number == cur_floor) return;
    $(this).addClass('glow');

    if(queue.indexOf(floor_number) == -1){
      queue.push(floor_number);
      checkAndRun();
    }
  });
  function checkAndRun(){
    if (moving === false && queue.length > 0){
      moveToFloor(queue.shift());
    }
  }

  function moveToFloor(target_floor){
      moving = true;
    var direction = 1;
    var indicator = $('#up');
    if (target_floor < cur_floor) {
      direction = -1;
      indicator = $('#down');
    }
    indicator.animate({opacity:1}, 500);

    var timer = setInterval(function(){
      cur_floor += direction;
      $('#floor-number').fadeOut(500,function(){
        $('#floor-number').html(cur_floor).fadeIn(500);
      });
      if(cur_floor == target_floor){
        clearInterval(timer);
        setTimeout(function(){
          indicator.animate({opacity:0},500,function(){
            $('.part[floor-number="'+target_floor+'"]').removeClass('glow');
            moving = false;
            setTimeout(function(){
              checkAndRun();
            },1000);            
          });
        },1500);
      }  
    },1500);
  }
});
////////////////////////////////////////////////////////////
  /*var current = 0;
$(document).ready(function(){

  $("#floorSelect li").click(function(){
  
    var floor = parseInt($(this).data("floor")),
    height = floor * 20,
    animate = Math.abs(current - floor) * 1000;
    if (floor == current) return;
    $("#rightDoor").removeClass("active-right");
    $("#leftDoor").removeClass("active-left");
    setTimeout(function() {
              $("#elevatorContainer").css("transition", "all " + animate + "ms linear");
              $("#elevatorContainer").css("bottom", height + "%");
              current = floor;
              setTimeout(function() {

                          $("#rightDoor").addClass("active-right");
                          $("#leftDoor").addClass("active-left");

      
      },animate);

      },300);
    });

});*/
