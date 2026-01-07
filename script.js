const poolArgentina = [
    // COMIDA Y BEBIDA
    {tripu: "Asado", impo: "pizza"},
    {tripu: "Choripan", impo: "ensalada"},
    {tripu: "Empanada", impo: " masa"},
    {tripu: "Alfajor", impo: "churro"},
    {tripu: "Milanesa", impo: "club"},
    {tripu: "Mate", impo: "Infusión"},
    {tripu: "Fernet", impo: "vino"},
    {tripu: "Dulce de Leche", impo: "helado"},
    {tripu: "Facturas", impo: "dulces"},
    {tripu: "Pizza ", impo: " queso"},
    {tripu: "Mantecol", impo: "papa noel"},
    {tripu: "Vitel Toné", impo: "empanada"},
    {tripu: "Locro", impo: "campo"},
    {tripu: "Provoleta", impo: "asado"},
    {tripu: "Pastelitos", impo: "arina"},
    {tripu: "Churros", impo: "azúcar"},
    {tripu: "Salame", impo: "Embutido"},
    {tripu: "Vino Tinto", impo: "soda"},
    {tripu: "Gancia", impo: "Aperitivo de hierbas"},
    {tripu: "Torta Frita", impo: "lluvia"},
    {tripu: "Humita", impo: "Crema de choclo"},
    {tripu: "Garrapiñada", impo: "Fruto seco dulce"},
    {tripu: "Tereré", impo: "fría"},
    {tripu: "Picada", impo: "futbol"},
    {tripu: "Soda", impo: "gas"},
    
    // PERSONALIDADES Y CULTURA
    {tripu: "Messi", impo: "Capitán"},
    {tripu: "Maradona", impo: "histórico"},
    {tripu: "Dibu Martínez", impo: "famoso"},
    {tripu: "Gardel", impo: "Cantante"},
    {tripu: "Ricardo Fort", impo: "millonario"},
    {tripu: "Bizarrap", impo: "musical"},
    {tripu: "Gaucho", impo: "campo"},
    {tripu: "Mafalda", impo: "Personaje de historieta"},
    {tripu: "San Martín", impo: "Prócer "},
    {tripu: "Mirtha Legrand", impo: "Conductora de tele"},
    {tripu: "Susana Giménez", impo: "Diva"},
    {tripu: "Rodrigo Bueno", impo: "Cantante"},

    // OBJETOS Y COTIDIANIDAD
    {tripu: "SUBE", impo: "subte"},
    {tripu: "Termo", impo: "térmico"},
    {tripu: "vidrio", impo: "puerta"},
    {tripu: "Pava eléctrica", impo: "Jarrito de agua"},
    {tripu: "Escarapela", impo: "Distintivo"},
    {tripu: "Encendedor", impo: "portátil"},
    {tripu: "Bombilla", impo: "metal"},
    {tripu: "Boludo", impo: "trabajo"},
    {tripu: "Truco", impo: "el uno "},
    {tripu: "Cuchillo", impo: "piedra"},
    {tripu: "Alpargatas", impo: "tela"},
    {tripu: "Espuma", impo: "Cotillón "},
    {tripu: "Bombo ", impo: "microfono"},

    // LUGARES
    {tripu: "Obelisco", impo: "porteño"},
    {tripu: "La Bombonera", impo: "velez"},
    {tripu: "El Monumental", impo: "barcelona"},
    {tripu: "Cataratas del Iguazú", impo: "selva"},
    {tripu: "Bariloche", impo: "Ciudad"},
    {tripu: "Mar del Plata", impo: "cordoba"},
    {tripu: "Ushuaia", impo: "sur"},
    {tripu: "Calle Corrientes", impo: "Avenida"},
    {tripu: "La Quiaca", impo: "Pueblo"},
    {tripu: "Puerto Madero", impo: "Barrio"},
    {tripu: "Caminito", impo: "colores"},
    {tripu: "Glaciar Perito Moreno", impo: "Masa"},

    // TRANSPORTE Y JERGA
    {tripu: "Bondi", impo: "urbano"},
    {tripu: "Laburo", impo: "pesado"},
    {tripu: "Chamuyo", impo: "falso"},
    {tripu: "Guita", impo: "oro"},
    {tripu: "Fiaca", impo: "Ganar"},
    {tripu: "Chanta", impo: "enojo"},
    {tripu: "Crotos", impo: "Personas"},
    {tripu: "Quilmes", impo: "cancha"},
    {tripu: "Mate Cocido", impo: "cafe"}
];

