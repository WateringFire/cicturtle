// draw the tick marks around the edge of the clock
function ticks(radius) {
   const tickLen = 7;
   const gap = radius - tickLen;
   colour(0,0,255,0.5);
   width(1);
   for (let theta = 0; theta < 360; theta += 6) {
      // skip the mark where the numbers are drawn
      if (theta % 30 == 0) continue;
      penup();
      goto(0,0);
      angle(theta);
      forward(gap);
      pendown();
      forward(tickLen);
   }
}

function circle(x, y, w, radius, sides) {
   const theta = 360/sides;
   const sideLen = 2 * radius * Math.sin(degToRad(theta/2));
   penup();
   goto(x,y);
   forward(radius);
   left(90);
   forward(sideLen/2);
   right(180);
   pendown();
   colour(0, 255, 0, 0.5);
   width(w);
   while (sides-- > 0) {
      forward(sideLen);
      right(theta);
   }
}

// draw the hour numbers on the clock face
function numbers(x, y, radius) {
   penup();
   setFont('20px sans-serif');
   for (const hour of range(1, 13)) {
      goto(x,y);
      angle(hour * 30);
      forward(radius);
      write(hour);
   }
   pendown();
}

// draw one of the clock hands
function hand (theta, w, length, col) {
   const stepSize = 5;
   const widthDelta = w / (length / stepSize);
   goto(0, 0);
   angle(theta);
   colour(col.r, col.g, col.b, col.a);
   for (let step = 0; step < length; step += stepSize) {
      width(w);
      forward(stepSize);
      w -= widthDelta;
   }
}

// draw all of the hands
function hands(hours, minutes, seconds) {
   // draw seconds hand
   hand(seconds * 6, 6, 100, {r: 255, g: 0, b: 0, a: 0.5 });
   // draw minutes hand
   const
      minutesInSeconds = minutes * 60,
      minutesAndSeconds = minutesInSeconds + seconds;
   hand(minutesAndSeconds * 0.1, 10, 100, {r: 0, g: 255, b: 0, a: 0.5 });
   // draw hours hand
   const
      hoursInSeconds = hours % 12 * 3600,
      hoursAndMinutesAndSeconds = hoursInSeconds + minutesAndSeconds;
   hand(hoursAndMinutesAndSeconds * 360 / 43200, 10, 60, {r: 0, g: 0, b: 255, a: 0.5 });
}

// refresh the entire clock
function clock() {
   clear();
   numbers(0, 0, 115);
   circle(0, 0, 2, 130, 50);
   ticks(130);
   const d = new Date();
   hands(d.getHours(), d.getMinutes(), d.getSeconds());
}

function demo() {
   hideTurtle();
   // refresh the clock every second
   animate(clock,1000);
}
