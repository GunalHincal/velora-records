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
 * Handles both regular releases and coming-soon releases.
 * @param {Object} release - Release data from content.json
 * @returns {HTMLElement}
 */
function buildReleaseCard(release) {
  // ── COMING SOON CARD ──
  if (release.comingSoon) {
    const releaseDate = release.releaseDate
      ? new Date(release.releaseDate + 'T00:00:00').toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        })
      : null;

    const coverImg = release.coverPlaceholder
      ? `<div class="release-card__placeholder">
          <span class="release-card__placeholder-title">${release.title}</span>
          <span class="release-card__placeholder-artist">${release.artist}</span>
        </div>`
      : `<img src="${release.cover}" alt="${release.title} cover art" loading="lazy" />`;

    const card = document.createElement('div');
    card.className = 'release-card release-card--coming-soon fade-in';
    card.innerHTML = `
      <div class="release-card__cover">
        ${coverImg}
        <div class="release-card__soon-badge">Coming Soon</div>
      </div>
      <div class="release-card__body">
        <p class="release-card__type">${release.type} · ${release.year}</p>
        <h3 class="release-card__title">${release.title}</h3>
        <p class="release-card__artist">${release.artist}</p>
        ${releaseDate ? `<p class="release-card__release-date">Releasing ${releaseDate}</p>` : ''}
      </div>
    `;
    return card;
  }

  // ── REGULAR CARD ──
  const coverInner = release.coverPlaceholder
    ? `<div class="release-card__placeholder">
        <span class="release-card__placeholder-title">${release.title}</span>
        <span class="release-card__placeholder-artist">${release.artist}</span>
      </div>`
    : `<img src="${release.cover}" alt="${release.title} cover art" loading="lazy" />`;

  const coverHTML = release.albumSpotifyUrl
    ? `<a href="${release.albumSpotifyUrl}" class="release-card__cover-link" target="_blank" rel="noopener noreferrer" aria-label="Listen to ${release.title} on Spotify">${coverInner}</a>`
    : `<div>${coverInner}</div>`;

  const spotifyListenLink = (release.trackSpotifyUrl || release.albumSpotifyUrl)
    ? `<a href="${release.trackSpotifyUrl || release.albumSpotifyUrl}" class="spotify-link spotify-link--listen" target="_blank" rel="noopener noreferrer">
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

  const metaHTML = (release.upc || release.isrc)
    ? `<div class="release-card__meta">${
        release.upc
          ? `<div class="release-card__meta-row">
              <span class="release-card__meta-key">UPC</span>
              <span class="release-card__meta-val">${release.upc}</span>
            </div>`
          : ''
      }${
        release.isrc
          ? `<div class="release-card__meta-row">
              <span class="release-card__meta-key">ISRC</span>
              <span class="release-card__meta-val">${release.isrc}</span>
            </div>`
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
      ${metaHTML}
      ${spotifyListenLink}
      ${extraPlatforms}
    </div>
  `;
  return card;
}

/**
 * Build the releases accordion grouped by artist, sub-grouped by type.
 * Type order: Album → EP → Single
 * @param {Array} releases - All releases from content.json
 * @returns {HTMLElement}
 */
function buildReleasesAccordion(releases) {
  // Group by artistId, preserving order of first appearance
  const groups = [];
  const groupMap = {};

  releases.forEach(release => {
    if (!groupMap[release.artistId]) {
      const group = { artistId: release.artistId, artistName: release.artist, releases: [] };
      groups.push(group);
      groupMap[release.artistId] = group;
    }
    groupMap[release.artistId].releases.push(release);
  });

  const accordion = document.createElement('div');
  accordion.className = 'releases__accordion';

  const TYPE_ORDER = ['Album', 'EP', 'Single'];
  const TYPE_LABELS = { Album: 'Albums', EP: 'EPs', Single: 'Singles' };

  groups.forEach((group, index) => {
    const isFirst = index === 0;

    const groupEl = document.createElement('div');
    groupEl.className = 'releases__artist-group fade-in';

    const releaseCount = group.releases.length;
    const header = document.createElement('button');
    header.className = 'releases__artist-header' + (isFirst ? ' active' : '');
    header.setAttribute('aria-expanded', isFirst ? 'true' : 'false');
    header.innerHTML = `
      <span class="releases__artist-header-name">${group.artistName}</span>
      <span class="releases__artist-header-count">${releaseCount} release${releaseCount !== 1 ? 's' : ''}</span>
      <svg class="releases__artist-header-chevron" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    `;

    const panel = document.createElement('div');
    panel.className = 'releases__artist-panel' + (isFirst ? ' open' : '');

    const panelInner = document.createElement('div');
    panelInner.className = 'releases__artist-panel__inner';

    const panelContent = document.createElement('div');
    panelContent.className = 'releases__panel-content';

    // Sub-group by type
    const subGroups = {};
    group.releases.forEach(r => {
      const t = r.type || 'Single';
      if (!subGroups[t]) subGroups[t] = [];
      subGroups[t].push(r);
    });

    const typesPresent = TYPE_ORDER.filter(t => subGroups[t] && subGroups[t].length > 0);
    const hasMultipleTypes = typesPresent.length > 1;

    typesPresent.forEach(type => {
      if (hasMultipleTypes) {
        const typeLabel = document.createElement('p');
        typeLabel.className = 'releases__type-label';
        typeLabel.textContent = TYPE_LABELS[type] || type + 's';
        panelContent.appendChild(typeLabel);
      }

      const grid = document.createElement('div');
      grid.className = 'releases__grid';
      subGroups[type].forEach(release => grid.appendChild(buildReleaseCard(release)));
      panelContent.appendChild(grid);
    });

    panelInner.appendChild(panelContent);
    panel.appendChild(panelInner);

    header.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      accordion.querySelectorAll('.releases__artist-panel').forEach(p => p.classList.remove('open'));
      accordion.querySelectorAll('.releases__artist-header').forEach(h => {
        h.classList.remove('active');
        h.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        panel.classList.add('open');
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });

    groupEl.appendChild(header);
    groupEl.appendChild(panel);
    accordion.appendChild(groupEl);
  });

  return accordion;
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

    // Render releases as accordion grouped by artist
    const releasesContainer = document.getElementById('releasesContainer');
    if (releasesContainer) {
      releasesContainer.appendChild(buildReleasesAccordion(data.releases));
    }

    // Start observing newly added cards
    observeFadeIns();
  })
  .catch(err => {
    console.error('Velora Records: content load error:', err);
  });

// Observe static sections too
observeFadeIns();
