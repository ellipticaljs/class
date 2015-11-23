
//umd pattern

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        //commonjs
        module.exports = factory(require('elliptical-utils'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['elliptical-utils'], factory);
    } else {
        // Browser globals (root is window)
        root.__tmp9z=root.__tmp9z || {};
        root.__tmp9z.extend=factory(root.elliptical.utils);
        root.returnExports = root.__tmp9z.extend;
    }
}(this, function (utils) {

    var isPlainObject = utils.object.isPlainObject;
    var isArray = Array.isArray;

    var extend= function(){
        // copy reference to target object
        var target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false,
            options,
            name,
            src,
            copy;

        // Handle a deep copy situation
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== 'object' && ! typeof target === 'function') {
            target = {};
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) !== null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging object literal values or arrays
                    if (deep && copy && (isPlainObject(copy) || isArray(copy))) {
                        var clone = src && (isPlainObject(src) || isArray(src)) ? src : isArray(copy) ? [] : {};

                        // Never move original objects, clone them
                        target[name] = extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (typeof copy !== 'undefined') {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    return extend;
}));