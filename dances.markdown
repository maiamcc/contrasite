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

Here are a handful of dances that I've written, with more always on the way. I know at least a few of these have made it into others' collections, and been called as far afield as California and Alaska, so that's pretty cool! Feedback is always welcome (as are requests!)--feel free to [drop me a line](/contact.html).

Dances marked with an asterisk (`*`) are particular favorites/frequently called by others.

<!-- TODO: style this better (and maybe have toggles/filters?!)
A note on dance difficulties:

* `accessible`: interesting and enjoyable for experienced dancers, but accessible for beginners, hard to mess up
* `advanced`: a little trickier, better suited to later in the evening or more experienced halls
* `expert`: you should probably only call these to a very experienced hall or at an advanced dance
-->

{% assign dances = site.data.dances | sort: 'title' %}

<div id="blurb-container">
  {% for dance in dances %}
    {% if dance.hidden != true %}
      <p>
        <strong><a class="dance-title" href="#{{ dance.title | slugify | replace: '-', '' }}">{{ dance.title }}</a>{% if dance.fave %}*{% endif %}</strong> [<span class="dance-difficulty">{{ dance.difficulty }}</span>] — <span class="dance-blurb">{{ dance.blurb }}</span>
      </p>
    {% endif %}
  {% endfor %}
</div>

<div id="dance-container">
  {% for dance in dances %}
    {% if dance.hide != true %}
      <div class="dance" id="{{ dance.title | slugify | replace: '-', '' }}">
        <h4>{{ dance.title }}{% if dance.fave %}*{% endif %}{% if dance.coauthor %} <em class="coauthor">with {{ dance.coauthor }}</em>{% endif %} <em>({{ dance.formation}})
          {% if dance.video_link %} [<a href="{{ dance.video_link }}" target="_blank">VIDEO</a>]{% endif %}
        </em></h4>
        {% if dance.starts %}
          <p class="dance-starts"><em>{{ dance.starts }}</em></p>
        {% endif %}
        {% for sect in dance.choreo %}
          {% for move in sect[1] %}
            {% if forloop.index == 1 %}
              <p><strong>{{ sect[0] | upcase }}</strong>: {{ move }}</p>
            {% else %}
              <p>{{ move }}</p>
            {% endif %}
          {% endfor %}
        {% endfor %}
        {% if dance.choreo_notes %}
          <p><em><strong>Choreo Notes</strong>: <span class="dance-notes">{{ dance.choreo_notes }}</span></em></p>
        {% endif %}
        {% if dance.comp_notes %}
          <p><em><strong>Composition Notes</strong>: <span class="dance-notes">{{ dance.comp_notes }}</span></em></p>
        {% endif %}
      </div>
    {% endif %}
  {% endfor %}
</div>
