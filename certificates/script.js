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
    });

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Neel Desai";
            $("#favicon").attr("href", "/assets/images/abc.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });

    function getCertifications() {
        return fetch("certificate.json")
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }

    let displayedCertificates = 6; 

    function showCertifications(certifications) {
        const certificationContainer = document.querySelector("#certification-container");
        let certificationHTML = "";

        for (let i = 0; i < displayedCertificates && i < certifications.length; i++) {
            const cert = certifications[i];
            certificationHTML += `
                <div class="card">
                    <img src="/assets/images/certificates/${cert.image}.jpg" alt="${cert.name}">
                    <div class="card-content">
                        <h3>${cert.name}</h3>
                        <p>Issuer:${cert.issuer}<br>
                        Issuance Date:${cert.date}</p>
                        <a href="${cert.links.view}" class="btn" target="_blank">
                            <i class="fas fa-eye"></i> View
                        </a>
                    </div>
                </div>
            `;
        }

        certificationContainer.innerHTML = certificationHTML;

        if (displayedCertificates >= certifications.length) {
            document.getElementById("show-more").style.display = 'none';
        }
    }

    $('#show-more').click(function () {
        displayedCertificates += 6; // Load 6 more certificates
        getCertifications().then(data => {
            showCertifications(data);
        });
    });

    getCertifications().then(data => {
        showCertifications(data);
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
    };

});

document.addEventListener('DOMContentLoaded', function () {
    function getFeaturedItems() {
        return fetch("featured.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    console.log('No featured items found.');
                    return [];
                }
                return data;
            })
            .catch(error => {
                console.error('Error fetching featured items:', error);
                return []; 
            });
    }

    function showFeaturedItems(items) {
        const featuredContainer = document.querySelector("#featured-items-container");
        const viewMoreButtonContainer = document.getElementById("view-more-btn-container");
        const viewMoreButton = document.getElementById("view-more-btn");

        if (!featuredContainer) {
            console.error('Featured container not found!');
            return;
        }

        if (items.length === 0) {
            featuredContainer.innerHTML = "<p>No featured items available.</p>";
            return;
        }

        let displayedItems = items.slice(0, 3); 
        let featuredHTML = "";

        displayedItems.forEach(item => {
            featuredHTML += `
                <div class="card">
                    <img src="/assets/images/featured/${item.image}.jpg" alt="${item.name}">
                    <div class="card-content">
                        <h3>${item.name}</h3>
                        <p>${item.issuer}</p>
                        <p class="date">${item.date}</p> <!-- Add the date here -->
                        <a href="${item.link}" class="btn" target="_blank">
                            <i class="fas fa-eye"></i> View
                        </a>
                    </div>
                </div>
            `;
        });

        featuredContainer.innerHTML = featuredHTML;

        if (items.length > 3) {
            viewMoreButtonContainer.style.display = "block"; 
            viewMoreButton.addEventListener("click", function() {
                showMoreItems(items, featuredContainer, viewMoreButtonContainer, viewMoreButton);
            });
        } else {
            viewMoreButtonContainer.style.display = "none"; 
        }
    }

    function showMoreItems(items, featuredContainer, viewMoreButtonContainer, viewMoreButton) {
        let displayedItemsCount = featuredContainer.querySelectorAll('.card').length;
        
        let moreItems = items.slice(displayedItemsCount, displayedItemsCount + 3); 
        let moreItemsHTML = "";

        moreItems.forEach(item => {
            moreItemsHTML += `
                <div class="card">
                    <img src="/assets/images/featured/${item.image}.jpg" alt="${item.name}">
                    <div class="card-content">
                        <h3>${item.name}</h3>
                        <p>${item.issuer}</p>
                        <p class="date">${item.date}</p> <!-- Add the date here -->
                        <a href="${item.link}" class="btn" target="_blank">
                            <i class="fas fa-eye"></i> View
                        </a>
                    </div>
                </div>
            `;
        });

        featuredContainer.innerHTML += moreItemsHTML;

        if (featuredContainer.querySelectorAll('.card').length >= items.length) {
            viewMoreButtonContainer.style.display = "none"; 
        }
    }

    getFeaturedItems().then(data => {
        showFeaturedItems(data);
    });
});
