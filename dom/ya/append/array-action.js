const { loop } = require("yavi/lib");

module.exports = class ArrayAction {
    constructor() {
        this.start = document.createComment("start");
        this.end = document.createComment("end");
    }

    startedElement(array_data) {
        let frag = document.createDocumentFragment();

        frag.appendChild(this.start);

        loop(array_data, (data) => frag.append(this.callback(data)));

        frag.appendChild(this.end);

        return frag;
    }
    /**
     * Thay thế đoạn mã html hiện tại thành đoạn mã html mới hoàn toàn
     * khi sử dụng câu lệnh ArraySate.map(callback)
     * @param {Array} array_data : [1,2,3] - ["a", "b", "c"] - [ object1, object2, object3 ]
     */
    replaceChild(array_data) {

        let { end, callback } = this;

        Promise.all([
            /**
             *  Bước 1: Xóa hết các Documents cũ
             *  - các Documents cũ nằm trong 2 document là { start : Documents : end }
             */
            this.#Remove(),
            /**
             *  Bước 2: Tạo ra các Documents mới
             */
            new Promise(function (success, error) {

                if (!array_data) return error();

                let frag = document.createDocumentFragment();

                loop(array_data, (data) => frag.append(callback(data)));

                success(frag);
            })
            /**
             *  Bước 3: Thêm vào các Documents mới
             */
        ])
            .then((result) => this.parent.insertBefore(result[1], end));
    }

    get parent() {
        if (!this._parent) this._parent = this.start.parentNode;
        return this._parent;
    }

    /**
     * Thêm các Documents mới vào sau các Documents hiện có
     * @param {Array} array_data : [...number] - [...String] - [...Object]
     */
    appendChild(array_data) {

        if (!array_data.length) return this.#Remove();

        loop(array_data, (data) =>
            this.parent.insertBefore(
                this.callback(data),
                this.end));
    }
    /**
     * Thêm các Documents mới vào trước các Documents hiện có
     * @param {Array} array_data : [...number] - [...String] - [...Object]
     */
    prependChild(array_data) {

        if (!array_data.length) return this.#Remove();

        loop(array_data, (data) =>
            this.parent.insertBefore(
                this.callback(data),
                this.start.nextSibling));
    }

    /**
     *  Xóa các Documents
     */
    #Remove() {
        let { start, end } = this;

        return new Promise(function (success) {

            let next = start.nextSibling;

            while (next != end) {
                next.remove();
                next = start.nextSibling;
            }

            success();
        });
    }

}