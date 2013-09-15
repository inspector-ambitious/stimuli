var DomListener = function(dom) {
    this.dom = dom;
    this.listeners = {};
};
    
DomListener.prototype.add = function(type, listener, scope) {
    scope = scope || this;

    function wrappedListener() {
        listener.apply(scope, arguments);
    }

    if (Domino.core.Support.isModern) {
        this.dom.addEventListener(type, wrappedListener, false);
    } else {
        this.dom.attachEvent('on' + type, wrappedListener);
    }

    if (!this.listeners[type]) {
        this.listeners[type] = [];
    }

    this.listeners[type].push({
        type: type,
        listener: listener,
        wrappedListener: wrappedListener
    });
};

DomListener.prototype.remove = function(type, listener) {
    var listeners = this.listeners[type],
        length = listeners.length,
        i = 0,
        wrappedListener;

    for (; i < length; i++) {
        if (listeners[i].listener === listener) {
            wrappedListener = listeners[i].wrappedListener;
            listeners.splice(i, 1);
            break;
        }
    }

    if (Domino.core.Support.isModern) {
        this.dom.removeEventListener(type, wrappedListener, false);
    } else {
        this.dom.detachEvent('on' + type, wrappedListener);
    }
};

DomListener.prototype.removeAll = function() {
    var type,
        listeners,
        length,
        i;

    for (type in this.listeners) {
        if (this.listeners.hasOwnProperty(type)) {
            listeners = this.listeners[type];
            length = listeners.length;
            for (i = 0; i < length; i++) {
                this.remove(listeners[i].type, listeners[i].listener);
            }
        }
    }
};
