/*======================================================
                    ELEMENTOS
======================================================*/

const header = document.querySelector("#header");

const loader = document.querySelector(".loader");

const backTop = document.querySelector(".back-top");

const cursor = document.querySelector(".cursor");

const cursorDot = document.querySelector(".cursor-dot");

const mobileMenu = document.querySelector(".mobile-menu");

const nav = document.querySelector("nav");

const dropdowns = document.querySelectorAll(".dropdown");

/*======================================================
                    LOADER
======================================================*/

window.addEventListener("load", () => {

    if(!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        },1000);

    },900);

});

/*======================================================
                HEADER + BACKTOP
======================================================*/

function handleScroll(){

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

    if(window.scrollY > 700){

        backTop.classList.add("show");

    }

    else{

        backTop.classList.remove("show");

    }

}

window.addEventListener("scroll",handleScroll);

handleScroll();

/*======================================================
                    BACK TOP
======================================================*/

backTop?.addEventListener("click",(e)=>{

    e.preventDefault();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*======================================================
                    CURSOR
======================================================*/

if(cursor && cursorDot){

    let mouseX = 0;

    let mouseY = 0;

    let currentX = 0;

    let currentY = 0;

    document.addEventListener("mousemove",(e)=>{

        mouseX = e.clientX;

        mouseY = e.clientY;

        cursorDot.style.left = mouseX + "px";

        cursorDot.style.top = mouseY + "px";

    });

    function animateCursor(){

        currentX += (mouseX-currentX)*0.15;

        currentY += (mouseY-currentY)*0.15;

        cursor.style.left = currentX + "px";

        cursor.style.top = currentY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();

}

/*======================================================
                CURSOR HOVER
======================================================*/

const hoverItems = document.querySelectorAll(

    "a,button,.btn-primary,.btn-secondary,.journey-item,.feature,.testimonial"

);

hoverItems.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        cursor.style.width="70px";

        cursor.style.height="70px";

    });

    item.addEventListener("mouseleave",()=>{

        cursor.style.width="42px";

        cursor.style.height="42px";

    });

});

/*======================================================
                    MOBILE MENU
======================================================*/

mobileMenu?.addEventListener("click",()=>{

    nav.classList.toggle("active");

    document.body.classList.toggle("menu-open");

});

/*======================================================
                FECHAR MENU AO CLICAR
======================================================*/

nav.querySelectorAll("a").forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});

/*======================================================
                DROPDOWN MOBILE
======================================================*/

dropdowns.forEach(drop=>{

    const button = drop.querySelector("button");

    if(!button) return;

    button.addEventListener("click",(e)=>{

        if(window.innerWidth > 992) return;

        e.preventDefault();

        drop.classList.toggle("open");

    });

});

/*======================================================
                FECHAR MENU AO REDIMENSIONAR
======================================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth > 992){

        nav.classList.remove("active");

        document.body.classList.remove("menu-open");

        dropdowns.forEach(drop=>{

            drop.classList.remove("open");

        });

    }

});

/*======================================================
                LINKS SUAVES
======================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target = document.querySelector(

            this.getAttribute("href")

        );

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    });

});

/*======================================================
                SCROLL REVEAL (ENTRADA DE ELEMENTOS)
======================================================*/

const revealElements = document.querySelectorAll(
    ".section, .feature, .testimonial, .journey-item, .service, .card"
);

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/*======================================================
                LINK ATIVO NO MENU (SCROLL SPY)
======================================================*/

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

function setActiveMenu() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveMenu);


/*======================================================
                HEADER SOMBRA DINÂMICA
======================================================*/

let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 120) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
    } else {
        header.style.boxShadow = "none";
    }

    // opcional: esconder header ao descer (efeito premium)
    if (currentScroll > lastScroll && currentScroll > 400) {
        header.style.transform = "translateY(-100%)";
    } else {
        header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
});


/*======================================================
                PREVENÇÃO DE FLASH DE LAYOUT
======================================================*/

