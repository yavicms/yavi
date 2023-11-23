module.exports = function Hook(plugin) {

    /**
     * Set Hook Head
     */
    plugin.hook("head", function (request) {

        return plugin.view("hook/head", request);
    });

    /**
     * Set Footer
     */
    plugin.hook("footer", function (request) {

        return plugin.view("hook/footer", request);
    });

}