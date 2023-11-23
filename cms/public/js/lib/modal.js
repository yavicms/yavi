const modal_location = document.createElement("div");
modal_location.count = 0;
modal_location.id = "modal-location";
document.querySelector(".app").append(modal_location);

window.Modal = function (props) {

    if (!props) props = {};

    props.id = "modal" + modal_location.count++;

    if (!props.btn_ok) props.btn_ok = "OK";
    if (!props.btn_cancel) props.btn_cancel = "Cancel";
    if (!props.class) props.class = "";

    let data = {
        props,
        content: props.content,
        _ishook: typeof props.content === "object"
    };

    let $form = View(`
<form class="modal {% props.class %}" action="#">
    <input id="{% props.id %}" name="toggle" type="checkbox" />
    <label for="{% props.id %}" class="overlay"></label>
    <article>
        {% if(props.title){ %}
            <header>
                <h3>{% props.title %}</h3>
                <label for="{% props.id %}" class="close">&times;</label>
            </header>
            <section class="content">{% props.content %}</section>
            <footer>
                <button type="submit" class="button">{% props.btn_ok %}</button>
                <label for="{% props.id %}" class="button dangerous">
                    {% props.btn_cancel %}
                </label>
            </footer>
        {% }else{ %}
            <section class="content">{% _ishook ? hook('content') : props.content %}</section>
        {% } %}
    </article>
</form>
    `, data);

    let $box = $form.toggle;
    let hasRender;
    let $modal = {
        get show() {
            return function () {
                if (!hasRender) {
                    hasRender = 1;
                    View.render($form, modal_location);
                }
                $box.checked = true;
            };
        },
        get hide() {
            return function () {
                $box.checked = false;
            };
        },
        get remove() {
            return function () {
                $box.checked = false;
                setTimeout(function () {
                    $form.remove();
                    $modal = null;
                }, 1000);
            };
        }
    };

    $form.toggle.onchange = function () {
        !this.checked && props.cancel
            ? props.cancel($form)
            : this.checked = false;
    };

    $form.onsubmit = function (e) {
        e.preventDefault();
        $form.toggle.checked && props.ok
            ? props.ok($form)
            : this.checked = false;
    };

    return $modal;
};