// garante que animações não disparem antes da página estabilizar
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


/*======================================================
                PERFORMANCE - THROTTLE SIMPLES
======================================================*/

let ticking = false;

function optimizedScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            setActiveMenu();
            ticking = false;
        });

        ticking = true;
    }
}

window.addEventListener("scroll", optimizedScroll);

/*======================================================
                COUNTER ANIMATION
======================================================*/

const counters = document.querySelectorAll(".counter");

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const speed = 80; // quanto menor, mais rápido

        const updateCount = () => {
            const current = +counter.innerText;
            const increment = Math.ceil(target / speed);

            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// ativa quando aparecer na tela
const counterSection = document.querySelector(".stats, .numbers, .counter-section");

function handleCounterScroll() {
    if (!counterSection) return;

    const sectionTop = counterSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 150;

    if (sectionTop < triggerPoint) {
        animateCounters();
        window.removeEventListener("scroll", handleCounterScroll);
    }
}

window.addEventListener("scroll", handleCounterScroll);


/*======================================================
                PARALLAX NO HERO
======================================================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
    if (!hero) return;

    const scrollValue = window.scrollY;

    hero.style.backgroundPositionY = scrollValue * 0.4 + "px";
});


/*======================================================
                MICRO INTERAÇÕES (HOVER LUZ)
======================================================*/

const glowItems = document.querySelectorAll(".feature, .service, .card");

glowItems.forEach(item => {
    item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        item.style.setProperty("--mouse-x", `${x}px`);
        item.style.setProperty("--mouse-y", `${y}px`);
    });
});


/*======================================================
                CURSOR MELHORADO EM LINKS IMPORTANTES
======================================================*/

const specialLinks = document.querySelectorAll(".btn-primary, .btn-secondary");

specialLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        cursor.style.borderColor = "rgba(0,0,0,0.4)";
        cursor.style.background = "rgba(0,0,0,0.08)";
    });

    link.addEventListener("mouseleave", () => {
        cursor.style.borderColor = "rgba(0,0,0,0.15)";
        cursor.style.background = "transparent";
    });
});

/*======================================================
            ANIMAÇÃO POR DIREÇÃO (SCROLL REVEAL AVANÇADO)
======================================================*/

const animatedElements = document.querySelectorAll(
    ".section, .feature, .service, .card, .testimonial"
);

let lastScrollY = window.scrollY;

function advancedReveal() {
    const currentScrollY = window.scrollY;
    const goingDown = currentScrollY > lastScrollY;

    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const trigger = window.innerHeight - 100;

        if (rect.top < trigger) {
            if (goingDown) {
                el.style.transform = "translateY(0)";
            } else {
                el.style.transform = "translateY(0)";
            }

            el.classList.add("show");
        }
    });

    lastScrollY = currentScrollY;
}

window.addEventListener("scroll", advancedReveal);


/*======================================================
                MICRO FEEDBACK DE CLIQUE (PULSE)
======================================================*/

document.addEventListener("click", (e) => {
    const ripple = document.createElement("span");

    ripple.className = "click-pulse";

    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});


/*======================================================
                TOAST NOTIFICATION SYSTEM
======================================================*/

function showToast(message, type = "success") {
    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// exemplo de uso (você pode ligar isso no formulário depois)
// showToast("Mensagem enviada com sucesso!", "success");


/*======================================================
                OTIMIZAÇÃO FINAL DE SCROLL
======================================================*/

let scrollTick = false;

function finalScrollOptimizer() {
    if (!scrollTick) {
        requestAnimationFrame(() => {
            advancedReveal();
            scrollTick = false;
        });

        scrollTick = true;
    }
}

window.addEventListener("scroll", finalScrollOptimizer);


/*======================================================
                CLEAN LOADER STATE FINAL
======================================================*/

window.addEventListener("load", () => {
    document.body.classList.add("site-ready");
});