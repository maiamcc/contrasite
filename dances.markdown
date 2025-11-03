---
layout: page
title: "My Dances"
date: 2014-08-16 22:12
comments: false
sharing: true
footer: false
description: "Contra choreography by Maia McCormick"
sidebar: false
---
As a choreographer, I strive to write dances that are both compelling and idiomatic--the coolest dance in the world isn't worth anything if it doesn't flow well enough for people to get the hang of it.

My dances have been called as far afield as Alaska and England, so that's pretty cool! Feedback is always welcome (as are requests!)--feel free to [drop me a line](/contact.html).

Dances marked with an asterisk (`*`) are particular favorites/have achieved escape velocity and are frequently called by others.

<!-- TODO: style this better (and maybe have toggles/filters?!)
A note on dance difficulties:

* `accessible`: interesting and enjoyable for experienced dancers, but accessible for beginners, hard to mess up
* `advanced`: a little trickier, better suited to later in the evening or more experienced halls
* `expert`: you should probably only call these to a very experienced hall or at an advanced dance
-->

{% assign dances = site.data.dances | sort: 'titleSort' %}

<div id="blurb-container">
  {% for dance in dances %}
    {% if dance.hidden != true and dance.beta != true %}
      <p>
        <strong><a class="dance-title" href="#{{ dance.title | legacy_slugify }}">{{ dance.title }}</a>{% if dance.fave %}*{% endif %}</strong> [<span class="dance-difficulty">{{ dance.difficulty }}</span>] — <span class="dance-blurb">{{ dance.blurb }}</span>
      </p>
    {% endif %}
  {% endfor %}
</div>

<div id="dance-container">
  {% for dance in dances %}
    {% if dance.hidden != true and dance.beta != true %}
      {% include custom/dance.html %}
    {% endif %}
  {% endfor %}
</div>
