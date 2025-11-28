"use strict";
/* placeholder */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var images_ts_1 = require("../assets/config/images.ts");
var activeIndex = (0, vue_1.ref)(null);
var maskVisible = (0, vue_1.ref)(false);
var imgStyle = (0, vue_1.ref)({});
var itemRefs = (0, vue_1.ref)({});
// Transform state
var scale = (0, vue_1.ref)(1);
var rotate = (0, vue_1.ref)(0);
var transformStyle = (0, vue_1.computed)(function () { return ({
    transform: "rotate(".concat(rotate.value, "deg) scale(").concat(scale.value, ")")
}); });
var setItemRef = function (el, idx) {
    if (el)
        itemRefs.value[idx] = el;
};
// Scrollbar handling
var lockScroll = function () {
    document.body.style.overflow = 'hidden';
};
var unlockScroll = function () {
    document.body.style.overflow = '';
};
// Calculate centered position
var calcCenterStyle = function (target) {
    var padding = 40;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    // Natural dimensions
    var nw = target.naturalWidth;
    var nh = target.naturalHeight;
    // 默认放大到表情包原始大小，除非表情包大小超出屏幕范围
    var scale = Math.min(1, (vw - padding) / nw, (vh - padding) / nh);
    var targetW = nw * scale;
    var targetH = nh * scale;
    var targetTop = (vh - targetH) / 2;
    var targetLeft = (vw - targetW) / 2;
    return {
        top: "".concat(targetTop, "px"),
        left: "".concat(targetLeft, "px"),
        width: "".concat(targetW, "px"),
        height: "".concat(targetH, "px"),
        borderRadius: '4px'
    };
};
var openLightbox = function (index) { return __awaiter(void 0, void 0, void 0, function () {
    var target, rect;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = itemRefs.value[index];
                if (!target)
                    return [2 /*return*/];
                rect = target.getBoundingClientRect();
                activeIndex.value = index;
                resetTransformState();
                lockScroll();
                // Initial position (thumbnail)
                imgStyle.value = {
                    top: "".concat(rect.top, "px"),
                    left: "".concat(rect.left, "px"),
                    width: "".concat(rect.width, "px"),
                    height: "".concat(rect.height, "px"),
                    borderRadius: '10px',
                    transition: 'none' // Disable transition for initial set
                };
                return [4 /*yield*/, (0, vue_1.nextTick)()];
            case 1:
                _a.sent();
                maskVisible.value = true;
                // Animate to center
                requestAnimationFrame(function () {
                    imgStyle.value = __assign(__assign({}, calcCenterStyle(target)), { transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' });
                });
                return [2 /*return*/];
        }
    });
}); };
var switchImage = function (newIndex) {
    if (newIndex < 0 || newIndex >= images_ts_1.imageList.length)
        return;
    var target = itemRefs.value[newIndex];
    if (!target)
        return;
    activeIndex.value = newIndex;
    resetTransformState();
    // Morph to new image dimensions
    imgStyle.value = __assign(__assign({}, calcCenterStyle(target)), { transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' });
};
var closeLightbox = function () {
    if (activeIndex.value === null)
        return;
    var target = itemRefs.value[activeIndex.value];
    if (!target) {
        maskVisible.value = false;
        activeIndex.value = null;
        unlockScroll();
        return;
    }
    var rect = target.getBoundingClientRect();
    maskVisible.value = false;
    // Reset transform for clean closing animation
    scale.value = 1;
    rotate.value = 0;
    // Animate back to thumbnail
    imgStyle.value = {
        top: "".concat(rect.top, "px"),
        left: "".concat(rect.left, "px"),
        width: "".concat(rect.width, "px"),
        height: "".concat(rect.height, "px"),
        borderRadius: '10px',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
    };
    setTimeout(function () {
        activeIndex.value = null;
        unlockScroll();
    }, 300);
};
// Toolbar Actions
var resetTransformState = function () {
    scale.value = 1;
    rotate.value = 0;
};
var zoomIn = function () { return scale.value = Math.min(scale.value + 0.2, 3); };
var zoomOut = function () { return scale.value = Math.max(scale.value - 0.2, 0.2); };
var resetTransform = function () { return resetTransformState(); };
var rotateLeft = function () { return rotate.value -= 90; };
var rotateRight = function () { return rotate.value += 90; };
var downloadCurrent = function () {
    if (activeIndex.value === null)
        return;
    var url = images_ts_1.imageList[activeIndex.value];
    if (!url)
        return;
    var a = document.createElement('a');
    a.href = url;
    // 尝试从URL获取文件名，如果失败则使用默认名
    var filename = url.substring(url.lastIndexOf('/') + 1) || "meme-".concat(Date.now(), ".jpg");
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
// Keyboard support
var onKeyDown = function (e) {
    if (activeIndex.value === null)
        return;
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            switchImage(activeIndex.value - 1);
            break;
        case 'ArrowRight':
            switchImage(activeIndex.value + 1);
            break;
    }
};
(0, vue_1.onMounted)(function () {
    window.addEventListener('keydown', onKeyDown);
});
(0, vue_1.onUnmounted)(function () {
    window.removeEventListener('keydown', onKeyDown);
    unlockScroll();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['lightbox-container']} */ ;
/** @type {__VLS_StyleScopedClasses['lightbox-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['lightbox-img']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['lightbox-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['lightbox-toolbar']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "MeMe-Control" }));
var _loop_1 = function (img, idx) {
    // @ts-ignore
    [images_ts_1.imageList,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign({ class: "MeMe-Item" }, { key: (idx) }), { style: ({ animationDelay: idx * 0.25 + 's' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "MeMe-Item-Box" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "MeMe-Item-Img" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.img, __VLS_intrinsics.img)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.openLightbox(idx);
            // @ts-ignore
            [openLightbox,];
        } }, { src: (img), alt: "点击放大", loading: "lazy", ref: (function (el) { return __VLS_ctx.setItemRef(el, idx); }) }), { style: "cursor: pointer;" }), { style: ({ opacity: __VLS_ctx.activeIndex === idx ? 0 : 1 }) }));
    // @ts-ignore
    [setItemRef, activeIndex,];
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.imageList)); _i < _a.length; _i++) {
    var _b = _a[_i], img = _b[0], idx = _b[1];
    _loop_1(img, idx);
}
var __VLS_0 = {}.Teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ]} */ ;
// @ts-ignore
Teleport;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "body",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        to: "body",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_5 = __VLS_3.slots.default;
if (__VLS_ctx.activeIndex !== null) {
    // @ts-ignore
    [activeIndex,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "lightbox-container" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign({ onClick: (__VLS_ctx.closeLightbox) }, { class: "lightbox-mask" }), { class: ({ visible: __VLS_ctx.maskVisible }) }));
    // @ts-ignore
    [closeLightbox, maskVisible,];
    __VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign(__assign(__assign({ src: (__VLS_ctx.imageList[__VLS_ctx.activeIndex]) }, { class: "lightbox-img" }), { style: ([__VLS_ctx.imgStyle, __VLS_ctx.transformStyle]) }), { alt: "Full screen" }));
    // @ts-ignore
    [images_ts_1.imageList, activeIndex, imgStyle, transformStyle,];
    if (__VLS_ctx.activeIndex > 0) {
        // @ts-ignore
        [activeIndex,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(__VLS_ctx.activeIndex !== null))
                    return;
                if (!(__VLS_ctx.activeIndex > 0))
                    return;
                __VLS_ctx.switchImage(__VLS_ctx.activeIndex - 1);
                // @ts-ignore
                [activeIndex, switchImage,];
            } }, { class: "nav-btn prev" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.polyline)({
            points: "15 18 9 12 15 6",
        });
    }
    if (__VLS_ctx.activeIndex < __VLS_ctx.imageList.length - 1) {
        // @ts-ignore
        [images_ts_1.imageList, activeIndex,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(__VLS_ctx.activeIndex !== null))
                    return;
                if (!(__VLS_ctx.activeIndex < __VLS_ctx.imageList.length - 1))
                    return;
                __VLS_ctx.switchImage(__VLS_ctx.activeIndex + 1);
                // @ts-ignore
                [activeIndex, switchImage,];
            } }, { class: "nav-btn next" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.polyline)({
            points: "9 18 15 12 9 6",
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () { } }, { class: "lightbox-toolbar" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.zoomIn) }, { title: "放大" }));
    // @ts-ignore
    [zoomIn,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.zoomOut) }, { title: "缩小" }));
    // @ts-ignore
    [zoomOut,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.resetTransform) }, { title: "还原" }));
    // @ts-ignore
    [resetTransform,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.rotateLeft) }, { title: "左旋转" }));
    // @ts-ignore
    [rotateLeft,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.rotateRight) }, { title: "右旋转" }));
    // @ts-ignore
    [rotateRight,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.downloadCurrent) }, { title: "下载" }));
    // @ts-ignore
    [downloadCurrent,];
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path, __VLS_intrinsics.path)({
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.polyline, __VLS_intrinsics.polyline)({
        points: "7 10 12 15 17 10",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.line, __VLS_intrinsics.line)({
        x1: "12",
        y1: "15",
        x2: "12",
        y2: "3",
    });
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['MeMe-Control']} */ ;
/** @type {__VLS_StyleScopedClasses['MeMe-Item']} */ ;
/** @type {__VLS_StyleScopedClasses['MeMe-Item-Box']} */ ;
/** @type {__VLS_StyleScopedClasses['MeMe-Item-Img']} */ ;
/** @type {__VLS_StyleScopedClasses['lightbox-container']} */ ;
/** @type {__VLS_StyleScopedClasses['lightbox-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['visible']} */ ;
/** @type {__VLS_StyleScopedClasses['lightbox-img']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['prev']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['next']} */ ;
/** @type {__VLS_StyleScopedClasses['lightbox-toolbar']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
