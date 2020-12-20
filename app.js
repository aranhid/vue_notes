const app = Vue.createApp({
    components: {
        'note': Note
    },
    data() {
        return {
            notes: [],
            idCounter: 0,
            inputTitle: "",
            inputText: "",
            isColored: false,
            noteColor: "",
            modifiedNote: undefined,
            deleteAll: false,
        }
    },
    methods: {
        addNewNote() {
            this.notes.push({
                id: this.idCounter,
                title: this.inputTitle,
                text: this.inputText,
                color: this.noteColor,
                isColored: this.isColored,
            });
            this.idCounter++;
            this.inputTitle = "";
            this.inputText = "";
            this.isColored = false;
            this.color = "";
            this.saveToLocalStorage();
        },
        openAddModal() {
            this.inputTitle = "";
            this.inputText = "";
            this.isColored = false;
            this.color = "";
            var myModal = new bootstrap.Modal(document.getElementById('addNoteModal'));
            myModal.show();
        },
        editNote(note) {
            this.modifiedNote = note;
            console.log(note);
            this.inputTitle = note.title;
            this.inputText = note.text;
            this.noteColor = note.color;
            this.isColored = note.isColored;
            var myModal = new bootstrap.Modal(document.getElementById('editNoteModal'));
            myModal.show();
        },
        saveModifiedNote() {
            let note = this.getNoteById(this.modifiedNote.id);
            let index = this.notes.indexOf(note);
            this.notes[index].title = this.inputTitle;
            this.notes[index].text = this.inputText;
            this.modifiedNote.title = this.inputTitle;
            this.modifiedNote.text = this.inputText;
            this.inputTitle = "";
            this.inputText = "";
            this.isColored = false;
            this.color = "";
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
            localStorage.setItem('idCounter', this.idCounter);
        },
        clearLocalStorage() {
            localStorage.removeItem('notes');
            localStorage.removeItem('idCounter');
            this.notes.length = 0;
            this.idCounter = 0;
        },
        loadFromLocalStorage() {
            if (localStorage.getItem('notes')) {
                this.notes = JSON.parse(localStorage.getItem('notes'));
                this.idCounter = localStorage.getItem('idCounter');
            }
        },
        deleteNote(id) {
            this.notes = this.notes.filter(note => note.id != id);
            this.saveToLocalStorage();
        },
        getNoteById(id) {
            return this.notes.find(note => note.id == id);
        },
        openDeleteAllModal() {
            this.deleteAll = false;
            var myModal = new bootstrap.Modal(document.getElementById('deleteAllModal'));
            myModal.show();
        }
    },
    mounted() {
        this.loadFromLocalStorage();
    }
})

app.mount('#app')