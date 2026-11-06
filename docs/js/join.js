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

// NEXUS Paths Description Data
const descriptions = {
  learner: "If you're eager to grow a little every day, this is for you. Here, you'll improve your coding, explore new ideas and share what you learn with others through hands-on sessions, peer code reviews, and tech discussions. It's all about being consistent, curious, and passionate — not perfect.",
  contributor: "For those who love to build, create, and take initiative. You'll help organise flagship events, design content, manage technical workshops, or develop club projects — turning ambitious ideas into reality while mastering teamwork, leadership, and open-source collaboration.",
  allrounder: "For those who want the best of both worlds: continuous learning and high-impact contributing. You'll level up your tech stack while actively driving community initiatives, mentoring newcomers, and building real-world projects that make a lasting mark."
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

  function selectPath(path, index) {
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
      if (descriptionContent) descriptionContent.textContent = descriptions[path];
      if (actionButton) actionButton.innerHTML = actionButtons[path];
      updateAccentLinePosition(index);

      if (descriptionPanel) {
        descriptionPanel.classList.remove('opacity-0', 'translate-y-4');
        descriptionPanel.classList.add('opacity-100', 'translate-y-0');
      }

      scrollDivBottomIntoView("#join-panel");
    }
  }

  cards.forEach((card, index) => {
    const path = card.dataset.path;
    card.addEventListener('click', (e) => {
      // Prevent double trigger if user clicks an anchor link inside card
      if (e.target.closest('a')) return;
      selectPath(path, index);
    });
  });

  window.addEventListener('resize', () => {
    resetAllCards();
  });

  // Check if a preselected path exists or query string
  const urlParams = new URLSearchParams(window.location.search);
  const pathParam = urlParams.get('path') || localStorage.getItem("path-type");
  if (pathParam && ['learner', 'contributor', 'allrounder'].includes(pathParam)) {
    const pathIndices = { learner: 0, contributor: 1, allrounder: 2 };
    selectPath(pathParam, pathIndices[pathParam]);
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
