        window.onload = function() {
            fetch('home.json')
                .then(response => response.json())
                .then(data => {
                    $('title').text(data.umbrellaProjectName);
                    $('.navbar-brand').text(data.umbrellaProjectName);

                    const heroTitles = [
                        "Reimagine Education: The Key to Simplifying Academic Workflows and Optimizing Effort for Maximum Efficiency.",
                        "Transform Your Academic Ecosystem: Automate Your Tasks, Get More Done with Less Time and Little Effort!",
                        "Unlock Academic Efficiency: Simple Systems, Better Effort, More Time Back."
                    ];
                    const fonts = ["'Lato', sans-serif", "'Inter', sans-serif", "'Montserrat', sans-serif"];
                    let currentTitleIndex = 0;
                    const titleChangeInterval = 10000; // Adjust timing for the animation
                    const heroHeading = $('.hero h1');

                    function updateHeroTitle() {
                        heroHeading.addClass('fading'); // Start fade out

                        setTimeout(() => {
                            heroHeading.html(heroTitles[currentTitleIndex] + ' <i class="bi bi-lightbulb-fill"></i>');
                            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                            heroHeading.css('font-family', randomFont); // Apply random font
                            heroHeading.addClass('changing'); // Start underline animation
                            heroHeading.removeClass('fading'); // Fade in
                            currentTitleIndex = (currentTitleIndex + 1) % heroTitles.length;

                            setTimeout(() => {
                                heroHeading.removeClass('changing'); // Remove underline after a short delay
                            }, 500); // Adjust delay as needed
                        }, 500); // Match the fade out duration
                    }

                    updateHeroTitle(); // Set the initial title
                    setInterval(updateHeroTitle, titleChangeInterval); // Rotate titles

                    $('.hero .lead').text(data.hero.description);
                    $('.hero img').attr('src', data.hero.image).attr('alt', data.umbrellaProjectName);
                    $('.hero .btn').html(data.hero.callToAction.text + ' <i class="bi bi-arrow-right-circle-fill"></i>').attr('href', data.hero.callToAction.link);
                    $('#our-solutions h2').html('<i class="bi bi-stack"></i> ' + data.ourSolutions.title);
                    $('#our-solutions .lead').text(data.ourSolutions.description);

                    let featuredAppsHtml = '';
                    data.ourSolutions.featuredApps.forEach(app => {
                        featuredAppsHtml += `
                            <div class="col-md-6 col-lg-3 mb-4">
                                <div class="card h-100">
                                    <img src="${app.image}" class="card-img-top" alt="${app.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${app.name}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">${app.tagline}</h6>
                                        <p class="card-text">{{description}}</p>
                                        <a href="${app.link}" class="btn btn-primary">${app.link === '#' ? 'Coming Soon' : 'Learn More'} <i class="bi bi-eye-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    $('#our-solutions .row').html(featuredAppsHtml);

                    $('#why-partner h2').html('<i class="bi bi-handshake-fill"></i> ' + data.whyPartner.title);
                    let whyPartnerPointsHtml = '';
                    data.whyPartner.points.forEach(point => {
                        whyPartnerPointsHtml += `
                            <div class="col-md-6 mb-4">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-check-circle-fill text-success mr-2"></i> ${point.title}</h5>
                                        <p class="card-text">${point.description}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    $('#why-partner .row').html(whyPartnerPointsHtml);

                    $('#call-to-action h2').html('<i class="bi bi-rocket-fill"></i> ' + data.callToActionPartnership.title);
                    $('#call-to-action .lead').text(data.callToActionPartnership.description);
                    $('#call-to-action .btn').html('<i class="bi bi-envelope-fill mr-2"></i> ' + data.callToActionPartnership.buttonText).attr('href', data.callToActionPartnership.buttonLink);

                    $('#contact-us h2').html('<i class="bi bi-chat-left-fill"></i> ' + data.contactUs.title);
                    $('#contact-us .lead').text(data.contactUs.description);
                    $('#contact-us p:first-child a').text(data.contactUs.email).attr('href', 'mailto:' + data.contactUs.email);
                    $('#contact-us p:last-child').text('Phone: ' + data.contactUs.phone);

                    $('.footer .mb-0').text(data.footer.copyright);
                    let footerLinksHtml = '';
                    data.footer.links.forEach(link => {
                        footerLinksHtml += `<a href="${link.link}" class="text-white-50 mr-3">{{text}}</a>`;
                    });
                    $('.footer div').html(footerLinksHtml);

                    let faqHtml = '';
                    data.faq.forEach((item, index) => {
                        faqHtml += `
                            <div class="card mb-3">
                                <div class="card-header" id="heading${index}">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse${index}">
                                            ${item.question}
                                        </button>
                                    </h5>
                                </div>

                                <div id="collapse${index}" class="collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-parent="#faq">
                                    <div class="card-body">
                                        ${item.answer}
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    $('#faq .row .col-md-8').html(faqHtml);

                    if (data.headerLogo) {
                        $('#header-logo').attr('src', data.headerLogo);
                    }

                    // Add Google Fonts
                    $('head').append('<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400,700&family=Inter:wght@400,700&family=Montserrat:wght@700&display=swap" rel="stylesheet">');
                })
                .catch(error => {
                    console.error('Error fetching or processing JSON:', error);
                });
        };
 