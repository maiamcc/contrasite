<script>
    {% if page.dances %}
    document.addEventListener('DOMContentLoaded', async function () {
        let currentLink;
        let iconCode = (await (await fetch('/assets/images/icon-dance-tip.svg')).text()).replace(/<\?[^\?]+\?>/g, '').replace("\n", '');
        // NB: dance data tag must match that of the <a> element, so make sure
        // this code and custom/dance_tooltip_link.html use the same slugify func
        {% for dance in page.dances %}
        currentLink = document.querySelector('[data-dance-name="{{dance.title | slugify}}"]');
        currentLink.innerHTML += iconCode;
        currentLink.querySelector('svg').classList.add('icon');
        tippy(currentLink, {
            content: `{% include custom/dance.html %}`,
            allowHTML: true,
            trigger: 'click',
            interactive: true,
            placement: 'right',
            theme: 'dance',
        });
        {% endfor %}
    });
    {% endif %}
</script>