/*
My JavaScript Library v1.0.0
@name My
@version 1.0.0
@author luoying
@date 2013-7-1
@modify date 2014-5-7
@copyright China
*/
(function() {
    var primitiveTypes = ['undefined', 'string', 'number', 'boolean'],
        toString = Object.prototype.toString,

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

            each: function(a, fn, arg) {
                if (marray.isArray(a) || marray.isArrayLike(a))
                    return marray.each.apply(this, arguments);

                if (mobject.isPlainObject(a))
                    return mobject.each.apply(this, arguments);
            },

            reach: function(a, fn, arg) {
                if (marray.isArray(a) || marray.isArrayLike(a))
                    return marray.reach.apply(this, arguments);
            },

            filter: function(a, fn, arg) {
                if (marray.isArray(a))
                    return marray.filter(a, fn, arg);

                if (mobject.isPlainObject(a))
                    return mobject.filter(a, fn, arg);
            },

            map: function(a, fn, arg) {
                if (marray.isArray(a))
                    return marray.map(a, fn, arg);

                if (mobject.isPlainObject(a))
                    return mobject.map(a, fn, arg);
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

            indexOf: function(a, e, start) {
                if (mstring.isString(a))
                    return a.indexOf(e, start);

                if (marray.isArray(a))
                    return marray.indexOf(a, e, start);

                return -1;
            },

            lastIndexOf: function(a, e, start) {
                if (mstring.isString(a))
                    return a.lastIndexOf(e, start);

                if (marray.isArray(a))
                    return marray.lastIndexOf(a, e, start);

                return -1;
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

            inherit: function(subCls, superCls, args) {
                function F() {};
                F.prototype = superCls.prototype;

                var prot = new F();
                prot.constructor = subCls;

                var len = arguments.length;
                for (var i = 2; i < len; i++) {
                    this.each(arguments[i], function(value, key) {
                        prot[key] = value;
                    })
                }

                subCls.prototype = prot;
                subCls.superCls = superCls.prototype; //关联父级对象

                if (superCls.prototype.constructor === Object.prototype.constructor)
                    superCls.prototype.constructor = superCls;
            },

            extend: function(dest) {
                dest = dest || {};
                this.each(arguments, function(obj) {
                    if (obj !== dest) {
                        base.each(obj, function(value, key) {
                            dest[key] = value;
                        });
                    }
                });
            },

            augment: function(dest, source, methods) {
                if (!marray.isArray(methods)) return;

                dest = dest || {};
                source = source || {};
                this.each(methods, function(value) {
                    if (!dest.hasOwnProperty(value) && source.hasOwnProperty(value))
                        dest[value] = source[value];
                });
            },

            now: function() {
                return new Date().getTime();
            },

            guid: function() {
                return '';
            }
        },

        getClient = function() {
            var browser = '',
                version = 0,
                platform = '',
                os = '',
                ua = navigator.userAgent;

            //检测浏览器及其版本号
            if (window.opera) {
                browser = 'opera';
                version = opera.version();
            } else if (/AppleWebKit\/(\S+)/.test(ua)) {
                //确定是chrome还是safari
                if (/OPR\/(\S+)/.test(ua)) {
                    browser = 'opera';
                    version = RegExp['$1'];
                } else if (/Chrome\/(\S+)/.test(ua)) {
                    browser = 'chrome';
                    version = RegExp['$1'];
                } else if (/Version\/(\S+)/.test(ua)) {
                    browser = 'safari';
                    version = RegExp['$1'];
                }
            } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {} else if (/rv:([^\)]+)\)\s?\w* Gecko\/?/.test(ua)) {
                version = RegExp['$1'];
                if (/Firefox\/(\S+)/.test(ua)) { //确定是不是firefox
                    browser = 'firefox';
                    version = RegExp['$1'];
                } else if (/Trident/.test(ua)) { //IE11
                    browser = 'ie';
                } else version = 0;
            } else if (/MSIE ([^;]+)/.test(ua)) {
                browser = 'ie';
                version = RegExp['$1'];
            } else if (/bingbot\/(\S+)/.test(ua)) {
                browser = 'bingbot';
                version = RegExp['$1'];
            }

            var p = navigator.platform;
            //检测平台
            if (p.indexOf('Win') === 0)
                platform = 'win';
            else if (p.indexOf('Mac') === 0)
                platform = os = 'mac';
            else if ((p.indexOf('x11') === 0) || (p.indexOf('Linux') === 0))
                platform = os = 'linux';
            else if (p.indexOf('iPhone') > -1)
                platform = os = 'iphone';
            else if (p.indexOf('ipad') > -1)
                platform = os = 'ipad';
            else if (p.indexOf('iPod') > -1)
                platform = os = 'iPod';
            else if (p.indexOf('nokiaN') > -1)
                platform = os = 'nokia';
            else if (p.indexOf('Wii') > -1)
                platform = os = 'Wii';

            //检测操作系统
            if (platform === 'win') {
                if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                    var ax = RegExp['$1'];
                    if (ax === 'NT') {
                        os = {
                            '5.0': '2000',
                            '5.1': 'XP',
                            '6.0': 'Vista',
                            '6.1': 'Win7'
                        }[RegExp.$2] || 'NT';
                    } else if (ax === '9x') os = 'ME';
                    else os = ax;
                }
            }
            return {
                browser: browser,
                version: version,
                platform: platform,
                os: os
            }
        },

        ///客户端信息：平台、操作系统、浏览器、浏览器版本等
        mclient = getClient(),

        guidStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$',

        ///IE下的一些属性名与W3C标准的映射
        IEfix = {
            acceptcharset: "acceptCharset",
            accesskey: "accessKey",
            allowtransparency: "allowTransparency",
            bgcolor: "bgColor",
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            "class": "className",
            colspan: "colSpan",
            checked: "defaultChecked",
            selected: "defaultSelected",
            "for": "htmlFor",
            frameborder: "frameBorder",
            hspace: "hSpace",
            longdesc: "longDesc",
            maxlength: "maxLength",
            marginwidth: "marginWidth",
            marginheight: "marginHeight",
            noresize: "noResize",
            noshade: "noShade",
            readonly: "readOnly",
            rowspan: "rowSpan",
            tabindex: "tabIndex",
            valign: "vAlign",
            vspace: "vSpace"
        },

        testDiv = document.createElement('div');

    testDiv.setAttribute('class', 't');
    var supportSetAttr = testDiv.className === 't'; //检测是否可以支持setAttribute方法设置class

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
            if (!s) return '';
            return s.join('');
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

            join = (join === undefined) && '-';

            return s.replace(new RegExp(join + '(\\w)', 'g'), function(m, p1) {
                return p1.toUpperCase();
            });
        },

        joinCase: function(s, join) {
            if (!this.isString(s))
                return '';

            join = (join === undefined) && '-';

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

            len = (len === undefined) && 2;

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
                if (!this.hasKey(obj2, k))
                    return false;

                if (!base.equals(v, obj2[k]))
                    return false;

                return true;
            });
        },

        hasKey: function(obj, key) {
            return obj.hasOwnProperty(key); /*仅自身属性*/
        },

        getKeys: function(obj) {
            var ks = [];
            this.each(obj, function(v, k) {
                ks[ks.length++] = k;
            });
            return ks;
        },

        getValues: function(obj) {
            var vs = [];
            this.each(obj, function(v) {
                vs[vs.length++] = v;
            });
            return vs;
        },

        each: function(obj, fn, arg) {
            if (!mfn.isFunction(fn))
                return false;

            var k, v;
            for (k in obj) {
                v = fn.call(this, obj[k], k, arg);

                if (v === false)
                    break;
            }
            return !!v;
        },

        filter: function(obj, fn, arg) {
            if (!mfn.isFunction(fn))
                return [];

            var rs = [];
            this.each(obj, function(e, k) {
                if (fn.call(this, e, k, arg)) {
                    var o = {};
                    o[k] = e;
                    rs.push(o);
                }
            });
            return rs;
        },

        map: function(obj, fn, arg) {
            if (!mfn.isFunction(fn))
                return [];

            var rs = [];
            this.each(obj, function(e, k) {
                rs.push(fn.call(this, e, k, arg));
            });
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

            return mstring.isString(obj) || marray.isArray(obj) || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
        },

        isEmpty: function(arr) {
            return !arr || arr.length === 0;
        },

        indexOf: function(arr, e, start) {
            if (arr.indexOf)
                return arr.indexOf(e, start);

            start = start || 0;

            var index = -1;
            this.each(arr, function(v, i) {
                if (v === e) {
                    index = i;
                    return false;
                }
            }, start);
            return index;
        },

        lastIndexOf: function(arr, e, start) {
            if (arr.lastIndexOf)
                return arr.lastIndexOf(e, start);

            start = start || arr.length - 1;

            var index = -1;
            this.reach(arr, function(v, i) {
                if (v === e) {
                    index = i;
                    return false;
                }
            }, start);
            return index;
        },

        contains: function(arr, e, pos) {
            return this.indexOf(arr, e, pos) > -1;
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
                    return isNumber ? a : String.fromCharCode(a)
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

            var i = start,
                l = arr.length,
                c = 0;
            for (; i < l; i++) {
                if (c >= number) break;
                arr[i] = value;
                c++;
            }
            return arr;
        },

        getKeys: function(arr) {
            var ks = [];
            this.each(arr, function(v, i) {
                ks.push(i);
            });
            return ks;
        },

        getValues: function(arr) {
            return arr.concat();
        },

        each: function(arr, fn) {
            if (!mfn.isFunction(fn))
                return false;

            var s = 0,
                e = arr.length,
                arg, v;

            if (arguments.length > 2) {
                var t = arguments[2],
                    f = arguments[3],
                    z = arguments[4];
                base.isDefined(t) && (mnumber.isNumber(t) && (s = t) || (arg = t));
                base.isDefined(f) && (mnumber.isNumber(f) && (e = f) || (arg = f));
                base.isDefined(z) && (arg = z);
            }

            for (; s < e; s++) {
                v = fn.call(this, arr[s], s, arg);

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
                arg, v;

            if (arguments.length > 2) {
                var t = arguments[2],
                    f = arguments[3],
                    z = arguments[4];
                base.isDefined(t) && (mnumber.isNumber(t) && (s = t) || (arg = t));
                base.isDefined(f) && (mnumber.isNumber(f) && (e = f) || (arg = f));
                base.isDefined(z) && (arg = z);
            }

            for (; s >= e; s--) {
                v = fn.call(this, arr[s], s, arg);

                if (v === false)
                    break;
            }
            return !!v;
        },

        filter: function(arr, fn, arg) {
            if (!mfn.isFunction(fn))
                return [];

            var rs = [];
            this.each(arr, function(e, i) {
                fn.call(this, e, i, arg) && rs.push(e);
            });
            return rs;
        },

        map: function(arr, fn, arg) {
            if (!mfn.isFunction(fn))
                return [];

            var rs = [];
            this.each(arr, function(e, i) {
                rs.push(fn.call(this, e, i, arg));
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

        sortOn: function(arr, field, type) {
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

        uniqueOn: function(arr, field) {
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
            if (!this.isArray(dest) || !this.isArray(source))
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

        format: function(d, fmt) {
            if (mnumber.isNumber(d))
                d = new Date(d);

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
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));

            mobject.each(o, function(v, k) {
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? v : ("00" + v).substr(("" + v).length));
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

    ///针对HTML内容的一些操作方法
    var mhtml = {
        encodeHTML: function(s) {
            return (s || '').replace(/&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/ /g, '&nbsp;');
        },

        decodeHTML: function(s) {
            return (s || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
        }
    };

    ///针对URL的一些操作方法
    var murl = {
        joinURL: function(obj, join, encode) {
            if (!mobject.isPlainObject(obj))
                return '';

            join = join || '&';

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

            split = split || '&';

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

    ///16进制颜色值
    var regHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
        ///RGB颜色值
        regRgb = /^(rgb[a]?)/i,
        regRep = /(?:\(|\)|rgb[a]?)*/ig;

    ///针对颜色的一些操作方法
    var mcolor = {
        create: function(r, g, b, f, a) {
            if (mstring.isString(r))
                r = parseInt(r, 16);

            if (mstring.isString(g))
                g = parseInt(g, 16);

            if (mstring.isString(b))
                b = parseInt(b, 16);

            return f ? (a !== undefined ? 'RGBA(' + r + ',' + g + ',' + b + ',' + a + ')' : 'RGB(' + r + ',' + g + ',' + b + ')') : ('#' + r.toString(16) + g.toString(16) + b.toString(16));
        },

        getRed: function(c) {
            if (!c) return;

            if (!regRgb.test(c))
                c = this.toRGB(c);

            return parseInt(c.replace(regRep, '').split(',')[0]);
        },

        getGreen: function(c) {
            if (!c) return;

            if (!regRgb.test(c))
                c = this.toRGB(c);

            return parseInt(c.replace(regRep, '').split(',')[1]);
        },

        getBlue: function(c) {
            if (!c) return;

            if (!regRgb.test(c))
                c = this.toRGB(c);

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
                    if (h.length === 1)
                        h = '0' + h;
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

                if (a !== undefined)
                    cs.push(a);

                return (a === undefined ? 'RGB' : 'RBGA') + '(' + cs.join(',') + ')';
            }

            if (a !== undefined)
                c = c.replace(/rgb/i, 'RGBA').replace(')', ',' + a + ')'); //补上Alpha通道，0-1

            return c;
        }
    };

    ///事件Event
    base.Event = function(a, b) {
        a = a || {};

        if (!(this instanceof base.Event))
            return new base.Event(a, b);

        if (a.type) { //a是originalEvent，即DOM的原生事件
            for (var k in a) {
                //if (a.hasOwnProperty(k))
                if (!mfn.isFunction(a[k]))
                    this[k] = a[k];
            }
            this.originalEvent = a;
            this.target = this.target || this.srcElement; //给IE的事件模型加入target属性
            this.relatedTarget = this.relatedTarget || this.toElement || this.fromElement; //给IE的事件模型加入relatedTarget属性，相关对象

            var buttons = {
                left: false,
                middle: false,
                right: false
            }, isMouseEvent = marray.indexOf(mouseEventTypes, this.type) != -1;

            if (isMouseEvent) {
                //给IE的事件模型加上相对于文档原点的XY位置
                if (this.pageX === undefined)
                    this.pageX = this.clientX + document.documentElement.scrollLeft || document.body.scrollLeft;

                if (this.pageY === undefined)
                    this.pageY = this.clientY + document.documentElement.scrollTop || document.body.scrollTop;

                if (this.keyCode === undefined && this.which !== undefined)
                    this.keyCode = this.which;

                if (this.which === undefined && this.keyCode !== undefined)
                    this.which = this.keyCode;

                if (this.wheelDelta !== undefined) {
                    if (mclient.browser === 'opera' && mclient.version < 9.5)
                        this.wheelDelta = -this.wheelDelta;
                } else {
                    this.wheelDelta = -this.detail * 40;
                }

                if (this.button !== undefined) {
                    switch (this.button) {
                        case 0:
                            buttons.left = true;
                            break;
                        case 1:
                            buttons.middle = true;
                            break;
                        case 2:
                            buttons.right = true;
                            break;
                        default:
                            break;
                    }
                }
            } else if (this.button !== undefined) {
                switch (this.button) {
                    case 1:
                        buttons.left = true;
                        break;
                    case 2:
                        buttons.right = true;
                        break;
                    case 3:
                        buttons.left = true;
                        buttons.right = true;
                        break;
                    case 4:
                        buttons.middle = true;
                        break;
                    case 5:
                        buttons.left = true;
                        buttons.middle = true;
                        break;
                    case 6:
                        buttons.middle = true;
                        buttons.right = true;
                        break;
                    case 7:
                        buttons.left = true;
                        buttons.middle = true;
                        buttons.right = true;
                        break;
                    default:
                        break;
                }
            } else {
                buttons = null;
            }
            this.buttons = buttons;
        } else { //a是自定义的绑定事件
            this.type = a;
            base.extend(this, b);
        }
        this.timeStamp = this.timeStamp || base.now(); //纪元时间戳
    }

    base.Event.prototype = {
        stopPropagation: function() {
            var e = this.originalEvent;
            if (e) {
                if (e.stopPropagation) {
                    base.Event.prototype.stopPropagation = function() {
                        var e = this.originalEvent;
                        e && e.stopPropagation();
                    }
                } else {
                    base.Event.prototype.stopPropagation = function() {
                        var e = this.originalEvent;
                        if (e) e.cancelBubble = true;
                    }
                }
                this.stopPropagation();
            }
        },

        preventDefault: function() {
            var e = this.originalEvent;
            if (e) {
                if (e.preventDefault) {
                    base.Event.prototype.preventDefault = function() {
                        var e = this.originalEvent;
                        e && e.preventDefault();
                    }
                } else {
                    base.Event.prototype.preventDefault = function() {
                        var e = this.originalEvent;
                        if (e) e.returnValue = false;
                    }
                }
                this.preventDefault();
            }
        },

        getClipboardText: function() {
            var e = this.originalEvent;
            if (e) {
                if (e.clipboardData) {
                    base.Event.prototype.getClipboardText = function() {
                        var e = this.originalEvent;
                        return e && e.clipboardData.getData('text') || '';
                    }
                } else {
                    base.Event.prototype.getClipboardText = function() {
                        return window.clipboardData.getData('text') || '';
                    }
                }
                this.getClipboardText();
            }
        },

        setClipboardText: function(txt) {
            var e = this.originalEvent;
            if (e) {
                if (e.clipboardData) {
                    base.Event.prototype.setClipboardText = function(txt) {
                        var e = this.originalEvent;
                        e && e.clipboardData.setData('text/plain', txt);
                    }
                } else {
                    base.Event.prototype.setClipboardText = function(txt) {
                        window.clipboardData.setData('text', txt);
                    }
                }
                this.setClipboardText(txt);
            }
        }
    };

    ///鼠标事件类型列表
    var mouseEventTypes = ['mousedown', 'mousemove', 'mouseup', 'click', 'dbclick', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'mousewheel', 'drag', 'drop', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart'],

        keyEventTypes = ['keydown', 'keypress', 'keyup'],

        ///原生的DOM事件类型列表
        originalEventTypes = mouseEventTypes.concat(keyEventTypes, ['submit', 'reset', 'change', 'formchange', 'forminput', 'input', 'invalid', 'blur', 'focus', 'select', 'contextmenu',
            'resize', 'scroll', 'load', 'unload', 'DOMContentLoaded', 'message', 'online', 'offline', 'redo', 'undo', 'storage'
        ]),

        ///自定义事件类型列表
        customEventTypes = ['loaded', 'complete', 'error', 'timeout', 'abort', 'timer', 'start', 'stop'],

        ///定义事件类型（包含原生的DOM事件类型和已知的自定义事件类型）
        eventType = {},

        ///事件处理函数句柄集合
        eventHandlers = {},

        ///事件对象的映射，通过生成的guid挂钩映射起来
        eventTg = {},

        ///当前事件对象映射guid
        eventGuid = 0,

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

    mergeEvent(originalEventTypes, customEventTypes);

    function requestNewEvent(tg, ty, fn, isCustom) {
        var guid = getEventGuid(tg);
        if (!guid) { //尚未映射，则创建guid映射起来
            guid = (isCustom ? '__events_' : 'events_') + (eventGuid++);
            eventTg[guid] = tg;
        }

        if (!eventHandlers[guid])
            eventHandlers[guid] = {};

        if (!eventHandlers[guid][ty])
            eventHandlers[guid][ty] = [];

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
        add: function(tg, ty, fn, arg) {
            if (tg.addEventListener) { //DOM2规范
                this.add = function(tg, ty, fn, arg) {
                    var guid = requestNewEvent(tg, ty, fn);
                    if (!guid) return;

                    var handler = function(e) {
                        var callee = arguments.callee;
                        callee.fn.call(this, new base.Event(e), callee.arg); //将event对象作为参数传递给处理函数
                    }
                    handler.fn = fn;
                    handler.arg = arg;
                    eventHandlers[guid][ty].push(handler);
                    tg.addEventListener(ty, handler, false);
                }
            } else { //低版本的IE
                this.add = function(tg, ty, fn, arg) {
                    var guid = requestNewEvent(tg, ty, fn);
                    if (!guid) return;

                    var handler = function(e) { //以使this对象指向target，否则会指向window全局对象
                        var callee = arguments.callee;
                        callee.fn.call(callee.tg, new base.Event(e || window.event), callee.arg); //将event对象作为参数传递给处理函数
                    }
                    handler.tg = tg;
                    handler.fn = fn;
                    handler.arg = arg;
                    eventHandlers[guid][ty].push(handler);
                    tg.attachEvent('on' + ty, handler);
                }
            }
            this.add(tg, ty, fn, arg);
        },

        remove: function(tg, ty, fn) {
            if (tg.removeEventListener) { //DOM2规范
                this.remove = function(tg, ty, fn) {
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
            } else { //低版本的IE
                this.remove = function(tg, ty, fn) {
                    var handlers = this.handlers(tg, ty);
                    marray.each(handlers, function(v, i) {
                        if (v.fn === fn) {
                            tg.detachEvent('on' + ty, v);
                            handlers.splice(i, 1);
                            delete v.tg;
                            delete v.fn;
                            delete v.arg;
                            return false;
                        }
                    });
                }
            }
            this.remove(tg, ty, fn);
        },

        has: function(tg, ty) {
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
            if (tg.removeEventListener) {
                this.releaseEvents = function(tg, ty, handlers) {
                    while (handlers.length) {
                        var handler = handlers.shift();
                        tg.removeEventListener(ty, handler, false);
                        delete handler.fn;
                        delete handler.arg;
                    }
                }
            } else {
                this.releaseEvents = function(tg, ty, handlers) {
                    while (handlers.length) {
                        var handler = handlers.shift();
                        tg.detachEvent('on' + ty, handler);
                        delete handler.tg;
                        delete handler.fn;
                        delete handler.arg;
                    }
                }
            }
            this.releaseEvents(tg, ty, handlers);
        },

        trigger: function(tg, ty) {
            if (document.createEvent) {
                this.trigger = function(tg, ty) { //DOM2
                    if (tg[ty]) {
                        tg[ty]();
                        return;
                    }

                    var ismouse = marray.indexOf(mouseEventTypes, ty) > -1;
                    try {
                        var e = document.createEvent(ismouse ? 'MouseEvents' : 'HTMLEvents');
                        ismouse ? e.initMouseEvent(ty) : e.initEvent(ty, true, true);
                        tg.dispatchEvent(e);
                    } catch (err) {}
                }
            } else {
                this.trigger = function(tg, ty) { //IE
                    if (tg[ty]) {
                        tg[ty]();
                        return;
                    }
                    try {
                        tg.fireEvent('on' + ty);
                    } catch (err) {}
                }
            }
            this.trigger(tg, ty);
        }
    };

    ///针对自定义事件的一些方法
    var cevent = {
        bind: function(tg, ty, fn, arg) {
            var guid = requestNewEvent(tg, ty, fn, true);
            if (!guid) return;

            var handler = function(e, arg) {
                var callee = arguments.callee;
                callee.fn.call(this, new base.Event(callee.ty, e), callee.arg); //将event对象作为参数传递给处理函数
            }
            handler.ty = ty;
            handler.fn = fn;
            handler.arg = arg;
            eventHandlers[guid][ty].push(handler);
        },

        unbind: function(tg, ty, fn) {
            var handlers = this.handlers(tg, ty);
            marray.each(handlers, function(v, i) {
                if (v.fn === fn) {
                    handlers.splice(i, 1);
                    delete v.ty;
                    delete v.fn;
                    delete v.arg;
                    return false;
                }
            });
        },

        has: function(tg, ty) {
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
                delete handler.ty;
                delete handler.fn;
                delete handler.arg;
            }
        },

        fire: function(tg, ty, arg, scope) {
            var handlers = this.handlers(tg, ty);
            scope = scope || window;
            marray.each(handlers, function(v) {
                v.call(scope, {
                    target: tg,
                    type: ty,
                    timeStamp: base.now()
                }, arg);
            });
        }
    };

    base.extend(base, {
        addEvent: function(tg, ty, fn, arg) {
            marray.contains(originalEventTypes, ty) && devent.add(tg, ty, fn, arg) || cevent.bind(tg, ty, fn, arg);
        },

        removeEvent: function(tg, ty, fn) {
            marray.contains(originalEventTypes, ty) && devent.remove(tg, ty, fn) || cevent.unbind(tg, ty, fn);
        },

        hasEvent: function(tg, ty) {
            return marray.contains(originalEventTypes, ty) && devent.has(tg, ty) || cevent.has(tg, ty);
        },

        releaseEvent: function(tg, ty) {
            if (ty === undefined) {
                cevent.release(tg);
                devent.release(tg);
                return;
            }
            marray.contains(originalEventTypes, ty) && devent.release(tg, ty) || cevent.release(tg, ty);
        },

        triggerEvent: function(tg, ty, arg, scope) {
            marray.contains(originalEventTypes, ty) && devent.trigger(tg, ty) || cevent.fire(tg, ty, arg, scope);
        }
    });

    ///自定义事件派发器，所有需要派发自定义事件的类都需要继承此事件派发器
    base.Dispatcher = function() {
        if (!(this instanceof base.Dispatcher))
            return new base.Dispatcher();
    }

    base.Dispatcher.prototype = {
        bind: function(ty, fn, arg) {
            cevent.bind(this, ty, fn, arg);
        },

        unbind: function(ty, fn) {
            cevent.unbind(this, ty, fn);
        },

        hasBind: function(ty) {
            return cevent.has(this, ty);
        },

        release: function(ty) {
            cevent.release(this, ty);
        },

        fire: function(ty, arg, scope) {
            cevent.fire(this, ty, arg, scope);
        }
    }

    ///计时器
    base.Timer = function(delay, totalCount) {
        if (this instanceof base.Timer) {
            base.Dispatcher.call(this); //继承派发器，拥有绑定、松绑和派发自定义事件的能力
            this.timer = -1; //计时器对象
            this.delay = delay || 0; //周期时间间隔(秒)
            this.curCount = 0; //当前已运行周期数
            this.totalCount = totalCount || 0; //总周期数，当已运行周期数等于此值时，则停止计时器；默认为0，永不停止，除非手动调用stop()方法
            this.running = false;
        } else return new base.Timer(delay, totalCount);
    };

    base.inherit(base.Timer, base.Dispatcher, {
        start: function() {
            if (this.timer === -1 && this.delay > 0) {
                var _ = this;
                this.timer = setInterval(function() {
                    _.curCount++;
                    _.fire(eventType.TIMER, null, _);
                    if (_.totalCount > 0 && _.curCount === _.totalCount) {
                        _.stop();
                        _.fire(eventType.COMPLETE, null, _);
                    }
                }, this.delay * 1000);
                this.running = true;
                this.fire(eventType.START, null, this);
            }
        },

        stop: function() {
            if (this.timer != -1) {
                clearInterval(this.timer);
                this.timer = -1;
                this.curCount = 0;
                this.totalCount = 0;
                this.running = false;
                this.fire(eventType.STOP, null, this);
            }
        },

        reset: function() {
            if (this.timer != -1) {
                this.curCount = 0;
                this.running = false;
                this.fire(eventType.RESET, null, this);
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
        dataType: dataType.JSON,
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

    ///HTTP请求器
    base.getRequester = function() {
        if (typeof XMLHttpRequest !== 'undefined') {
            this.getRequester = function() {
                return new XMLHttpRequest();
            }
        } else if (typeof ActiveXObject !== 'undefined') {
            this.getRequester = function() {
                if (typeof arguments.callee.activeString !== 'string') {
                    marray.each(['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], function(v) {
                        arguments.callee.activeString = v;
                        return false;
                    });
                }
                return new ActiveXObject(arguments.callee.activeString);
            }
        } else this.getRequester = function() {
            throw new Error('Your browser is too lower,no support Ajax.');
        }
        return this.getRequester();
    };

    ///数据加载器
    base.Loader = function(url, opts) {
        if (this instanceof base.Loader) {
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
            this.requester = base.getRequester();
        } else return new base.Loader(url, opts);
    }

    base.inherit(base.Loader, base.Dispatcher, {
        ///发送请求之前唯一的机会来设置头部信息
        beforeSend: function(header) {
            if (mobject.isPlainObject(header))
                this.header = header;
        },

        send: function(url) {
            if (!mstring.isEmpty(url))
                this.url = url;

            if (mstring.isEmpty(this.url)) { //url为空或非法，触发错误事件，错误类型为url错
                this.fire(eventType.ERROR, {
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
            this.fire(eventType.ABORT, null, this);
        }
    });

    function initializeLoader(loader) {
        if (!loader.cache && loader.method === 'GET')
            loader.url += (loader.url.indexOf('?') > -1 ? '&' : '?') + '_=' + base.now(); //在尾部加上日期毫秒数,保证不取缓存

        loader.requester.open(loader.method.toUpperCase(), loader.url, loader.async);

        if (loader.header) {
            mobject.each(loader.header, function(v, k) {
                loader.requester.setRequestHeader(k, v);
            });
        }

        loader.requester.setRequestHeader('Content-type', loader.contentType); //设置请求的数据类型头部

        if (!loader.cache)
            loader.requester.setRequestHeader('Cache-Control', 'no-cache'); //设置是否缓存头部
    }

    function setLoaderResult(loader) {
        if (loader.timeout > 0)
            clearTimeout(loader.timeoutWatcher);

        if (loader.requester.readyState === 4) {
            if (loader.requester.status === 200) { //ok
                var d = loader.requester.responseText;
                if (loader.parse) {
                    try {
                        d = parseLoaderData(loader.dataType, d, loader.requester.responseXML);
                    } catch (e) {
                        loader.fire(eventType.ERROR, {
                            code: errorCode.PARSE_ERROR,
                            message: 'JSON parse error'
                        }, loader);
                        return;
                    }
                }
                loader.data = d;
                loader.fire(eventType.LOADED, null, loader);
            } else if (loader.requester.status === 404) { //not found
                loader.fire(eventType.ERROR, {
                    code: errorCode.NOT_FOUND,
                    message: '404,Not Found'
                }, loader);
            } else { //未知错误
                loader.fire(eventType.ERROR, {
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
        loader.fire(eventType.TIMEOUT, {
            code: errorCode.TIME_OUT,
            message: 'time out error'
        }, loader);
    }

    ///XSS--跨域脚本请求累计请求的次数
    var xssHttpRequestCount = 0,

        ///xss请求回调函数集合
        callbacks = {};

    ///JSONP加载器，跨域脚本请求
    base.Jsonper = function(url, opts) {
        if (this instanceof base.Jsonper) {
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
        } else return new base.Jsonper(url, opts);
    }

    base.inherit(base.Jsonper, base.Dispatcher, {
        send: function(url) {
            if (!mstring.isEmpty(url))
                this.url = url;

            if (mstring.isEmpty(this.url)) { //url为空或非法，触发错误事件，错误类型为url错
                this.fire(eventType.ERROR, {
                    code: errorCode.URL_ERROR,
                    message: 'url error'
                }, this);
                return;
            }

            this.requestID = this.callback + '_' + (++xssHttpRequestCount); //本次请求id，以区分不同的请求
            this.callbackName = this.requestID + '_callback'; //本次请求服务器返回的js函数名
            this.url += (this.url.indexOf('?') === -1 ? '?' : '&') + this.callback + '=' + this.callbackName; //请求路径

            if (!this.cache && this.method === 'GET')
                this.url += '&_=' + base.now(); //在尾部加上日期毫秒数,保证不取缓存

            this.requester = document.createElement('script'); //创建脚本元素
            this.requester.setAttribute('id', this.requestID);
            this.requester.setAttribute('type', 'text/javascript');

            if (this.async)
                this.requester.setAttribute('async', 'async'); //规定脚本将被异步执行

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
            if (!successed) this.fire(eventType.ABORT, null, this);
        }
    });

    function setXssResult(xss, data) {
        if (xss.parse) {
            try {
                data = parseXssData(xss.dataType, data);
            } catch (e) {
                xss.abort();
                xss.fire(eventType.ERROR, {
                    code: errorCode.PARSE_ERROR,
                    message: 'JSON parse error'
                }, xss);
                return;
            }
        }
        xss.data = d;
        xss.fire(eventType.LOADED, null, xss);
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
        xss.fire(eventType.ERROR, {
            code: errorCode.IO_ERROR,
            message: 'unknow error'
        }, xss);
    }

    function setXssTimeout(xss) {
        xss.abort();
        xss.fire(eventType.TIMEOUT, {
            code: errorCode.TIME_OUT,
            message: 'time out error'
        }, xss);
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
                    if (cookieEnd === -1)
                        cookieEnd = document.cookie.length;

                    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
                }
                return cookieValue;
            } else { //设置
                var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
                if (expires instanceof Date)
                    cookieText += ';expires=' + expires.toGMTString();

                if (path)
                    cookieText += ';path=' + path;

                if (domain)
                    cookieText += ';domain=' + domain;

                if (secure)
                    cookieText += ';secure';

                document.cookie = cookieText;
            }
        },

        removeCookie: function(name, path, domain, secure) {
            this.cookie(name, '', new Date(0), path, domain, secure);
        }
    };

    ///数据提供者事件类型
    mergeEvent([
        ///添加数据项事件
        'add',
        ///删除数据项事件
        'remove',
        ///清空数据源事件
        'clear',
        ///数据源发生改变事件
        'datachange',
        ///刷新数据提供者事件
        'refresh'
    ]);

    ///数据模型，监听数据的变化，并及时更新数据源和UI视图
    base.Model = function(source) {

    }

    base.extend(base.Model.prototype, {

    });

    ///UI模版
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
    _M_.prototype = {
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
            var eles = [];
            this.each(function() {
                eles[eles.length++] = this;
            });
            return eles;
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
                            var _ = this;
                            marray.each(base.query(selector, this.parentNode), function(v) {
                                if (v === _) {
                                    cc.push(_);
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
                !marray.contains(cc, f[0]) && cc.push(f[0]);
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

        replace: function(target) {
            ///<summary>
            ///对DOM中各元素执行替换操作，替换为指定的目标元素
            ///&#10;返回对所有被替换元素的一个My对象包装
            ///</summary>
            ///<param name="target" type="Element|My">目标元素，可以是元素对象，也可以是一个My对象</param>
            ///<returns type="My"/>

            if (target) {
                var cc = [];
                var isE = base.isDomElement(target),
                    isM = base.isMy(target);

                if (isE || isM) {
                    this.each(function(i) {
                        if (isE) {
                            //第一个之后，则复制一份，保证不是一个DOM引用
                            var f = this.parentNode.replaceChild(i === 0 ? target : target.cloneNode(true), this);
                            if (f)
                                cc.push(f);
                        } else { //_M实例，将该实例的DOM树所有元素均按原序插入到后面
                            var $ = i === 0 ? target : target.clone(true), //第一个之后，则复制一份，保证不是一个DOM引用
                                $f;
                            for (i = $.length - 1; i >= 0; i--) {
                                $f = this.parentNode.replaceChild($[i], this);
                                if ($f)
                                    cc.push($f);
                            }
                        }
                    });
                }
                return new _M_(cc);
            }
        },

        remove: function(selector) {
            ///<summary>
            ///对DOM中各元素执行删除操作
            ///&#10;返回对所有被删除元素的一个My对象包装
            ///</summary>
            ///<param name="selector" type="String" optional="true">查询选择符，用来决定删除该选择符指定的元素，若无该参数，则删除所有元素</param>
            ///<returns type="My"/>

            var cc = [];
            if (selector)
                selector = mstring.trim(selector);

            this.each(function() {
                var p = this.parentNode;
                if (p) {
                    var f;
                    if (!selector) {
                        f = p.removeChild(this);
                        if (f)
                            cc.push(f);
                    } else {
                        var $ = new _M_(p).children(selector);
                        if ($.has(this)) {
                            f = p.removeChild(this);
                            if (f)
                                cc.push(f);
                        }
                    }
                }
            });
            return new _M_(cc);
        },

        prev: function(selector) {
            ///<summary>
            ///检索DOM中各元素的上一个兄弟节点
            ///&#10;返回对匹配结果的一个My对象包装
            ///</summary>
            ///<param name="selector" type="String" optional="true">查询选择符，用来决定只匹配符合该选择符的元素，若无该参数，则匹配所有元素</param>
            ///<returns type="My"/>

            var cc = [];
            if (selector)
                selector = mstring.trim(selector);

            this.each(function() {
                var p = getPreviousSibling(this);
                if (p) {
                    if (!selector)
                        cc.push(p);
                    else {
                        var $ = new _M_(p.parentNode).children(selector);
                        if ($.has(p))
                            cc.push(p);
                    }
                }
            });
            return new _M_(cc);
        },

        prevAll: function(selector) {
            ///<summary>
            ///检索DOM中各元素的所有上游兄弟节点
            ///&#10;返回对所有被匹配结果的一个My对象包装
            ///</summary>
            ///<param name="selector" type="String" optional="true">查询选择符，用来决定只匹配符合该选择符的元素，若无该参数，则匹配所有元素</param>
            ///<returns type="My"/>

            var cc = [];
            if (selector)
                selector = mstring.trim(selector);

            this.each(function() {
                var p = getPreviousSibling(this);
                if (p) {
                    var $ = new _M_(p.parentNode).children(selector); //因为所有兄弟节点都拥有共同的父节点，所以只需取得一次就可以了
                    while (p) {
                        if (!selector) {
                            if (marray.indexOf(cc, p) === -1)
                                cc.push(p);
                        } else {
                            if ($.has(p) && marray.indexOf(cc, p) === -1)
                                cc.push(p);
                        }
                        p = getPreviousSibling(p);
                    }
                }
            });
            return new _M_(cc);
        },

        next: function(selector) {
            ///<summary>
            ///检索DOM中各元素的下一个兄弟节点
            ///&#10;返回对匹配结果的一个My对象包装
            ///</summary>
            ///<param name="selector" type="String" optional="true">查询选择符，用来决定只匹配符合该选择符的元素，若无该参数，则匹配所有元素</param>
            ///<returns type="My"/>

            var cc = [];
            if (selector)
                selector = mstring.trim(selector);

            this.each(function() {
                var n = getNextSibling(this);
                if (n) {
                    if (!selector)
                        cc.push(n);
                    else {
                        var $ = new _M_(n.parentNode).children(selector);
                        if ($.has(n))
                            cc.push(n);
                    }
                }
            });
            return new _M_(cc);
        },

        nextAll: function(selector) {
            ///<summary>
            ///检索DOM中各元素的所有下游兄弟节点
            ///&#10;返回对所有被匹配结果的一个My对象包装
            ///</summary>
            ///<param name="selector" type="String" optional="true">查询选择符，用来决定只匹配符合该选择符的元素，若无该参数，则匹配所有元素</param>
            ///<returns type="My"/>

            var cc = [];
            if (selector)
                selector = mstring.trim(selector);

            this.each(function() {
                var n = getNextSibling(this);
                if (n) {
                    var $ = new _M_(n.parentNode).children(selector); //因为所有兄弟节点都拥有共同的父节点，所以只需取得一次就可以了
                    while (n) {
                        if (!selector) {
                            if (marray.indexOf(cc, n) === -1)
                                cc.push(n);
                        } else {
                            if ($.has(n) && marray.indexOf(cc, n) === -1)
                                cc.push(n);
                        }
                        n = getNextSibling(n);
                    }
                }
            });
            return new _M_(cc);
        },

        clone: function(isdepth) {
            ///<summary>
            ///复制My对象，新的My对象包含了原My对象的所有DOM元素的副本
            ///</summary>
            ///<param name="isdepth" type="Boolean" optional="true">决定是否深复制包括所有属性和子节点，默认为false，不深复制</param>
            ///<returns type="My"/>

            var cc = [];
            isdepth = isdepth || false;
            this.each(function() {
                cc.push(this.cloneNode(isdepth));
            });
            return new _M_(cc);
        },

        val: function(v) {
            ///<summary>
            ///设置或检索DOM中表单元素(input/textarea/select等)的value值
            ///&#10;当有参数，为设置所有表单元素的value值，否则为获取第一个表单元素的value值
            ///&#10;当是设置行为，返回对所有表单元素的My对象包装
            ///&#10;当是检索行为，返回第一个表单元素的value值，若select=multiple(多选列表)，返回的将是多个选择值的数组，若无选择项，返回长度为0的空数组
            ///</summary>
            ///<param name="v" type="String|Array" optional="true">设置给表单元素的value值，可以是一个value值数组，表示对radio/checkbox/select=multiple这样的元素设置选中与否、选中项</param>
            ///<returns type="My|String|Array"/>

            var es = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
            if (v === undefined) { //检索
                var e = this[0];
                if (e) {
                    if (marray.indexOf(es, e.tagName) != -1) { //是表单元素
                        if (e.tagName === es[2] && e.multiple) { //多选列表
                            var r = [];
                            for (var k = 0, l = e.length, opt; k < l; k++) {
                                opt = e.options[k];
                                if (opt.selected)
                                    r.push(opt.text);
                            }
                            return r;
                        }
                        return e.value;
                    }
                }
            } else { //设置
                var cc = [];
                this.each(function() {
                    if (marray.indexOf(es, this.tagName) != -1) {
                        if (marray.isArray(v)) { //是一组
                            if (this.tagName = es[0] && (this.type === 'radio' || this.type === 'checkbox')) { //单选框或复选框
                                if (marray.indexOf(v, this.value) === -1)
                                    this.checked = 'false';
                                else
                                    this.checked = 'true';
                            } else if (this.tagName === es[2] && this.multiple) { //多选列表
                                for (var j = 0, l = this.length, opt; j < l; j++) {
                                    opt = this.options[j];
                                    if (marray.indexOf(v, opt.text) === -1)
                                        opt.selected = 'false';
                                    else
                                        opt.selected = 'true';
                                }
                            } else this.value = v[0];
                        } else this.value = v;
                        cc.push(this);
                    }
                });
                return new _M_(cc);
            }
        },

        html: function(h) {
            ///<summary>
            ///设置或检索DOM中元素的innerHTML内容
            ///&#10;当有参数，为设置DOM中全部元素的innerHTML内容，否则为获取第一个元素的innerHTML内容
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的innerHTML内容
            ///</summary>
            ///<param name="h" type="String|Template" optional="true">设置给元素的innerHTML内容</param>
            ///<returns type="My|String"/>

            if (h === undefined) { //检索
                var e = this[0];
                if (e)
                    return e.innerHTML;
            } else { //设置
                if (h instanceof base.Template)
                    h = h.execute();
                this.each(function() {
                    if (this.innerHTML !== undefined) this.innerHTML = h;
                });
                return this;
            }
        },

        text: function(txt) {
            ///<summary>
            ///设置或检索DOM中元素的文本内容(textContent)
            ///&#10;当有参数，为设置DOM中全部元素的文本内容，否则为获取第一个元素的文本内容
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的文本内容
            ///</summary>
            ///<param name="txt" type="String" optional="true">设置给元素的文本内容</param>
            ///<returns type="My|String"/>

            if (txt === undefined) { //检索
                var e = this[0];
                if (e)
                    return e.textContent;
            } else { //设置
                this.each(function() {
                    if (this.textContent !== undefined) this.textContent = txt;
                });
                return this;
            }
        },

        attr: function(name, value) {
            ///<summary>
            ///设置或检索DOM中元素的属性值
            ///&#10;当有第二个参数，为各元素设置指定属性的值，否则为获取第一个元素指定属性的值
            ///&#10;此方法有修正checked/selected/disabled/required/readonly这样的属性，不论设置true或checked/selected/disabled/enabled/required/readonly都可以生效，false或''同理，当是检索行为，只会返回true或false
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素指定属性的值
            ///</summary>
            ///<param name="name" type="String|Object">
            ///&#10;属性名
            ///&#10;当此参数是一个属性名/属性值对的字面量对象，则表示批量设置属性值，将忽略第二个参数
            ///</param>
            ///<param name="value" type="String|Number|Boolean" optional="true">设置给指定属性的值</param>
            ///<returns type="My|String"/>

            if (mstring.isString(name) && !mstring.isEmpty(name)) {
                var isPro = name === 'checked' || name === 'selected' || name === 'disabled' || name === 'enabled' || name === 'required' || name === 'readonly';
                if (value === undefined) { //检索
                    var e = this[0];
                    if (e) {
                        if (isPro) {
                            if (name === 'enabled')
                                return !e['disabled'];
                            return e[name];
                        }
                        return e.getAttribute(supportSetAttr ? name : (IEfix[name] || name));
                    }
                } else { //设置
                    if (mstring.isString(value) || mnumber.isNumber(value) || typeof value === 'boolean') {
                        this.each(function() {
                            if (isPro) {
                                if (typeof value === 'boolean' || value === name || value === '') {
                                    if (name === 'enabled') {
                                        name = 'disabled';
                                        value = !value;
                                    }
                                    value ? this.setAttribute(name, name) : this.removeAttribute(name);
                                }
                            } else {
                                this.setAttribute(supportSetAttr ? name : (IEfix[name] || name), value);
                            }
                        });
                    }
                    return this;
                }
            } else if (mobject.isPlainObject(name)) {
                for (var k in name)
                    this.attr(k, name[k]);
                return this;
            }
        },

        removeAttr: function(name) {
            ///<summary>
            ///DOM树中各元素执行删除指定属性的操作
            ///</summary>
            ///<param name="name" type="String">属性名</param>
            ///<returns type="My"/>

            if (mstring.isString(name) && !mstring.isEmpty(name)) {
                this.each(function() {
                    this.removeAttribute(supportSetAttr ? name : (IEfix[name] || name));
                });
            }
            return this;
        },

        width: function(w) {
            ///<summary>
            ///设置或检索DOM树中元素的宽度(是内容区域宽度，不包括左右内外边距、左右边框)
            ///&#10;当有参数，为各元素设置指定值的宽度，否则为获取第一个元素的宽度
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的宽度
            ///</summary>
            ///<param name="w" type="Number|String" optional="true">
            ///宽度值
            ///&#10;可以是数值(被当作是像素单位)也可以是字符串(如在css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
            ///</param>
            ///<returns type="My|Number"/>

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
                        var ml = Math.round(parseFloat($.style('margin-left'))) || 0,
                            mr = Math.round(parseFloat($.style('margin-right'))) || 0;
                        ww = ww - (ml + mr);
                    }
                    return ww > 0 ? ww : 0;
                }
            } else {
                var rw = addPxUnit(w);
                if (rw)
                    this.style('width', rw);
                return this;
            }
        },

        height: function(h) {
            ///<summary>
            ///设置或检索DOM树中元素的高度(是内容区域高度，不包括上下内外边距、上下边框)
            ///&#10;当有参数，为各元素设置指定值的高度，否则为获取第一个元素的高度
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的高度
            ///</summary>
            ///<param name="h" type="Number|String" optional="true">
            ///高度值
            ///&#10;可以是数值(被当作是像素单位)也可以是字符串(如在css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
            ///</param>
            ///<returns type="My|Number"/>

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
                        var mt = Math.round(parseFloat(this.style('margin-top'))) || 0,
                            mb = Math.round(parseFloat(this.style('margin-bottom'))) || 0;
                        hh = hh - (mt + mb);
                    }
                    return hh > 0 ? hh : 0;
                }
            } else {
                var rh = addPxUnit(h);
                if (rh) this.style(' height', rh);
                return this;
            }
        },

        size: function(s) {
            ///<summary>
            ///设置或检索DOM树中元素的大小(即width和height)
            ///&#10;当有参数，为各元素设置大小，否则为获取第一个元素的大小
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素大小
            ///</summary>
            ///<param name="s" type="Object" optional="true">
            ///大小，结构如{width:*,height:*}，width和height参数说明请看width()和height()方法
            ///</param>
            ///<returns type="My|Object"/>

            if (s === undefined) {
                return {
                    width: this.width(),
                    height: this.height()
                };
            } else {
                this.width(s.width);
                this.height(s.height);
                return this;
            }
        },

        innerWidth: function() {
            ///<summary>
            ///检索DOM树中第一个元素的内宽度(内容区域宽度+左右内边距)，不包括左右边框
            ///</summary>
            ///<returns type="Number"/>

            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerWidth || document.documentElement.clientWidth;

                var ww = e.offsetWidth; //此高度是内容区域宽度+左右内边距+左右边框
                var box = $.style('box-sizing');

                if (box === 'border-box') { //边框盒子，减掉左右外边距
                    var ml = Math.round(parseFloat($.style('margin-left'))) || 0,
                        mr = Math.round(parseFloat($.style('margin-right'))) || 0;
                    ww = ww - (ml + mr);
                }
                //减掉左右边框
                ww -= Math.round(parseFloat($.style('border-left-width'))) || 0;
                ww -= Math.round(parseFloat($.style('border-right-width'))) || 0;
                return ww > 0 ? ww : 0;
            }
        },

        innerHeight: function() {
            ///<summary>
            ///检索DOM树中第一个元素的内高度(内容区域高度+上下内边距)，不包括上下边框
            ///</summary>
            ///<returns type="Number"/>

            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerHeight || document.documentElement.clientHeight;

                var hh = e.offsetHeight; //此高度是内容区域高度+上下内边距+上下边框
                var box = this.style('box-sizing');

                if (box === 'border-box') { //边框盒子，减掉外上下边距
                    var mt = Math.round(parseFloat(this.style('margin-top'))) || 0,
                        mb = Math.round(parseFloat(this.style('margin-bottom'))) || 0;
                    hh = hh - (mt + mb);
                }
                //减掉上下边框
                hh -= Math.round(parseFloat($.style('border-top-width'))) || 0;
                hh -= Math.round(parseFloat($.style('border-bottom-width'))) || 0;
                return hh > 0 ? hh : 0;
            }
        },

        offsetWidth: function() {
            ///<summary>
            ///检索DOM树中第一个元素的宽度(内容区域宽度+左右内边距+左右边框
            ///</summary>
            ///<returns type="Number"/>

            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerWidth || document.documentElement.clientWidth;

                var ww = e.offsetWidth; //此高度是内容区域宽度+左右内边距+左右边框
                var box = $.style('box-sizing');

                if (box === 'border-box') { //边框盒子，减掉左右外边距，保留左右边框
                    var ml = Math.round(parseFloat($.style('margin-left'))) || 0,
                        mr = Math.round(parseFloat($.style('margin-right'))) || 0;
                    ww = ww - (ml + mr);
                }
                return ww > 0 ? ww : 0;
            }
        },

        offsetHeight: function() {
            ///<summary>
            ///检索DOM树中第一个元素的高度(内容区域高度+上下内边距+上下边框)
            ///</summary>
            ///<returns type="Number"/>

            var $ = this.first(),
                e = this[0];
            if (e) {
                if (e === window || e === document)
                    return window.innerHeight || document.documentElement.clientHeight;

                var hh = e.offsetHeight; //此高度是内容区域高度+上下内边距+上下边框
                var box = this.style('box-sizing');

                if (box === 'border-box') { //边框盒子，减掉上下外边距，保留上下边框
                    var mt = Math.round(parseFloat(this.style('margin-top'))) || 0,
                        mb = Math.round(parseFloat(this.style('margin-bottom'))) || 0;
                    hh = hh - (mt + mb);
                }
                return hh > 0 ? hh : 0;
            }
        },

        outerWidth: function() {
            ///<summary>
            ///检索DOM树中第一个元素的外宽度(内容区域宽度+左右内边距+左右边框+左右外边距)
            ///</summary>
            ///<returns type="Number"/>

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
            ///<summary>
            ///检索DOM树中第一个元素的外高度(内容区域高度+上下内边距+上下边框+上下外边距)
            ///</summary>
            ///<returns type="Number"/>

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

        offsetParent: function() {
            ///<summary>
            ///检索DOM树中元素的最近动态定位包含元素，如通过relative/absoute/fixed等设置position的，所有的偏移量都根据该元素来决定
            ///&#10;此方法只检索DOM树中的第一个元素
            ///</summary>
            ///<returns type="Element"/>

            var e = this[0];
            if (e)
                return e.offsetParent;
            return null;
        },

        offsetLeft: function(ol) {
            ///<summary>
            ///设置或检索DOM树中元素的左边界到它的offsetParent左边界的偏移量(相对定位)
            ///&#10;当有参数时，表示为各元素设置左边界偏移量(若元素position是static，则会自动更改为relative)，否则是获取第一个元素的左边界偏移量
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的左边界偏移量
            ///</summary>
            ///<param name="ol" type="Number|String" optional="true">
            ///左边界偏移量，可以是数值(被当作是像素单位)也可以是字符串(如css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
            ///</param>
            ///<returns type="My|Number"/>

            if (ol === undefined) {
                var e = this[0];
                if (e)
                    return e.offsetLeft;
            } else {
                var rl = addPxUnit(ol);
                if (rl) {
                    this.each(function() {
                        var $ = new _M_(this);
                        var p = $.style('position');
                        if (p === 'static')
                            $.style('position', 'relative');
                        $.style('left', rl);
                    });
                }
                return this;
            }
        },

        offsetTop: function(ot) {
            ///<summary>
            ///设置或检索DOM树中元素的上边界到它的offsetParent上边界的偏移量(相对定位)
            ///&#10;当有参数时，表示为各元素设置上边界偏移量(若元素position是static，则会自动更改为relative)，否则是获取第一个元素的上边界偏移量
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的上边界偏移量
            ///</summary>
            ///<param name="ot" type="Number|String" optional="true">
            ///上边界偏移量，可以是数值(被当作是像素单位)也可以是字符串(如css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
            ///</param>
            ///<returns type="My|Number"/>

            if (ot === undefined) {
                var e = this[0];
                if (e)
                    return e.offsetTop;
            } else {
                var rt = addPxUnit(ot);
                if (rt) {
                    this.each(function() {
                        var $ = new _M_(this);
                        var p = $.style('position');
                        if (p === 'static')
                            $.style('position', 'relative');
                        $.style('top', rt);
                    });
                }
                return this;
            }
        },

        offset: function(o) {
            ///<summary>
            ///设置或检索DOM树中元素的左/上边界到它的offsetParent左/上边界的偏移量(相对定位)
            ///&#10;当有参数时，表示为各元素设置左/上边界偏移量(若元素position是static，则会自动更改为relative)，否则是获取第一个元素的左/上边界偏移量
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的左/上边界偏移量，结构如{left:*,top:*}
            ///</summary>
            ///<param name="o" type="Object" optional="true">
            ///左/上边界偏移量，结构如{left:*,top:*}
            ///</param>
            ///<returns type="My|Object"/>

            if (o === undefined) {
                return {
                    left: this.offsetLeft(),
                    top: this.offsetTop()
                }
            } else {
                this.offsetLeft(o.left);
                this.offsetTop(o.top);
                return this;
            }
        },

        left: function(v) {
            ///<summary>
            ///设置或检索DOM树中元素的左顶点位置(绝对定位，相对于页面body)
            ///&#10;当有参数时，为设置各元素的左顶点(若元素position是static，则会自动更改为absolute)，否则为获取第一个元素的左顶点
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的左顶点
            ///</summary>
            ///<param name="v" type="Number|String" optional="true">
            ///左顶点值，可以是数值(被当作是像素单位)也可以是字符串(如css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
            ///</param>
            ///<returns type="My|Number"/>

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
            } else {
                var rl = addPxUnit(v);
                if (rl) {
                    this.each(function() {
                        var $ = new _M_(this);
                        var p = $.style('position');
                        if (p === 'static')
                            $.style('position', 'absolute');
                        $.style('left', rl);
                    });
                }
                return this;
            }
        },

        top: function(v) {
            ///<summary>
            ///设置或检索DOM树中元素的上顶点位置(绝对定位，相对于页面body)
            ///&#10;当有参数时，为设置各元素的上顶点(若元素position是static，则会自动更改为absolute)，否则为获取第一个元素的上顶点
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的上顶点
            ///</summary>
            ///<param name="v" type="Number|String" optional="true">
            ///上顶点值，可以是数值(被当作是像素单位)也可以是字符串(如css中设置，100px/2em/50%/auto等，若无单位，API会自动加上像素单位)
            ///</param>
            ///<returns type="My|Number"/>

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
            } else {
                var rt = addPxUnit(v);
                if (rt) {
                    this.each(function() {
                        var $ = new _M_(this);
                        var p = $.style('position');
                        if (p === 'static')
                            $.style('position', 'absolute');
                        $.style('top', rt);
                    });
                }
                return this;
            }
        },

        position: function(pos) {
            ///<summary>
            ///设置或检索DOM树中元素的坐标位置(绝对定位，相对于页面body)
            ///&#10;当有参数时，为设置各元素的坐标位置(若元素position是static，则会自动更改为absolute)，否则为获取第一个元素的坐标位置
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，返回第一个元素的坐标位置，即{left:*,top:*}
            ///</summary>
            ///<param name="pos" type="Object" optional="true">
            ///坐标位置，结构如{left:*,top:*}
            ///</param>
            ///<returns type="My|Object"/>

            if (pos === undefined) {
                return {
                    left: this.left(),
                    top: this.top()
                };
            } else {
                this.left(pos.left);
                this.top(pos.top);
                return this;
            }
        },

        scrollWidth: function() {
            ///<summary>
            ///检索DOM树中元素包括滚动条的完整宽度
            ///&#10;当csss设置overflow/overflow-x=scroll/auto，在滚动条出现时，此值和width不同，包括了滚动条以下不可见部分的宽度，而width只是可见部分的宽度
            ///&#10;此方法只返回第一个元素包括滚动条的完整宽度，数值，单位为像素
            ///</summary>
            ///<returns type="Number"/>

            var e = this[0];
            if (e)
                return e.scrollWidth;
        },

        scrollHeight: function() {
            ///<summary>
            ///检索DOM树中元素包括滚动条的完整高度
            ///&#10;当csss设置overflow/overflow-y=scroll/auto，在滚动条出现时，此值和height不同，包括了滚动条以下不可见部分的高度，而height只是可见部分的高度
            ///&#10;此方法只返回第一个元素包括滚动条的完整高度，数值，单位为像素
            ///</summary>
            ///<returns type="Number"/>

            var e = this[0];
            if (e)
                return e.scrollHeight;
        },

        scrollLeft: function(v) {
            ///<summary>
            ///设置或检索DOM树中元素已经滚动的左边界像素
            ///&#10;只在元素有滚动条的时候才有用(如csss设置overflow/overflow-x=scroll/auto)
            ///&#10;当有参数时，表示是设置行为
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，则返回第一个元素已经滚动的左边界像素值
            ///</summary>
            ///<param name="v" type="Number" optional="true">要设置给有滚动条元素应该滚动的左边界像素</param>
            ///<returns type="My|Number"/>

            if (v === undefined) {
                var e = this[0];
                if (e)
                    return e.scrollLeft;
            } else {
                if (mnumber.isNumber(v)) {
                    this.each(function() {
                        this.scrollLeft = v;
                    });
                    return this;
                }
            }
        },

        scrollTop: function(v) {
            ///<summary>
            ///设置或检索DOM树中元素已经滚动的上边界像素
            ///&#10;只在元素有滚动条的时候才有用(如csss设置overflow/overflow-y=scroll/auto)
            ///&#10;当有参数时，表示是设置行为
            ///&#10;当是设置行为，返回本My对象
            ///&#10;当是检索行为，则返回第一个元素已经滚动的上边界像素值
            ///</summary>
            ///<param name="v" type="Number" optional="true">要设置给有滚动条元素应该滚动的上边界像素</param>
            ///<returns type="My|Number"/>

            if (v === undefined) {
                var e = this[0];
                if (e)
                    return e.scrollTop;
            } else {
                if (mnumber.isNumber(v)) {
                    this.each(function() {
                        this.scrollTop = v;
                    });
                    return this;
                }
            }
        },

        show: function() {
            ///<summary>
            ///显示DOM树中各元素
            ///</summary>
            ///<returns type="My"/>

            this.each(function() {
                this.style.display = '';
            });
            return this;
        },

        hide: function() {
            ///<summary>
            ///隐藏DOM树中各元素
            ///</summary>
            ///<returns type="My"/>

            this.each(function() {
                this.style.display = 'none';
            });
            return this;
        },

        toggle: function() {
            ///<summary>
            ///给DOM树中各元素设置显示与隐藏开关，若显示则隐藏、否则显示
            ///</summary>
            ///<returns type="My"/>

            this.each(function() {
                this.style.display === 'none' ? this.style.display = '' : this.style.display = 'none';
            });
            return this;
        },

        cls: function(cls) {
            ///<signature>
            ///<summary>
            ///检索DOM树中第一个元素的类样式
            ///</summary>
            ///<returns type="Array"/>
            ///</signature>
            ///<signature>
            ///<summary>
            ///设置DOM树中各元素的类样式
            ///&#10;此方法将会覆盖元素先前指定的所有类样式
            ///</summary>
            ///<param name="cls" type="String">类样式名，可以是多个连续类名，用一个空格分隔，如'class1 class2'</param>
            ///<returns type="My"/>
            ///</signature>

            if (cls === undefined) return this[0] ? this[0].className.replace(/\s+/, ' ').split(' ') : [];

            this.each(function() {
                this.className = cls;
            });
            return this;
        },

        addClass: function(cls) {
            ///<summary>
            ///给DOM树中各元素添加类样式
            ///</summary>
            ///<param name="cls" type="String">类样式名，可以是多个连续类名，用一个空格分隔，如'class1 class2'</param>
            ///<returns type="My"/>

            if (mstring.isString(cls)) {
                cls = cls.split(' ');
                this.each(function() {
                    for (var i = 0, l = cls.length, c; i < l; i++) {
                        c = cls[i];
                        if (!My(this).hasClass(c))
                            this.className += (this.className ? ' ' : '') + c;
                    }
                });
            }
            return this;
        },

        removeClass: function(cls) {
            ///<summary>
            ///给DOM树中各元素删除类样式
            ///</summary>
            ///<param name="cls" type="String">类样式名，可以是多个连续类名，用一个空格分隔，如'class1 class2'</param>
            ///<returns type="My"/>

            if (mstring.isString(cls)) {
                cls = cls.split(' ');
                this.each(function() {
                    var cs = this.className.replace(/\s+/, ' ').split(' ');
                    if (cs.length) {
                        var i = 0,
                            l = cls.length,
                            c, j;
                        for (; i < l; i++) {
                            c = cls[i];
                            j = marray.indexOf(cs, c);
                            if (j > -1)
                                cs.splice(j, 1);
                        }
                        this.className = cs.join(' ');
                    }
                });
            }
            return this;
        },

        toggleClass: function(cls) {
            ///<summary>
            ///给DOM树中各元素设置类样式开关，若元素中有该类样式则删除，否则就添加
            ///</summary>
            ///<param name="cls" type="String">类样式名，只能是一个类名，不能是连续的多类名</param>
            ///<returns type="My"/>

            return this.hasClass(cls) ? this.removeClass(cls) : this.addClass(cls);
        },

        hasClass: function(cls) {
            ///<summary>
            ///判断元素是否有指定的类样式
            ///</summary>
            ///<param name="cls" type="String">类样式名，只能是一个类名，不能是连续的多类名</param>
            ///<returns type="Boolean"/>

            var r = false;
            this.each(function() {
                var cs = My(this).cls();
                for (var i = 0, len = cs.length; i < len; i++) {
                    if (cs[i] === cls) {
                        r = true;
                        return false;
                    }
                }
            });
            return r;
        },

        style: function(name, value) {
            ///<summary>
            ///设置或检索DOM树中各元素样式(设置在style属性上的样式)
            ///&#10;当第一个参数是字符串或数组，且无第二个参数，则属于检索行为，否则是设置行为，此时第一个参数可以是字符串和数组，也可以是一个字面量样式对
            ///&#10;若是设置行为，则返回本My对象
            ///&#10;若是检索行为，只返回第一个元素的样式，当只检索一个样式，则返回该样式值(无该样式返回null)，当是检索一组样式，则返回样式值数组(无任何匹配的样式返回长度为0的空数组)
            ///</summary>
            ///<param name="name" type="String|Array|Object">
            ///样式名(font-size/fontSize形式都可)，可以是字符串，如color、backgroud等;也可以是一个数组，表示多个样式，[name1,name2,name3,...]
            ///&#10;还可以是样式对，字面量{name:value,name:value}，表示是设置行为，此时将忽略第二个参数
            ///</param>
            ///<param name="value" type="String|Number|Array" optional="true">样式值，字符串或数值，与css样式一样；也可以是一个数组，表示多个样式值，与为数组的name一一对应</param>
            ///<returns type="My|String|Number|Array"/>

            if (value === undefined && !mobject.isPlainObject(name)) { //检索
                var e = this[0];
                if (e) {
                    var attrStyle = function(attr) {
                        if (e.style[attr])
                            return e.style[attr];
                        else if (e.currentStyle)
                            return e.currentStyle[attr];
                        else if (document.defaultView && document.defaultView.getComputedStyle)
                            return document.defaultView.getComputedStyle(e, null).getPropertyValue(mstring.joinCase(attr));
                        else
                            return null;
                    }

                    if (marray.isArray(name)) {
                        var ret = [],
                            v, i = 0,
                            l = name.length;
                        for (; i < l; i++) {
                            v = attrStyle(mstring.camelCase(name[i]));
                            if (v)
                                ret.push(v === 'auto' ? '' : v);
                        }
                        return ret;
                    }
                    var v2 = attrStyle(mstring.camelCase(name));
                    return v2 === 'auto' ? '' : v2;
                }
            } else { //设置
                var ts = '';
                if (mstring.isString(name))
                    ts = mstring.joinCase(name) + ':' + value; //wordWord先转成word-word

                if (marray.isArray(name) && marray.isArray(value)) {
                    for (var j = 0, l = name.length; j < l; j++)
                        ts += mstring.joinCase(name[j]) + ':' + value[j] + ';';
                }

                if (mobject.isPlainObject(name)) {
                    for (var k in name)
                        ts += mstring.joinCase(k) + ':' + name[k] + ';';
                }
                this.each(function() {
                    this.style.cssText += ' ;' + ts;
                });
                return this;
            }
        },

        removeStyle: function(name) {
            ///<summary>
            ///给DOM树中各元素删除样式(删除设置在style属性上的样式)
            ///</summary>
            ///<param name="name" type="String|Array|Object">
            ///样式名(font-size/fontSize)，可以是字符串，如color、backgroud等；name也可以是一个数组，表示删除多个样式，[name1,name2,name3,...]
            ///</param>
            ///<returns type="My"/>

            if (mstring.isString(name) || marray.isArray(name)) {
                this.each(function() {
                    var ss = '',
                        so = this.style.cssText.split(';');
                    if (so.length) {
                        var fn = function(na) {
                            var fl, i = 0,
                                l = so.length;
                            for (; i < l; i++) {
                                fl = so[i].split(':');
                                if (mstring.trim(fl[0]).toLowerCase() === mstring.joinCase(na)) {
                                    so.splice(i, 1);
                                    break;
                                }
                            }
                        }

                        if (marray.isArray(name)) {
                            for (var i = 0, l = name.length; i < l; i++) {
                                fn(name[i]);
                            }
                        } else fn(name);

                        this.style.cssText = so.join(';');
                    }
                });
            }
            return this;
        },

        clearStyle: function() {
            ///<summary>
            ///给DOM树中各元素清空元素的样式 (清空设置在style属性上的样式)
            ///</summary>
            ///<returns type="My"/>

            this.each(function() {
                this.style.cssText = '';
            });
            return this;
        },

        on: function(ty, fn, arg) {
            ///<summary>
            ///给DOM树中各元素注册DOM事件（自定义事件无效）
            ///</summary>
            ///<param name="ty" type="String">事件类型</param>
            ///<param name="fn" type="Function">事件函数</param>
            ///<param name="arg" type="Object" optional="true">需要传递给每一个处理函数的额外参数</param>
            ///<returns type="My"/>

            this.each(function() {
                devent.add(this, ty, fn, arg);
            });
            return this;
        },

        off: function(ty, fn) {
            ///<summary>
            ///给DOM树中各元素注销DOM事件
            ///</summary>
            ///<param name="ty" type="String">事件类型</param>
            ///<param name="fn" type="Function">事件函数，此函数必须是和注册事件的函数是同一个引用，否则注销无效</param>
            ///<returns type="My"/>

            this.each(function() {
                devent.remove(this, ty, fn);
            });
            return this;
        },

        release: function(ty) {
            ///<summary>
            ///给DOM树中各元素释放所有或指定的DOM事件
            ///</summary>
            ///<param name="ty" type="String">事件类型，当指定该值，则表示释放指定的DOM事件，否则表示释放所有的DOM事件</param>
            ///<returns type="My"/>

            this.each(function() {
                devent.release(this, ty);
            });
            return this;
        },

        once: function(ty, fn, arg) {
            ///<summary>
            ///给DOM树中各元素注册一个一次性DOM事件
            ///&#10;此事件只会执行一次，之后就会被注销
            ///</summary>
            ///<param name="ty" type="String">事件类型</param>
            ///<param name="fn" type="Function">事件函数</param>
            ///<param name="arg" type="Object" optional="true">需要传递给每一个处理函数的额外参数</param>
            ///<returns type="My"/>

            var that = this;
            this.on(ty, function(e) {
                that.off(ty, arguments.callee);
                fn.call(this, e, arg);
            });
            return this;
        },

        trigger: function(ty) {
            ///<summary>
            ///触发DOM树中各元素的所有指定DOM事件
            ///</summary>
            ///<param name="ty" type="String">事件类型</param>
            ///<returns type="My"/>

            this.each(function() {
                devent.trigger(this, ty);
            });
            return this;
        },

        hover: function(over, out) {
            ///<summary>
            ///鼠标移入移出
            ///</summary>
            ///<param name="over" type="Function">鼠标移入事件回调函数</param>
            ///<param name="out" type="Function">鼠标移出事件回调函数</param>
            ///<returns type="My"/>

            this.each(function() {
                var $ = new _M_(this);
                $.mouseover(function() {
                    over.call(this);
                });
                $.mouseout(function() {
                    out.call(this);
                });
            });
            return this;
        },

        click: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标点击事件，当无参数时，表示触发各元素的click事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.CLICK, fn) : this.trigger(eventType.CLICK);
        },

        dbclick: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标双击事件，当无参数时，表示触发各元素的dbclick事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.DBCLICK, fn) : this.trigger(eventType.DBCLICK);
        },

        mousedown: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标按下事件，当无参数时，表示触发各元素的mousedown事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.MOUSEDOWN, fn) : this.trigger(eventType.MOUSEDOWN);
        },

        mouseup: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标松开事件，当无参数时，表示触发各元素的mouseup事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.MOUSEUP, fn) : this.trigger(eventType.MOUSEUP);
        },

        mousemove: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标移动事件，当无参数时，表示触发各元素的mousemove事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.MOUSEMOVE, fn) : this.trigger(eventType.MOUSEMOVE);
        },

        mouseover: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标移入事件，不论鼠标指针移入事件元素或其子元素都会被触发，当无参数时，表示触发各元素的mouseover事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.MOUSEOVER, fn) : this.trigger(eventType.MOUSEOVER);
        },

        mouseout: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标移出事件，不论鼠标指针移出事件元素或其子元素都会被触发，当无参数时，表示触发各元素的mouseout事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.MOUSEOUT, fn) : this.trigger(eventType.MOUSEOUT);
        },

        mouseenter: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标进入事件，只在鼠标指针进入事件元素时触发，移入子元素不会触发，这点与mouseover事件不同，当无参数时，表示触发各元素的mouseenter事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.MOUSEENTER, fn) : this.trigger(eventType.MOUSEENTER);
        },

        mouseleave: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标离开事件，只在鼠标指针离开事件元素时触发，移出子元素不会触发，这点与mouseout事件不同，当无参数时，表示触发各元素的mouseleave事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.MOUSELEAVE, fn) : this.trigger(eventType.MOUSELEAVE);
        },

        mousewheel: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册鼠标滚轮滚动事件，当无参数时，表示触发各元素的mousewheel事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.MOUSEWHEEL, fn) : this.trigger(eventType.MOUSEWHEEL);
        },

        scroll: function(fn) {
            ///<summary>
            ///给DOM树中元素注册滚动条滚动事件，当无参数时，表示触发元素的scroll事件
            ///&#10;此事件仅对拥有滚动条的元素(window/iframe或设置了overflow=scroll/auto的元素)起作用
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.SCROLL, fn) : this.trigger(eventType.SCROLL);
        },

        drag: function(fn) {
            ///<summary>
            ///给DOM树中元素注册拖动事件，当无参数时，表示触发元素的drag事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.DRAG, fn) : this.trigger(eventType.DRAG);
        },

        drop: function(fn) {
            ///<summary>
            ///给DOM树中元素注册正在拖动事件，当无参数时，表示触发元素的drop事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.DROP, fn) : this.trigger(eventType.DROP);
        },

        dragstart: function(fn) {
            ///<summary>
            ///给DOM树中元素注册拖动开始事件，当无参数时，表示触发元素的dragstart事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.DRAGSTART, fn) : this.trigger(eventType.DRAGSTART);
        },

        dragover: function(fn) {
            ///<summary>
            ///给DOM树中元素注册被拖动至有效拖放目标上方时事件，当无参数时，表示触发元素的dragover事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.DRAGOVER, fn) : this.trigger(eventType.DRAGOVER);
        },

        dragenter: function(fn) {
            ///<summary>
            ///给DOM树中元素注册被拖动至有效的拖放目标时事件，当无参数时，表示触发元素的dragenter事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.DRAGENTER, fn) : this.trigger(eventType.DRAGENTER);
        },

        dragleave: function(fn) {
            ///<summary>
            ///给DOM树中元素注册离开有效拖放目标时事件，当无参数时，表示触发元素的dragleave事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.DRAGLEAVE, fn) : this.trigger(eventType.DRAGLEAVE);
        },

        dragend: function(fn) {
            ///<summary>
            ///给DOM树中元素注册拖动结束事件，当无参数时，表示触发元素的dragend事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.DRAGEND, fn) : this.trigger(eventType.DRAGEND);
        },

        keydown: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册键盘按键事件，当无参数时，表示触发各元素的keydown事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.KEYDOWN, fn) : this.trigger(eventType.KEYDOWN);
        },

        keypress: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册键盘按住事件，当无参数时，表示触发各元素的keypress事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.KEYPRESS, fn) : this.trigger(eventType.KEYPRESS);
        },

        keyup: function(fn) {
            ///<summary>
            ///给DOM树中各元素注册键盘按键松开事件，当无参数时，表示触发各元素的keyup事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.KEYUP, fn) : this.trigger(eventType.KEYUP);
        },

        change: function(fn) {
            ///<summary>
            ///给DOM树中各表单元素注册value值被更改事件，当无参数时，表示触发各表单元素的change事件
            ///&#10;此事件仅对表单元素有效，如input=text/search/email/checkbox/radio或select/textarea等
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.CHANGE, fn) : this.trigger(eventType.CHANGE);
        },

        submit: function(fn) {
            ///<summary>
            ///给DOM树中表单注册提交事件，当无参数时，表示触发各表单元素的submit事件
            ///&#10;此事件仅对表单元素有效，如input=submit/image等
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.SUBMIT, fn) : this.trigger(eventType.SUBMIT);
        },

        reset: function(fn) {
            ///<summary>
            ///给DOM树中表单注册重置事件，当无参数时，表示触发各表单元素的reset事件
            ///&#10;此事件仅对表单有效，表单中应该要有input=reset元素
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.RESET, fn) : this.trigger(eventType.RESET);
        },

        focus: function(fn) {
            ///<summary>
            ///给DOM树中元素注册获得焦点事件，当无参数时，表示触发元素的focus事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.FOCUS, fn) : this.trigger(eventType.FOCUS);
        },

        blur: function(fn) {
            ///<summary>
            ///给DOM树中元素注册失去焦点事件，当无参数时，表示触发元素的blur事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.BLUR, fn) : this.trigger(eventType.BLUR);
        },

        select: function(fn) {
            ///<summary>
            ///给DOM树中元素注册文本被选中事件，当无参数时，表示触发元素的select事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.SELECT, fn) : this.trigger(eventType.SELECT);
        },

        contextmenu: function(fn) {
            ///<summary>
            ///给DOM树中元素注册上下文菜单事件，当无参数时，表示触发元素的contextmenu事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.CONTEXTMENU, fn) : this.trigger(eventType.CONTEXTMENU);
        },

        formchange: function(fn) {
            ///<summary>
            ///给DOM树中各表单注册被更改事件，当无参数时，表示触发各表单的formchange事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.FORMCHANGE, fn) : this.trigger(eventType.FORMCHANGE);
        },

        forminput: function(fn) {
            ///<summary>
            ///给DOM树中各表单注册获得用户输入事件，当无参数时，表示触发各表单的forminput事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.FORMINPUT, fn) : this.trigger(eventType.FORMINPUT);
        },

        input: function(fn) {
            ///<summary>
            ///给DOM树中各表单元素注册获得用户输入事件，当无参数时，表示触发各表单元素的input事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.INPUT, fn) : this.trigger(eventType.INPUT);
        },

        invalid: function(fn) {
            ///<summary>
            ///给DOM树中各表单元素注册输入无效事件，当无参数时，表示触发各表单元素的invalid事件
            ///</summary>
            ///<param name="fn" type="Function" optional="true">事件函数</param>
            ///<returns type="My"/>

            return arguments.length > 0 ? this.on(eventType.INVALID, fn) : this.trigger(eventType.INVALID);
        },

        resize: function(fn) {
            ///<summary>
            ///给DOM树中元素注册窗口或框架被重新调整大小事件；此事件只对window窗口起作用
            ///</summary>
            ///<param name="fn" type="Function">事件函数</param>
            ///<returns type="My"/>

            return this.on(eventType.RESIZE, fn);
        },

        load: function(fn) {
            ///<summary>
            ///页面或图片/脚本/文件/框架等加载完毕事件
            ///</summary>
            ///<param name="fn" type="Function">事件函数</param>
            ///<returns type="My"/>

            return this.on(eventType.LOAD, fn);
        },

        unload: function(fn) {
            ///<summary>
            ///页面卸载/跳转/退出事件
            ///</summary>
            ///<param name="fn" type="Function">事件函数</param>
            ///<returns type="My"/>

            return this.on(eventType.UNLOAD, fn);
        },

        error: function(fn) {
            ///<summary>
            ///页面或图片/脚本/文件/框架等加载错误事件
            ///</summary>
            ///<param name="fn" type="Function">事件函数</param>
            ///<returns type="My"/>

            return this.on(eventType.ERROR, fn);
        },

        globalclick: function(fn) {
            ///<summary>
            ///全文档点击事件，当点击在除DOM树中元素以外的任何元素上（被阻止冒泡的元素除外），就执行指定函数
            ///&#10;此方法通常应用在点击页面时关闭/最小化浮动元素或弹出层
            ///</summary>
            ///<param name="fn" type="Function" optional="true">执行函数；可以不指定此函数，那么就默认执行关闭（隐藏）DOM树中各元素</param>
            ///<returns type="My"/>

            var scope = this;
            M(document.body).click(function(e) {
                e = e.target;
                if (!scope.has(e) && !scope.find(e)[0]) {
                    mfn.isFunction(fn) ? fn.call(scope, e) : scope.hide();
                }
            });
            return this;
        },

        setDrag: function(dragableParter, rect) {
            ///<summary>
            ///对DOM树中各元素（通常是弹出窗口）绑定拖拽动作，这样就可以用鼠标按住可拖拽部分（通常是弹出窗口标题），移动鼠标拖拽
            ///</summary>
            ///<param name="dragableParter" type="String|Element|My" optional="true">
            ///可拖拽部分，可以是查询选择符，也可以是DOM元素对象，还可以是一个My对象；默认是当前绑定元素本身
            ///</param>
            ///<param name="rect" type="Object" optional="true">限制拖拽的矩形范围，格式如：{left:0,top:0,width:100,height:100}；默认无限制范围</param>
            ///<returns type="My"/>

            var isS = mstring.isString(dragableParter),
                isE = dragableParter && base.isDomElement(dragableParter),
                isM = base.isMy(dragableParter);
            if (isS || isE || isM) {
                var $ = new _M_();
                if (isE || isM) $.add(dragableParter);
                else {
                    this.each(function() {
                        $.add(base.query(dragableParter, this));
                    });
                }
                var pre, target;
                var onmove = function(e) {
                    var cur = {
                        x: e.pageX,
                        y: e.pageY
                    };
                    if (pre) {
                        var w = target.outerWidth(),
                            h = target.outerHeight();
                        var pos = target.position();
                        pos.left += cur.x - pre.x;
                        pos.top += cur.y - pre.y;
                        if (rect) {
                            if (pos.left < rect.left) pos.left = 0;
                            else if (pos.left + w > rect.width) pos.left = rect.width - w;
                            if (pos.top < rect.top) pos.top = 0;
                            else if (pos.top + h > rect.height) pos.top = rect.height - h;
                        }
                        target.position(pos);
                    }
                    pre = cur;
                }
                var onup = function(e) {
                    My(document.body).off(eventType.MOUSEMOVE, onmove).off(eventType.MOUSEUP, onup).off(eventType.MOUSELEAVE, onup);
                    target = null;
                    pre = null;
                }
                this.mousedown(function(e) {
                    if ($.has(e.target) || $.find(e.target).length > 0) {
                        My(document.body).mousemove(onmove).mouseup(onup).mouseleave(onup);
                        pre = {
                            x: e.pageX,
                            y: e.pageY
                        };
                        target = My(this);
                    }
                });
            }
            return this;
        },

        validate: function(regExp) {
            ///<summary>验证用户输入，验证对象必须是input、textarea</summary>
            ///<returns type="Boolean"/>

            var r = true;
            this.each(function() {
                var v = this.value;
                if (v && !regExp.test(v)) {
                    r = false;
                    return false;
                }
            });
            return r;
        }
    };

    var isRegisterLoad = false,
        readyfns = [];

    function registerLoad(fn) {
        readyfns.push(fn);
        if (!isRegisterLoad) {
            My.addEvent(document, eventType.DOMCONTENTLOADED, completed);
            My.addEvent(window, eventType.LOAD, completed);
        }
        isRegisterLoad = true;
    }

    function completed() {
        My.removeEvent(document, eventType.DOMCONTENTLOADED, completed);
        My.removeEvent(window, eventType.LOAD, completed);
        My.isReady = true;
        marray.each(readyfns, function(fn) {
            fn.call(My);
        });
    }

    base.extend(base, {
        develop: function(args) {
            ///<summary>
            ///动态开发My库，以使得My扩容，获得扩展开发的能力
            ///</summary>
            ///<param name="args" type="Object">需要扩展的属性或函数字面量对象；可以传入一个或多个字面量对象参数</param>
            ///<returns type="My"/>

            var l = arguments.length;
            while (l--) this.extend(My, arguments[l]);
            return this;
        },

        plugin: function(name, lib) {
            ///<summary>
            ///绑定插件，使得My获得此插件的开发能力
            ///&#10;此函数不同于develp和extend，它将在My对象之下缔造新的命名空间，该命名空间中绑定了此插件的所有功能
            ///</summary>
            ///<param name="name" type="String">
            ///插件的名称，即新命名空间，此后便可以通过此名称来访问该插件的内容
            ///&#10;例如一个插件的名称为Map，则可以这样访问：My.Map.add()
            ///&#10;插件名称不能与其他插件冲突，必须保证唯一性，否则绑定插件不能成功
            ///&#10;此名称可以有子命名空间，如：Map.Overlays或Map.Overlays.Event
            ///</param>
            ///<param name="lib" type="Object">此插件的功能库，包含了所有属性和函数</param>
            ///<returns type="My"/>

            if (name && mobject.isPlainObject(lib)) {
                var ns = name.split('.'),
                    i = 0,
                    l = ns.length,
                    n, last = My;
                for (; i < l; i++) {
                    n = ns[i];
                    if (!last[n]) last[n] = i == l - 1 ? lib : {};
                    last = last[n];
                }
            }
            return this;
        },

        create: function(tag, text) {
            ///<summary>根据标签名创建元素或文本节点</summary>
            ///<param name="tag" type="String">标签名称，无论大小写</param>
            ///<param name="text" type="String" optional="true">设置文本节点的文本内容，只当是创建文本节点时，此值才有效</param>
            ///<returns type="My"/>

            var c;
            if (mstring.isString(tag)) {
                tag = tag.toUpperCase();
                c = (tag === 'TEXT' ? document.createTextNode(text) : document.createElement(tag));
            }
            return new _M_(c);
        },

        query: function(s, p) {
            if (this.isMy(p))
                p = p[0];
            return (p || document).querySelectorAll(s);
        },

        ajax: function(url, opts) {
            ///<summary>Ajax请求，根据传入的URL和可选参数，请求远程数据</summary>
            ///<param name="url" type="String">远程数据的URL地址</param>
            ///<param name="opts" type="Object" optional="true">设置给加载器的选项集合，具体内容参照ajaxSettings</param>
            ///<returns type="My.Loader|My.Jsonper"/>

            opts = opts || {};
            var loader = null;
            if (opts.jsonp) { //JSONP
                loader = new base.Jsonper();
                loader.callback = opts.callback || this.ajaxSettings.callback;
            } else {
                loader = new base.Loader();
                if (opts.header)
                    loader.beforeSend(opts.header);

                loader.method = (opts.method || this.ajaxSettings.method).toUpperCase();
                loader.params = opts.params || {};
            }
            loader.url = url;
            loader.dataType = opts.dataType || this.ajaxSettings.dataType;
            loader.parse = opts.parse === undefined ? this.ajaxSettings.parse : opts.parse;
            loader.async = opts.async === undefined ? this.ajaxSettings.async : opts.async;
            loader.cache = opts.cache === undefined ? this.ajaxSettings.cache : opts.cache;
            loader.timeout = opts.timeout === undefined ? this.ajaxSettings.timeout : opts.timeout;
            loader.bind(eventType.LOADED, function(e) {
                if (opts.success)
                    opts.success.call(this, this.data);
                this.release();
                loader = null;
            });
            loader.bind(eventType.ERROR, function(e, x) {
                if (opts.error)
                    opts.error.call(this, this, e, x);
                this.release();
                loader = null;
            });
            loader.bind(eventType.ABORT, function() {
                if (opts.abort)
                    opts.abort.call(this);
                this.release();
                loader = null;
            });
            loader.bind(eventType.TIMEOUT, function() {
                if (opts.ontimeout)
                    opts.ontimeout.call(this);
                this.release();
                loader = null;
            });
            loader.send();
            return loader;
        },

        getScript: function(url, callback) {
            ///<signature>
            ///<summary>动态加载一个远程JS脚本文件</summary>
            ///<param name="url" type="String">远程JS脚本文件所在的URL地址</param>
            ///<param name="callback" type="Function">
            ///当远程脚本加载完毕或加载失败，将会触发此回调函数
            ///&#10;此函数的this将会指向该脚本元素，若加载失败，会有一个描述错误信息的参数
            ///</param>
            ///</signature>
            ///<signature>
            ///<summary>按序列动态加载多个远程JS脚本文件</summary>
            ///<param name="url" type="Array">远程JS脚本文件所在的URL地址的数组集合</param>
            ///<param name="callback" type="Function">
            ///当所有远程脚本加载完毕或加载失败，将会触发此回调函数
            ///&#10;此函数的this将会指向My对象，此时将会有一个参数，用于放置加载失败的脚本url数组，可以通过这个参数来知道哪些脚本文件加载失败了
            ///</param>
            ///</signature>

            if (mstring.isString(url)) {
                var script = this.create('script');
                script.attr('type', 'text/javascript');
                script[0].onload = script[0].onreadystatechange = function() {
                    if (!this.readyState || (this.readyState && (this.readyState == 'loaded' || this.readyState == 'complete'))) {
                        script[0].onload = script[0].onreadystatechange = null;
                        if (callback) callback.call(this);
                        script.release();
                    }
                }
                script.error(function() {
                    if (callback) callback.call(this, 'load this script error!');
                    script.release();
                });
                script.attr('src', url);
                My('head').append(script);
            } else if (marray.isArray(url)) { //当是数组
                var count = 0,
                    that = this,
                    error = [],
                    fn = function(e) {
                        if (e)
                            error.push(this.src);
                        count++;
                        if (count === url.length) {
                            if (callback) callback.call(that, error);
                        }
                    };
                for (var i = 0; i < url.length; i++) {
                    this.getScript(url[i], fn);
                }
            }
        },

        getCSS: function(url) {
            ///<signature>
            ///<summary>动态加载一个远程CSS样式文件</summary>
            ///<param name="url" type="String">远程CSS样式文件所在的URL地址</param>
            ///</signature>
            ///<signature>
            ///<summary>按序列动态加载多个远程CSS样式文件</summary>
            ///<param name="urls" type="Array">远程CSS样式文件所在的URL地址的数组集合</param>
            ///</signature>

            if (mstring.isString(url)) url = [url];

            for (var i = 0, l = url.length; i < l; i++) {
                var css_link = M.create('link');
                css_link.attr({
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: url[i]
                });
                M('head').append(css_link);
            }
        },

        stringify: function(data, type) {
            ///<summary>序列化数据为文本，此方法负责按照指定的数据类型将其数据序列化为正确格式的字符串文本</summary>
            ///<param name="data" type="Object">数据对象</param>
            ///<param name="type" type="String" optional="true">指定的数据类型，其值为My.dataType中指定的数据类型之一，默认为JSON</param>
            ///<returns type="String"/>

            type = type || dataType.JSON;
            switch (type) {
                case dataType.JSON:
                    return JSON.stringify(data);
                case dataType.XML:
                    return this.serializeXML(data);
            }
        },

        parse: function(data, type) {
            ///<summary>解析数据，数据内容是字符串，此方法负责按照指定的数据类型将其解析为正确格式的对象</summary>
            ///<param name="data" type="String">数据内容</param>
            ///<param name="type" type="String" optional="true">指定的数据类型，其值为My.dataType中指定的数据类型之一，默认为JSON</param>
            ///<returns type="Object"/>

            type = type || dataType.JSON;
            switch (type) {
                case dataType.JSON:
                    return JSON.parse(data);
                case dataType.XML:
                    return base.parseXML(data);
            }
        },

        serializeXML: function(xml) {
            ///<summary>将一个XML文档序列化为未解析的XML标记的一个字符串</summary>
            ///<param name="xml" type="Element">XML文档</param>
            ///<returns type="String"/>

            var txt = '';
            try {
                if (window.XMLSerializer) { // W3C标准
                    var serializer = new XMLSerializer();
                    txt = serializer.serializeToString(xml);
                } else { //低版本IE
                    txt = xml.xml;
                }
            } catch (e) {}
            return txt;
        },

        parseXML: function(data) {
            ///<summary>解析XML内容，将其解析为XML文档对象</summary>
            ///<param name="data" type="String">XML内容</param>
            ///<returns type="Element"/>

            if (!mstring.isString(data))
                return null;

            var xml;
            try {
                if (window.DOMParser) { // W3C标准
                    var parser = new DOMParser();
                    xml = parser.parseFromString(data, "text/xml");
                } else { // IE
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = null;
            }
            return xml;
        }
    });

    base.plugin('Color', mcolor);

    ///My JS Library
    function My(s, p) {
        ///<field name="name" static="true" type="String">My JS库名称</field>
        ///<field name="version" static="true" type="String">My JS库版本号</field>
        ///<field name="isReady" static="true" type="Boolean">页面是否准备完毕</field>
        ///<field name="ready" static="true" type="Function">页面准备完毕的回调函数</field>
        return new _M_(s, p);
    }

    base.extend(My, base, {
        name: 'My',
        version: '1.0.0',
        isReady: false,
        client: mclient,
        eventType: eventType,
        dataType: dataType,
        //contentType: contentType,
        errorCode: errorCode
    }, mnumber, mdate, mcookie, mhtml, murl);

    base.augment(My, mstring, ['isString', 'ltrim', 'rtrim', 'trim', 'trimAll', 'camelCase', 'joinCase']);
    base.augment(My, mobject, ['isPlainObject']);
    base.augment(My, marray, ['isArray', 'merge', 'sortOn', 'uniqueOn']);
    base.augment(My, mfn, ['isFunction']);

    window.M = window.My = My;

})();