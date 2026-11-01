(function () {
    var scriptUrl = document.currentScript && document.currentScript.src;

    function initializePage() {
        if (!scriptUrl) {
            throw new Error("The shared site script must be loaded from a script element.");
        }

        var stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = new URL("site.css", scriptUrl).href;
        document.head.appendChild(stylesheet);

        var main = document.querySelector("main");
        if (!main) {
            main = document.createElement("main");
            main.id = "main-content";
            main.tabIndex = -1;

            var contentNodes = Array.from(document.body.childNodes).filter(function (node) {
                return !(node.nodeType === Node.ELEMENT_NODE &&
                    ["NAV", "SCRIPT", "STYLE"].includes(node.tagName));
            });
            var firstContentNode = contentNodes[0];
            if (firstContentNode) {
                document.body.insertBefore(main, firstContentNode);
            } else {
                document.body.appendChild(main);
            }
            contentNodes.forEach(function (node) {
                main.appendChild(node);
            });
        }

        if (!main.id) {
            main.id = "main-content";
        }
        if (!main.hasAttribute("tabindex")) {
            main.tabIndex = -1;
        }

        if (!document.querySelector(".skip-link")) {
            var skipLink = document.createElement("a");
            skipLink.className = "skip-link";
            skipLink.href = "#" + main.id;
            skipLink.textContent = "Skip to main content";
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializePage, { once: true });
    } else {
        initializePage();
    }
})();
