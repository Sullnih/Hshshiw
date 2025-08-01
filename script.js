// Inisialisasi bintang
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Confetti
function createConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d9de0', '#ff8e8e'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Firework
function createFirework(x, y) {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d9de0', '#ff8e8e'];
    for (let i = 0; i < 12; i++) {
        const fw = document.createElement('div');
        fw.className = 'firework';
        fw.style.left = x + 'px';
        fw.style.top = y + 'px';
        fw.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(fw);
        setTimeout(() => fw.remove(), 2000);
    }
}

// Quiz data
const quizData = [
    {
        question: "Siapa yang ultah hari ini?",
        options: [" tsaa ", "gatau"],
        correct: 0,
        responses: {
            correct: "Benar! Hari ini adalah hari istimewa tsa! 🎉",
            wrong: "Hehe, salah dong! Yang ultah hari ini adalah tsa 😄"
        }
    },
    {
        question: "Apa yang paling cocok untuk tsa?",
        options: ["Kebahagiaan", "Kesedihan", "Kebosanan"],
        correct: 0,
        responses: {
            correct: "Tepat sekali! tsa pantas mendapatkan kebahagiaan! ✨",
            wrong: "Eits, salah! tsa  harus selalu bahagia dong! 😊"
        }
    },
    {
        question: "Apa harapan terbaik untuk tsa ?",
        options: ["Kesehatan & umur panjang", "Sakit-sakitan", "Biasa aja"],
        correct: 0,
        responses: {
            correct: "Aamiin! Semoga tsa selalu sehat dan panjang umur! 🤲",
            wrong: "Waduh, masa milih itu sih! harus doakan yang terbaik yah 🙏"
        }
    },
    {
        question: "Pertanyaan terakhir, kalau zal ada salah maafin nda?",
        options: ["Pasti Maafin!", "Hmmm mungkin", "nda"],
        correct: 0,
        responses: {
            correct: "Mantap!",
            wrong: "Yaah kok gitu, jadi sedih nih "
        }
    },
    {
        question: "Siap untuk surprise mega spektakuler?",
        options: ["SIAP BANGET!", "Belum siap", "Mungkin aja"],
        correct: 0,
        responses: {
            correct: "YESSS! Get ready for the BOOM! 🚀",
            wrong: "nda masalah, tetap lanjut! 🎊"
        }
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    const awal = document.querySelector(".awal");
    awal.style.opacity = '0';
    awal.style.transform = 'scale(0.8)';
    setTimeout(() => {
        awal.style.display = 'none';
        showDisclaimer();
    }, 500);
}

function showDisclaimer() {
    const quiz = document.getElementById("quiz");
    quiz.classList.remove('hidden');
    quiz.classList.add('show');
    const card = document.querySelector('.question-card');
    card.innerHTML = `
        <div style="animation: responseShow 0.8s ease-out;">
            <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: #fff;">? Pesan ?</h2>
            <p style="font-size: 1.2rem; color: #fff; margin-bottom: 2rem;">"hari yang istimewa"</p>
            <button id="start-btn" class="option-btn">Quiz!</button>
        </div>
    `;
    document.getElementById("start-btn").addEventListener("click", startRealQuiz);
}

function startRealQuiz() {
    currentQuestion = 0;
    loadQuestion();
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    const card = document.querySelector('.question-card');
    card.innerHTML = `
        <h2 id="question-text">${q.question}</h2>
        <div class="options">
            ${q.options.map((opt, i) => `
                <button class="option-btn" onclick="selectAnswer(${i})">${opt}</button>
            `).join('')}
        </div>
        <div class="progress-bar">
            <div class="progress" id="progress"></div>
        </div>
    `;
    document.getElementById("progress").style.width = ((currentQuestion + 1) / quizData.length) * 100 + '%';
}

function selectAnswer(index) {
    const q = quizData[currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);

    const correct = index === q.correct;
    if (correct) {
        buttons[index].classList.add('correct-answer');
        createFirework(window.innerWidth / 2, window.innerHeight / 2);
        score++;
    } else {
        buttons[index].classList.add('wrong-answer');
        buttons[q.correct].classList.add('correct-answer');
    }

    setTimeout(() => {
        showResponse(correct ? q.responses.correct : q.responses.wrong);
    }, 1000);
}

function showResponse(msg) {
    const card = document.querySelector('.question-card');
    const isLast = currentQuestion >= quizData.length - 1;
    card.innerHTML = `
        <div style="animation: responseShow 0.8s ease-out;">
            <h3 style="font-size: 2rem; margin-bottom: 1.5rem; color: #fff;">${msg}</h3>
            <button class="option-btn" id="next-btn">${isLast ? 'Lihat Surprise! 🎁' : 'Lanjut ➡️'}</button>
        </div>
    `;
    document.getElementById("next-btn").addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showBirthdaySurprise();
        }
    });
}

function showBirthdaySurprise() {
    document.body.classList.add('birthday-surprise');
    document.getElementById("quiz").style.display = "none";
    const surprise = document.getElementById("surprise");
    surprise.classList.remove('hidden');
    surprise.classList.add('show');
    createConfetti();

    // ✅ Putar musik
    const music = document.getElementById("bg-music");
    if (music) {
        music.currentTime = 0;
        music.play();
    }

    setInterval(() => {
        if (surprise.classList.contains('show')) {
            createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }
    }, 2000);
}

function explodeCake() {
    const cake = document.querySelector('.cake');
    cake.style.transform = 'scale(1.5) rotate(360deg)';
    cake.style.transition = 'all 0.5s ease';
    const rect = cake.getBoundingClientRect();
    createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setTimeout(() => {
        cake.style.transform = 'scale(1) rotate(0deg)';
    }, 500);
}

function moreParty() {
    createConfetti();
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, i * 200);
    }
    document.body.style.animation = 'megaShake 0.8s ease-in-out';
    setTimeout(() => document.body.style.animation = '', 800);
    document.title = "🎊 PARTY TIME! 🎊";
    setTimeout(() => document.title = "🎉 Happy Birthday! 🎉", 3000);
}

// Auto firework tiap 5 detik
setInterval(() => {
    if (document.getElementById("surprise")?.classList.contains('show')) {
        createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    }
}, 5000);

// Jalankan awal
createStars();
