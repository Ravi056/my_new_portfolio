/* =========================================================
   RAVI ADHIKARI PORTFOLIO
   Version: A.A.D (2026)
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. SELECT ELEMENTS
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section[id]");


    /* =====================================================
       2. MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("active")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                    menuToggle.setAttribute(
                        "aria-label",
                        "Close navigation menu"
                    );

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }

        });

    }


    /* =====================================================
       3. FUNCTION TO CLOSE MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    /* =====================================================
       4. SMOOTH NAVIGATION
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID = link.getAttribute("href");

            /*
               Only handle links such as:

               #home
               #about
               #experience
               #education
               #skills
               #portfolio
               #contact
            */

            if (
                targetID &&
                targetID.startsWith("#") &&
                targetID.length > 1
            ) {

                const targetSection =
                    document.querySelector(targetID);

                if (targetSection) {

                    event.preventDefault();

                    const headerHeight =
                        header ? header.offsetHeight : 0;

                    const targetPosition =
                        targetSection.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }

            }

            /*
               Close menu after selecting a section.
            */

            closeMobileMenu();

        });

    });


    /* =====================================================
       5. ACTIVE NAVIGATION WHILE SCROLLING
    ===================================================== */

    function updateActiveNavigation() {

        if (sections.length === 0) {
            return;
        }

        const headerHeight =
            header ? header.offsetHeight : 0;

        const scrollPosition =
            window.scrollY + headerHeight + 100;


        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        /*
           Remove active state from all navigation links.
        */

        navLinks.forEach(function (link) {

            link.classList.remove("active");

        });


        /*
           Activate the link belonging to the
           section currently visible.
        */

        if (currentSection) {

            const activeLink =
                document.querySelector(
                    '.nav-link[href="#' +
                    currentSection +
                    '"]'
                );

            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    }


    /*
       Update active navigation when scrolling.
    */

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /*
       Run once when the website first loads.
    */

    updateActiveNavigation();


    /* =====================================================
       6. CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (!navMenu || !menuToggle) {
            return;
        }


        if (!navMenu.classList.contains("active")) {
            return;
        }


        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            closeMobileMenu();

        }

    });


    /* =====================================================
       7. ESCAPE KEY CLOSES MENU
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    /* =====================================================
       8. RESET MENU WHEN RETURNING TO DESKTOP
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 850) {

            closeMobileMenu();

        }

    });


    /* =====================================================
       9. HOME LINK WHEN PAGE IS AT THE TOP
    ===================================================== */

    window.addEventListener("scroll", function () {

        if (window.scrollY < 100) {

            navLinks.forEach(function (link) {

                link.classList.remove("active");

            });


            const homeLink =
                document.querySelector(
                    '.nav-link[href="#home"]'
                );


            if (homeLink) {

                homeLink.classList.add("active");

            }

        }

    });


    /* =====================================================
       10. PAGE READY
    ===================================================== */

    document.body.classList.add("loaded");

});