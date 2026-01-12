const poolArgentina = [
   {tripu: "Asado", impo: "pizza"}, {tripu: "Choripan", impo: "ensalada"},
    {tripu: "Empanada", impo: " masa"}, {tripu: "Alfajor", impo: "churro"},
    {tripu: "Milanesa", impo: "club"}, {tripu: "Mate", impo: "Infusión"},
    {tripu: "Fernet", impo: "vino"}, {tripu: "Dulce de Leche", impo: "helado"},
    {tripu: "Facturas", impo: "dulces"}, {tripu: "Pizza ", impo: " queso"},
    {tripu: "Mantecol", impo: "papa noel"}, {tripu: "Vitel Toné", impo: "empanada"},
    {tripu: "Locro", impo: "campo"}, {tripu: "Provoleta", impo: "asado"},
    {tripu: "Pastelitos", impo: "arina"}, {tripu: "Churros", impo: "azúcar"},
    {tripu: "Salame", impo: "bondiola"}, {tripu: "Vino Tinto", impo: "soda"},
    {tripu: "Gancia", impo: "hierbas"}, {tripu: "Torta Frita", impo: "lluvia"},
    {tripu: "Humita", impo: "Crema"}, {tripu: "Garrapiñada", impo: "seco"},
    {tripu: "Tereré", impo: "fría"}, {tripu: "Picada", impo: "futbol"},
    {tripu: "Soda", impo: "gas"}, {tripu: "Messi", impo: "Capitán"},
    {tripu: "Maradona", impo: "histórico"}, {tripu: "Dibu Martínez", impo: "famoso"},
    {tripu: "Gardel", impo: "Cantante"}, {tripu: "Ricardo Fort", impo: "millonario"},
    {tripu: "Bizarrap", impo: "musical"}, {tripu: "Gaucho", impo: "campo"},
    {tripu: "Mafalda", impo: "historieta"}, {tripu: "San Martín", impo: "chile"},
    {tripu: "Mirtha Legrand", impo: "tele"}, {tripu: "Susana Giménez", impo: "Diva"},
    {tripu: "Rodrigo Bueno", impo: "Cantante"}, {tripu: "SUBE", impo: "subte"},
    {tripu: "Termo", impo: "agua"}, {tripu: "vidrio", impo: "puerta"},
    {tripu: "Pava eléctrica", impo: "enchufe"}, {tripu: "Escarapela", impo: "Distintivo"},
    {tripu: "Encendedor", impo: "cocina"}, {tripu: "Bombilla", impo: "metal"},
    {tripu: "Boludo", impo: "trabajo"}, {tripu: "Truco", impo: "el uno "},
    {tripu: "Cuchillo", impo: "piedra"}, {tripu: "Alpargatas", impo: "tela"},
    {tripu: "Espuma", impo: "Cotillón "}, {tripu: "Bombo ", impo: "microfono"},
    {tripu: "Obelisco", impo: "porteño"}, {tripu: "La Bombonera", impo: "velez"},
    {tripu: "El Monumental", impo: "barcelona"}, {tripu: "Cataratas del Iguazú", impo: "selva"},
    {tripu: "Bariloche", impo: "Ciudad"}, {tripu: "Mar del Plata", impo: "cordoba"},
    {tripu: "Ushuaia", impo: "sur"}, {tripu: "Calle Corrientes", impo: "Avenida"},
    {tripu: "La Quiaca", impo: "Pueblo"}, {tripu: "Puerto Madero", impo: "Barrio"},
    {tripu: "Caminito", impo: "colores"}, {tripu: "Glaciar Perito Moreno", impo: "Masa"},
    {tripu: "Bondi", impo: "urbano"}, {tripu: "Laburo", impo: "pesado"},
    {tripu: "Chamuyo", impo: "falso"}, {tripu: "Guita", impo: "oro"},
    {tripu: "Fiaca", impo: "Ganar"}, {tripu: "Chanta", impo: "enojo"},
    {tripu: "Crotos", impo: "Personas"}, {tripu: "Quilmes", impo: "cancha"},
    {tripu: "Mate Cocido", impo: "cafe"}
];

let listaNombresGlobal = [];
let datosPartida = [];
let currentIndex = 0;
let palabraCorrecta = "";
let timerInterval;
let timeLeft = 180;

// LÓGICA MODAL REGLAS
const modal = document.getElementById('rulesModal');
document.getElementById('btnOpenRules').onclick = () => modal.classList.remove('hidden');
document.getElementById('btnCloseRules').onclick = () => modal.classList.add('hidden');

function actualizarListaUI() {
    const ul = document.getElementById('playersUl');
    ul.innerHTML = "";
    listaNombresGlobal.forEach((n, i) => {
        ul.innerHTML += `<li class="player-item"><span>${n}</span><button style="color:red; background:none; border:none; cursor:pointer;" onclick="eliminarJugador(${i})">X</button></li>`;
    });
    document.getElementById('count-jugadores').innerText = listaNombresGlobal.length;
}

function eliminarJugador(i) { 
    listaNombresGlobal.splice(i, 1); 
    actualizarListaUI(); 
}

document.getElementById('btnAdd').onclick = () => {
    const inp = document.getElementById('playerName');
    const nom = inp.value.trim().toUpperCase();
    if (nom && !listaNombresGlobal.includes(nom)) {
        listaNombresGlobal.push(nom);
        inp.value = "";
        actualizarListaUI();
    }
};

