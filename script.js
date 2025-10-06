document.addEventListener("DOMContentLoaded", loadNotes);

document.getElementById("addNoteBtn").addEventListener("click", () => {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please enter both title and content!");
    return;
  }

  fetch("add_note.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`
  })
    .then(() => {
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      loadNotes();
    });
});

function loadNotes() {
  fetch("get_notes.php")
    .then(res => res.json())
    .then(notes => {
      const container = document.getElementById("notesContainer");
      container.innerHTML = "";

      if (notes.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888;">No notes yet. Start writing! ✏️</p>`;
        return;
      }

      notes.forEach(note => {
        const div = document.createElement("div");
        div.classList.add("note");
        div.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <small>${new Date(note.created_at).toLocaleString()}</small>
          <div class="actions">
            <button class="edit" onclick="editNote(${note.id}, '${escapeQuotes(note.title)}', '${escapeQuotes(note.content)}')">Edit</button>
            <button class="delete" onclick="deleteNote(${note.id})">Delete</button>
          </div>
        `;
        container.appendChild(div);
      });
    });
}

function deleteNote(id) {
  if (confirm("Are you sure you want to delete this note?")) {
    fetch(`delete_note.php?id=${id}`).then(() => loadNotes());
  }
}

function editNote(id, title, content) {
  const newTitle = prompt("Edit title:", title);
  const newContent = prompt("Edit content:", content);

  if (newTitle && newContent) {
    fetch("update_note.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&title=${encodeURIComponent(newTitle)}&content=${encodeURIComponent(newContent)}`
    }).then(() => loadNotes());
  }
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}