let listaNombresGlobal = []; 
let datosPartida = [];
let currentIndex = 0;
let palabraCorrecta = "";
let timerInterval;
let audioCtx;

// --- MOTOR DE AUDIO SEGURO ---
function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(freq, duration, type = "sine") {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { console.warn("Audio aún no permitido"); }
}

// --- JESTIÓN DE JUGADORES ---
function actualizarListaUI() {
    const ul = document.getElementById('playersUl');
    ul.innerHTML = "";
    listaNombresGlobal.forEach((n, i) => {
        const li = document.createElement('li');
        li.className = 'player-item';
        li.innerHTML = `<span>> ${n}</span><button class="btn-del" onclick="eliminarJugador(${i})">X</button>`;
        ul.appendChild(li);
    });
    document.getElementById('btnStart').disabled = listaNombresGlobal.length < 3;
}

function eliminarJugador(i) { 
    listaNombresGlobal.splice(i, 1); 
    actualizarListaUI(); 
}

document.getElementById('btnAdd').onclick = () => {
    initAudio();
    const input = document.getElementById('playerName');
    const n = input.value.trim().toUpperCase();
    if (n && !listaNombresGlobal.includes(n)) {
        listaNombresGlobal.push(n);
        input.value = "";
        actualizarListaUI();
        playTone(440, 0.1);
    }
};

// --- FLUJO DE JUEGO ---
document.getElementById('btnStart').onclick = () => {
    initAudio();
    const par = poolArgentina[Math.floor(Math.random() * poolArgentina.length)];
    palabraCorrecta = par.tripu;
    const impoIdx = Math.floor(Math.random() * listaNombresGlobal.length);
    currentIndex = 0;

    datosPartida = listaNombresGlobal.map((n, i) => ({
        nombre: n, 
        word: i === impoIdx ? par.impo : par.tripu,
        role: i === impoIdx ? "IMPOSTOR" : "CIVIL", 
        vivo: true
    }));

    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    mostrarRevelacion();
};

function mostrarRevelacion() {
    const screen = document.getElementById('reveal-screen');
    screen.classList.remove('hidden');
    document.getElementById('turnOwner').innerText = `ESCANEO: ${datosPartida[currentIndex].nombre}`;
    const box = document.getElementById('wordBox');
    const btnNext = document.getElementById('btnNext');
    box.innerHTML = "SISTEMA BLOQUEADO<br>HACÉ CLICK PARA ESCANEAR";
    box.style.borderColor = "white";
    btnNext.classList.add('hidden');

    box.onclick = () => {
        const p = datosPartida[currentIndex];
        const esImpo = p.role === "IMPOSTOR";
        playTone(esImpo ? 150 : 600, 0.3);
        box.innerHTML = `
            <div style="font-size: 0.8rem; color: #aaa;">IDENTIDAD CONFIRMADA:</div>
            <div class="${esImpo ? 'txt-impostor' : 'txt-civil'}" style="font-size: 2.2rem; margin: 10px 0;">${p.role}</div>
            <div style="font-size: 0.8rem; color: #aaa;">PALABRA CLAVE:</div>
            <div style="font-size: 1.6rem; color: white;">"${p.word}"</div>
        `;
        box.style.borderColor = esImpo ? "var(--impostor)" : "var(--civil)";
        btnNext.classList.remove('hidden');
    };
}

document.getElementById('btnNext').onclick = () => {
    currentIndex++;
    if (currentIndex < datosPartida.length) {
        mostrarRevelacion();
    } else {
        document.getElementById('reveal-screen').classList.add('hidden');
        irADebate();
    }
};

