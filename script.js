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

let listaJugadores = [];
let datosPartida = [];
let currentIndex = 0;
let palabraCorrecta = "";
let timerInterval;

// Registrar jugadores
document.getElementById('btnAdd').onclick = () => {
    const input = document.getElementById('playerName');
    const nombre = input.value.trim().toUpperCase();
    if (nombre && listaJugadores.length < 20) {
        listaJugadores.push(nombre);
        const li = document.createElement('li');
        li.className = 'player-item';
        li.innerText = `> ${nombre}`;
        document.getElementById('playersUl').appendChild(li);
        input.value = "";
        if (listaJugadores.length >= 3) document.getElementById('btnStart').disabled = false;
    }
};

// Iniciar Partida
document.getElementById('btnStart').onclick = () => {
    const par = poolArgentina[Math.floor(Math.random() * poolArgentina.length)];
    palabraCorrecta = par.tripu;
    const impoIdx = Math.floor(Math.random() * listaJugadores.length);

    datosPartida = listaJugadores.map((n, i) => ({
        nombre: n,
        word: i === impoIdx ? par.impo : par.tripu,
        role: i === impoIdx ? "IMPOSTOR" : "CIVIL",
        vivo: true
    }));

    document.getElementById('setup-screen').classList.add('hidden');
    mostrarRevelacion();
};

function mostrarRevelacion() {
    const screen = document.getElementById('reveal-screen');
    screen.classList.remove('hidden');
    document.getElementById('turnOwner').innerText = `ESCANEO: ${datosPartida[currentIndex].nombre}`;
    const box = document.getElementById('wordBox');
    const btnNext = document.getElementById('btnNext');

    box.innerText = "CLICK PARA REVELAR ROL";
    box.className = "word-card"; // Reset clase
    btnNext.classList.add('hidden');

    box.onclick = () => {
        const p = datosPartida[currentIndex];
        const claseRol = p.role === "IMPOSTOR" ? "txt-impostor" : "txt-civil";
        box.innerHTML = `ROL: <span class="${claseRol}">${p.role}</span><br>PALABRA: "${p.word}"`;
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
    document.getElementById('remaining-count').innerText = `JUGADORES VIVOS: ${vivos}`;
    startTimer(60);
}

function startTimer(seconds) {
    let t = seconds;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        let mins = Math.floor(t / 60);
        let secs = t % 60;
        document.getElementById('timer').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (--t < 0) clearInterval(timerInterval);
    }, 1000);
}

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
        btn.onclick = () => procesarVoto(p);
        grid.appendChild(btn);
    });
};

function procesarVoto(jugador) {
    document.getElementById('vote-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    const resIdent = document.getElementById('resultIdentity');
    const btnAction = document.getElementById('btnFinalAction');

    const claseRol = jugador.role === "IMPOSTOR" ? "txt-impostor" : "txt-civil";
    resIdent.innerHTML = `${jugador.nombre}<br>ERA <span class="${claseRol}">${jugador.role}</span>`;
    
    if (jugador.role === "IMPOSTOR") {
        btnAction.innerText = "ÚLTIMA CHANCE DEL IMPOSTOR";
        btnAction.onclick = () => {
            document.getElementById('result-screen').classList.add('hidden');
            document.getElementById('guess-screen').classList.remove('hidden');
        };
    } else {
        jugador.vivo = false; 
        const vivos = datosPartida.filter(p => p.vivo);
        const impostorVivo = vivos.some(p => p.role === "IMPOSTOR");
        
        if (vivos.length <= 2 && impostorVivo) {
            resIdent.innerHTML += `<br><span class="txt-impostor">¡EL IMPOSTOR HA GANADO!</span>`;
            btnAction.innerText = "REINICIAR";
            btnAction.onclick = () => location.reload();
        } else {
            btnAction.innerText = "SIGUIENTE RONDA";
            btnAction.onclick = () => {
                document.getElementById('result-screen').classList.add('hidden');
                irADebate();
            };
        }
    }
}

document.getElementById('btnCheckGuess').onclick = () => {
    const guess = document.getElementById('impostorGuess').value.toLowerCase().trim();
    const resultText = guess === palabraCorrecta.toLowerCase() ? "¡GANÓ EL IMPOSTOR!" : "¡PERDIÓ EL IMPOSTOR!";
    alert(`${resultText}\nLa palabra era: ${palabraCorrecta}`);
    location.reload();
};

document.getElementById('btnSeguirRonda').onclick = () => startTimer(60);
