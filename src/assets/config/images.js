"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageList = void 0;
var modules = import.meta.glob('../imgs/webp/*.{png,jpg,jpeg,gif,webp}', {
    eager: true,
    import: 'default'
});
exports.imageList = Object.values(modules);
