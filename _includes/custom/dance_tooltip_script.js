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
            placement: 'right',
            theme: 'dance',
        });
        {% endfor %}
    });
</script>