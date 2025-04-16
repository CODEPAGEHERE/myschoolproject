	$(document).ready(function() {
            $.getJSON('home.json', function(data) {
                // Populate the umbrella project name and tagline
                $('title').text(data.umbrellaProjectName);
                $('.navbar-brand').text(data.umbrellaProjectName);

                // Populate the hero section
                $('.hero h1').text(data.hero.title);
                $('.hero .lead').text(data.hero.description);
                $('.hero img').attr('src', data.hero.image).attr('alt', data.umbrellaProjectName);
                $('.hero .btn').text(data.hero.callToAction.text).attr('href', data.hero.callToAction.link);

                // Populate the "Our Solutions" section
                $('#our-solutions h2').text(data.ourSolutions.title);
                $('#our-solutions .lead').text(data.ourSolutions.description);

                let featuredAppsHtml = '';
                $.each(data.ourSolutions.featuredApps, function(index, app) {
                    featuredAppsHtml += `
                        <div class="col-md-6 col-lg-3 mb-4">
                            <div class="card h-100">
                                <img src="${app.image}" class="card-img-top" alt="${app.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${app.name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${app.tagline}</h6>
                                    <p class="card-text">${app.description}</p>
                                    <a href="${app.link}" class="btn btn-primary">${app.link === '#' ? 'Coming Soon' : 'Learn More'}</a>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $('#our-solutions .row').html(featuredAppsHtml);

                // Populate the "Why Partner" section
                $('#why-partner h2').text(data.whyPartner.title);
                let whyPartnerPointsHtml = '';
                $.each(data.whyPartner.points, function(index, point) {
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

                // Populate the partnership call to action
                $('#call-to-action h2').text(data.callToActionPartnership.title);
                $('#call-to-action .lead').text(data.callToActionPartnership.description);
                $('#call-to-action .btn').text(data.callToActionPartnership.buttonText).attr('href', data.callToActionPartnership.buttonLink);

                // Populate the contact us section
                $('#contact-us h2').text(data.contactUs.title);
                $('#contact-us .lead').text(data.contactUs.description);
                $('#contact-us p:first-child a').text(data.contactUs.email).attr('href', 'mailto:' + data.contactUs.email);
                $('#contact-us p:last-child').text('Phone: ' + data.contactUs.phone);

                // Populate the footer
                $('.footer .mb-0').text(data.footer.copyright);
                let footerLinksHtml = '';
                $.each(data.footer.links, function(index, link) {
                    footerLinksHtml += `<a href="${link.link}" class="text-white-50 mr-3">${link.text}</a>`;
                });
                $('.footer div').html(footerLinksHtml);
            });
        });
  