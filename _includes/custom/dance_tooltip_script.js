<script>
    document.addEventListener('DOMContentLoaded', function () {
        // NB: dance data tag must match that of the <a> element, so make sure
        // this code and custom/dance_tooltip_link.html use the same slugify func
        {% for dance in page.dances %}
        tippy('[data-dance-name="{{dance.title | slugify}}"]', {
            content: `{% include custom/dance.html %}`,
            allowHTML: true,
            trigger: 'click',
            interactive: true,
            theme: 'dance',
            placement: 'right',
            popperOptions: {
                strategy: 'fixed',
                modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['left', 'bottom', 'top'],
                        },
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            altAxis: true,
                            tether: false,
                        },
                    },
                ],
            },
        });
        {% endfor %}
    });
</script>