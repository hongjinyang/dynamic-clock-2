function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(12);
  translate(width/2, height/2)
  rotate(-90);
  
  // Set up the angle for hour, mintues, seconds
  let sec = second();
  let min = minute();
  let hr = hour();
  
  let sec_angle = map(smoothSecond(), 0, 60, 0, 360);
  let sec_x = cos(sec_angle) * 175;
  let sec_y = sin(sec_angle) * 175;
  
  let min_angle = map(min, 0, 60, 0, 360);
  let min_x = cos(min_angle) * 125;
  let min_y = sin(min_angle) * 125;
  
  let hr_angle = map(hr, 0, 12, 0, 360);
  let hr_x = cos(hr_angle) * 75;
  let hr_y = sin(hr_angle) * 75;
  
  // calculate the center and radius of the circumcircle
  let ax = sec_x;
  let ay = sec_y;
  let bx = min_x;
  let by = min_y;
  let cx = hr_x;
  let cy = hr_y;
  
  // define center of the new circle passing through three variable points
  let d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
  let center_x = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
  let center_y = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
  let radius = sqrt((center_x - ax) * (center_x - ax) + (center_y - ay) * (center_y - ay));
  
  // draw the circle
  fill(50, 160);
  stroke(255);
  noStroke();
  circle(center_x, center_y, 2*radius);
  
  // Draw triangle connecting sec and min
  noStroke();
  fill(255, 25);
  triangle(sec_x, sec_y, min_x, min_y, 0, 0);
  
  // Draw triangle connecting hr and min
  noStroke();
  fill(255, 100);
  triangle(hr_x, hr_y, min_x, min_y, 0, 0);
  
  // Draw triangle connecting hr and sec
  noStroke();
  fill(255, 50);
  triangle(hr_x, hr_y, sec_x, sec_y, 0, 0);
  
  // Draw triangle connecting all three
  noStroke();
  fill(0);
  triangle(hr_x, hr_y, sec_x, sec_y, sec_x, sec_y);
  
  // Draw hr, sec, min
  noFill();
  stroke(255, 30);
  strokeWeight(1);
  line(sec_x, sec_y, 0, 0);
  
  stroke(200);
  strokeWeight(2);
  line(min_x, min_y, 0,0);
  
  stroke(225);
  strokeWeight(3);
  line(hr_x, hr_y, 0, 0);
  
  // Draw center ellipse
  strokeWeight(3);
  stroke(12);
  fill(225);
  ellipse(0, 0, 8, 8)
}

// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  let h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}

// format hours, minutes, and seconds
function hours_minutes() {
  return nf(twelveHour(), 2) + ':' + nf(minute(), 2);
}

let prevSecond;
let millisOffset;

function smoothSecond() {
  let s = second();
  if (s != prevSecond) {
    millisOffset = millis();
    prevSecond = s;
  }
  let m = millis() - millisOffset;
  return s + (m / 1000.0);
}
