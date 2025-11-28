// Use eager loading with query=url to get static asset URLs at build time
// This provides immediate access to image URLs without bundling full image data
const modules = import.meta.glob('../imgs/webp/*.{png,jpg,jpeg,gif,webp}', {
    eager: true,
    query: '?url',
    import: 'default'
});

export const imageList = Object.values(modules) as string[];
