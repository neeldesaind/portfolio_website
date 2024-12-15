$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    $("#contact-form").submit(function (event) {
        emailjs.init("YOUR_EMAILJS_PUBLICKEY");  

        emailjs.sendForm('YOUR_EMAILJS_SERVICEID', 'YOUR_EMAILJS_TEMPLATEID', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });

    // Function to fetch certificate data from JSON
    async function fetchCertificates() {
        let response = await fetch('/certificates/certificates.json');
        const certificates = await response.json();
        showCertificates(certificates);
    }

    // Function to display certificates dynamically
    function showCertificates(certificates) {
        let certificatesContainer = document.querySelector('.certificate-box-container');
        let certificateHTML = '';
        
        certificates.forEach(certificate => {
            certificateHTML += `
            <div class="certificate-box">
                <div class="certificate-image">
                    <img src="${certificate.image}" alt="${certificate.name}" />
                </div>
                <div class="certificate-content">
                    <h3>${certificate.name}</h3>
                    <p>Issued by: ${certificate.issuer}</p>
                    <a href="${certificate.link}" class="btn" target="_blank">View Certificate</a>
                </div>
            </div>`;
        });
        
        certificatesContainer.innerHTML = certificateHTML;
    }

    // Fetch and display certificates on page load
    fetchCertificates();

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Neel Desai";
            $("#favicon").attr("href", "assets/images/abc.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

    var typed = new Typed(".typing-text", {
        strings: ["android development", "web development"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    async function fetchData(type = "skills") {
        let response;
        type === "skills" ?
            response = await fetch("skills.json") :
            response = await fetch("./projects/projects.json");
        const data = await response.json();
        return data;
    }

    function showSkills(skills) {
        let skillsContainer = document.getElementById("skillsContainer");
        let skillHTML = "";
        skills.forEach(skill => {
            skillHTML += `
            <div class="bar">
                  <div class="info">
                    <img src=${skill.icon} alt="skill" />
                    <span>${skill.name}</span>
                  </div>
                </div>`;
        });
        skillsContainer.innerHTML = skillHTML;
    }

    function showProjects(projects) {
        let projectsContainer = document.querySelector("#work .box-container");
        let projectHTML = "";
        projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
            projectHTML += `
            <div class="box tilt">
          <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
          <div class="content">
            <div class="tag">
            <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
              </div>
            </div>
          </div>
        </div>`;
        });
        projectsContainer.innerHTML = projectHTML;

        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });

        srtop.reveal('.work .box', { interval: 200 });
    }

    fetchData().then(data => {
        showSkills(data);
    });

    fetchData("projects").then(data => {
        showProjects(data);
    });

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });

    document.onkeydown = function (e) {
        if (e.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    }

    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });

    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .linkedin', { interval: 600 });
    srtop.reveal('.home .github', { interval: 800 });

    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.about .content .box-container', { delay: 200 });
    srtop.reveal('.about .content .resumebtn', { delay: 200 });

    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });

    srtop.reveal('.education .box', { interval: 200 });

    srtop.reveal('.work .box', { interval: 200 });

    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });

    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });
});

