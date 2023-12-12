const modal_location = document.createElement("div");
modal_location.count = 0;
modal_location.id = "modal-location";
document.getElementById("app").append(modal_location);

const template = `
<form class="modal :: this.class ::" action="#">
    <input id=":: id ::" name="toggle" type="checkbox" />
    <label for=":: id ::" class="overlay"></label>
    <article>
        :: if(this.title){ ::
            <header>
                <h3>:: title ::</h3>
                <label for=":: id ::" class="close">&times;</label>
            </header>
            <section class="content">:: this.content ::</section>
            <footer>
                <button type="submit" class="button">:: this.btn_ok || "OK" ::</button>
                <label for=":: id ::" class="button dangerous">
                    :: this.btn_cancel || "Cancel" ::
                </label>
            </footer>
        :: }else{ ::
            <section class="content">:: this.content ::</section>
        :: } ::
    </article>
</form>
`;

window.Modal = function (options) {

    let $form, $checkbox, $hadRender, $modal;

    if (!options) options = {};

    options.id = "modal" + modal_location.count++;

    $form = View(template, options);
    $checkbox = $form.toggle;

    $checkbox.onchange = function () {
        !$checkbox.checked && options.cancel
            ? options.cancel($form)
            : $checkbox.checked = false;
    };

    $form.onsubmit = function (e) {
        e.preventDefault();
        $checkbox.checked && options.ok
            ? options.ok($form)
            : $checkbox.checked = false;
    };

    $modal = {
        get show() {
            return function () {
                if (!$hadRender) {
                    $hadRender = 1;
                    View.render(modal_location, $form);
                }
                $checkbox.checked = true;
            };
        },
        get hide() {
            return function () {
                $checkbox.checked = false;
            };
        },
        get remove() {
            return function () {
                $checkbox.checked = false;
                setTimeout(function () {
                    $form.remove();
                    $modal = null;
                }, 1000);
            };
        }
    };

    return $modal;
};