function scrollDivBottomIntoView(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const targetScroll = rect.top + scrollTop + el.offsetHeight - window.innerHeight;

  window.scrollTo({
    top: targetScroll,
    behavior: "smooth",
  });
}

// Typing animation for the focus/path section
(function () {
  const prefix = "Enrollment 2026: ";
  const highlight = "Choose Your Path.";
  const elPrefix = document.getElementById('focus-typer-prefix');
  const elHighlight = document.getElementById('focus-typer-highlight');
  if (!elPrefix || !elHighlight) return;

  let p = 0;
  let h = 0;
  let phase = 'typePrefix';

  function tick() {
    switch (phase) {
      case 'typePrefix': {
        elPrefix.textContent = prefix.slice(0, ++p);
        if (p === prefix.length) {
          phase = 'typeHighlight';
          setTimeout(tick, 120);
        } else {
          setTimeout(tick, 70);
        }
        break;
      }
      case 'typeHighlight': {
        elHighlight.textContent = highlight.slice(0, ++h);
        if (h === highlight.length) {
          phase = 'pauseFull';
          setTimeout(tick, 1500);
        } else {
          setTimeout(tick, 70);
        }
        break;
      }
      case 'pauseFull': {
        phase = 'eraseHighlight';
        setTimeout(tick, 60);
        break;
      }
      case 'eraseHighlight': {
        elHighlight.textContent = highlight.slice(0, --h);
        if (h === 0) {
          phase = 'erasePrefix';
          setTimeout(tick, 60);
        } else {
          setTimeout(tick, 35);
        }
        break;
      }
      case 'erasePrefix': {
        elPrefix.textContent = prefix.slice(0, --p);
        if (p === 0) {
          phase = 'typePrefix';
          setTimeout(tick, 450);
        } else {
          setTimeout(tick, 35);
        }
        break;
      }
    }
  }

  tick();
})();

// NEXUS Paths Description & Clarity Cards Data
const pathDetails = {
  learner: {
    badge: "NEXUS LEARNERS CIRCLE",
    title: "Learn, Explore & Grow with NEXUS",
    summary: "A space for students who are curious about technology and want to improve their skills. Take part in technical sessions, explore different areas of computing, and connect with fellow students who share similar interests.",
    cards: [
      {
        icon: "fa-solid fa-laptop-code",
        title: "Technical Sessions",
        desc: "Learn about programming, web development, computer science concepts, and other areas of technology through sessions conducted by fellow students and club members.",
        highlight: "Learn Something New"
      },
      {
        icon: "fa-solid fa-users",
        title: "Peer Learning & Collaboration",
        desc: "Connect with other learners, exchange ideas, discuss technical topics, and help each other understand concepts. You can also collaborate with interested peers on projects.",
        highlight: "Learn Together"
      },
      {
        icon: "fa-solid fa-lightbulb",
        title: "Explore & Practice",
        desc: "Explore technologies beyond your regular academics, experiment with what you learn, and develop your technical interests through personal or collaborative practice.",
        highlight: "Keep Exploring"
      }
    ]
  },
  contributor: {
    badge: "NEXUS CORE CONTRIBUTORS",
    title: "Contribute, Collaborate & Grow",
    summary: "For students who want to take an active part in NEXUS . Work with fellow members, contribute to club activities, share responsibilities, and develop skills through real teamwork and experience.",
    cards: [
      {
        icon: "fa-solid fa-calendar-check",
        title: "Events & Activities",
        desc: "Get involved in planning and organizing technical sessions, workshops, coding events, and other NEXUS activities. Be part of bringing ideas to life.",
        highlight: "Be Part of the Action"
      },
      {
        icon: "fa-solid fa-trophy",
        title: "Teamwork & Leadership",
        desc: "Work alongside fellow contributors, coordinate tasks, take responsibility, and learn how to work as a team. Develop leadership and communication skills through practical experience.",
        highlight: "Grow Through Responsibility"
      },
      {
        icon: "fa-solid fa-palette",
        title: "Creative & Technical Contributions",
        desc: "Contribute to NEXUS through website development, designing, content creation, social media, technical initiatives, and other areas where your skills and interests can be useful.",
        highlight: "Make Your Contribution"
      }
    ]
  },
  allrounder: {
    badge: "BOTH LEARNING & CONTRIBUTION",
    title: "Learn, Contribute & Grow as an All-Rounder",
    summary: "Why choose between learning and contributing? Be part of both. Improve your technical understanding through learning opportunities while actively contributing to NEXUS activities, collaborating with others, and taking on responsibilities.",
    cards: [
      {
        icon: "fa-solid fa-graduation-cap",
        title: "Continuous Learning",
        desc: "Participate in technical sessions, explore new technologies, exchange knowledge, and learn alongside other students who share your interest in computing.",
        highlight: "Never Stop Learning"
      },
      {
        icon: "fa-solid fa-laptop-code",
        title: "Build Together",
        desc: "Connect with fellow members, exchange ideas, and collaborate on technical activities or projects based on shared interests and initiative.",
        highlight: "Create Together"
      },
      {
        icon: "fa-solid fa-award",
        title: "Teamwork & Initiative",
        desc: "Take part in organizing activities, supporting fellow learners, coordinating with contributors, and taking responsibility. Develop communication, teamwork, and leadership skills along the way.",
        highlight: "Grow by Contributing"
      }
    ]
  }
};

