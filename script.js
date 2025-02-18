document.addEventListener("DOMContentLoaded", () => {
    fetchMediumBlogs();
});

// Fetch blogs from Medium via RSS2JSON
function fetchMediumBlogs() {
    const mediumRSS = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@aditya.p.shinde";
    
    fetch(mediumRSS)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok") {
                displayBlogs(data.items);
            } else {
                console.error("Failed to fetch Medium posts");
            }
        })
        .catch(error => console.error("Error fetching Medium blogs:", error));
}

// Display Medium blog previews
function displayBlogs(posts) {
    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = ""; // Clear previous content

    posts.slice(0, 6).forEach(post => {  // Display only the latest 6 posts
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
       const firstImageMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
        const firstImage = firstImageMatch ? firstImageMatch[1] : '';


        blogCard.innerHTML = `
            <img src="${firstImage}" alt="${post.title}" class="blog-image" style= "max-width: 100%; height: auto;">
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-description">${post.description.substring(0, 100)}...</p>
            <a href="${post.link}" target="_blank" class="read-more">Read More</a>
        `;

        blogContainer.appendChild(blogCard);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // GSAP Animations
    gsap.from(".hero-content h1", { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
    gsap.from(".hero-content p", { opacity: 0, y: 30, duration: 1, delay: 0.3, ease: "power3.out" });

    gsap.from(".blog-card", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".blogs",
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });

    gsap.from(".about", { opacity: 0, y: 50, duration: 1, scrollTrigger: ".about" });
    gsap.from(".contact", { opacity: 0, y: 50, duration: 1, scrollTrigger: ".contact" });

    // ScrollReveal Animations
    ScrollReveal().reveal('.hero-content h1', { delay: 200, origin: 'top', distance: '50px', duration: 800 });
    ScrollReveal().reveal('.hero-content p', { delay: 400, origin: 'bottom', distance: '50px', duration: 800 });
    ScrollReveal().reveal('.blog-card', { delay: 200, interval: 200, origin: 'bottom', distance: '50px' });
    ScrollReveal().reveal('.about h2', { delay: 300, origin: 'left', distance: '50px' });
    ScrollReveal().reveal('.contact h2', { delay: 300, origin: 'right', distance: '50px' });
});
