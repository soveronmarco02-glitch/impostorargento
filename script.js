const poolArgentina = [
    // COMIDA Y BEBIDA
    {tripu: "Asado", impo: "amigos"},
    {tripu: "Choripan", impo: "Sandwich de carne"},
    {tripu: "Empanada", impo: " masa"},
    {tripu: "Alfajor", impo: "Golosina rellena"},
    {tripu: "Milanesa", impo: "Carne rebozada"},
    {tripu: "Mate", impo: "Infusión caliente"},
    {tripu: "Fernet", impo: "Bebida con cola"},
    {tripu: "Dulce de Leche", impo: "Crema de leche"},
    {tripu: "Facturas", impo: "Masas dulces"},
    {tripu: "Pizza de muzzarella", impo: "Masa con queso"},
    {tripu: "Mantecol", impo: "Postre de maní"},
    {tripu: "Vitel Toné", impo: "Carne con salsa"},
    {tripu: "Locro", impo: "Guiso de campo"},
    {tripu: "Provoleta", impo: "Queso asado"},
    {tripu: "Pastelitos", impo: "Masa frita dulce"},
    {tripu: "Churros", impo: "Masa con azúcar"},
    {tripu: "Salame", impo: "Embutido"},
    {tripu: "Vino Tinto", impo: "Bebida de uva"},
    {tripu: "Gancia", impo: "Aperitivo de hierbas"},
    {tripu: "Torta Frita", impo: "Masa de lluvia"},
    {tripu: "Humita", impo: "Crema de choclo"},
    {tripu: "Garrapiñada", impo: "Fruto seco dulce"},
    {tripu: "Tereré", impo: "Bebida fría"},
    {tripu: "Picada", impo: "Plato variado"},
    {tripu: "Soda", impo: "Agua con gas"},
    
    // PERSONALIDADES Y CULTURA
    {tripu: "Messi", impo: "Capitán de equipo"},
    {tripu: "Maradona", impo: "Jugador histórico"},
    {tripu: "Dibu Martínez", impo: "Arquero famoso"},
    {tripu: "Gardel", impo: "Cantante de Tango"},
    {tripu: "Ricardo Fort", impo: "Famoso millonario"},
    {tripu: "Bizarrap", impo: "Productor musical"},
    {tripu: "El Gaucho", impo: "Hombre de campo"},
    {tripu: "Mafalda", impo: "Personaje de historieta"},
    {tripu: "San Martín", impo: "Prócer nacional"},
    {tripu: "Mirtha Legrand", impo: "Conductora de tele"},
    {tripu: "Susana Giménez", impo: "Diva de la tele"},
    {tripu: "Rodrigo Bueno", impo: "Cantante de cuarteto"},

    // OBJETOS Y COTIDIANIDAD
    {tripu: "SUBE", impo: "Tarjeta de pago"},
    {tripu: "Termo", impo: "Recipiente térmico"},
    {tripu: "Sifón de vidrio", impo: "Envase de soda"},
    {tripu: "Pava eléctrica", impo: "Jarrito de agua"},
    {tripu: "Escarapela", impo: "Distintivo patrio"},
    {tripu: "Encendedor", impo: "Fuego portátil"},
    {tripu: "Bombilla", impo: "Sorrete de metal"},
    {tripu: "Boludo", impo: "Insulto común"},
    {tripu: "Truco", impo: "Juego de naipes"},
    {tripu: "Cuchillo Verijero", impo: "Arma blanca pequeña"},
    {tripu: "Alpargatas", impo: "Calzado de tela"},
    {tripu: "Espumita", impo: "Cotillón de carnaval"},
    {tripu: "Bombo Legüero", impo: "Instrumento de percusión"},

    // LUGARES
    {tripu: "Obelisco", impo: "Monumento porteño"},
    {tripu: "La Bombonera", impo: "Cancha de Boca"},
    {tripu: "El Monumental", impo: "Cancha de River"},
    {tripu: "Cataratas del Iguazú", impo: "Agua en la selva"},
    {tripu: "Bariloche", impo: "Ciudad de nieve"},
    {tripu: "Mar del Plata", impo: "Ciudad de playa"},
    {tripu: "Ushuaia", impo: "Ciudad del sur"},
    {tripu: "Calle Corrientes", impo: "Avenida de teatros"},
    {tripu: "La Quiaca", impo: "Pueblo del norte"},
    {tripu: "Puerto Madero", impo: "Barrio moderno"},
    {tripu: "Caminito", impo: "Calle de colores"},
    {tripu: "Glaciar Perito Moreno", impo: "Masa de hielo"},

    // TRANSPORTE Y JERGA
    {tripu: "Bondi", impo: "Colectivo urbano"},
    {tripu: "Laburo", impo: "Empleo pesado"},
    {tripu: "Chamuyo", impo: "Discurso falso"},
    {tripu: "Guita", impo: "Dinero en efectivo"},
    {tripu: "Fiaca", impo: "Ganas de dormir"},
    {tripu: "Chanta", impo: "Persona poco seria"},
    {tripu: "Crotos", impo: "Personas humildes"},
    {tripu: "Quilmes", impo: "Ciudad y cerveza"},
    {tripu: "Mate Cocido", impo: "Té de yerba"}
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
