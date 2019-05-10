(function () {
  var x1 = 0;
  var x2 = 1000;
  var speed = 5;
  var only_every = 3;

  var fog1 = new Image();
  fog1.src = 'https://res.cloudinary.com/dkr52htco/image/upload/v1536173269/fog-1.png';
  var fog2 = new Image();
  fog2.src = 'https://res.cloudinary.com/dkr52htco/image/upload/v1536173269/fog-2.png';

  var i = 0;
  function animate() {
    requestAnimationFrame(animate);
    i += 1;
    if(i == only_every){
      i = 0;
      x2 += speed;
      if (x2 <= 0 || x2 >= 2000) {
        x2 = x1+speed-1000;
      }
      x1 += speed;
      if (x1 <= 0 || x1 >= 2000) {
        x1 = x2-1000;
      }
      draw(x1, x2);
    }
  }
  var global = {}
  window.onload = function () {
    global.bg = {};
    global.bg.base_canvas = document.createElement('canvas');
    global.bg.base_context = global.canvas.getContext('2d');
    global.bg.base_canvas.width = 2000;
    global.bg.base_canvas.height = 600;
    global.bg.show_canvas = document.getElementById('canvas2');
    global.bg.show_canvas.width = 2127;
    global.bg.show_canvas.height = 600;
    global.bg.show_context = global.bg.show_canvas.getContext('2d');
    draw(0, 1000);
    animate()
  }

  function draw(x1,x2) {
    global.context.clearRect(0, 0, global.bg.base_canvas.width, global.bg.base_canvas.height);
    global.context.drawImage(fog1, 0, 0, 1000, 600, x1, 0, 1000, 600);
    global.context.drawImage(fog1, 0, 0, 1000, 600, x2, 0, 1000, 600);

    global.context.drawImage(fog2, 0, 0, 1000, 600, x1, 0, 1000, 600);
    global.context.drawImage(fog2, 0, 0, 1000, 600, x2, 0, 1000, 600);

    global.bg.show_context.clearRect(0, 0, global.bg.show_canvas.width, global.bg.show_canvas.height);
    global.bg.show_context.drawImage(global.canvas, 1000, 0, 1000, 600, 0, 0, 2127, 600);

  }

}());
