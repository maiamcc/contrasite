---
layout: page
title: "Tooltip Test"
footer: true
dances:
  - title: The Appetizer
    slug: theappetizer
    author: Scott Higgs
    formation: improper
    choreo:
      a1:
        - N b&s
      a2:
        - long lines
        - robins chain (to P)
      b1:
        - robins alle. R 1x
        - P swing
      b2:
        - circle L 3/4
        - bal. the ring and pass thru. up/down
  - title: Spring Beauty var.
    slug: springbeautyvar
    author: Don Flaherty
    formation: improper 
    choreo:
      a1:
        - N meltdown swing
      a2:
        - prom. across
        - robins chain (to P)
      b1:
        - robins alle. R 1x
        - partner swing
      b2:
        - circle L 1 1/4 (10)
        - zig L, zag R to next (6)
    choreo_notes: A1 was "N b&s"; B2 was "circle L 3/4; bal. and CA twirl".
  - title: 20 Below
    slug: twentybelow
    author: Bill Olson
    formation: becket L
    choreo:
    a1:
      - circle L 3/4 and form short wave
      - balance fwd & back, walk forward to new Ns
    a2:
      - this new N b&s
    b1:
      - larks alle. L 1 1/2
      - half hey (pass P by R)
    b2:
      - P b&s
    choreo_notes: original A2 was a wave balance and swing N

---
Hello world, this is a test! And ps the title of this post is: {{page.title}}.

<!-- todo: a little "include" that takes a dance object and turns it into a link of this format -->
1. <a class="dancetip theappetizer">The Appetizer</a>
2. <a class="dancetip springbeautyvar">Spring Beauty</a>
3. <a class="dancetip twentybelow">20 Below</a>

Content content content...

And I'm mentioning <a class="dancetip twentybelow">20 Below</a> in context.

<script>
    document.addEventListener('DOMContentLoaded', function () {
        {% for dance in page.dances %}
        tippy('.dancetip.{{dance.slug}}', {
            content: 'your dance is {{dance.title}}',
            // allowHTML: true,
            trigger: 'click',
            interactive: true,
            placement: 'right',
        });
        {% endfor %}
    });
</script>