document.getElementById('btnStart').onclick = () => {
    const cantImpos = parseInt(document.getElementById('impoCountSelect').value);
    if (listaNombresGlobal.length < cantImpos + 2) return alert("Faltan pibes para jugar.");

    const par = poolArgentina[Math.floor(Math.random() * poolArgentina.length)];
    palabraCorrecta = par.tripu;

    let indicesImpo = [];
    while(indicesImpo.length < cantImpos){
        let r = Math.floor(Math.random() * listaNombresGlobal.length);
        if(!indicesImpo.includes(r)) indicesImpo.push(r);
    }

    currentIndex = 0;
    datosPartida = listaNombresGlobal.map((n, i) => ({
        nombre: n, 
        word: indicesImpo.includes(i) ? par.impo : par.tripu,
        role: indicesImpo.includes(i) ? "IMPOSTOR" : "CIVIL", 
        vivo: true
    }));

    document.getElementById('setup-screen').classList.add('hidden');
    mostrarRevelacion();
};

function mostrarRevelacion() {
    const screen = document.getElementById('reveal-screen');
    screen.classList.remove('hidden');
    document.getElementById('turnOwner').innerText = `TURNO DE: ${datosPartida[currentIndex].nombre}`;
    const box = document.getElementById('wordBox');
    const btnNext = document.getElementById('btnNext');
    box.innerHTML = "TOCÁ PARA REVELAR";
    box.style.borderColor = "var(--celeste-arg)";
    btnNext.classList.add('hidden');

    box.onclick = () => {
        const p = datosPartida[currentIndex];
        const esImpo = p.role === "IMPOSTOR";
        box.innerHTML = `<div class="${esImpo ? 'txt-impostor' : 'txt-civil'}" style="font-size: 2rem">${p.role}</div><br>PALABRA:<br><strong>"${p.word}"</strong>`;
        box.style.borderColor = esImpo ? "var(--rojo-impostor)" : "var(--azul-civil)";
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
    timeLeft = parseInt(document.getElementById('timeSelect').value);
    
    // Lista de vivos
    const vivos = datosPartida.filter(p => p.vivo);
    document.getElementById('remaining-count').innerHTML = `VIVOS (${vivos.length}): <br> <small>${vivos.map(v=>v.nombre).join(", ")}</small>`;
    
    // --- SORTEO ALEATORIO PARA EMPEZAR ---
    const elegido = vivos[Math.floor(Math.random() * vivos.length)];
    document.getElementById('firstPlayerName').innerText = `¡${elegido.nombre}! 🗣️`;
    // -------------------------------------

    startTimer();
}

function startTimer() {
    const display = document.getElementById('timer');
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (--timeLeft < 0) { 
            clearInterval(timerInterval); 
            display.innerText = "¡TIEMPO!"; 
        }
    }, 1000);
}

document.getElementById('btnMasTiempo').onclick = () => { timeLeft += 60; };

document.getElementById('btnIrAVotar').onclick = () => {
    clearInterval(timerInterval);
    document.getElementById('debate-screen').classList.add('hidden');
    document.getElementById('vote-screen').classList.remove('hidden');
    const grid = document.getElementById('voteGrid');
    grid.innerHTML = "";
    
    datosPartida.filter(p => p.vivo).forEach(p => {
        const btn = document.createElement('button');
        btn.className = "btn-sec"; // Uso clase existente
        btn.style.margin = "0";
        btn.innerText = p.nombre;
        btn.onclick = () => procesarVoto(p);
        grid.appendChild(btn);
    });
};

function procesarVoto(jugador) {
    document.getElementById('vote-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('game-over-msg').innerText = "";
    
    const esImpo = jugador.role === "IMPOSTOR";
    document.getElementById('resultIdentity').innerHTML = `${jugador.nombre}<br>ERA <span class="${esImpo ? 'txt-impostor' : 'txt-civil'}">${jugador.role}</span>`;
    
    document.getElementById('btnFinalAction').onclick = () => {
        jugador.vivo = false;
        const impsVivos = datosPartida.filter(p => p.vivo && p.role === "IMPOSTOR").length;
        
        if (esImpo && impsVivos === 0) {
            document.getElementById('result-screen').classList.add('hidden');
            document.getElementById('guess-screen').classList.remove('hidden');
        } else {
            const civsVivos = datosPartida.filter(p => p.vivo && p.role === "CIVIL").length;
            const impsVivosCant = datosPartida.filter(p => p.vivo && p.role === "IMPOSTOR").length;
            
            if (civsVivos <= impsVivosCant) {
                anunciarGanador("IMPOSTORES");
            } else {
                document.getElementById('result-screen').classList.add('hidden');
                irADebate();
            }
        }
    };
}

document.getElementById('btnCheckGuess').onclick = () => {
    const g = document.getElementById('impostorGuess').value.toLowerCase().trim();
    if (g === palabraCorrecta.toLowerCase()) {
        anunciarGanador("IMPOSTORES (ADIVINÓ)");
    } else {
        anunciarGanador("CIVILES (IMPOSTOR ERRÓ)");
    }
};

function anunciarGanador(quien) {
    document.getElementById('guess-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('resultIdentity').innerHTML = "FIN DE LA PARTIDA";
    document.getElementById('game-over-msg').innerHTML = `GANAN LOS <br><span style="color:var(--accent-green)">${quien}</span>`;
    
    document.getElementById('btnFinalAction').onclick = () => {
        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('setup-screen').classList.remove('hidden');
        actualizarListaUI();
    };
}
