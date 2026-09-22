let usuarioLogado = false;

function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

function showSection(sectionId) {
    if ((sectionId === 'rotulos' || sectionId === 'receitas') && !usuarioLogado) {
        alert("🔒 Acesso restrito! Por favor, crie sua conta ou faça login para usar a Inteligência Artificial.");
        sectionId = 'login'; 
    }

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    const navLinks = document.getElementById('nav-links');
    if(navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
}

function realizarLogin(event) {
    event.preventDefault(); 
    
    usuarioLogado = true; 
    
    document.getElementById('btn-login-desktop').innerText = "Sair da Conta";
    document.getElementById('btn-login-desktop').setAttribute('onclick', 'sairDaConta()');
    document.getElementById('menu-login-mobile').innerHTML = '<a href="#" onclick="sairDaConta()">Sair da Conta</a>';

    alert("✅ Acesso liberado! Agora você pode usar a Análise de Rótulos e Gerar Receitas.");
    showSection('home');
}

function sairDaConta() {
    usuarioLogado = false;
    
    document.getElementById('btn-login-desktop').innerText = "Acessar Conta";
    document.getElementById('btn-login-desktop').setAttribute('onclick', "showSection('login')");
    document.getElementById('menu-login-mobile').innerHTML = '<a href="#" onclick="showSection(\'login\')">Acessar Conta</a>';
    
    alert("Você saiu da sua conta.");
    showSection('home');
}

let isLogin = true;
function toggleAuth() {
    isLogin = !isLogin;
    const title = document.getElementById('form-title');
    const toggleText = document.querySelector('.toggle-auth');
    const btn = document.getElementById('btn-submit-auth');

    if (isLogin) {
        title.innerText = "Acesse sua Conta";
        btn.innerText = "Entrar";
        toggleText.innerHTML = 'Ainda não tem conta? <a href="#" onclick="toggleAuth()">Criar minha conta</a>.';
    } else {
        title.innerText = "Crie sua Conta Grátis";
        btn.innerText = "Cadastrar";
        toggleText.innerHTML = 'Já tem cadastro? <a href="#" onclick="toggleAuth()">Fazer login</a>.';
    }
}

function analisarRotulo() {
    const inputFoto = document.getElementById('rotulo-img').value;
    const resultado = document.getElementById('resultado-rotulo');
    
    if (!inputFoto) {
        alert("Sistema: Por favor, carregue a imagem da tabela nutricional primeiro.");
        return;
    }
    resultado.classList.remove('hidden');
}

function gerarReceita() {
    const texto = document.getElementById('ingredientes-texto').value.toLowerCase();
    const foto = document.getElementById('ingredientes-img').value;
    const resultado = document.getElementById('resultado-receita');

    const titulo = document.getElementById('titulo-receita');
    const cal = document.getElementById('cal-receita');
    const pro = document.getElementById('pro-receita');
    const carb = document.getElementById('carb-receita');
    const preparo = document.getElementById('preparo-receita');

    if (!texto && !foto) {
        alert("Sistema: Informe os ingredientes que você tem na sua casa.");
        return;
    }

    if (texto.includes('ovo') || texto.includes('queijo')) {
        titulo.innerText = "🍽️ Sugestão: Omelete Fit Rápido";
        cal.innerText = "280"; pro.innerText = "22"; carb.innerText = "5";
        preparo.innerHTML = "<strong>Passo a passo:</strong> Bata os ovos até homogeneizar. Adicione queijo e temperos a gosto (orégano, sal). Prepare em fogo baixo numa frigideira antiaderente sem adição de óleo.";
    } else if (texto.includes('banana') || texto.includes('aveia')) {
        titulo.innerText = "🍽️ Sugestão: Panqueca de Aveia com Banana";
        cal.innerText = "310"; pro.innerText = "15"; carb.innerText = "45";
        preparo.innerHTML = "<strong>Passo a passo:</strong> Amasse a banana, misture com ovos e aveia. Grelhe dos dois lados em uma frigideira. Excelente para dar energia antes de exercícios.";
    } else {
        titulo.innerText = "🍽️ Sugestão: Frango Grelhado com Batata Doce";
        cal.innerText = "350"; pro.innerText = "35"; carb.innerText = "25";
        preparo.innerHTML = "<strong>Passo a passo:</strong> Tempere o frango com sal, pimenta e azeite. Grelhe até dourar. Cozinhe a batata doce, amasse e sirva junto com salada verde.";
    }

    resultado.classList.remove('hidden');
}