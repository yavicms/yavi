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
            <section class="content">:: view(content) ::</section>
            <footer>
                <button type="button" name="ok" value="ok">
                    :: this.btn_ok || "OK" ::
                </button>
                <button class="dangerous" type="button" name="cancel" value="cancel">
                    :: this.btn_cancel || "Cancel" ::
                </button>
            </footer>
        :: }else{ ::
            <section class="content">:: view(content) ::</section>
        :: } ::
    </article>
</form>
`;

window.Modal = function (options) {

    if (typeof options !== "object") return;

    var $form, $checkbox, $hadRender, $promise = {}, callback;

    options.id = "modal" + modal_location.count++;

    $form = View(template, options);
    $checkbox = $form.toggle;

    $form.ok.onclick = function (e) {
        if (callback = $promise.ok || options.ok) {
            callback.call($promise, $form);
        }
        else {
            $promise.remove();
        }
    };

    $form.cancel.onclick = function (e) {
        if (callback = $promise.cancel || options.cancel) {
            callback.call($promise, $form);
        }
        else {
            $promise.remove();
        }
    };

    $promise.show = function () {
        if (!$hadRender) {
            $hadRender = 1;
            View.render(modal_location, $form);
        }
        $checkbox.checked = true;
    };

    $promise.hide = function () {
        $checkbox.checked = false;
    };

    $promise.remove = function () {
        $checkbox.checked = false;
        setTimeout(function () {
            $form.remove();
            $promise = null;
        }, 1000);
    };

    if (options.show) $promise.show();

    return $promise;
};