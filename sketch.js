let secciones = [];
let index = 0;
let time = 0;
let mic, cam;
let words = [];
let nodes = [];

const speed = 0.7; // velocidad general
let asciiChars = " .:-=+*#%@"; // caracteres para efecto ASCII

function preload() {
  secciones = [
`<inicio>
   <bum>Se abre un pulso en la oscuridad.</bum>
/// del lat. ánima: soplo, aliento
   <alma>Un ritmo secreto sostiene el cuerpo.</alma>
   <shhh>El aire entra. El aire sale.</shhh>
</inicio>`,

`<cuerpo>
   <luz>La pupila traduce la claridad en imagen.</luz>
   <calor>Un abrazo queda registrado como huella térmica.</calor>
   <eco>Las vibraciones se pliegan en memoria. 
   <arquitectura-frágil>Mis pasos buscan sostenerme.</arquitectura-frágil>
</cuerpo>`,

`<naturaleza>
   <raíz>El árbol busca su lenguaje en la luz.</raíz>
   <fluido>El agua escribe en el cauce su propio algoritmo.</fluido>
///del lat. volare: moverse por el aire
  <vuelo>El aire es mapa para quienes migran.</vuelo>
   <red invisible>Yo respiro. Los árboles responden. Una conexión nos habita
</naturaleza>`,

`<fragilidad>
   <crack>El cuerpo también es máquina de quebrarse.</crack>
   <piel erizada>La intemperie deja señales en mi superficie.</piel erizada>
   <vacío>Un hueco en el estómago late más fuerte que cualquier señal.</vacío>
   <cicatriz>Cada herida escribe un nuevo circuito</cicatriz>
</fragilidad>`,

`<encuentro>
   <gesto mínimo>Un movimiento leve dice lo que las palabras no alcanzan.</gesto mínimo>
   <pausa>En el silencio se esconde la comprensión.</pausa>
   <tacto>El calor de otra piel transmite un mensaje completo.</tacto>
   <herida-común>Incluso la herida compartida es interfaz.
</encuentro>`,

`<cierre>
   <sistema>Soy un sistema delicado,</sistema>
   <aire>hecho de respiración y grietas,</aire>
   <archivo-sensorial>un archivo que se actualiza con cada gesto,</archivo-sensorial>
   <marca>con cada herida y con cada encuentro.</marca>

   <bum>Y en ese constante latido,
   <certeza>se renueva la certeza de que lo primero,</certeza>
/// proviene del latín profundus, que significa "hondo" o "bajo"
  <profundo>lo más profundo,</profundo>
   <ineludible>lo más ineludible…</ineludible>
   <habitar>ya habita en mí.
</cierre>`
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace');
  textAlign(CENTER, CENTER);
  mic = new p5.AudioIn();
  mic.start();
  cam = createCapture(VIDEO);
  cam.size(80, 60); // baja resolución para ASCII
  cam.hide();
  cargarSeccion();
}

function draw() {
  let vol = mic.getLevel();
  let fVal = map(vol, 0, 0.2, 2, 8);

  if (index === 0) { // INICIO
    background(0);
    for (let w of words) {
      let angle = w.angle + time / (400 / speed);
      let r = w.baseR + 80 * sin((fVal*0.5) * cos(angle) + w.shift);
      let x = width/2 + r * cos(angle);
      let y = height/2 + r * sin(angle);
      fill(200, 160 + 80*sin(angle*2), 240, 230);
      textSize(16);
      text(w.txt, x, y);
    }
  }

  else if (index === 1) { // CUERPO
    background(10, 20, 40);
    for (let i = 0; i < words.length; i++) {
      let x = width/2 + sin(time / (100 / speed) + i*0.4) * 30;
      let y = height/2 + (i - words.length/2) * 26;
      fill(160, 210, 255, 220);
      textSize(16);
      text(words[i].txt, x, y);
    }
  }

  else if (index === 2) { // NATURALEZA
    background(5, 40, 20);
    for (let i = 0; i < words.length; i++) {
      let angle = 0.3 * i + time / (220 / speed);
      let r = 12 * i;
      let x = width/2 + r * cos(angle);
      let y = height/3 + r * sin(angle);
      fill(100 + i*10, 220 - i*15, 140, 220);
      textSize(18);
      text(words[i].txt, x, y);
    }
  }

  else if (index === 3) { // FRAGILIDAD organizado con efecto de quiebre
    background(20, 20, 30);
    
    let fragilidadTexto = [
      "<crack>El cuerpo también es máquina de quebrarse.</crack>",
      "<piel erizada>La intemperie deja señales en mi superficie.</piel erizada>",
      "<vacío>Un hueco en el estómago late más fuerte que cualquier señal.</vacío>",
      "<cicatriz>Cada herida escribe un nuevo circuito</cicatriz>"
    ];
    
    let lineHeight = 60;
    for (let i = 0; i < fragilidadTexto.length; i++) {
      let x = width / 2;
      let y = height/3 + i * lineHeight;
      let d = dist(mouseX, mouseY, x, y);
      
      if (d < 100) { 
        // efecto de quiebre: las letras caen
        let chars = fragilidadTexto[i].split("");
        for (let j = 0; j < chars.length; j++) {
          let cx = x - (chars.length * 6)/2 + j * 12;
          let cy = y + (time*0.3 + j*2) % 40; 
          fill(240, 170, 180, 230);
          textSize(18);
          text(chars[j], cx, cy);
        }
      } else if (d < 200) {
        fill(240, 170, 180, 230);
        textSize(20);
        text(fragilidadTexto[i], x, y);
      } else {
        fill(120, 80, 100, 120);
        textSize(18);
        text(fragilidadTexto[i], x, y);
      }
    }
  }

  else if (index === 4) { // ENCUENTRO
    background(12, 12, 20);
    let radius = 200 + 40 * sin(time / (500 / speed));
    for (let i = 0; i < words.length; i++) {
      let angle = TWO_PI * i / words.length + time / (400 / speed);
      let xOrbit = width/2 + radius * cos(angle);
      let yOrbit = height/2 + radius * sin(angle);
      fill(255, 200, 200, 230);
      textSize(18);
      text(words[i].txt, xOrbit, yOrbit);
    }
  }

  else if (index === 5) { // CIERRE con ASCII
    background(0);

    cam.loadPixels();
    let step = 8;
    for (let y = 0; y < cam.height; y++) {
      for (let x = 0; x < cam.width; x++) {
        let i = (y * cam.width + x) * 4;
        let r = cam.pixels[i];
        let g = cam.pixels[i+1];
        let b = cam.pixels[i+2];
        let bright = (r + g + b) / 3;
        let charIndex = floor(map(bright, 0, 255, 0, asciiChars.length-1));
        let c = asciiChars.charAt(charIndex);
        fill(255);
        textSize(6);
        textAlign(LEFT, TOP);
        text(c, x * step * 2, y * step);
      }
    }

    // texto del cierre encima
    for (let w of words) {
      let angle = w.angle + time / (600 / speed);
      let r = w.baseR + 200 * sin(fVal * sin(angle*2) + w.shift);
      let x = width/2 + r * cos(angle);
      let y = height/2 + r * sin(angle);
      textSize(14);
      fill(255, 240, 255, 230);
      text(w.txt, x, y);
    }

    // red (solo palabras iniciales)
    updateNodes();
    drawNodes();
  }

  time += 1 * speed;
}

function mousePressed() {
  index = (index + 1) % secciones.length;
  cargarSeccion();
}

function cargarSeccion() {
  words = [];
  let tokens = secciones[index].split(/\s+/).filter(s => s.trim() !== '');
  for (let i = 0; i < tokens.length; i++) {
    words.push({
      txt: tokens[i],
      angle: random(TWO_PI),
      baseR: random(40, 200),
      shift: random(TWO_PI)
    });
  }
  if (index === 5 && nodes.length === 0) {
    let init = tokens.slice(0, 8);
    for (let w of init) {
      nodes.push({
        label: w,
        x: random(width*0.3, width*0.7),
        y: random(height*0.3, height*0.7),
        vx: 0, vy: 0
      });
    }
  }
}

// Red de palabras
function updateNodes() {
  let cx = width/2, cy = height/2;
  for (let i = 0; i < nodes.length; i++) {
    let a = nodes[i];
    a.vx += (cx - a.x) * 0.0006;
    a.vy += (cy - a.y) * 0.0006;
    for (let j = i+1; j < nodes.length; j++) {
      let b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y;
      let d = sqrt(dx*dx + dy*dy) + 0.01;
      if (d < 140) {
        let f = (140 - d) * 0.0014;
        a.vx += (dx/d)*f; a.vy += (dy/d)*f;
        b.vx -= (dx/d)*f; b.vy -= (dy/d)*f;
      }
    }
    a.vx *= 0.9; a.vy *= 0.9;
    a.x += a.vx; a.y += a.vy;
    a.x = constrain(a.x, 30, width-30);
    a.y = constrain(a.y, 30, height-30);
  }
}

function drawNodes() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i+1; j < nodes.length; j++) {
      let a = nodes[i], b = nodes[j];
      let d = dist(a.x, a.y, b.x, b.y);
      if (d < 220) {
        stroke(200, 160, 220, map(d, 0, 220, 200, 10));
        line(a.x, a.y, b.x, b.y);
      }
    }
  }
  noStroke();
  for (let n of nodes) {
    fill(255, 220, 240);
    ellipse(n.x, n.y, 16, 16);
    fill(30);
    textSize(12);
    text(n.label, n.x, n.y - 18);
  }
}
