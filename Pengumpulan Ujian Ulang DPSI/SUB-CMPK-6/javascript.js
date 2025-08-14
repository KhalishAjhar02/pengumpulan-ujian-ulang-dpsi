// --- Data contoh ---
    const books = [
      { title: "Clean Code", category: "Pemrograman", authors: ["Robert C. Martin"] },
      { title: "The Pragmatic Programmer", category: "Pemrograman", authors: ["Andrew Hunt", "David Thomas"] },
      { title: "Atomic Habits", category: "Pengembangan Diri", authors: ["James Clear"] },
      { title: "Sapiens: A Brief History of Humankind", category: "Sejarah", authors: ["Yuval Noah Harari"] },
      { title: "Design Patterns", category: "Pemrograman", authors: ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"] },
      { title: "Deep Work", category: "Produktivitas", authors: ["Cal Newport"] },
      { title: "The Lean Startup", category: "Bisnis", authors: ["Eric Ries"] },
      { title: "Thinking, Fast and Slow", category: "Psikologi", authors: ["Daniel Kahneman"] }
    ];

    // Sanitasi sederhana untuk mencegah injeksi HTML pada data contoh
    const escapeHTML = (s) => String(s)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#039;');

    const gridEl = document.getElementById('grid');
    const qEl = document.getElementById('q');
    const filterEl = document.getElementById('filter');

    // Isi opsi kategori otomatis
    const categories = Array.from(new Set(books.map(b => b.category))).sort();
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat; filterEl.appendChild(opt);
    });

    function render(list){
      gridEl.setAttribute('aria-busy','true');
      gridEl.innerHTML = list.map(b => `
        <article class="card" role="article" aria-label="${escapeHTML(b.title)}">
          <h3 class="title">${escapeHTML(b.title)}</h3>
          <div class="meta">
            <span class="category">${escapeHTML(b.category)}</span>
          </div>
          <div class="authors" aria-label="Daftar penulis">
            ${b.authors.map(a => `<span class="chip">${escapeHTML(a)}</span>`).join('')}
          </div>
        </article>
      `).join('');
      gridEl.setAttribute('aria-busy','false');
    }

    // Pencarian & filter sederhana
    function applySearchAndFilter(){
      const q = qEl.value.trim().toLowerCase();
      const cat = filterEl.value;
      const filtered = books.filter(b => {
        const matchCat = !cat || b.category === cat;
        const matchText = !q || b.title.toLowerCase().includes(q) || b.authors.join(' ').toLowerCase().includes(q);
        return matchCat && matchText;
      });
      render(filtered);
    }

    qEl.addEventListener('input', applySearchAndFilter);
    filterEl.addEventListener('change', applySearchAndFilter);

    // Render awal
    render(books);