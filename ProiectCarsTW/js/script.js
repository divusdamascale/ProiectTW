let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
let ofertaButton = document.querySelectorAll('.oferta');
let rentButton = document.querySelectorAll('.rent');
let indexSession = 1;



document.addEventListener("DOMContentLoaded", function () {
    var email = "username1@test.com";


    var claims = {
        email: email,

    };

    var payload = JSON.stringify(claims);


    var encodedPayload = btoa(payload);
    3

    var jwt = "fake-jwt." + encodedPayload + ".fake-signature";

    document.cookie = "jwt=" + jwt + "; path=/";

});



ofertaButton.forEach(element => {
    element.onclick = () => {

        localStorage.setItem(localStorage.length + 1, "Nume masina | An Masina | Motorizare"); //util pentru personalizarea reclamelor
    };
})


fetch('masini.json')
    .then(response => response.json())
    .then(data => {
        const vehicleSlider = document.getElementById('swiper-wrapper');

        data.forEach(masina => {
            const element = `
        <div class="swiper-slide box">
          <img src="${masina.imagine}" style= height:20rem;width:100%;object-fit:cover;" alt="car1">
          <div class="content">
            <h3>${masina.titlu}</h3>
            <div class="price"><span>Pret :</span> ${masina.pret}</div>
            <p>new
              <span class="fas fa-circle"></span> ${masina.an}
              <span class="fas fa-circle"></span> ${masina.transmisie}
              <span class="fas fa-circle"></span> ${masina.combustibil}
              <span class="fas fa-circle"></span> ${masina.viteza_maxima}
            </p>
            <a class="btn oferta">Vezi Oferta</a>
          </div>
        </div>
      `;

            vehicleSlider.innerHTML += element;
        });

        new Swiper('.vehicle-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            autoplay: {
                delay: 9500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                },
            },
        });
    });


document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Previne trimiterea formularului

    // Obțineți valorile introduse
    var nume = document.getElementById("nume").value;
    var email = document.getElementById("email").value;
    var mesaj = document.getElementById("mesaj").value;

    // Creați un obiect cu valorile introduse
    var mesajObj = {
        nume: nume,
        email: email,
        mesaj: mesaj
    };

    // Salvați obiectul în sessionStorage
    sessionStorage.setItem(`mesaj${indexSession++}`, JSON.stringify(mesajObj));

    // Restabiliți valorile câmpurilor de formular la valoare implicită
    document.getElementById("nume").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mesaj").value = "";

    // Afișați un mesaj de succes sau redirecționați utilizatorul la o altă pagină
    alert("Mesajul a fost trimis cu succes!");
});





menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

document.querySelector('#login-btn').onclick = () => {
    document.querySelector('.login-form-container').classList.add('active');
}

document.querySelector('#close-login-form').onclick = () => {
    document.querySelector('.login-form-container').classList.remove('active');
}

window.onscroll = () => {

    if (window.scrollY > 0) {
        document.querySelector('.header').classList.add('active');
    } else {
        document.querySelector('.header').classList.remove('active');
    }



    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

window.onload = () => {

    if (window.scrollY > 0) {
        document.querySelector('.header').classList.add('active');
    } else {
        document.querySelector('.header').classList.remove('active');
    }

}

document.querySelector('.home').onmousemove = (e) => {
    document.querySelectorAll('.home-parallax').forEach(elm => {
        let speed = elm.getAttribute('data-speed');

        let x = (window.innerWidth - e.pageX * speed) / 90;
        let y = (window.innerHeight - e.pageY * speed) / 90;

        elm.style.transform = `translateX(${y}px) translateY(${x}px)`;
    });
}

document.querySelector('.home').onmouseleave = () => {
    document.querySelectorAll('.home-parallax').forEach(elm => {

        elm.style.transform = `translateX(0px) translateY(0px)`;
    });
}

// var swiper = new Swiper(".vehicle-slider", {
//     slidesPerView: 1,
//     spaceBetween: 20,
//     loop: true,
//     grabCursor: true,
//     centeredSlides: true,
//     autoplay:
//     {
//         delay: 9500,
//         disableOnInteraction: false,
//     },
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
//     breakpoints: {
//         0: {
//             slidesPerView: 1,

//         },
//         768: {
//             slidesPerView: 2,

//         },
//         991: {
//             slidesPerView: 3,

//         },
//     },
// });

var swiper2 = new Swiper(".featured-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay:
    {
        delay: 9500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,

        },
        769: {
            slidesPerView: 2,

        },
        1025: {
            slidesPerView: 3,

        },
    },
});

var swiper3 = new Swiper(".review-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay:
    {
        delay: 9500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,

        },
        769: {
            slidesPerView: 2,

        },
        1025: {
            slidesPerView: 3,

        },
    },
});

// // canvas logo


// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");

// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;
// const radius = 25;
// const wheelThickness = 8;
// const spokeCount = 12;


// function drawWheel() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Desenarea roții
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//     ctx.lineWidth = wheelThickness;
//     ctx.strokeStyle = "limegreen";
//     ctx.stroke();

//     // Desenarea spițelor
//     const angle = (2 * Math.PI) / spokeCount;
//     for (let i = 0; i < spokeCount; i++) {
//         const spokeX = centerX + Math.cos(i * angle) * radius;
//         const spokeY = centerY + Math.sin(i * angle) * radius;
//         ctx.beginPath();
//         ctx.moveTo(centerX, centerY);
//         ctx.lineTo(spokeX, spokeY);
//         ctx.lineWidth = 3;
//         ctx.strokeStyle = "limegreen";
//         ctx.stroke();
//     }
// }

// drawWheel();


