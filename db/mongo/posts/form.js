
module.exports = class FormPost {

    props = [];
    files = [];
    count = { rating: 0, view: 0, file: 0, comment: 0 };

    constructor(data) {
        if (typeof data === "object") Object.assign(this, data);
    }

    add(k, v) {
        this.props.push({ k, v });
    }

    get data() {
        let date = new Date();

        this.add("updated", date);
        this.add("created", date);

        this.count.file = this.files.length;

        return this;
    }

    set file(data) {
        this.files.push(data);
    }

    set category(category) {
        this.add("category", category);
    }

    set tags(tags) {

        switch (typeof tags) {

            case "string":
                tags = tags.replace(/\s/g, "").split(",");
                tags.forEach((v) => this.add("tag", v));
                break;

            case "object":
                tags.forEach((v) => this.add("tag", v));
                break;
        }
    }
}