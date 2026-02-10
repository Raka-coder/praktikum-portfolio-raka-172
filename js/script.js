document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".navbar ul li a");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }

  // Tab Switching Logic
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("aria-controls");
      const targetPanel = document.getElementById(targetId);

      if (targetPanel) {
        tabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        panels.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        targetPanel.classList.add("active");
      }
    });
  });

  // Contact Form Logic
  const form = document.getElementById("contact-form");
  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formData.append("access_key", "e5dc04cf-8e1a-4111-950b-e946074221c3");

      const originalText = submitBtn ? submitBtn.textContent : "Send Message";

      if (submitBtn) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
      }

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          alert("Success! Your message has been sent.");
          form.reset();
        } else {
          alert("Error: " + data.message);
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});