const actionButtons = {
  learner: '<a href="https://forms.gle/5seCd5trhcBwY6zf9" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-accent hover:bg-emerald-400 text-dark font-bold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 text-base shadow-lg shadow-accent/30"><span>Proceed to Registration (Learner)</span><i class="fa-solid fa-arrow-right"></i></a>',
  contributor: '<a href="https://forms.gle/5seCd5trhcBwY6zf9" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-accent hover:bg-emerald-400 text-dark font-bold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 text-base shadow-lg shadow-accent/30"><span>Proceed to Registration (Contributor)</span><i class="fa-solid fa-arrow-right"></i></a>',
  allrounder: '<a href="https://forms.gle/5seCd5trhcBwY6zf9" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-accent hover:bg-emerald-400 text-dark font-bold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 text-base shadow-lg shadow-accent/30"><span>Proceed to Registration (All-Rounder)</span><i class="fa-solid fa-arrow-right"></i></a>'
};

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.nexus-card');
  const descriptionPanel = document.getElementById('description-panel');
  const descriptionContent = document.getElementById('description-content');
  const actionButton = document.getElementById('action-button');
  const accentLine = document.getElementById('accent-line');

  function isMobile() {
    return window.innerWidth < 768; // md breakpoint
  }

  function resetAllCards() {
    cards.forEach(card => {
      const mobileDescription = card.querySelector('.nexus-description-mobile');
      if (mobileDescription) {
        mobileDescription.classList.add('hidden');
      }
      card.classList.remove('expanded');
    });
    if (descriptionPanel) {
      descriptionPanel.classList.add('opacity-0', 'translate-y-4');
      descriptionPanel.classList.remove('opacity-100', 'translate-y-0');
    }
  }

  function updateAccentLinePosition(cardIndex) {
    if (!isMobile() && accentLine) {
      accentLine.classList.remove('left-0', 'left-1/2', 'right-0', 'transform', '-translate-x-1/2', 'ml-0', 'ml-1/2', 'ml-auto', 'mx-auto');
      if (cardIndex === 0) {
        accentLine.classList.add('ml-0');
      } else if (cardIndex === 1) {
        accentLine.classList.add('mx-auto');
      } else if (cardIndex === 2) {
        accentLine.classList.add('ml-auto');
      }
    }
  }

  function selectPath(path, index, shouldScroll = true) {
    localStorage.setItem("path-type", path);

    // Sync corresponding radio input
    const radioMap = {
      learner: 'learner_box',
      contributor: 'contributer_box',
      allrounder: 'all_rounder_box'
    };
    const radioId = radioMap[path];
    if (radioId) {
      const radio = document.getElementById(radioId);
      if (radio) radio.checked = true;
    }

    if (isMobile()) {
      cards.forEach(otherCard => {
        const otherDesc = otherCard.querySelector('.nexus-description-mobile');
        if (otherDesc) otherDesc.classList.add('hidden');
        otherCard.classList.remove('expanded');
      });

      const currentCard = cards[index];
      if (currentCard) {
        const currentDesc = currentCard.querySelector('.nexus-description-mobile');
        if (currentDesc) currentDesc.classList.remove('hidden');
        currentCard.classList.add('expanded');
      }
    } else {
      const data = pathDetails[path];
      const panelBadge = document.getElementById('panel-badge');
      const panelTitle = document.getElementById('panel-title');
      const featureContainer = document.getElementById('feature-cards-container');

      if (data) {
        if (panelBadge) panelBadge.textContent = data.badge;
        if (panelTitle) panelTitle.textContent = data.title;
        if (descriptionContent) descriptionContent.textContent = data.summary;
        if (featureContainer) {
          featureContainer.innerHTML = data.cards.map(card => `
            <div class="bg-black/70 border border-gray-700/80 hover:border-green-400 hover:shadow-[0_0_20px_rgba(0,255,153,0.15)] rounded-xl p-5 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between text-left">
              <div>
                <div class="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-3">
                  <i class="${card.icon} text-lg"></i>
                </div>
                <h4 class="text-white font-bold text-base mb-1.5">${card.title}</h4>
                <p class="text-light/80 text-xs sm:text-sm leading-relaxed">${card.desc}</p>
              </div>
              <div class="mt-4 pt-2.5 border-t border-white/10 text-accent text-xs font-semibold flex items-center gap-1.5">
                <i class="fa-solid fa-circle-check text-[11px]"></i> <span>${card.highlight || 'Path Highlight'}</span>
              </div>
            </div>
          `).join('');
        }
      }

      if (actionButton) actionButton.innerHTML = actionButtons[path];
      updateAccentLinePosition(index);

      if (descriptionPanel) {
        descriptionPanel.classList.remove('opacity-0', 'translate-y-4');
        descriptionPanel.classList.add('opacity-100', 'translate-y-0');
      }

      if (shouldScroll) {
        scrollDivBottomIntoView("#join-panel");
      }
    }
  }

  cards.forEach((card, index) => {
    const path = card.dataset.path;
    card.addEventListener('click', (e) => {
      // Prevent double trigger if user clicks an anchor link inside card
      if (e.target.closest('a')) return;
      selectPath(path, index, true);
    });
  });

  window.addEventListener('resize', () => {
    resetAllCards();
  });

  // Only auto-select if explicitly passed via URL query parameter (e.g. ?path=learner)
  // Never auto-scroll on initial load so landing lands directly in the hero section
  const urlParams = new URLSearchParams(window.location.search);
  const pathParam = urlParams.get('path');
  if (pathParam && ['learner', 'contributor', 'allrounder'].includes(pathParam)) {
    const pathIndices = { learner: 0, contributor: 1, allrounder: 2 };
    selectPath(pathParam, pathIndices[pathParam], false);
  }

  // Ensure fresh navigation lands squarely at the top Hero section
  if (!window.location.hash) {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
});

// Clone and append announcement bar when navbar finishes loading
window.addEventListener("navbar:loaded", (e) => {
  const announcement = document.getElementById("announcement-bar");
  if (!announcement || !e.detail || !e.detail.navbar) return;
  
  if (e.detail.navbar.querySelector('#announcement-bar-clone')) return;

  const clone = announcement.cloneNode(true);
  clone.id = 'announcement-bar-clone';
  clone.hidden = false;
  e.detail.navbar.appendChild(clone);
});