function irADebate() {
    document.getElementById('debate-screen').classList.remove('hidden');
    const vivos = datosPartida.filter(p => p.vivo).length;
    document.getElementById('remaining-count').innerText = `CONEXIONES ACTIVAS: ${vivos}`;
    startTimer(180); // <--- AQUÍ: 3 MINUTOS
}

function startTimer(seconds) {
    let t = seconds;
    clearInterval(timerInterval);
    const display = document.getElementById('timer');
    timerInterval = setInterval(() => {
        let mins = Math.floor(t / 60);
        let secs = t % 60;
        display.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        
        // Pip de los últimos 5 segundos
        if (t <= 5 && t > 0) {
            playTone(800, 0.1);
            display.classList.add('flash');
        } else {
            display.classList.remove('flash');
        }
        
        if (t === 0) {
            clearInterval(timerInterval);
            display.innerText = "¡VOTAR!";
            playTone(100, 0.8, "sawtooth"); // Alarma final
        }
        
        display.style.color = t < 30 ? "var(--impostor)" : "#00ff88";
        t--;
    }, 1000);
}

// Botones de control de debate
document.getElementById('btnSeguirRonda').onclick = () => { playTone(440, 0.1); startTimer(60); };
document.getElementById('btnMenuPrincipal').onclick = () => {
    clearInterval(timerInterval);
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('setup-screen').classList.remove('hidden');
    actualizarListaUI();
};

document.getElementById('btnIrAVotar').onclick = () => {
    clearInterval(timerInterval);
    document.getElementById('debate-screen').classList.add('hidden');
    document.getElementById('vote-screen').classList.remove('hidden');
    const grid = document.getElementById('voteGrid');
    grid.innerHTML = "";
    datosPartida.filter(p => p.vivo).forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'btn-main';
        btn.innerText = p.nombre;
        btn.onclick = () => { playTone(400, 0.1); procesarVoto(p); };
        grid.appendChild(btn);
    });
};

function procesarVoto(jugador) {
    document.getElementById('vote-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    const res = document.getElementById('resultIdentity');
    const btn = document.getElementById('btnFinalAction');
    const color = jugador.role === "IMPOSTOR" ? "txt-impostor" : "txt-civil";

    res.innerHTML = `${jugador.nombre}<br>ERA <span class="${color}">${jugador.role}</span>`;
    
    if (jugador.role === "IMPOSTOR") {
        btn.innerText = "ÚLTIMA CHANCE";
        btn.onclick = () => {
            document.getElementById('result-screen').classList.add('hidden');
            document.getElementById('guess-screen').classList.remove('hidden');
        };
    } else {
        jugador.vivo = false;
        const vivos = datosPartida.filter(p => p.vivo);
        const hayImpostor = vivos.some(v => v.role === "IMPOSTOR");

        if (vivos.length <= 2 && hayImpostor) {
            res.innerHTML += `<br><span class="txt-impostor">¡EL IMPOSTOR GANÓ!</span>`;
            btn.innerText = "NUEVA PARTIDA";
            btn.onclick = () => {
                document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
                document.getElementById('setup-screen').classList.remove('hidden');
                actualizarListaUI();
            };
        } else {
            btn.innerText = "SIGUIENTE RONDA";
            btn.onclick = () => { 
                document.getElementById('result-screen').classList.add('hidden'); 
                irADebate(); 
            };
        }
    }
}

document.getElementById('btnCheckGuess').onclick = () => {
    const guess = document.getElementById('impostorGuess').value.toLowerCase().trim();
    const gano = (guess === palabraCorrecta.toLowerCase());
    playTone(gano ? 1000 : 100, 0.5);
    alert(gano ? "¡EL IMPOSTOR ADIVINÓ! GANÓ LA PARTIDA." : "¡ERROR! La palabra era: " + palabraCorrecta);
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('setup-screen').classList.remove('hidden');
    actualizarListaUI();
};
