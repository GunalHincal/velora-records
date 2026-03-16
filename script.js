/**
 * Velora Records — script.js
 * Loads content from data/content.json and renders artist + release cards.
 * To add artists or releases, edit data/content.json only.
 */

/* ── NAV: scroll behavior + mobile toggle ── */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ── FOOTER YEAR ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── INTERSECTION OBSERVER: fade-in on scroll ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

function observeFadeIns() {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ── CARD BUILDERS ── */

/**
 * Build an artist card element.
 * @param {Object} artist - Artist data from content.json
 * @returns {HTMLElement}
 */
function buildArtistCard(artist) {
  const initials = artist.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase();

  const photoHTML = artist.photoPlaceholder
    ? `<div class="artist-card__placeholder">
        <span class="artist-card__placeholder-initials">${initials}</span>
        <span class="artist-card__placeholder-text">Artist Photo</span>
      </div>`
    : `<img src="${artist.photo}" alt="${artist.name}" loading="lazy" />`;

  const spotifyLink = artist.artistSpotifyUrl
    ? `<a href="${artist.artistSpotifyUrl}" class="spotify-link" target="_blank" rel="noopener noreferrer">
        <svg class="spotify-link__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.713 1.115a.623.623 0 01.206.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.519-.972c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.794c3.532-1.072 9.404-.865 13.115 1.338a.937.937 0 01-.955 1.613z"/></svg>
        See the artist profile on Spotify
      </a>`
    : '';

  const card = document.createElement('div');
  card.className = 'artist-card fade-in';
  card.innerHTML = `
    <div class="artist-card__photo">${photoHTML}</div>
    <div class="artist-card__body">
      <h3 class="artist-card__name">${artist.name}</h3>
      <p class="artist-card__genre">${artist.genre}</p>
      <p class="artist-card__bio">${artist.bio}</p>
      ${spotifyLink}
    </div>
  `;
  return card;
}

/**
 * Build a release card element.
 * @param {Object} release - Release data from content.json
 * @returns {HTMLElement}
 */
function buildReleaseCard(release) {
  const coverInner = release.coverPlaceholder
    ? `<div class="release-card__placeholder">
        <span class="release-card__placeholder-title">${release.title}</span>
        <span class="release-card__placeholder-artist">${release.artist}</span>
      </div>`
    : `<img src="${release.cover}" alt="${release.title} cover art" loading="lazy" />`;

  // Wrap cover in a link if an album URL exists
  const coverHTML = release.albumSpotifyUrl
    ? `<a href="${release.albumSpotifyUrl}" class="release-card__cover-link" target="_blank" rel="noopener noreferrer" aria-label="Listen to ${release.title} on Spotify">${coverInner}</a>`
    : `<div>${coverInner}</div>`;

  const listenLink = release.trackSpotifyUrl
    ? `<a href="${release.trackSpotifyUrl}" class="spotify-link spotify-link--listen" target="_blank" rel="noopener noreferrer">
        <svg class="spotify-link__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.713 1.115a.623.623 0 01.206.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.519-.972c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.794c3.532-1.072 9.404-.865 13.115 1.338a.937.937 0 01-.955 1.613z"/></svg>
        Listen on Spotify
      </a>`
    : '';

  const extraPlatforms = (release.appleMusicUrl || release.youtubeMusicUrl)
    ? `<div class="platform-links">${
        release.appleMusicUrl
          ? `<a href="${release.appleMusicUrl}" class="platform-link" target="_blank" rel="noopener noreferrer">Listen on Apple Music</a>`
          : ''
      }${
        release.youtubeMusicUrl
          ? `<a href="${release.youtubeMusicUrl}" class="platform-link" target="_blank" rel="noopener noreferrer">Listen on YouTube Music</a>`
          : ''
      }</div>`
    : '';

  const card = document.createElement('div');
  card.className = 'release-card fade-in';
  card.innerHTML = `
    <div class="release-card__cover">${coverHTML}</div>
    <div class="release-card__body">
      <p class="release-card__type">${release.type} · ${release.year}</p>
      <h3 class="release-card__title">${release.title}</h3>
      <p class="release-card__artist">${release.artist}</p>
      <div class="release-card__meta">
        <div class="release-card__meta-row">
          <span class="release-card__meta-key">UPC</span>
          <span class="release-card__meta-val">${release.upc}</span>
        </div>
        <div class="release-card__meta-row">
          <span class="release-card__meta-key">ISRC</span>
          <span class="release-card__meta-val">${release.isrc}</span>
        </div>
      </div>
      ${listenLink}
      ${extraPlatforms}
    </div>
  `;
  return card;
}

/* ── LOAD CONTENT ── */
fetch('data/content.json')
  .then(res => {
    if (!res.ok) throw new Error('Failed to load content.json');
    return res.json();
  })
  .then(data => {
    // Update stat counters
    const statArtists = document.getElementById('statArtists');
    const statReleases = document.getElementById('statReleases');
    if (statArtists) statArtists.textContent = data.artists.length;
    if (statReleases) statReleases.textContent = data.releases.length;

    // Render artists
    const artistsGrid = document.getElementById('artistsGrid');
    if (artistsGrid) {
      data.artists.forEach(artist => {
        artistsGrid.appendChild(buildArtistCard(artist));
      });
    }

    // Render releases
    const releasesGrid = document.getElementById('releasesGrid');
    if (releasesGrid) {
      data.releases.forEach(release => {
        releasesGrid.appendChild(buildReleaseCard(release));
      });
    }

    // Start observing newly added cards
    observeFadeIns();
  })
  .catch(err => {
    console.error('Velora Records: content load error:', err);
  });

// Observe static sections too
observeFadeIns();
