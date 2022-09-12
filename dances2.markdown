---
layout: page
title: "My Dances"
date: 2021-08-01 00:00
comments: false
sharing: true
footer: false
sidebar: false
---

<div id="blurb-container">
  {% for dance in site.data.dances.stuff %}
  <p id="blurb-template">
    <strong><a class="dance-title">{% dance.title %}</a></strong> [<span class="dance-difficulty">{% dance.difficulty %}</span>] - <span class="dance-blurb">{% dance.blurb %}</span>
  </p>
  {% endfor %}
</div>
