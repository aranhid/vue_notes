const Note = {
    props: ['note'],
    data() {
        return {
            id: this.note.id,
            title: this.note.title,
            text: this.note.text,
            color: this.note.color,
            isColored: this.note.isColored,
        }
    },
    methods: {
        editNote() {
            this.$emit('edit-note', this);
        },
        deleteNote() {
            this.$emit('delete-note', this.id);
        }
    },
    template: `
    <div class="card m-2 w-30">
        <div class="card-header" :class="[color]">
            <h5 class="card-title">{{ this.title }}</h5>
        </div>
        <div class="card-body">
            <p class="card-text"> {{ this.text }} </p>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between">
                <button @click="editNote" type="button" class="btn btn-primary m-1">
                    Редактировать
                </button>
                <button @click="deleteNote" type="button" class="btn btn-danger m-1">
                    Удалить
                </button>
            </div>
        </div>
    </div>
    `
}