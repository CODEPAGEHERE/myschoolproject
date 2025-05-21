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
                            heroHeading.html(heroTitles[currentTitleIndex] + ' <i class="bi bi-box"></i>'); // Changed icon for now - update as needed
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

                    // --- NEW CODE FOR OUR SOLUTIONS SECTION ---
                    let ourSolutionsHtml = `
                        <div class="container-fluid">
                            <h2 class="text-center mb-4"><i class="bi bi-stack"></i> ${data.ourSolutions.title}</h2>
                            <p class="lead text-center mb-5">${data.ourSolutions.description}</p>
                    `;

                    data.ourSolutions.featuredApps.forEach(app => {
                        let imageCarouselHtml = '';
                        if (app.images && app.images.length > 0) {
                            app.images.forEach(image => {
                                imageCarouselHtml += `<img src="${image}" alt="${app.name} preview">`;
                            });
                        } else {
                            imageCarouselHtml = `<img src="${app.image || 'path/to/default-image.png'}" alt="${app.name} preview">`; // Fallback
                        }

                        ourSolutionsHtml += `
                            <div class="app-slide">
                                <div class="app-image-carousel" data-image-count="${app.images ? app.images.length : 1}">
                                    ${imageCarouselHtml}
                                </div>
                                <div class="app-details">
                                    <h5 class="card-title">${app.name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${app.tagline}</h6>
                                    <p class="card-text">${app.description}</p>
                                    <a href="${app.link}" class="btn btn-primary">${app.link === '#' ? 'Coming Soon' : 'Learn More'} <i class="bi bi-eye-fill"></i></a>
                                    <p class="mt-3"><a href="#">Learn More Details</a></p>
                                </div>
                            </div>
                        `;
                    });

                    ourSolutionsHtml += `</div>`;
                    $('#our-solutions').html(ourSolutionsHtml);

                    // Auto-scroll image carousel
                    const appCarousels = document.querySelectorAll('.app-image-carousel');
                    appCarousels.forEach(carousel => {
                        const imageCount = parseInt(carousel.dataset.imageCount);
                        let currentIndex = 0;
                        const scrollInterval = 3000; // Adjust interval as needed

                        if (imageCount > 1) {
                            setInterval(() => {
                                currentIndex = (currentIndex + 1) % imageCount;
                                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
                            }, scrollInterval);
                        }
                    });
                    // --- END OF NEW CODE FOR OUR SOLUTIONS SECTION ---

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

					/// --- Footer Section ---
					  const currentYear = new Date().getFullYear();
					  const copyrightText = data.footer.copyright.replace('2025', currentYear);
					  $('#copyright').text(copyrightText);

					  let footerLinksHtml = '';
					  data.footer.links.forEach(link => {
						footerLinksHtml += `<a href="${link.link}" class="text-white-50 mr-3">${link.text}</a>`;
					  });
					  $('#footer-links').html(footerLinksHtml);
					  // --- End Footer Section ---


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
