(() => {
  const yearTargets = document.querySelectorAll("[data-year]");
  const currentYear = String(new Date().getFullYear());
  yearTargets.forEach((node) => {
    node.textContent = currentYear;
  });

  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "Close" : "Menu";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      });
    });
  }

  const revealNodes = document.querySelectorAll(".reveal");
  if (revealNodes.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
      );

      revealNodes.forEach((node) => observer.observe(node));
    } else {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
    }
  }

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = "Please fill in your name, email, and message.";
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      status.textContent = `Thanks${name ? `, ${name}` : ""}. Your message is ready — connect your email service to send it live.`;
      form.reset();
    });
  }
})();
