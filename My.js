/*
 ***********************************************************************************************
 ***  My JavaScript Library v1.0.0             **          **     ***     ***                ***
 ***  @name:My                                 ****      ****      ***   ***                 ***
 ***  @version:1.0.0                           ** ***  **** *       **  ***                  ***
 ***  @author:Luoying                          **     *    **        * ***                   ***
 ***  @date:2013-7-1                           **          **         ***                    ***
 ***  @modify:date 2014-5-7                    **          **        ***                     ***
 ***  @copyright:China                         **          **       ***                      ***
 ***  @comment:No support for old browser      **          **      ***                       ***
 ***********************************************************************************************
 */
(function() {
    function My(s, p) {
        return new _M_(s, p);
    }

    My.name = 'My';
    My.version = '1.0.0';
    My.isReady = false;
    window.M = window.My = My;

    var guidStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$',
        primitiveTypes = ['undefined', 'string', 'number', 'boolean'],
        toString = Object.prototype.toString,
        slice = Array.prototype.slice,
        loadRegisted = false,
        readyfns = [],

        base = {
            isMy: function(obj) {
                return obj instanceof _M_;
            },

            isDefined: function(value) {
                return typeof value !== 'undefined';
            },

            isUndefined: function(value) {
                return typeof value === 'undefined';
            },

            isDomElement: function(obj) {
                return obj && obj.nodeType === 1;
            },

            clone: function(data, isDepth) {
                if (data === null)
                    return data;

                var t = typeof data;
                if (t === 'function' || marray.contains(primitiveTypes, t))
                    return data;

                if (marray.isArray(data))
                    return marray.clone(data, isDepth);

                return mobject.clone(data, isDepth);
            },

            each: function(a, fn, arg, context) {
                if (marray.isArray(a) || marray.isArrayLike(a))
                    return marray.each.apply(this, arguments);

                if (mobject.isPlainObject(a))
                    return mobject.each.apply(this, arguments);
            },

            reach: function(a, fn, arg, context) {
                if (marray.isArray(a) || marray.isArrayLike(a))
                    return marray.reach.apply(this, arguments);
            },

            filter: function(a, fn, arg, context) {
                if (marray.isArray(a))
                    return marray.filter.apply(this, arguments);

                if (mobject.isPlainObject(a))
                    return mobject.filter.apply(this, arguments);
            },

            map: function(a, fn, arg, context) {
                if (marray.isArray(a))
                    return marray.map.apply(this, arguments);

                if (mobject.isPlainObject(a))
                    return mobject.map.apply(this, arguments);
            },

            equals: function(a, b) {
                if (a === null || b === null)
                    return a === b;

                var ta = typeof a,
                    tb = typeof b;
                if (ta != tb)
                    return false;

                if (ta === 'function' || marray.contains(primitiveTypes, ta))
                    return a === b;

                var aisa = marray.isArray(a),
                    bisa = marray.isArray(a);

                if (aisa !== bisa)
                    return false;

                return (aisa ? marray.equals(a, b) : mobject.equals(a, b));
            },

            isEmpty: function(a) {
                if (mstring.isString(a))
                    return mstring.isEmpty(a);

                if (marray.isArray(a))
                    return marray.isEmpty(a);

                if (mobject.isPlainObject(a))
                    return mobject.isEmpty(a);

                return true;
            },

            size: function(a) {
                if (mstring.isString(a) || marray.isArray(a))
                    return a.length;

                if (mobject.isPlainObject(a))
                    return mobject.size(a);

                return 0;
            },

            empty: function(type) {
                return {
                    'undefined': undefined,
                    'null': null,
                    'string': '',
                    'number': NaN,
                    'boolean': false,
                    'object': {},
                    'array': [],
                    'function': function() {}
                }[type || 'object'];
            },

            contains: function(a, e, pos) {
                if (mstring.isString(a))
                    return mstring.contains(a, e, pos);

                if (marray.isArray(a))
                    return marray.contains(a, e, pos);

                if (mobject.isPlainObject(a))
                    return mobject.hasKey(a, e);

                return false;
            },

            getKeys: function(a) {
                if (marray.isArray(a))
                    return marray.getKeys(a);

                if (mobject.isPlainObject(a))
                    return mobject.getKeys(a);

                return null;
            },

            getValues: function(a) {
                if (marray.isArray(a))
                    return marray.getValues(a);

                if (mobject.isPlainObject(a))
                    return mobject.getValues(a);

                return null;
            },

            toArray: function(arrayLike) {
                if (marray.isArrayLike(arrayLike)) {
                    return marray.map(arrayLike, function(v) {
                        return v;
                    });
                }
                return [];
            },

            repeat: function(a, count) {
                if (mstring.isString(a))
                    return mstring.repeat(a, count);

                if (marray.isArray(a))
                    return marray.repeat(a, count);

                return null;
            },

            range: function(first, second, step, type) {
                type = type || 'array';

                if (type == 'array')
                    return marray.range(first, second, step);

                if (type == 'string')
                    return mstring.range(first, second, step);

                return null;
            },

            fill: function(a, start, number, value) {
                if (mstring.isString(a))
                    return mstring.fill(a, start, number, value);

                if (marray.isArray(a))
                    return marray.fill(a, start, number, value);
            },

            merge: function(dest, source) {
                if (marray.isArray(dest))
                    return marray.merge(dest, source);

                if (mobject.isPlainObject(dest))
                    return mobject.merge(dest);
            },

            inherit: function(subCls, superCls, args) {
                function F() {};
                F.prototype = superCls.prototype;

                var prot = new F();
                prot.constructor = subCls;

                args = slice.call(arguments);
                marray.each(args, function(v) {
                    mobject.each(v, function(value, key) {
                        prot[key] = value;
                    });
                }, 2);

                subCls.prototype = prot;
                subCls.superCls = superCls.prototype;

                if (superCls.prototype.constructor === Object.prototype.constructor)
                    superCls.prototype.constructor = superCls;
                return this;
            },

            extend: function(dest, args) {
                dest = dest || {};
                args = slice.call(arguments);
                marray.each(args, function(v) {
                    mobject.each(v, function(value, key) {
                        dest[key] = value;
                    });
                }, 1);
                return this;
            },

            augment: function(dest, source, methods) {
                if (marray.isArray(methods)) {
                    dest = dest || {};
                    source = source || {};
                    marray.each(methods, function(value) {
                        if (!dest.hasOwnProperty(value) && source.hasOwnProperty(value))
                            dest[value] = source[value];
                    });
                }
                return this;
            },

            plugin: function(name, lib) {
                if (name && mobject.isPlainObject(lib)) {
                    var ns = name.split('.'),
                        l = ns.length,
                        last = My;
                    marray.each(ns, function(n, i) {
                        if (!last[n]) last[n] = i == l - 1 ? lib : {};
                        last = last[n];
                    });
                }
                return this;
            },

            create: function(tag, text) {
                return new _M_(mstring.isString(tag) && (tag.toUpperCase() === 'TEXT' && document.createTextNode(text) || document.createElement(tag)));
            },

            query: function(s, p) {
                this.isMy(p) && (p = p[0]);
                return this.toArray((p || document).querySelectorAll(s));
            },

            ajax: function(url, opts) {
                opts = opts || {};

                var loader = null;
                if (opts.jsonp) {
                    loader = new base.JSONPer();
                    loader.callback = opts.callback || this.ajaxSettings.callback;
                } else {
                    loader = new base.Loader();
                    opts.header && loader.beforeSend(opts.header);
                    loader.method = (opts.method || this.ajaxSettings.method).toUpperCase();
                    loader.params = opts.params || {};
                }

                loader.url = url;
                loader.dataType = opts.dataType || this.ajaxSettings.dataType;
                loader.contentType = opts.contentType || this.ajaxSettings.contentType;
                loader.parse = opts.parse === undefined ? this.ajaxSettings.parse : opts.parse;
                loader.async = opts.async === undefined ? this.ajaxSettings.async : opts.async;
                loader.cache = opts.cache === undefined ? this.ajaxSettings.cache : opts.cache;
                loader.timeout = opts.timeout === undefined ? this.ajaxSettings.timeout : opts.timeout;

                loader.once({
                    'success': function(e) {
                        opts.success && opts.success.call(this, this.data);
                        this.release();
                        loader = null;
                    },
                    'fail': function(e, x) {
                        opts.fail && opts.fail.call(this, this, e, x);
                        this.release();
                        loader = null;
                    },
                    'timeout': function() {
                        opts.ontimeout && opts.ontimeout.call(this);
                        this.release();
                        loader = null;
                    }
                })

                loader.send();
                return {
                    success: function(fn) {
                        opts.success = fn;
                        return this;
                    },
                    fail: function(fn) {
                        opts.fail = fn;
                        return this;
                    },
                    timeout: function(fn) {
                        opts.ontimeout = fn;
                        return this;
                    }
                };
            },

            require: function(url, callback) {
                mstring.isString(url) && (url = [url]);

                var count = 0,
                    fails = [],
                    cb = function(e) {
                        e && fails.push(this.src || this.href);
                        count++;
                        count === url.length && callback && callback(fails);
                    };

                marray.each(url, function(v) {
                    if (!/\.(\w+)$/.test(v)) return;

                    var ext = RegExp.$1;
                    ext = ext.toLowerCase();
                    ext === 'js' ? loadScript(v, cb) : (ext === 'css' ? loadCSS(v, cb) : null);
                });
            },

            stringify: function(data, type) {
                return {
                    json: JSON.stringify(data),
                    xml: this.serializeXML(data)
                }[type || 'json'];
            },

            parse: function(data, type) {
                return {
                    json: JSON.parse(data),
                    xml: this.parseXML(data)
                }[type || 'json'];
            },

            serializeXML: function(xml) {
                var txt = '';
                try {
                    if (window.XMLSerializer) { // W3C标准
                        var serializer = new XMLSerializer();
                        txt = serializer.serializeToString(xml);
                    } else { //IE
                        txt = xml.xml;
                    }
                } catch (e) {
                    txt = '';
                }
                return txt;
            },

            parseXML: function(data) {
                if (!mstring.isString(data))
                    return null;

                var xml;
                try {
                    if (window.DOMParser) { // W3C标准
                        var parser = new DOMParser();
                        xml = parser.parseFromString(data, "text/xml");
                    } else { //IE
                        xml = new ActiveXObject("Microsoft.XMLDOM");
                        xml.async = "false";
                        xml.loadXML(data);
                    }
                } catch (e) {
                    xml = null;
                }
                return xml;
            },

            parseHTML: function(data) {
                if (!mstring.isString(data))
                    return null;

                var dom;
                try {
                    if (window.DOMParser) { // W3C标准
                        var parser = new DOMParser();
                        dom = parser.parseFromString(data, "text/html");
                        dom && (dom = dom.body.children || dom.body.childNodes);
                    }
                } catch (e) {
                    dom = null;
                }
                return new _M_(dom);
            },

            on: function(tg, ty, fn, arg) {
                isOriginalEvent(tg, ty) ? devent.on(tg, ty, fn, arg) : cevent.on(tg, ty, fn, arg);
            },

            once: function(tg, ty, fn, arg) {
                isOriginalEvent(tg, ty) ? devent.once(tg, ty, fn, arg) : cevent.once(tg, ty, fn, arg);
            },

            off: function(tg, ty, fn) {
                isOriginalEvent(tg, ty) ? devent.off(tg, ty, fn) : cevent.off(tg, ty, fn);
            },

            listened: function(tg, ty) {
                return isOriginalEvent(tg, ty) ? devent.listened(tg, ty) : cevent.listened(tg, ty);
            },

            release: function(tg, ty) {
                isOriginalEvent(tg, ty) ? devent.release(tg, ty) : cevent.release(tg, ty);
            },

            trigger: function(tg, ty, data, scope) {
                isOriginalEvent(tg, ty) ? devent.trigger(tg, ty, data, scope) : cevent.trigger(tg, ty, data, scope);
            },

            now: function() {
                return new Date().getTime();
            },

            guid: function() {
                return '';
            }
        };

    function registerLoad(fn) {
        readyfns.push(fn);
        if (!loadRegisted) {
            base.on(window, 'load', completed);
            base.on(document, 'DOMContentLoaded', completed);
            loadRegisted = true;
        }
    }

    function completed() {
        My.isReady = true;
        base.off(window, 'load', completed);
        base.off(document, 'DOMContentLoaded', completed);
        marray.each(readyfns, function(fn) {
            fn.call(My);
        });
    }

    ///String对象的一些操作方法
    var mstring = {
        isString: function(s) {
            return typeof s === 'string';
        },

        isEmpty: function(s) {
            return !s;
        },

        contains: function(str, substr, pos) {
            return str.indexOf(substr, pos) > -1;
        },

        repeat: function(str, count) {
            if (!mnumber.isNumber(count) || count < 0)
                return '';

            count = Math.floor(count);
            if (count === 0) return '';

            var s = '';
            while (count--) {
                s += str;
            }
            return s;
        },

        range: function(first, second, step) {
            var s = marray.range(first, second, step);
            return s && s.join('') || '';
        },

        fill: function(s, start, number, value) {
            if (base.isUndefined(start) || !mnumber.isNumber(number) || number <= 0 || base.isUndefined(value))
                return '';

            return s.slice(0, start) + this.repeat(value, number) + s.slice(start + number);
        },

        ltrim: function(s) {
            if (this.isEmpty(s))
                return s;

            if (s.ltrim)
                return s.ltrim();

            if (s.trimLeft)
                return s.trimLeft();

            return s.replace(/^\s+/, '');
        },

        rtrim: function(s) {
            if (this.isEmpty(s))
                return s;

            if (s.rtrim)
                return s.rtrim();

            if (s.trimRight)
                return s.trimRight();

            return s.replace(/\s+$/, '');
        },

        trim: function(s) {
            if (this.isEmpty(s))
                return s;

            if (s.trim)
                return s.trim();

            return this.rtrim(this.ltrim(s));
        },

        trimAll: function(s) {
            if (this.isEmpty(s))
                return s;

            return s.replace(/\s/g, '');
        },

        camelCase: function(s, join) {
            if (!this.isString(s))
                return '';

            base.isDefined(join) || (join = '-');

            return s.replace(new RegExp(join + '(\\w)', 'g'), function(m, p1) {
                return p1.toUpperCase();
            });
        },

        joinCase: function(s, join) {
            if (!this.isString(s))
                return '';

            base.isDefined(join) || (join = '-');

            return s.replace(/[A-Z]/g, function(m, p1) {
                return join + m.toLowerCase();
            });
        }
    };

    ///数值对象的一些操作对象
    var mnumber = {
        isNumber: function(n) {
            return typeof n === 'number';
        },

        isNumeric: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        addZero: function(n, len) {
            if (!this.isNumber(n))
                return '';

            base.isDefined(len) || (len = 2);

            return n < Math.pow(10, len - 1) ? mstring.repeat('0', len - n.toString().length) + n : n.toString();
        }
    };


    ///Object字面量(通过{}或new Object()创建)对象的一些操作方法
    var mobject = {
        isPlainObject: function(obj) {
            if (!obj || typeof obj !== "object" || obj.nodeType || obj === obj.window)
                return false;

            var hasOwn = Object.prototype.hasOwnProperty;
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
                    return false;
            } catch (e) {
                return false;
            }

            for (var key in obj) {}
            return key === undefined || hasOwn.call(obj, key);
        },

        size: function(obj) {
            var l = 0;
            this.each(obj, function() {
                l++;
            });
            return l;
        },

        isEmpty: function(obj) {
            return this.size(obj) === 0;
        },

        equals: function(obj1, obj2) {
            if (!this.isPlainObject(obj2))
                return false;

            if (!obj1 && !obj2)
                return true;

            if (this.size(obj1) != this.size(obj2))
                return false;

            return this.each(obj1, function(v, k) {
                if (!this.hasKey(obj2, k) || !base.equals(v, obj2[k]))
                    return false;
                return true;
            });
        },

        hasKey: function(obj, key) {
            return obj.hasOwnProperty(key); /*仅自身属性*/
        },

        getKeys: function(obj) {
            return this.map(obj, function(v, k) {
                return k;
            });
        },

        getValues: function(obj) {
            return this.map(obj, function(v) {
                return v;
            });
        },

        each: function(obj, fn, arg, context) {
            if (!mfn.isFunction(fn))
                return false;

            context || (context = this);

            var k, v;
            for (k in obj) {
                v = fn.call(context, obj[k], k, arg);

                if (v === false)
                    break;
            }
            return !!v;
        },

        filter: function(obj, fn, arg, context) {
            if (!mfn.isFunction(fn))
                return [];

            context || (context = this);

            var rs = [];
            this.each(obj, function(e, k) {
                if (fn.call(this, e, k, arg)) {
                    var o = {};
                    o[k] = e;
                    rs.push(o);
                }
            }, null, context);
            return rs;
        },

        map: function(obj, fn, arg, context) {
            if (!mfn.isFunction(fn))
                return [];

            context || (context = this);

            var rs = [];
            this.each(obj, function(e, k) {
                rs.push(fn.call(this, e, k, arg));
            }, null, context);
            return rs;
        },

        clone: function(obj, isDepth) {
            var ret = {};
            if (!isDepth) {
                this.each(obj, function(v, k) {
                    ret[k] = v;
                });
                return ret;
            }

            this.each(obj, function(d, k) {
                if (d === null) {
                    ret[k] = d;
                    return true;
                }

                var t = typeof d;
                if (t === 'function' || marray.contains(primitiveTypes, t)) {
                    ret[k] = d;
                    return true;
                }

                ret[k] = this.isPlainObject(d) ? this.clone(d, true) : marray.clone(d, true);
            });
            return ret;
        },

        merge: function(dest, source) {
            if (!this.isPlainObject(source))
                return null;

            this.each(source, function(v, k) {
                dest[k] = v;
            });
            return dest;
        }
    };


    ///Array对象的一些操作方法
    var marray = {
        isArray: function(arr) {
            return toString.call(arr) === '[object Array]';
        },

        isArrayLike: function(obj) {
            if (obj == null || obj == window || obj.document)
                return false;

            var length = obj.length;
            if (base.isDomElement(obj) && length)
                return true;

            return mstring.isString(obj) || marray.isArray(obj) || length === 0 || (typeof length === 'number' && length > 0 && (length - 1) in obj);
        },

        isEmpty: function(arr) {
            return !arr || arr.length === 0;
        },

        contains: function(arr, e, pos) {
            return arr.indexOf(e, pos) > -1;
        },

        repeat: function(e, count) {
            if (!mnumber.isNumber(count) || count < 0)
                return null;

            count = Math.floor(count);
            if (count === 0) return '';

            var s = [];
            while (count--) {
                s[s.length++] = e;
            }
            return s;
        },

        range: function(first, second, step) {
            if (base.isUndefined(first) || base.isUndefined(second))
                return null;

            var isNumber = mnumber.isNumber(first),
                isString = !isNumber && mstring.isString(first);

            if ((!isNumber && !isString) || (isNumber && !mnumber.isNumber(second)) || (isString && !mstring.isString(second)))
                return null;

            if (base.isDefined(step) && !mnumber.isNumber(step))
                return null;

            first = isString && first.charCodeAt(0) || first;
            second = isString && second.charCodeAt(0) || second;
            step = step || 1;

            if (step < 0) {
                first = [second, second = first][0];
                step = -step;
            }

            var s = [],
                fn = function(a) {
                    return isNumber ? a : String.fromCharCode(a);
                };

            if (first <= second) {
                do {
                    s.push(fn(first));
                }
                while ((first += step) <= second)
            } else {
                do {
                    s.push(fn(first));
                }
                while ((first -= step) >= second)
            }
            return s;
        },

        fill: function(arr, start, number, value) {
            if (base.isUndefined(start) || !mnumber.isNumber(number) || number <= 0 || base.isUndefined(value))
                return null;

            var c = 0;
            this.each(arr, function(v, i) {
                if (c >= number) return false;
                arr[i] = value;
                c++;
            }, start);
            return arr;
        },

        getKeys: function(arr) {
            return this.map(arr, function(v, i) {
                return i;
            });
        },

        getValues: function(arr) {
            return arr.concat();
        },

        each: function(arr, fn) {
            if (!mfn.isFunction(fn))
                return false;

            var s = 0,
                e = arr.length,
                c = this,
                arg, v;

            if (arguments.length > 2) {
                var t = arguments[2],
                    f = arguments[3],
                    z = arguments[4],
                    x = arguments[5];
                base.isDefined(t) && (mnumber.isNumber(t) && (s = t) || (arg = t, c = f));
                base.isDefined(f) && (mnumber.isNumber(f) && (e = f) || (arg = f, c = z));
                base.isDefined(z) && (arg = z);
                base.isDefined(x) && (c = x);
            }

            for (; s < e; s++) {
                v = fn.call(c, arr[s], s, arg);

                if (v === false)
                    break;
            }
            return !!v;
        },

        ///倒序遍历数组
        reach: function(arr, fn) {
            if (!mfn.isFunction(fn))
                return false;

            var s = arr.length - 1,
                e = 0,
                c = this,
                arg, v;

            if (arguments.length > 2) {
                var t = arguments[2],
                    f = arguments[3],
                    z = arguments[4],
                    x = arguments[5];
                base.isDefined(t) && (mnumber.isNumber(t) && (s = t) || (arg = t, c = f));
                base.isDefined(f) && (mnumber.isNumber(f) && (e = f) || (arg = f, c = z));
                base.isDefined(z) && (arg = z);
                base.isDefined(x) && (c = x);
            }

            for (; s >= e; s--) {
                v = fn.call(c, arr[s], s, arg);

                if (v === false)
                    break;
            }
            return !!v;
        },

        filter: function(arr, fn, arg, context) {
            if (!mfn.isFunction(fn))
                return [];

            context || (context = this);

            var rs = [];
            this.each(arr, function(e, i) {
                fn.call(context, e, i, arg) && rs.push(e);
            });
            return rs;
        },

        map: function(arr, fn, arg, context) {
            if (!mfn.isFunction(fn))
                return [];

            context || (context = this);

            var rs = [];
            this.each(arr, function(e, i) {
                rs.push(fn.call(context, e, i, arg));
            });
            return rs;
        },

        equals: function(arr1, arr2) {
            if (!this.isArray(arr2))
                return false;

            if (!arr1 && !arr2)
                return true;

            if (arr1.length != arr2.length)
                return false;

            var len = arr1.length;
            while (len--) {
                if (!base.equals(arr1[len], arr2[len]))
                    return false;
            }
            return true;
        },

        clone: function(arr, isDepth) {
            if (!isDepth)
                return arr.concat();

            var ret = [];
            this.each(arr, function(d, i) {
                if (d === null) {
                    ret[i] = d;
                    return true;
                }

                var t = typeof d;
                if (t === 'function' || marray.contains(primitiveTypes, t)) {
                    ret[i] = d;
                    return true;
                }

                ret[i] = this.isArray(d) ? this.clone(d, true) : mobject.clone(d, true);
            });
            return ret;
        },

        order: function(arr, field, type) {
            if (!this.isArray(arr) || this.isEmpty(arr))
                return;

            var t = (!type || type === 'asc') ? -1 : 1, //asc|desc
                isArray = marray.isArray(field);

            arr.sort(function(a, b) {
                var ret = isArray ? field[0] : field;
                if (a[ret] === b[ret] && isArray) {
                    //当两个比较值全等，则使用下一个字段比较[若有]，直到不相等或无下一个字段为止
                    marray.each(field, function(v) {
                        if (a[v] !== b[v]) {
                            ret = v;
                            return false;
                        }
                    });
                }

                a = a[ret] || a;
                b = b[ret] || b;

                if (a === undefined) return t;
                if (b === undefined) return -t;
                return a < b ? t : (a > b ? -t : 0);
            });
        },

        unique: function(arr, field) {
            if (!this.isArray(arr) || this.isEmpty(arr))
                return null;

            var ret = [],
                map = {};
            this.each(arr, function(m) {
                if (field) {
                    if (!mobject.hasKey(m, field)) {
                        ret.push(m);
                        return true;
                    }

                    if (map[m[field]] === undefined) {
                        ret.push(m);
                        map[m[field]] = m;
                    }
                } else {
                    if (map[m] === undefined) {
                        ret.push(m);
                        map[m] = m;
                    }
                }
            });
            return ret;
        },

        merge: function(dest, source) {
            if (!this.isArray(source))
                return null;

            this.each(source, function(v) {
                dest[dest.length++] = v;
            });
            return dest;
        }
    };

    ///日期对象的一些操作方法，日期对象是由日期部件和时间部件两部分组成
    var mdate = {
        isDate: function(d) {
            return toString.call(d) === '[object Date]';
        },

        formatDate: function(d, fmt) {
            mnumber.isNumber(d) && (d = new Date(d));

            if (!this.isDate(d))
                return '';

            fmt = fmt || 'yyyy-MM-dd hh:mm:ss'; //支持的格式模板部件有：y--年份，M--月份，d--日，h--24制小时，H--12制小时，m--分
            var o = {
                "M+": d.getMonth() + 1, //月份     
                "d+": d.getDate(), //日     
                "H+": d.getHours() % 12 === 0 ? 12 : d.getHours() % 12, //小时     
                "h+": d.getHours(), //小时     
                "m+": d.getMinutes(), //分     
                "s+": d.getSeconds(), //秒     
                "q+": Math.floor((d.getMonth() + 3) / 3), //季度     
                "S": d.getMilliseconds() //毫秒     
            };
            /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length)));

            mobject.each(o, function(v, k) {
                new RegExp("(" + k + ")").test(fmt) && (fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? v : ("00" + v).substr(("" + v).length)));
            });
            return fmt;
        }
    };


    ///函数的一些操作对象
    var mfn = {
        isFunction: function(fn) {
            return typeof fn === 'function';
        },

        empty: function() {
            return function() {};
        }
    };

    base.extend(base, mnumber);
    base.extend(base, mdate);

    base.augment(base, mstring, ['isString', 'ltrim', 'rtrim', 'trim', 'trimAll', 'camelCase', 'joinCase']);
    base.augment(base, mobject, ['isPlainObject']);
    base.augment(base, marray, ['isArray', 'isArrayLike', 'order', 'unique']);
    base.augment(base, mfn, ['isFunction']);

    ///针对HTML内容的一些操作方法
    var mhtml = {
        encodeHTML: function(s) {
            return (s || '').replace(/&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/ /g, '&nbsp;');
        },

        decodeHTML: function(s) {
            return (s || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
        }
    };

    base.extend(base, mhtml);

    ///针对URL的一些操作方法
    var murl = {
        joinURL: function(obj, join, encode) {
            if (!mobject.isPlainObject(obj))
                return '';

            join || (join = '&');

            var s = '';
            mobject.each(obj, function(v, k) {
                s += (k + '=' + (encode && encodeURIComponent(v) || v));
                s += join;
            });
            s = s.substring(0, s.length - join.length);
            return s;
        },

        splitURL: function(url, split, decode) {
            if (!mstring.isString(url))
                return null;

            split || (split = '&');

            var arr = url.split(split),
                a, obj = {};
            marray.each(arr, function(v, i) {
                a = v.split('=');
                obj[a[0]] = decode && decodeURIComponent(a[1]) || a[1];
            });
            return obj;
        },

        parseURL: function(url) {
            var ret = {
                ///协议
                protocol: '',
                ///主机：域名或IP地址
                host: '',
                ///端口号
                port: '',
                ///主机和端口号
                hostWidthPort: '',
                ///文件路径(目录+文件名)
                path: '',
                ///目录(无文件名的文件路径)
                directory: '',
                ///文件名
                file: '',
                ///查询参数部件
                query: '',
                ///哈希部件
                hash: '',
                ///是否使用HTTP、HTTPS或RTMP、RTMPS协议
                isHttp: false,
                ///是否使用安全HTTPS协议
                isHttps: false,
                ///是否使用邮件MAILTO协议
                isEMail: false
            }
            if (mstring.isString(url) && !mstring.isEmpty(url)) {
                var key = ["source", "protocol", "hostWidthPort", "userInfo", "user", "password", "host", "ipv4", "ipv6", "basename", "domain", "port", "relative", "path", "directory", "file", "query", "hash"],
                    reg = /^(?:(?![^:@]+:[^:@\/]*@)([^[:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:(\d+\.\d+\.\d+\.\d+)|\[([a-fA-F0-9:]+)\]|([^.:\/?#]*))(?:\.([^:\/?#]*))?)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

                var m = reg.exec(url);
                var uri = {};
                var i = 18;
                while (i--) uri[key[i]] = m[i] || '';

                for (var k in ret) {
                    ret[k] = uri[k];
                }
                ret.isHttp = (ret.protocol === 'http' || ret.protocol === 'https' || ret.protocol === 'rtmp' || ret.protocol === 'rtmps');
                ret.isHttps = ret.protocol === 'https';
                ret.isEMail = ret.protocol === 'mailto';
            }
            return ret;
        },

        toLink: function(url, text, target) {
            url = url || '';
            return url.replace(/(http[s]?:\/\/[^\s\[]+)/ig, '<a target="' + (target || '_blank') + '" href="$1">' + (text || url) + '</a>');
        }
    };

    base.extend(base, murl);

    ///16进制颜色值
    var regHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
        ///RGB颜色值
        regRgb = /^(rgb[a]?)/i,
        regRep = /(?:\(|\)|rgb[a]?)*/ig;

    ///针对颜色的一些操作方法
    var mcolor = {
        create: function(r, g, b, f, a) {
            mstring.isString(r) && (r = parseInt(r, 16));
            mstring.isString(g) && (g = parseInt(g, 16));
            mstring.isString(b) && (b = parseInt(b, 16));
            return f ? (base.isDefined(a) ? 'RGBA(' + r + ',' + g + ',' + b + ',' + a + ')' : 'RGB(' + r + ',' + g + ',' + b + ')') : ('#' + r.toString(16) + g.toString(16) + b.toString(16));
        },

        getRed: function(c) {
            if (!c) return;

            regRgb.test(c) || (c = this.toRGB(c));
            return parseInt(c.replace(regRep, '').split(',')[0]);
        },

        getGreen: function(c) {
            if (!c) return;

            regRgb.test(c) || (c = this.toRGB(c));
            return parseInt(c.replace(regRep, '').split(',')[1]);
        },

        getBlue: function(c) {
            if (!c) return;

            regRgb.test(c) || (c = this.toRGB(c));
            return parseInt(c.replace(regRep, '').split(',')[2]);
        },

        getAlpha: function(rgba) {
            if (!rgba || !/^rgba\(\d+,\d+,\d+,[\d\.]+\)$/i.test(rgba)) return;

            return parseFloat(rgba.replace(regRep, '').split(',')[3]);
        },

        toHex: function(c) {
            if (regRgb.test(c)) {
                var cs = c.replace(regRep, '').split(','),
                    sh = '#',
                    i = 0,
                    h;

                while (i < 3) {
                    h = Number(cs[i]).toString(16);
                    h.length === 1 && (h = '0' + h);
                    sh += h;
                    i++;
                }

                return sh;
            }

            if (regHex.test(c)) {
                if (c.length === 7)
                    return c;

                if (c.length === 4) {
                    var cs = c.replace(/#/, '').split(''),
                        sh = '#',
                        i = 0,
                        l = cs.length;

                    for (; i < l; i++) {
                        sh += cs[i] + cs[i];
                    }
                    return sh;
                }
            }
            return c;
        },

        toRGB: function(c, a) {
            if (!c) return '';

            c = c.toUpperCase();

            if (regHex.test(c)) {
                if (c.length === 4) {
                    var sh = '#',
                        i = 1;

                    while (i <= 3) {
                        sh += c.slice(i, i + 1).concat(c.slice(i, i + 1));
                        i++;
                    }
                    c = sh;
                }

                var cs = [],
                    i = 1;

                while (i <= 6) {
                    cs.push(parseInt('0x' + c.slice(i, i + 2)));
                    i += 2;
                }

                base.isDefined(a) && (cs.push(a));

                return (base.isUndefined(a) && 'RGB' || 'RBGA') + '(' + cs.join(',') + ')';
            }

            base.isDefined(a) && (c = c.replace(/rgb/i, 'RGBA').replace(')', ',' + a + ')')); //补上Alpha通道，0-1
            return c;
        }
    };

    base.plugin('Color', mcolor);

    ///定义事件类型（包含原生的DOM事件类型和已知的自定义事件类型）
    var eventType = {},
        originalEventTypes = [],
        ///鼠标事件类型列表
        mouseEventTypes = [
            'click',
            'dblclick',
            'mousedown',
            'mousemove',
            'mouseup',
            'mouseover',
            'mouseout',
            'mouseenter',
            'mouseleave',
            'mousewheel',
            'drag',
            'drop',
            'dragstart',
            'dragover',
            'dragend',
            'dragenter',
            'dragleave'
        ],

        ///键盘事件类型列表
        keyEventTypes = [
            'keydown',
            'keypress',
            'keyup'
        ],

        ///表单事件类型列表
        formEventTypes = [
            'change',
            'input',
            'invalid',
            'select',
            'submit',
            'reset',
            'focus',
            'blur'
        ],

        ///其他DOM事件类型列表
        domEventTypes = [
            'resize',
            'scroll',
            'load',
            'DOMContentLoaded',
            'unload',
            'error',
            'abort',
            'message',
            'open',
            'online',
            'offline',
            'redo',
            'undo',
            'storage'
        ],

        ///自定义事件类型列表
        customEventTypes = [
            'success',
            'complete',
            'fail',
            'timeout',
            'destroy',
            'timer',
            'start',
            'stop'
        ],

        ///事件处理函数句柄集合
        eventHandlers = {},

        ///事件对象的映射，通过生成的guid挂钩映射起来
        eventTg = {},

        ///当前事件对象映射guid
        eventGuid = 0,

        isOriginalEvent = function(tg, ty) {
            return (base.isDomElement(tg) || tg == window || tg == document) && marray.contains(originalEventTypes, ty);
        },

        ///合并原生的DOM事件类型和自定义事件类型
        mergeEvent = function() {
            marray.each(arguments, function(e) {
                marray.each(e, function(v) {
                    eventType[v.toUpperCase()] = v;
                });
            });
        },

        ///获取指定对象的事件映射guid
        getEventGuid = function(tg) {
            var guid = null;
            mobject.each(eventTg, function(v, k) {
                if (v === tg) {
                    guid = k;
                    return false;
                }
            });
            return guid;
        };

    originalEventTypes = mouseEventTypes.concat(keyEventTypes, formEventTypes, domEventTypes);
    mergeEvent(originalEventTypes, customEventTypes);

    base.eventType = eventType;

    function requestNewEvent(tg, ty, fn) {
        var guid = getEventGuid(tg);
        if (!guid) { //尚未映射，则创建guid映射起来
            guid = 'events_' + (eventGuid++);
            eventTg[guid] = tg;
        }

        eventHandlers[guid] || (eventHandlers[guid] = {});
        eventHandlers[guid][ty] || (eventHandlers[guid][ty] = []);

        var handlers = eventHandlers[guid][ty];
        marray.each(handlers, function(v) {
            if (v.fn === fn) { //当存在此事件注册，句柄函数一致，则不再注册
                guid = false;
                return false;
            }
        })
        return guid;
    }

    ///针对DOM事件的一些方法
    var devent = {
        on: function(tg, ty, fn, arg) {
            function add(tg, ty, fn, arg) {
                var guid = requestNewEvent(tg, ty, fn);
                if (!guid) return;

                var handler = function(e) {
                    var callee = arguments.callee;
                    callee.fn.call(this, e, callee.arg); //将event对象作为参数传递给处理函数
                }
                handler.fn = fn;
                handler.arg = arg;
                eventHandlers[guid][ty].push(handler);
                tg.addEventListener(ty, handler, false);
            }

            if (mobject.isPlainObject(ty)) {
                arg = fn;
                mobject.each(ty, function(fn, k) {
                    add(tg, k, fn, arg);
                });
                return;
            }
            add(tg, ty, fn, arg);
        },

        off: function(tg, ty, fn) {
            function remove(tg, ty, fn) {
                var handlers = this.handlers(tg, ty);
                marray.each(handlers, function(v, i) {
                    if (v.fn === fn) {
                        tg.removeEventListener(ty, v, false);
                        handlers.splice(i, 1);
                        delete v.fn;
                        delete v.arg;
                        return false;
                    }
                });
            }

            if (mobject.isPlainObject(ty)) {
                mobject.each(ty, function(fn, k) {
                    remove.call(this, tg, k, fn);
                }, null, this);
                return;
            }
            remove.call(this, tg, ty, fn);
        },

        once: function(tg, ty, fn, arg) {
            function _once(tg, ty, fn, arg, context) {
                context.on(tg, ty, function(e) {
                    context.off(e.target, e.type, arguments.callee);
                    fn.call(this, e, arg);
                });
            }

            if (mobject.isPlainObject(ty)) {
                arg = fn;
                mobject.each(ty, function(fn, k) {
                    _once(tg, k, fn, arg, this);
                }, null, this);
                return;
            }
            _once(tg, ty, fn, arg, this);
        },

        listened: function(tg, ty) {
            return this.handlers(tg, ty).length > 0;
        },

        handlers: function(tg, ty) {
            var guid = getEventGuid(tg);
            return guid && eventHandlers[guid] && eventHandlers[guid][ty] || [];
        },

        release: function(tg, ty) {
            if (!ty) {
                var guid = getEventGuid(tg),
                    events = guid && eventHandlers[guid] || {};
                mobject.each.call(this, events, function(v, k) {
                    this.releaseEvents(tg, k, v || []);
                });
                return;
            }
            this.releaseEvents(tg, ty, this.handlers(tg, ty));
        },

        releaseEvents: function(tg, ty, handlers) {
            while (handlers.length) {
                var handler = handlers.shift();
                tg.removeEventListener(ty, handler, false);
                delete handler.fn;
                delete handler.arg;
            }
        },

        trigger: function(tg, ty, data, scope) {
            var ismouse = mouseEventTypes.indexOf(ty) > -1;
            try {
                var e = document.createEvent(ismouse ? 'MouseEvents' : 'HTMLEvents');
                data && (e.data = data);
                scope || (scope = tg);
                ismouse ? e.initMouseEvent(ty, true, true, tg.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null) : e.initEvent(ty, true, true);
                tg.dispatchEvent.call(scope, e);
            } catch (err) {}
        }
    };

    ///针对自定义事件的一些方法
    var cevent = {
        on: function(tg, ty, fn, arg) {
            function add(tg, ty, fn, arg) {
                var guid = requestNewEvent(tg, ty, fn);
                if (!guid) return;

                var handler = function(tg, ty, data) {
                    var callee = arguments.callee;
                    callee.fn.call(this, new CustomEvent(tg, ty, data), callee.arg); //将event对象作为参数传递给处理函数
                }
                handler.fn = fn;
                handler.arg = arg;
                eventHandlers[guid][ty].push(handler);
            }

            if (mobject.isPlainObject(ty)) {
                arg = fn;
                mobject.each(ty, function(fn, k) {
                    add(tg, k, fn, arg);
                });
                return;
            }
            add(tg, ty, fn, arg);
        },

        off: function(tg, ty, fn) {
            function remove(tg, ty, fn) {
                var handlers = this.handlers(tg, ty);
                marray.each(handlers, function(v, i) {
                    if (v.fn === fn) {
                        handlers.splice(i, 1);
                        delete v.fn;
                        delete v.arg;
                        return false;
                    }
                });
            }

            if (mobject.isPlainObject(ty)) {
                mobject.each(ty, function(fn, k) {
                    remove.call(this, tg, k, fn);
                }, null, this);
                return;
            }
            remove.call(this, tg, ty, fn);
        },

        once: function(tg, ty, fn, arg) {
            function _once(tg, ty, fn, arg, context) {
                context.on(tg, ty, function(e) {
                    context.off(e.target, e.type, arguments.callee);
                    fn.call(this, e, arg);
                });
            }

            if (mobject.isPlainObject(ty)) {
                arg = fn;
                mobject.each(ty, function(fn, k) {
                    _once(tg, k, fn, arg, this);
                }, null, this);
                return;
            }
            _once(tg, ty, fn, arg, this);
        },

        listened: function(tg, ty) {
            return this.handlers(tg, ty).length > 0;
        },

        handlers: function(tg, ty) {
            var guid = getEventGuid(tg);
            return guid && eventHandlers[guid] && eventHandlers[guid][ty] || [];
        },

        release: function(tg, ty) {
            if (!ty) {
                var guid = getEventGuid(tg),
                    events = guid && eventHandlers[guid] || {};
                mobject.each.call(this, events, function(v) {
                    this.releaseEvents(v || []);
                });
                return;
            }
            this.releaseEvents(this.handlers(tg, ty));
        },

        releaseEvents: function(handlers) {
            while (handlers.length) {
                var handler = handlers.shift();
                delete handler.fn;
                delete handler.arg;
            }
        },

        trigger: function(tg, ty, data, scope) {
            var handlers = this.handlers(tg, ty);
            scope = scope || tg;
            marray.each(handlers, function(v) {
                v.call(scope, tg, ty, data);
            });
        }
    };

    function CustomEvent(tg, ty, data) {
        this.target = tg;
        this.type = ty;
        this.timeStamp = base.now();
        this.data = data;
    }

    ///自定义事件派发器，所有需要派发自定义事件的类都需要继承此事件派发器
    base.Dispatcher = function() {
        if (!(this instanceof base.Dispatcher))
            return new base.Dispatcher();
    }

    base.Dispatcher.prototype = {
        on: function(ty, fn, arg) {
            cevent.on(this, ty, fn, arg);
        },

        off: function(ty, fn) {
            cevent.off(this, ty, fn);
        },

        once: function(ty, fn, arg) {
            cevent.once(this, ty, fn, arg);
        },

        listened: function(ty) {
            return cevent.listened(this, ty);
        },

        release: function(ty) {
            cevent.release(this, ty);
        },

        trigger: function(ty, data, scope) {
            cevent.trigger(this, ty, data, scope);
        }
    }

    ///计时器
    base.Timer = function(delay, totalCount) {
        if (!(this instanceof base.Timer))
            return new base.Timer(delay, totalCount);

        base.Dispatcher.call(this); //继承派发器，拥有绑定、松绑和派发自定义事件的能力
        this.timer = -1; //计时器对象
        this.delay = delay || 0; //周期时间间隔(秒)
        this.curCount = 0; //当前已运行周期数
        this.totalCount = totalCount || 0; //总周期数，当已运行周期数等于此值时，则停止计时器；默认为0，永不停止，除非手动调用stop()方法
        this.running = false;
    };

    base.inherit(base.Timer, base.Dispatcher, {
        start: function() {
            if (this.timer === -1 && this.delay > 0) {
                var _ = this;
                this.timer = setInterval(function() {
                    _.curCount++;
                    _.trigger('timer', null, _);
                    if (_.totalCount > 0 && _.curCount === _.totalCount) {
                        _.stop();
                        _.trigger('complete', null, _);
                    }
                }, this.delay * 1000);
                this.running = true;
                this.trigger('start', null, this);
            }
        },

        stop: function() {
            if (this.timer != -1) {
                clearInterval(this.timer);
                this.timer = -1;
                this.curCount = 0;
                this.totalCount = 0;
                this.running = false;
                this.trigger('stop', null, this);
            }
        },

        reset: function() {
            if (this.timer != -1) {
                this.curCount = 0;
                this.running = false;
                this.trigger('reset', null, this);
            }
        }
    });

    ///数据类型
    var dataType = {
        JSON: 'json',
        XML: 'xml',
        HTML: 'html',
        TXT: 'txt',
        BINARY: 'binary',
        BASE64: 'base64'
    };

    ///内容类型
    var contentType = {
        FORM: 'application/x-www-form-urlencoded',
        JSON: 'application/json',
        JS: 'application/x-javascript',
        XML: 'text/xml',
        HTML: 'text/html',
        TXT: 'text/plain',
        BINARY: 'application/octet-stream'
    };

    ///数据请求错误代码
    var errorCode = {
        ///io错误，比如网络不通、致命错误等
        IO_ERROR: 0,
        ///URL地址错误，比如为空或非法
        URL_ERROR: 1,
        ///未找到，请求的数据文件不存在
        NOT_FOUND: 2,
        ///请求超时错误
        TIME_OUT: 3,
        ///数据解析错误
        PARSE_ERROR: 4
    };

    base.dataType = dataType;
    base.contentType = contentType;
    base.errorCode = errorCode;

    ///Ajax请求参数的全局设置，将会影响到所有的Ajax请求；当调用My.ajax()方法时，若有请求参数未被指定，则将会使用此全局设置中的请求参数
    base.ajaxSettings = {
        ///是否是JSONP请求，默认不是(false)
        jsonp: false,
        ///JSONP回调函数名称，服务器接收，默认为'callback'，此参数只对JSONP请求有效
        callback: 'callback',
        ///是异步还是同步请求，默认异步(true)
        async: true,
        ///请求方式：GET/POST，默认GET，大小写都可以
        method: 'GET',
        ///远程请求返回的数据格式类型，默认为json，其他可以是xml、html、文本、二进制字节流等，可以调用dataType对象中列举的任一种
        dataType: 'json',
        ///本次请求的数据内容类型，默认为表单内容，其他可以是contentType对象中列举的任一种
        contentType: contentType.FORM,
        ///是否对远程请求返回的数据进行解析，默认解析数据(true)
        parse: true,
        ///是否缓存请求结果，默认不缓存(false)
        cache: false,
        ///超时时长(秒)：默认0，不做超时处理
        timeout: 0,
        ///请求头部信息内容，若是JSONP请求，此参数无效；内容是键值对，如{"Content-type":"text/html","Cache-Control":"no-cache"}，键名必须用引号括起来
        header: null
    }

    ///数据加载器
    base.Loader = function(url, opts) {
        if (!(this instanceof base.Loader))
            return new base.Loader(url, opts);

        base.Dispatcher.call(this);
        opts = opts || {};
        this.url = url;
        this.async = opts.async === undefined && base.ajaxSettings.async || opts.async;
        this.method = (opts.method || base.ajaxSettings.method).toUpperCase();
        this.params = opts.params; //发送到服务器的参数：键值对，仅POST有用，若是GET，设置此属性无效
        this.dataType = opts.dataType || base.ajaxSettings.dataType;
        this.contentType = opts.contentType || base.ajaxSettings.contentType;
        this.parse = opts.parse === undefined && base.ajaxSettings.parse || opts.parse;
        this.cache = opts.cache === undefined && base.ajaxSettings.cache || opts.cache;
        this.timeout = opts.timeout === undefined && base.ajaxSettings.timeout || opts.timeout;
        this.data = null; //数据内容，当服务器响应后，此属性被赋值为该响应内容，数据类型与dataType有关
        this.header = null;
        this.timeoutWatcher = null;
        this.requester = new XMLHttpRequest();
    }

    base.inherit(base.Loader, base.Dispatcher, {
        ///发送请求之前唯一的机会来设置头部信息
        beforeSend: function(header) {
            mobject.isPlainObject(header) && (this.header = header);
        },

        send: function(url) {
            mstring.isEmpty(url) || (this.url = url);

            if (mstring.isEmpty(this.url)) { //url为空或非法，触发错误事件，错误类型为url错
                this.trigger('fail', {
                    code: errorCode.URL_ERROR,
                    message: 'url error'
                }, this);
                return;
            }

            var that = this;
            this.requester.onreadystatechange = function() { //加载过程监听
                setLoaderResult(that);
            };

            if (this.timeout > 0) { //超时处理
                this.timeoutWatcher = setTimeout(function() {
                    setLoaderTimeout(that);
                }, this.timeout * 1000);
            };

            initializeLoader(this);
            this.requester.send(this.method === 'POST' && (mobject.isPlainObject(this.params) && murl.joinURL(this.params, '&', true) || this.params || ''));
        },

        abort: function() {
            if (this.timeoutWatcher) {
                clearTimeout(this.timeoutWatcher);
                this.timeoutWatcher = null;
            }
            this.requester.abort();
            this.data = null;
            this.trigger('destroy', null, this);
        }
    });

    function initializeLoader(loader) {
        loader.cache || loader.method !== 'GET' || (loader.url += (loader.url.indexOf('?') > -1 ? '&' : '?') + '_=' + base.now()); //在尾部加上日期毫秒数,保证不取缓存
        loader.requester.open(loader.method.toUpperCase(), loader.url, loader.async);
        loader.header && mobject.each(loader.header, function(v, k) {
            loader.requester.setRequestHeader(k, v);
        });
        loader.requester.setRequestHeader('Content-type', loader.contentType); //设置请求的数据类型头部
        loader.cache || loader.requester.setRequestHeader('Cache-Control', 'no-cache'); //设置是否缓存头部
    }

    function setLoaderResult(loader) {
        loader.timeout && clearTimeout(loader.timeoutWatcher);

        if (loader.requester.readyState === 4) {
            if (loader.requester.status === 200) { //ok
                var d = loader.requester.responseText;
                if (loader.parse) {
                    try {
                        d = parseLoaderData(loader.dataType, d, loader.requester.responseXML);
                    } catch (e) {
                        loader.trigger('fail', {
                            code: errorCode.PARSE_ERROR,
                            message: 'JSON parse error'
                        }, loader);
                        return;
                    }
                }
                loader.data = d;
                loader.trigger('success', null, loader);
            } else if (loader.requester.status === 404) { //not found
                loader.trigger('fail', {
                    code: errorCode.NOT_FOUND,
                    message: '404,Not Found'
                }, loader);
            } else { //未知错误
                loader.trigger('fail', {
                    code: errorCode.IO_ERROR,
                    message: 'unknow error'
                }, loader);
            }
        }
    }

    function parseLoaderData(type, text, xml) {
        return {
            json: JSON.parse(text),
            xml: xml
        }[type] || text;
    }

    function setLoaderTimeout(loader) {
        loader.abort();
        loader.trigger('timeout', {
            code: errorCode.TIME_OUT,
            message: 'time out error'
        }, loader);
    }

    ///XSS--跨域脚本请求累计请求的次数
    var xssHttpRequestCount = 0,

        ///xss请求回调函数集合
        callbacks = {};

    ///JSONP加载器，跨域脚本请求
    base.JSONPer = function(url, opts) {
        if (!(this instanceof base.JSONPer))
            return new base.JSONPer(url, opts);

        base.Dispatcher.call(this);
        opts = opts || {};
        this.url = '';
        this.async = opts.async === undefined ? base.ajaxSettings.async : opts.async;
        this.dataType = opts.dataType || base.ajaxSettings.dataType;
        this.parse = opts.parse === undefined ? base.ajaxSettings.parse : opts.parse;
        this.cache = opts.cache === undefined ? base.ajaxSettings.cache : opts.cache;
        this.timeout = opts.timeout === undefined ? base.ajaxSettings.timeout : opts.timeout;
        this.callback = opts.callback || base.ajaxSettings.callback;
        this.requestID = '';
        this.callbackName = '';
        this.data = null; //数据内容，当服务器响应后，此属性被赋值为该响应内容，数据类型与dataType有关
        this.requester = null; //请求器，脚本元素
        this.timeoutWatcher = null; //超时计时器
    }

    base.inherit(base.JSONPer, base.Dispatcher, {
        send: function(url) {
            mstring.isEmpty(url) || (this.url = url);

            if (mstring.isEmpty(this.url)) { //url为空或非法，触发错误事件，错误类型为url错
                this.trigger('fail', {
                    code: errorCode.URL_ERROR,
                    message: 'url error'
                }, this);
                return;
            }

            this.requestID = this.callback + '_' + (++xssHttpRequestCount); //本次请求id，以区分不同的请求
            this.callbackName = this.requestID + '_callback'; //本次请求服务器返回的js函数名
            this.url += (this.url.indexOf('?') === -1 ? '?' : '&') + this.callback + '=' + this.callbackName; //请求路径

            this.cache || this.method !== 'GET' || (this.url += '&_=' + base.now()); //在尾部加上日期毫秒数,保证不取缓存

            this.requester = document.createElement('script'); //创建脚本元素
            this.requester.setAttribute('id', this.requestID);
            this.requester.setAttribute('type', 'text/javascript');
            this.async && this.requester.setAttribute('async', 'async'); //规定脚本将被异步执行

            var that = this;
            //请求成功完毕，服务器返回的js函数，参数中就包含了请求所得到的数据内容
            callbacks[this.callbackName] = function(data) {
                setXssResult(that, data);
            }

            this.requester.onerror = function() { //错误
                setXssError(that);
            }

            if (this.timeout > 0) {
                //超时计时器
                this.timeoutWatcher = setTimeout(function() {
                    setXssTimeout(that);
                }, this.timeout * 1000);
            }
            this.requester.setAttribute('src', this.url); //设置路径，开始读取脚本文件，此后服务器会返回一个js函数
            document.getElementsByTagName('head')[0].appendChild(this.requester); //脚本元素添加到head元素中
        },

        abort: function(successed) {
            clearTimeout(this.timeoutWatcher);
            this.timeoutWatcher = 0;
            this.requester.parentNode.removeChild(this.requester);
            this.requester = null;
            delete callbacks[this.callbackName];
            this.callbackName = '';
            successed || this.trigger('destroy', null, this);
        }
    });

    function setXssResult(xss, data) {
        if (xss.parse) {
            try {
                data = parseXssData(xss.dataType, data);
            } catch (e) {
                xss.abort();
                xss.trigger('fail', {
                    code: errorCode.PARSE_ERROR,
                    message: 'JSON parse error'
                }, xss);
                return;
            }
        }
        xss.data = d;
        xss.trigger('success', null, xss);
        xss.abort(true);
    }

    function parseXssData(type, data) {
        return {
            json: JSON.parse(data),
            xml: base.parseXML(data)
        }[type] || data;
    }

    function setXssError(xss) {
        xss.abort();
        xss.trigger('fail', {
            code: errorCode.IO_ERROR,
            message: 'unknow error'
        }, xss);
    }

    function setXssTimeout(xss) {
        xss.abort();
        xss.trigger('timeout', {
            code: errorCode.TIME_OUT,
            message: 'time out error'
        }, xss);
    }

    function loadScript(url, callback) {
        M('head').append(base.create('script').attr({
            type: 'text/javascript',
            src: url
        }).load(function() {
            callback && callback.call(this);
            My(this).release();
        }).error(function() {
            callback && callback.call(this, 'This script file is loaded error!');
            My(this).release();
        }));
    }

    function loadCSS(url, callback) {
        M('head').append(base.create('link').attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: url
        }).load(function() {
            callback && callback.call(this);
            My(this).release();
        }).error(function() {
            callback && callback.call(this, 'This css file is loaded error!');
            My(this).release();
        }));
    }

    ///cookie对象的一些操作方法
    var mcookie = {
        cookie: function(name, value, expires, path, domain, secure) {
            if (value === undefined) { //检索
                var cookieName = encodeURIComponent(name) + '=',
                    cookieStart = document.cookie.indexOf(cookieName),
                    cookieValue = null;

                if (cookieStart > -1) {
                    var cookieEnd = document.cookie.indexOf(';', cookieStart);
                    cookieEnd === -1 && (cookieEnd = document.cookie.length);
                    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
                }
                return cookieValue;
            } else { //设置
                var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
                expires instanceof Date && (cookieText += ';expires=' + expires.toGMTString());
                path && (cookieText += ';path=' + path);
                domain && (cookieText += ';domain=' + domain);
                secure && (cookieText += ';secure');
                document.cookie = cookieText;
            }
        },

        removeCookie: function(name, path, domain, secure) {
            this.cookie(name, '', new Date(0), path, domain, secure);
        }
    };

    base.extend(base, mcookie);

    ///取得指定元素的上一个兄弟节点，兼容浏览器：排除TEXT节点
    function getPreviousSibling(e) {
        do {
            e = e.previousSibling;
        } while (e && !base.isDomElement(e))
        return e;
    }

    ///取得指定元素的下一个兄弟节点，兼容浏览器：排除TEXT节点
    function getNextSibling(e) {
        do {
            e = e.nextSibling;
        } while (e && !base.isDomElement(e))
        return e;
    }

    ///给值加上像素单位，当值为数值或无单位的字符串时
    function addPxUnit(value) {
        if (mnumber.isNumber(value) || (mstring.isString(value) && parseFloat(value).toString() !== value))
            return value + 'px';
        return value;
    }

    ///元素集合，逐一插入_M_的实例，维护length属性
    function insertElements(eles, m) {
        marray.each(eles, function(v) {
            m[m.length++] = v;
        });
    }

    ///一个对DOM进行操作的类，敲入My().能够访问的接口集合
    function _M_(s, p) {
        if (mfn.isFunction(s)) { //当参数是一个函数，表示监听load事件(文档加载完成)
            registerLoad(s);
            return this;
        }

        if (base.isMy(s))
            return s;

        this[0] = null; //DOM树，存储每一个匹配的DOM元素，如[0]、[1]、[2]等
        this.length = 0; //DOM元素个数

        if (s) {
            if (base.isDomElement(s) || s === document || s === window) {
                this[0] = s;
                this.length = 1;
            } else if (mstring.isString(s)) {
                insertElements(base.query(s, p), this);
            } else if (marray.isArray(s) || marray.isArrayLike(s)) {
                insertElements(s, this);
            }
        }
        return this;
    }

    ///_M_类原型，便以对DOM元素的操作，支持链式调用(一些取值器方法和逻辑判断方法除外)
    base._ = _M_.prototype = {
        each: function(fn, arg) {
            if (mfn.isFunction(fn)) {
                var i = 0,
                    l = this.length,
                    o, v;
                for (; i < l; i++) {
                    o = this[i];
                    if (o) {
                        v = fn.call(o, i, arg);
                        if (v === false)
                            break;
                    }
                }
            }
            return this;
        },

        reach: function(fn, arg) {
            if (mfn.isFunction(fn)) {
                var i = this.length,
                    o, v;
                for (; i >= 0; i--) {
                    o = this[i];
                    if (o) {
                        v = fn.call(o, i, arg);
                        if (v === false)
                            break;
                    }
                }
            }
            return this;
        },

        ///检索所有元素
        elements: function() {
            return marray.map(this, function(v) {
                return v;
            });
        },

        ///添加新元素到DOM元素集合中
        add: function(selector) {
            if (selector) {
                var isS = mstring.isString(selector),
                    isM = !isS && base.isMy(selector),
                    isE = !isM && base.isDomElement(selector),
                    e = isS && base.query(selector) || (isE && [selector]) || (isM && selector);
                e && insertElements(e, this);
            }
            return this;
        },

        ///检索指定元素在DOM元素集合中的索引位置
        index: function(selector) {
            var index = -1;
            if (selector) {
                mstring.isString(selector) && (selector = base.query(selector)[0]);
                this.each(function(i) {
                    if (this === selector) {
                        index = i;
                        return false;
                    }
                });
            }
            return index;
        },

        ///获取指定索引位置的元素
        get: function(index) {
            return (index >= 0 && index < this.length) && this[index] || null;
        },

        first: function() {
            return new _M_(this[0]);
        },

        last: function() {
            return new _M_(this[this.length - 1]);
        },

        nth: function(eq) {
            return new _M_(this.get(eq - 1)); //start from index 1
        },

        ///判断DOM元素集合中是否包含目标元素
        has: function(target) {
            return this.index(target) > -1;
        },

        ///过滤出来指定的元素
        filter: function(selector) {
            var cc = [];
            if (selector) {
                var isS = mstring.isString(selector),
                    isM = !isS && base.isMy(selector),
                    isE = !isE && base.isDomElement(selector);

                if (isS || isM || isE) {
                    this.each(function() {
                        if (isS) {
                            marray.each.call(this, base.query(selector, this.parentNode), function(v) {
                                if (v === this) {
                                    cc.push(this);
                                    return false;
                                }
                            });
                            return;
                        }

                        if (isM) {
                            selector.has(this) && cc.push(this);
                            return;
                        }

                        this === selector && cc.push(this);
                    });
                }
            }
            return new _M_(cc);
        },

        ///搜寻指定的节点。此方法会往下遍寻每个元素的整棵DOM树，直到DOM树的最深节点为止
        find: function(selector) {
            var cc = [];
            if (selector) {
                var isS = mstring.isString(selector),
                    isM = !isS && base.isMy(selector),
                    isE = !isM && base.isDomElement(selector);

                if (isS || isM || isE) {
                    this.each(function() {
                        var childs, k, c, l;
                        if (isS) {
                            marray.each(base.query(selector, this), function(c) {
                                cc.push(c);
                            });
                            return;
                        }

                        if (isM) {
                            marray.each(base.query('*', this), function(c) {
                                selector.has(c) && cc.push(c);
                            });
                            return;
                        }

                        marray.each(base.query('*', this), function(c) {
                            c === selector && cc.push(c);
                        });
                    });
                }
            }
            return new _M_(cc);
        },

        ///检索DOM各元素的所有直接子节点集合，此方法不会往下遍寻元素的整棵DOM树
        children: function(selector) {
            var cc = [];
            this.each(function() {
                var childs = this.children || this.childNodes || [];

                if (selector) {
                    var ps = base.query(selector, this),
                        a = function(c) {
                            marray.each(ps, function(v) {
                                if (v === c) {
                                    cc.push(c);
                                    return false;
                                }
                            });
                            return true;
                        };
                }

                marray.each(childs, function(c) {
                    c.tagName && (selector && a(c) || cc.push(c));
                });
            });
            return new _M_(cc);
        },

        ///检索父节点，只会检索第一个匹配结果
        parent: function() {
            var e = this[0];
            return new _M_(e && e.parentNode);
        },

        ///检索DOM各元素或指定元素的父节点
        parents: function(selector) {
            var cc = [];
            this.each(function() {
                var f = new _M_(this).parent();
                selector && (f = f.filter(selector));
                marray.contains(cc, f[0]) || cc.push(f[0]);
            });
            return new _M_(cc);
        },

        ///将目标元素插入到DOM各元素子节点的头部，作为各元素的第一个子节点
        prepend: function(target) {
            if (target) {
                base.isDomElement(target) && (target = My(target));
                if (base.isMy(target)) {
                    this.each(function(i) {
                        var $ = i && target.clone(true) || target,
                            _ = this;
                        $.reach(function() {
                            _.insertBefore(this, _.firstChild);
                        });
                    });
                }
            }
            return this;
        },

        ///将本My对象中的所有元素按顺序插入到目标元素的头部，此方法与prepend方法刚好是反过来的关系
        prependTo: function(target) {
            if (target) {
                base.isDomElement(target) && (target = My(target));

                var cc = [];
                if (base.isMy(target)) {
                    var that = this;
                    target.each(function(i) {
                        var $ = i && that.clone(true) || that,
                            _ = this;
                        $.each(function() {
                            _.insertBefore(this, _.firstChild);
                            cc.push(this);
                        });
                    });
                }
            }
            return new _M_(cc);
        },

        ///将目标元素插入到DOM各元素子节点的尾部，作为各元素的最后一个子节点
        append: function(target) {
            if (target) {
                base.isDomElement(target) && (target = My(target));
                if (base.isMy(target)) {
                    this.each(function(i) {
                        var $ = i && target.clone(true) || target,
                            _ = this;
                        $.reach(function() {
                            _.appendChild(this);
                        });
                    });
                }
            }
            return this;
        },

        ///将本My对象中的所有元素按顺序插入到目标元素的尾部，此方法与append方法刚好是反过来的关系
        appendTo: function(target) {
            if (target) {
                base.isDomElement(target) && (target = My(target));
                var cc = [];
                if (base.isMy(target)) {
                    var that = this;
                    target.each(function(i) {
                        var $ = i && that.clone(true) || that,
                            _ = this;
                        $.each(function() {
                            _.appendChild(this);
                            cc.push(this);
                        });
                    });
                }
            }
            return new _M_(cc);
        },

        ///将目标元素插入到各元素的前面
        before: function(target) {
            if (target) {
                base.isDomElement(target) && (target = My(target));
                if (base.isMy(target)) {
                    this.each(function(i) {
                        var $ = i && target.clone(true) || target,
                            _ = this;
                        $.reach(function() {
                            _.parentNode.insertBefore(this, _);
                        });
                    });
                }
            }
            return this;
        },

        ///将目标元素插入到各元素的后面
        after: function(target) {
            if (target) {
                base.isDomElement(target) && (target = My(target));
                if (base.isMy(target)) {
                    this.each(function(i) {
                        var $ = i && target.clone(true) || target,
                            _ = this;
                        $.reach(function() {
                            _.parentNode.insertBefore(this, _.nextSibling);
                        });
                    });
                }
            }
            return this;
        },

        ///对DOM中各元素执行替换操作，替换为指定的目标元素
        replace: function(target) {
            var cc = [];
            if (target) {
                mstring.isString(target) && (target = base.parseHTML(target));
                base.isDomElement(target) && (target = My(target));
                if (base.isMy(target)) {
                    this.each(function(i) {
                        var $ = i && target.clone(true) || target,
                            _ = this,
                            p = this.parentNode;
                        p && $.reach(function() {
                            var f = p.replaceChild(this, _);
                            f && (cc.push(f));
                        });
                    });
                }
            }
            return new _M_(cc);
        },

        ///对DOM中各元素执行删除操作
        remove: function(selector) {
            var cc = [];
            this.each(function() {
                var p = this.parentNode;
                if (p) {
                    var f;
                    if (!selector) {
                        f = p.removeChild(this);
                        f && cc.push(f);
                    } else {
                        var $ = new _M_(p).children(selector);
                        if ($.has(this)) {
                            f = p.removeChild(this);
                            f && cc.push(f);
                        }
                    }
                }
            });
            return new _M_(cc);
        },

        prev: function(selector) {
            var cc = [];
            this.each(function() {
                if (!selector) {
                    var p = getPreviousSibling(this);
                    p && cc.push(p);
                    return false;
                }

                var $ = new _M_(this.parentNode).children(selector);
                if ($.length) {
                    var p = this;
                    do {
                        p = getPreviousSibling(p);
                    } while (p && !$.has(p));
                    p && cc.push(p);
                }
            });
            return new _M_(cc);
        },

        prevAll: function(selector) {
            var cc = [];
            this.each(function() {
                if (!selector) {
                    var p = this;
                    do {
                        p = getPreviousSibling(p);
                        p && cc.indexOf(p) === -1 && cc.push(p);
                    } while (p);
                    return false;
                }

                var $ = new _M_(this.parentNode).children(selector); //因为所有兄弟节点都拥有共同的父节点，所以只需取得一次就可以了
                if ($.length) {
                    var p = this;
                    do {
                        p = getPreviousSibling(p);
                        p && $.has(p) && cc.indexOf(p) === -1 && cc.push(p);
                    } while (p);
                }
            });
            return new _M_(cc);
        },

        next: function(selector) {
            var cc = [];
            this.each(function() {
                if (!selector) {
                    var n = getNextSibling(this);
                    n && cc.push(n);
                    return false;
                }

                var $ = new _M_(this.parentNode).children(selector);
                if ($.length) {
                    var n = this;
                    do {
                        n = getNextSibling(n);
                    } while (n && !$.has(n));
                    n && cc.push(n);
                }
            });
            return new _M_(cc);
        },

        nextAll: function(selector) {
            var cc = [];
            this.each(function() {
                if (!selector) {
                    var n = this;
                    do {
                        n = getNextSibling(n);
                        n && cc.indexOf(n) === -1 && cc.push(n);
                    } while (n);
                    return false;
                }

                var $ = new _M_(this.parentNode).children(selector); //因为所有兄弟节点都拥有共同的父节点，所以只需取得一次就可以了
                if ($.length) {
                    var n = this;
                    do {
                        n = getNextSibling(n);
                        n && $.has(n) && cc.indexOf(n) === -1 && cc.push(n);
                    } while (n);
                }
            });
            return new _M_(cc);
        },

        clone: function(isdepth) {
            var cc = [];
            base.isDefined(isdepth) || (isdepth = false);
            this.each(function() {
                cc.push(this.cloneNode(isdepth));
            });
            return new _M_(cc);
        },

        ///innerHTML
        html: function(h) {
            if (h === undefined) {
                var e = this[0];
                return e && e.innerHTML || '';
            }

            h instanceof base.Template && (h = h.execute());
            this.each(function() {
                base.isDefined(this.innerHTML) && (this.innerHTML = h);
            });
            return this;
        },

        ///outerHTML
        ohtml: function(h) {
            if (h === undefined) {
                var e = this[0];
                return e && e.outerHTML || '';
            }

            h instanceof base.Template && (h = h.execute());
            this.replace(h);
            return this;
        },

        text: function(txt) {
            if (txt === undefined) { //检索
                var e = this[0];
                return e && e.textContent || '';
            }

            this.each(function() {
                base.isDefined(this.textContent) && (this.textContent = txt);
            });
            return this;
        },

        /*
         *设置或检索DOM表单元素(input/textarea/select等)的value值
         *若select=multiple(多选列表)，返回的将是多个选择值的数组，若无选择项，返回长度为0的空数组
         *参数：设置给表单元素的value值，可以是一个value值数组，表示对radio/checkbox/select=multiple这样的元素设置选中与否、选中项
         */
        val: function(v) {
            var es = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
            if (v === undefined) { //检索
                var e = this[0];
                if (e && es.indexOf(e.tagName) != -1) { //是表单元素
                    if (e.tagName === es[2] && e.multiple) { //多选列表
                        var r = [];
                        for (var k = 0, l = e.length, opt; k < l; k++) {
                            opt = e.options[k];
                            opt.selected && r.push(opt.text);
                        }
                        return r;
                    }
                    return e.value;
                }
                return;
            }

            var cc = [];
            this.each(function() {
                if (es.indexOf(this.tagName) != -1) {
                    if (marray.isArray(v)) { //是一组
                        if (this.tagName = es[0] && (this.type === 'radio' || this.type === 'checkbox')) { //单选框或复选框
                            this.checked = v.indexOf(this.value) > -1;
                        } else if (this.tagName === es[2] && this.multiple) { //多选列表
                            for (var j = 0, l = this.length, opt; j < l; j++) {
                                opt = this.options[j];
                                opt.selected = v.indexOf(opt.text) > -1;
                            }
                        } else this.value = v[0];
                    } else this.value = v;
                    cc.push(this);
                }
            });
            return new _M_(cc);
        },

        /*
         *设置或检索DOM元素的属性值
         *此方法有修正checked/selected/disabled/required/readonly这样的属性，不论设置true或checked/selected/disabled/enabled/required/readonly都可以生效，false或''同理，当是检索行为，只会返回true或false
         */
        attr: function(name, value) {
            var isp = mobject.isPlainObject(name),
                isPro = ['checked', 'selected', 'disabled', 'enabled', 'required', 'readonly'].indexOf(name) > -1;

            if (base.isUndefined(value) && !isp) {
                var e = this[0];
                if (e) {
                    fn = function(name) {
                        return isPro ? (name === 'enabled' ? !e['disabled'] : e[name]) : e.getAttribute(name)
                    }

                    if (mstring.isString(name))
                        return fn(name);

                    if (marray.isArray(name)) {
                        return marray.map(name, function(n) {
                            return fn(n);
                        });
                    }
                }
                return;
            }

            var ns = name;
            isp || (ns = {}, ns[name] = value);
            mobject.each.call(this, ns, function(v, n) {
                this.each(function() {
                    if (isPro) {
                        if (typeof v === 'boolean' || v === n || v === '') {
                            if (n === 'enabled') {
                                n = 'disabled';
                                v = !v;
                            }
                            v ? this.setAttribute(n, n) : this.removeAttribute(n);
                        }
                        return;
                    }
                    this.setAttribute(n, v);
                })
            });
            return this;
        },

        removeAttr: function(name) {
            mstring.isString(name) && (name = [name]);
            marray.each.call(this, name, function(n) {
                this.each(function() {
                    this.removeAttribute(n);
                });
            });
            return this;
        },

        data: function(name, value) {
            var isp = mobject.isPlainObject(name);

            if (base.isUndefined(value) && !isp) {
                var e = this[0];
                if (e) {
                    if (mstring.isString(name))
                        return e.dataset[name];

                    if (marray.isArray(name)) {
                        return marray.map(name, function(n) {
                            return e.dataset[n];
                        });
                    }
                }
                return;
            }

            var ns = name;
            isp || (ns = {}, ns[name] = value);
            mobject.each.call(this, ns, function(v, n) {
                this.each(function() {
                    this.dataset[n] = v;
                })
            });
            return this;
        },

        removeData: function(name) {
            if (base.isEmpty(name)) {
                this.each(function() {
                    for (var k in this.dataset) this.removeAttribute('data-' + k);
                });
                return this;
            }

            mstring.isString(name) && (name = [name]);
            marray.each.call(this, name, function(n) {
                this.removeAttr('data-' + n);
            });
            return this;
        },

        ///设置或检索DOM元素的宽度(是内容区域宽度，不包括左右内外边距、左右边框)
        ///参数：可以是数值(被当作是像素单位)也可以是字符串(如在css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
        width: function(w) {
            if (w === undefined) {
                var $ = this.first(),
                    e = $[0];
                if (e) {
                    if (e === window || e === document)
                        return window.innerWidth || document.documentElement.clientWidth;

                    var ww = e.offsetWidth; //此高度是内容区域宽度+左右内边距+左右边框

                    //减去左右内边距
                    ww -= Math.round(parseFloat($.style('padding-left'))) || 0;
                    ww -= Math.round(parseFloat($.style('padding-right'))) || 0;
                    //减去左右边框
                    ww -= Math.round(parseFloat($.style('border-left-width'))) || 0;
                    ww -= Math.round(parseFloat($.style('border-right-width'))) || 0;

                    var box = $.style('box-sizing');
                    if (box === 'border-box') { //边框盒子，减掉左右外边距
                        ww -= Math.round(parseFloat($.style('margin-left'))) || 0;
                        ww -= Math.round(parseFloat($.style('margin-right'))) || 0;
                    }
                    return ww > 0 ? ww : 0;
                }
                return;
            }

            var rw = addPxUnit(w);
            rw && this.style('width', rw);
            return this;
        },

        height: function(h) {
            if (h === undefined) {
                var $ = this.first(),
                    e = this[0];
                if (e) {
                    if (e === window || e === document)
                        return window.innerHeight || document.documentElement.clientHeight;

                    var hh = e.offsetHeight; //此高度是内容区域高度+上下内边距+上下边框

                    //减去上下内边距
                    hh -= Math.round(parseFloat($.style('padding-top'))) || 0;
                    hh -= Math.round(parseFloat($.style('padding-bottom'))) || 0;
                    //减去上下边框
                    hh -= Math.round(parseFloat($.style('border-top-width'))) || 0;
                    hh -= Math.round(parseFloat($.style('border-bottom-width'))) || 0;

                    var box = this.style('box-sizing');
                    if (box === 'border-box') { //边框盒子，减掉上下外边距
                        hh -= Math.round(parseFloat($.style('margin-top'))) || 0;
                        hh -= Math.round(parseFloat($.style('margin-bottom'))) || 0;
                    }
                    return hh > 0 ? hh : 0;
                }
                return;
            }

            var rh = addPxUnit(h);
            rh && this.style(' height', rh);
            return this;
        },

        ///设置或检索DOM元素的大小(即width和height)
        size: function(s) {
            if (s === undefined) {
                return {
                    width: this.width(),
                    height: this.height()
                };
            }

            this.width(s.width);
            this.height(s.height);
            return this;
        },

        ///检索DOM元素的内宽度(内容区域宽度+左右内边距)，不包括左右外边距和左右边框
        innerWidth: function() {
            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerWidth || document.documentElement.clientWidth;

                var ww = e.offsetWidth; //此高度是内容区域宽度+左右内边距+左右边框
                var box = $.style('box-sizing');

                if (box === 'border-box') { //边框盒子，减掉左右外边距
                    ww -= Math.round(parseFloat($.style('margin-left'))) || 0;
                    ww -= Math.round(parseFloat($.style('margin-right'))) || 0;
                }
                //减掉左右边框
                ww -= Math.round(parseFloat($.style('border-left-width'))) || 0;
                ww -= Math.round(parseFloat($.style('border-right-width'))) || 0;
                return ww > 0 ? ww : 0;
            }
        },

        innerHeight: function() {
            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerHeight || document.documentElement.clientHeight;

                var hh = e.offsetHeight; //此高度是内容区域高度+上下内边距+上下边框
                var box = this.style('box-sizing');

                if (box === 'border-box') { //边框盒子，减掉外上下边距
                    hh -= Math.round(parseFloat(this.style('margin-top'))) || 0;
                    hh -= Math.round(parseFloat(this.style('margin-bottom'))) || 0;
                }
                //减掉上下边框
                hh -= Math.round(parseFloat($.style('border-top-width'))) || 0;
                hh -= Math.round(parseFloat($.style('border-bottom-width'))) || 0;
                return hh > 0 ? hh : 0;
            }
        },

        ///检索DOM元素的宽度(内容区域宽度+左右内边距+左右边框)
        offsetWidth: function() {
            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerWidth || document.documentElement.clientWidth;

                var ww = e.offsetWidth; //此高度是内容区域宽度+左右内边距+左右边框
                var box = $.style('box-sizing');

                if (box === 'border-box') { //边框盒子，减掉左右外边距，保留左右边框
                    ww -= Math.round(parseFloat($.style('margin-left'))) || 0;
                    ww -= Math.round(parseFloat($.style('margin-right'))) || 0;
                }
                return ww > 0 ? ww : 0;
            }
        },

        offsetHeight: function() {
            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerHeight || document.documentElement.clientHeight;

                var hh = e.offsetHeight; //此高度是内容区域高度+上下内边距+上下边框
                var box = this.style('box-sizing');

                if (box === 'border-box') { //边框盒子，减掉上下外边距，保留上下边框
                    ww -= Math.round(parseFloat($.style('margin-top'))) || 0;
                    ww -= Math.round(parseFloat($.style('margin-bottom'))) || 0;
                }
                return hh > 0 ? hh : 0;
            }
        },

        ///检索DOM元素的外宽度(内容区域宽度+左右内边距+左右边框+左右外边距)
        outerWidth: function() {
            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerWidth || document.documentElement.clientWidth;

                var ww = e.offsetWidth; //此高度是内容区域宽度+左右内边距+左右边框
                var box = $.style('box-sizing');

                if (box != 'border-box') { //非边框盒子，加上左右外边距
                    ww += Math.round(parseFloat($.style('margin-left'))) || 0;
                    ww += Math.round(parseFloat($.style('margin-right'))) || 0;
                }
                return ww > 0 ? ww : 0;
            }
        },

        outerHeight: function() {
            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerHeight || document.documentElement.clientHeight;

                var hh = e.offsetHeight; //此高度是内容区域高度+上下内边距+上下边框
                var box = $.style('box-sizing');

                if (box != 'border-box') { //非边框盒子，加上上下外边距
                    hh += Math.round(parseFloat($.style('margin-top'))) || 0;
                    hh += Math.round(parseFloat($.style('margin-bottom'))) || 0;
                }
                return hh > 0 ? hh : 0;
            }
        },

        ///检索DOM元素的最近动态定位包含元素，如通过relative/absoute/fixed等设置position的，所有的偏移量都根据该元素来决定
        offsetParent: function() {
            var e = this[0];
            return new _M_(e && e.offsetParent);
        },

        /*
         *设置或检索DOM元素的左边界到它的offsetParent左边界的偏移量(相对定位)
         *当有参数时，表示为各元素设置左边界偏移量(若元素position是static，则会自动更改为relative)，否则是获取第一个元素的左边界偏移量
         *参数：左边界偏移量，可以是数值(被当作是像素单位)也可以是字符串(如css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
         */
        offsetLeft: function(ol) {
            if (ol === undefined) {
                var e = this[0];
                return e && e.offsetLeft;
            }

            var rl = addPxUnit(ol);
            rl && this.each(function() {
                var $ = new _M_(this),
                    p = $.style('position');
                p === 'static' && $.style('position', 'relative');
                $.style('left', rl);
            });
            return this;
        },

        offsetTop: function(ot) {
            if (ot === undefined) {
                var e = this[0];
                return e && e.offsetTop;
            }

            var rt = addPxUnit(ot);
            rt && this.each(function() {
                var $ = new _M_(this),
                    p = $.style('position');
                p === 'static' && $.style('position', 'relative');
                $.style('top', rt);
            });
            return this;
        },

        ///设置或检索DOM元素的左/上偏移量(即offsetLeft和offsetTop)
        offset: function(o) {
            if (o === undefined) {
                return {
                    left: this.offsetLeft(),
                    top: this.offsetTop()
                }
            }

            this.offsetLeft(o.left);
            this.offsetTop(o.top);
            return this;
        },

        /*
         *设置或检索DOM元素的左顶点位置(绝对定位，相对于页面body)
         *当有参数时，为设置各元素的左顶点(若元素position是static，则会自动更改为absolute)，否则为获取第一个元素的左顶点
         *参数：左顶点值，可以是数值(被当作是像素单位)也可以是字符串(如css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
         */
        left: function(v) {
            if (v === undefined) {
                var e = this[0];
                if (e) {
                    var l = 0;
                    while (e.offsetParent) {
                        l += e.offsetLeft;
                        e = e.offsetParent;
                    }
                    return l;
                }
                return;
            }

            var rl = addPxUnit(v);
            rl && this.each(function() {
                var $ = new _M_(this),
                    p = $.style('position');
                p === 'static' && $.style('position', 'absolute');
                $.style('left', rl);
            });
            return this;
        },

        top: function(v) {
            if (v === undefined) {
                var e = this[0];
                if (e) {
                    var t = 0;
                    while (e.offsetParent) {
                        t += e.offsetTop;
                        e = e.offsetParent;
                    }
                    return t;
                }
                return;
            }

            var rt = addPxUnit(v);
            rt && this.each(function() {
                var $ = new _M_(this),
                    p = $.style('position');
                p === 'static' && $.style('position', 'absolute');
                $.style('top', rt);
            });
            return this;
        },

        ///设置或检索DOM元素的坐标位置(即left和top)
        position: function(pos) {
            if (pos === undefined) {
                return {
                    left: this.left(),
                    top: this.top()
                };
            }

            this.left(pos.left);
            this.top(pos.top);
            return this;
        },

        ///检索DOM元素包括滚动条的完整宽度
        ///当csss设置overflow/overflow-x=scroll/auto，在滚动条出现时，此值和width不同，包括了滚动条以下不可见部分的宽度，而width只是可见部分的宽度
        scrollWidth: function() {
            var e = this[0];
            return e && e.scrollWidth;
        },

        scrollHeight: function() {
            var e = this[0];
            return e && e.scrollHeight;
        },

        ///设置或检索DOM元素已经滚动的左边界像素
        ///只在元素有滚动条的时候才有用(如csss设置overflow/overflow-x=scroll/auto)
        scrollLeft: function(v) {
            if (v === undefined) {
                var e = this[0];
                return e && e.scrollLeft;
            }

            mnumber.isNumber(v) && this.each(function() {
                this.scrollLeft = v;
            });
            return this;
        },

        scrollTop: function(v) {
            if (v === undefined) {
                var e = this[0];
                return e && e.scrollTop;
            }

            mnumber.isNumber(v) && this.each(function() {
                this.scrollTop = v;
            });
            return this;
        },

        show: function() {
            this.each(function() {
                this.style.display = '';
            });
            return this;
        },

        hide: function() {
            this.each(function() {
                this.style.display = 'none';
            });
            return this;
        },

        toggle: function() {
            this.each(function() {
                this.style.display === 'none' ? this.style.display = '' : this.style.display = 'none';
            });
            return this;
        },

        ///返回元素的可见性(display或visibility状态)，只返回第一个元素
        getVisible: function() {
            var e = this[0];
            return e && (e.style.display !== '' && e.style.visibility !== 'hidden');
        },

        ///设置或检索DOM第一个元素的类样式
        ///当是设置，此方法将会覆盖元素先前指定的所有类样式
        ///参数：类样式名，可以是多个连续类名，用一个空格分隔，如'class1 class2'，或是一个数组
        cls: function(cls) {
            if (cls === undefined) return this[0] && this[0].className ? this[0].className.replace(/\s+/, ' ').split(' ') : [];

            marray.isArray(cls) && (cls = cls.join(' '));
            this.each(function() {
                this.className = cls;
            });
            return this;
        },

        ///添加类样式
        ///参数：类样式名，可以是多个连续类名，用一个空格分隔，如'class1 class2'，或是一个数组
        addClass: function(cls) {
            mstring.isString(cls) && (cls = cls.split(' '));
            this.each(function() {
                marray.each.call(this, cls, function(c) {
                    My(this).hasClass(c) || (this.className += (this.className ? ' ' : '') + c);
                });
            });
            return this;
        },

        ///删除类样式
        ///参数：类样式名，可以是多个连续类名，用一个空格分隔，如'class1 class2'，或是一个数组
        removeClass: function(cls) {
            if (base.isEmpty(cls)) {
                this.each(function() {
                    this.className = '';
                });
                return this;
            }

            mstring.isString(cls) && (cls = cls.split(' '));
            this.each(function() {
                var cs = this.className && this.className.replace(/\s+/, ' ').split(' ') || [];
                if (cs.length) {
                    marray.each(cls, function(c) {
                        var j = cs.indexOf(c);
                        j > -1 && cs.splice(j, 1);
                    });
                    this.className = cs.join(' ');
                }
            });
            return this;
        },

        ///设置类样式开关，若元素中有该类样式则删除，否则就添加
        ///类样式名，只能是一个类名，不能是连续的多类名
        toggleClass: function(cls) {
            return this.hasClass(cls) && this.removeClass(cls) || this.addClass(cls);
        },

        ///判断元素是否有指定的类样式
        ///类样式名，只能是一个类名，不能是连续的多类名
        hasClass: function(cls) {
            var r = false;
            this.each(function() {
                return marray.each(My(this).cls(), function(c) {
                    if (c === cls) {
                        r = true;
                        return false;
                    }
                    return true;
                });
            });
            return r;
        },

        /*
         *设置或检索DOM元素样式(设置在style属性上的样式)
         *样式名(font-size/fontSize形式都可)，可以是字符串，如color、backgroud等;也可以是一个数组，表示多个样式，[name1,name2,name3,...]
         *还可以是样式对，字面量{name:value,name:value}，表示是设置行为，此时将忽略第二个参数
         */
        style: function(name, value) {
            if (value === undefined && !mobject.isPlainObject(name)) {
                var e = this[0];
                if (e) {
                    function attrStyle(attr) {
                        if (e.style[attr])
                            return e.style[attr];
                        if (e.currentStyle)
                            return e.currentStyle[attr];
                        if (document.defaultView && document.defaultView.getComputedStyle)
                            return document.defaultView.getComputedStyle(e, null).getPropertyValue(mstring.joinCase(attr));
                        return null;
                    }

                    if (marray.isArray(name)) {
                        return marray.map(name, function(v) {
                            v = attrStyle(mstring.camelCase(v));
                            return v === 'auto' ? '' : v;
                        });
                    }
                    var v2 = attrStyle(mstring.camelCase(name));
                    return v2 === 'auto' ? '' : v2;
                }
                return;
            }

            var ts = '';
            mstring.isString(name) && (ts = mstring.joinCase(name) + ':' + value); //wordWord先转成word-word

            if (marray.isArray(name) && marray.isArray(value)) {
                ts = marray.map(name, function(n, i) {
                    return mstring.joinCase(n) + ':' + value[i];
                }).join(';');
            }

            if (mobject.isPlainObject(name)) {
                ts = mobject.map(name, function(n, k) {
                    return mstring.joinCase(k) + ':' + n;
                }).join(';');
            }

            this.each(function() {
                this.style.cssText += ' ;' + ts;
            });
            return this;
        },

        ///删除样式(删除设置在style属性上的样式)
        ///样式名(font-size/fontSize形式都可)，可以是字符串，如color、backgroud等;也可以是一个数组，表示多个样式，[name1,name2,name3,...]
        removeStyle: function(name) {
            if (base.isEmpty(name)) {
                this.each(function() {
                    this.style.cssText = '';
                });
                return this;
            }

            mstring.isString(name) && (name = [name]);
            this.each(function() {
                var so = this.style.cssText.split(';');
                if (so.length) {
                    function fn(na) {
                        marray.each(so, function(s, i) {
                            var fl = s.split(':');
                            if (mstring.trim(fl[0]).toLowerCase() === mstring.joinCase(na)) {
                                so.splice(i, 1);
                                return false;
                            }
                        });
                    }

                    marray.each(name, function(n) {
                        fn(n);
                    });
                    this.style.cssText = so.join(';');
                }
            });
            return this;
        },

        ///注册事件（包括自定义事件）
        on: function(ty, fn, arg) {
            this.each(function() {
                base.on(this, ty, fn, arg);
            });
            return this;
        },

        ///注册一个一次性事件（包括自定义事件），此事件只会执行一次，之后就会被注销
        once: function(ty, fn, arg) {
            this.each(function() {
                base.once(this, ty, fn, arg);
            });
            return this;
        },

        ///注销事件（包括自定义事件）
        off: function(ty, fn) {
            this.each(function() {
                base.off(this, ty, fn);
            });
            return this;
        },

        ///释放所有或指定的事件（包括自定义事件）
        release: function(ty) {
            this.each(function() {
                base.release(this, ty);
            });
            return this;
        },

        ///触发所有指定事件（包括自定义事件）
        trigger: function(ty) {
            this.each(function() {
                base.trigger(this, ty);
            });
            return this;
        },

        ///鼠标移入移出
        hover: function(over, out) {
            this.each(function() {
                My(this).mouseover(function() {
                    over.call(this);
                }).mouseout(function() {
                    out.call(this);
                });
            });
            return this;
        },

        click: function(fn) {
            return arguments.length && this.on('click', fn) || this.trigger('click');
        },

        dblclick: function(fn) {
            return arguments.length && this.on('dblclick', fn) || this.trigger('dblclick');
        },

        mousedown: function(fn) {
            return arguments.length && this.on('mousedown', fn) || this.trigger('mousedown');
        },

        mouseup: function(fn) {
            return arguments.length && this.on('mouseup', fn) || this.trigger('mouseup');
        },

        mousemove: function(fn) {
            return arguments.length && this.on('mousemove', fn) || this.trigger('mousemove');
        },

        ///注册鼠标移入事件，不论鼠标指针移入事件元素或其子元素都会被触发
        mouseover: function(fn) {
            return arguments.length && this.on('mouseover', fn) || this.trigger('mouseover');
        },

        ///注册鼠标移出事件，不论鼠标指针移出事件元素或其子元素都会被触发
        mouseout: function(fn) {
            return arguments.length && this.on('mouseout', fn) || this.trigger('mouseout');
        },

        ///注册鼠标进入事件，只在鼠标指针进入事件元素时触发，移入子元素不会触发，这点与mouseover事件不同
        mouseenter: function(fn) {
            return arguments.length && this.on('mouseenter', fn) || this.trigger('mouseenter');
        },

        ///注册鼠标离开事件，只在鼠标指针离开事件元素时触发，移出子元素不会触发，这点与mouseout事件不同
        mouseleave: function(fn) {
            return arguments.length && this.on('mouseleave', fn) || this.trigger('mouseleave');
        },

        mousewheel: function(fn) {
            return arguments.length && this.on('mousewheel', fn) || this.trigger('mousewheel');
        },

        ///注册滚动条滚动事件，此事件仅对拥有滚动条的元素(window/iframe或设置了overflow=scroll/auto的元素)起作用
        scroll: function(fn) {
            return arguments.length && this.on('scroll', fn) || this.trigger('scroll');
        },

        ///注册拖动元素拖动事件
        drag: function(fn) {
            return arguments.length && this.on('drag', fn) || this.trigger('drag');
        },

        ///注册拖动元素拖动开始事件
        dragstart: function(fn) {
            return arguments.length && this.on('dragstart', fn) || this.trigger('dragstart');
        },

        ///注册拖动元素拖动结束事件（松开了鼠标）
        dragend: function(fn) {
            return arguments.length && this.on('dragend', fn) || this.trigger('dragend');
        },

        ///注册被拖动至有效拖放目标上方时事件
        dragover: function(fn) {
            return arguments.length && this.on('dragover', fn) || this.trigger('dragover');
        },

        ///注册被拖入有效拖放目标时事件
        dragenter: function(fn) {
            return arguments.length && this.on('dragenter', fn) || this.trigger('dragenter');
        },

        ///注册被拖离有效拖放目标时事件
        dragleave: function(fn) {
            return arguments.length && this.on('dragleave', fn) || this.trigger('dragleave');
        },

        ///注册拖入拖放目标事件（松开了鼠标）
        drop: function(fn) {
            return arguments.length && this.on('drop', fn) || this.trigger('drop');
        },

        keydown: function(fn) {
            return arguments.length && this.on('keydown', fn) || this.trigger('keydown');
        },

        keypress: function(fn) {
            return arguments.length && this.on('keypress', fn) || this.trigger('keypress');
        },

        keyup: function(fn) {
            return arguments.length && this.on('keyup', fn) || this.trigger('keyup');
        },

        ///注册表单元素value值被更改事件
        ///此事件仅对表单元素有效，如form或input=text/password/search/email/url/date/month/week/time/datetime/datetime-local/number/range/color/file/checkbox/radio或select/textarea等
        change: function(fn) {
            return arguments.length && this.on('change', fn) || this.trigger('change');
        },

        ///注册表单元素输入事件，支持的元素同change
        input: function(fn) {
            return arguments.length && this.on('input', fn) || this.trigger('input');
        },

        ///注册表单元素验证失败事件，支持的元素同change，除了form
        invalid: function(fn) {
            return arguments.length && this.on('invalid', fn) || this.trigger('invalid');
        },

        ///注册选取表单元素文本内容事件，input=text/password/search/email/url/number或textarea
        select: function(fn) {
            return arguments.length && this.on('select', fn) || this.trigger('select');
        },

        ///注册form的submit事件
        submit: function(fn) {
            return arguments.length && this.on('submit', fn) || this.trigger('submit');
        },

        ///注册form的reset事件
        reset: function(fn) {
            return arguments.length && this.on('reset', fn) || this.trigger('reset');
        },

        focus: function(fn) {
            return arguments.length && this.on('focus', fn) || this.trigger('focus');
        },

        blur: function(fn) {
            return arguments.length && this.on('blur', fn) || this.trigger('blur');
        },

        ///注册窗口或框架被重新调整大小事件；此事件只对window窗口起作用
        resize: function(fn) {
            return arguments.length && this.on('resize', fn) || this.trigger('resize');
        },

        ///页面或图片/脚本/文件/框架等加载完毕事件
        load: function(fn) {
            return arguments.length && this.on('load', fn) || this.trigger('load');
        },

        ///页面卸载/跳转/退出事件
        unload: function(fn) {
            return arguments.length && this.on('unload', fn) || this.trigger('unload');
        },

        ///页面或图片/脚本/文件/框架等加载错误事件
        error: function(fn) {
            return arguments.length && this.on('error', fn) || this.trigger('error');
        },

        ///页面或图片/脚本/文件/框架等加载中断事件
        abort: function(fn) {
            return arguments.length && this.on('abort', fn) || this.trigger('abort');
        },

        /*
         *全文档点击事件，当点击在除元素以外的任何元素上（被阻止冒泡的元素除外），就执行指定函数
         *此方法通常应用在点击页面时关闭/最小化浮动元素或弹出层
         *执行函数；可以不指定此函数，那么就默认执行关闭（隐藏）元素
         */
        globalclick: function(fn) {
            var scope = this;
            M(window).click(function(e) {
                e = e.target;
                if (scope.has(e) || scope.find(e).length)
                    return;

                mfn.isFunction(fn) ? fn.call(scope, e) : scope.hide();
            });
            return this;
        },

        /*
         *对元素（通常是弹出窗口）绑定拖拽动作，这样就可以用鼠标按住可拖拽部分（通常是弹出窗口标题），移动鼠标拖拽
         *rect：限制拖拽的矩形范围，格式如：{left:0,top:0,width:100,height:100}；默认无限制范围
         */
        setDrag: function(dragabler, rect) {
            var isS = mstring.isString(dragabler),
                isE = !isS && base.isDomElement(dragabler),
                isM = !isE && base.isMy(dragabler);

            if (isS || isE || isM) {
                var $ = new _M_();
                (isE || isM) && $.add(dragabler) || this.each(function() {
                    $.add(base.query(dragabler, this));
                });

                var pre = null,
                    target = null,
                    mothed = null,
                    onmove = function(e) {
                        var cur = {
                            x: e.pageX,
                            y: e.pageY
                        };
                        if (pre) {
                            var w = target.outerWidth(),
                                h = target.outerHeight(),
                                p = target[mothed]();

                            p.left += cur.x - pre.x;
                            p.top += cur.y - pre.y;

                            if (rect) {
                                p.left < rect.left && (p.left = 0);
                                p.left + w > rect.width && (p.left = rect.width - w);

                                p.top < rect.top && (p.top = 0);
                                p.top + h > rect.height && (p.top = rect.height - h);
                            }

                            target[mothed](p);
                        }
                        pre = cur;
                    }, onup = function(e) {
                        My(document.body).off('mousemove', onmove).off('mouseup', onup).off('mouseleave', onup);
                        target = null;
                        pre = null;
                    };

                this.mousedown(function(e) {
                    if ($.has(e.target) || $.find(e.target).length) {
                        My(document.body).mousemove(onmove).mouseup(onup).mouseleave(onup);
                        pre = {
                            x: e.pageX,
                            y: e.pageY
                        };
                        target = My(this);
                        mothed = target.parent().style('position') === 'static' && 'position' || 'offset';
                    }
                });
            }
            return this;
        },

        ///验证用户输入，验证对象必须是input、textarea
        validate: function(regExp) {
            return this.each(function() {
                return regExp.test(this.value);
            });
        }
    };

    ///数据提供者，监听数据的变化
    base.DataProvider = function(source) {
        if (!(this instanceof base.DataProvider))
            return new base.DataProvider(source);

        base.Dispatcher.call(this);
        marray.isArray(source) || (source = [source]);
        this.__source = source;
    }

    base.inherit(base.DataProvider, base.Dispatcher, {
        set: function(key, value) {

        },

        get: function(key) {

        },

        add: function() {

        },

        update: function() {

        },

        remove: function() {

        },

        clear: function() {
            this.__source = [];
            this.trigger('change');
        }
    });

    ///数据模型
    base.Model = function(dataSource) {
        if (!(this instanceof base.Model))
            return new base.Model(dataSource);

        base.Dispatcher.call(this);
        dataSource instanceof base.DataProvider || (dataSource = new base.DataProvider(dataSource));
    }

    base.inherit(base.Model, base.Dispatcher, {
        set: function(key, value) {

        },

        get: function(key) {

        },

        ///从远程服务器获取数据，并刷新跟name或data-key关联起来的元素数据
        ///mapKeys：绑定在元素上的key与数据中的key映射，若此两个key都一致，则没有必要再映射
        fetch: function(mapKeys, callback) {

        },

        ///提交元素数据到远程服务器
        ///mapKeys：绑定在元素上的key与数据中的key映射，若此两个key都一致，则没有必要再映射
        commit: function(mapKeys, callback) {

        }
    });

    ///UI视图
    base.View = function(model) {
        if (!(this instanceof base.View))
            return new base.View(model);

        base.Dispatcher.call(this);
    }

    base.inherit(base.View, base.Dispatcher, {

    });

    ///UI模板
    base.Template = function(data, template) {
        this.data = data;
        this.template = template;
    }

    base.extend(base.Template.prototype, {
        execute: function() {
            if (!this.data) return '';

            var r, t = '',
                s = '',
                _ = this;
            base.each(this.data, function(v) {
                t = _.template;
                while (r = /\{(\w+)\}/g.exec(t))
                    t = t.replace(r[0], v[r[1]]);
                s += t;
            });
            return s;
        }
    });

    base.extend(My, base);

    console.log("*****************************************************\n***        **          **     ***     ***         ***\n***        ****      ****      ***   ***          ***\n***        ** ***  **** *       **  ***           ***\n***        **     *    **        * ***            ***\n***        **          **         ***             ***\n***        **          **        ***              ***\n***        **          **       ***               ***\n***        **          **      ***                ***\n*****************************************************\nWelcome to use My.js JavaScript Library!")
})();