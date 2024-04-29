// NB: dance class must match that of the <a> element, so make sure
// this code and custom/dance_tooltip_link.html use the same slugify func
tippy('.dancetip.{{dance.title | selector_safe_slugify}}', {
    content: `{% include custom/dance.html %}`,
    allowHTML: true,
    trigger: 'click',
    interactive: true,
    placement: 'right',
    theme: 'dance',
});