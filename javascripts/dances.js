// TODO: reorder technical notes vs context notes (and can put <br>'s in notes)

$(function() {
  var SECTIONS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];

  // Strip title of all non-alphanumeric chars to make a url slug
  function slugify_title(title) {
    return title.replace(/[^a-zA-Z\d]/g,'').toLowerCase();
  }

  function new_paragraph(html) {
    return $('<p>' + html + '</p>');
  }

  function make_choreo_html(choreo) {
    var elem_to_fill = $('<span></span<');
    SECTIONS.forEach(function(sect) {
      if (!choreo[sect]) {
        return
      }
      var sect_label = '<strong>' + sect.toUpperCase() + '</strong>: ';
      for (var i = 0; i < choreo[sect].length; i++) {
        var line
        if (i === 0) {
          line = sect_label + choreo[sect][i]
        } else {
          line = choreo[sect][i]
        }
        elem_to_fill.append(new_paragraph(line));
      }
    });
    return elem_to_fill;
  }

  function insert_dances(dances) {
    var template = $('#dance-template');
    var dance_container = $('#dance-container');
    dances.forEach(function(dance) {
      if (dance.hide) {
        return;
      }
      var new_dance = template.clone();
      new_dance.attr('id', slugify_title(dance.title));

      new_dance.find('.dance-title').text(dance.title);
      new_dance.find('.dance-formation').text(dance.formation);
      // TODO: show difficulty in each dance
      // new_dance.find('.dance-difficulty').text(dance.difficulty);
      var notes = new_dance.find('.dance-notes');
      if (dance.notes) {
        notes.html(dance.notes);
      } else {
        notes.closest('p').css('display', 'none');
      }

      if (dance.starts) {
        // TODO: put in the thing and unhide
        // new_dance.find('.dance-starts').text(dance.starts);
      }
      if (dance.video_link) {
        new_dance.find('.video-link').html(' [<a href="' + dance.video_link + '" target="_blank">VIDEO</a>]');
      }

      var choreo = make_choreo_html(dance.choreo, choreo);
      new_dance.find('.dance-choreo').replaceWith(choreo);

      // unhide elem.
      new_dance.css('display', '');

      // add to DOM
      dance_container.append(new_dance);
    });
  }

  function insert_blurbs(dances) {
    var template = $('#blurb-template');
    var blurb_container = $('#blurb-container');
    dances.forEach(function(dance) {
      if (dance.hide) {
        return;
      }

      var new_blurb = template.clone();

      new_blurb.find('.dance-title').attr('href', '#' + slugify_title(dance.title)).text(dance.title);
      new_blurb.find('.dance-difficulty').text(dance.difficulty);
      new_blurb.find('.dance-blurb').html(dance.blurb);

      // unhide elem.
      new_blurb.css('display', '');

      // add to DOM
      blurb_container.append(new_blurb);

    });
  }

  /* TEMPLATE
    {
      title: '',
      formation: '',
      difficulty: '',
      starts: '',
      notes: '',
      date_written: '',
      blurb: '',
      video_link: '',
      choreo: {
        a1: [

        ],
        a2: [

        ],
        b1: [

        ],
        b2: [

        ]
      }
    }
  */

  var dances = [
    {
      title: 'Barack Me, Obamadeus',
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      video_link: 'https://www.youtube.com/watch?v=O7nYculG2EI',
      notes: 'Written for Brooklyn Contra on 8/4/17, which is Obama\'s birthday, hence the title. Smooth dance with a hey-like figure up/down the set and a satisfying promenade > circle right transition.',
      date_written: '201708',
      blurb: 'smooth, hey-like figure up/down the set, satisfying promenade > circle right transition',
      choreo: {
	      a1: [
	        'N walk-around (R sh.) and swing',
	      ],
	      a2: [
          'larks allemande L 1 1/2',
          'half hey (pass P by R sh.)',
	      ],
	      b1: [
          'P walk-around (R sh.) and swing',
	      ],
	      b2: [
          'promenade across',
          'circle R 3/4 and pass through by L sh.',
	      ],
      },
    },
    {
      title: 'Faking Communion',
      hide: true,
      formation: 'becket L',
      difficulty: 'advanced',
      starts: '',
      notes: 'written May 2015, premiered at CDNY March 2016, B section rewritten and called at YDW \'17. So named because this dance is full of fake-outs.',
      date_written: '201505',
      blurb: 'smooth line-weaving dance with lots of fake-outs',
      choreo: {
	a1: [
	  'circle L 3/4 (in a ring with N1)',
	  '(larks in lead) zig L, zag R, zig L (passing N2 to meet N3)',
	],
	a2: [
	  'walk-around N3 by R 1x',
	  'turn back to swing N2 (your new N1–dance restarts in hands-4 with them)',
	],
	b1: [
    'circle L 1/2 and ravens swap places by R shoulder',
    'P walk-around',
	],
	b2: [
	  'larks start half hey (by L) to home side',
	  'P swing',
	],
      },
    },

    {
      title: 'Gimmie the Good Stuff',
      hide: true,
      formation: 'becket L, 2x prog',
      difficulty: 'expert',
      starts: '',
      notes: 'written fall 2015 at The Good Stuff diner, beta tested by CDNY dancers. With the swing>swing transitions, encourage dancers to roll out of one swing and straight into the next. End effects: make sure you\'re waiting out on the correct diagonal (to come in in A1, wait on the left diag., to come in at B2, on the right).',
      date_written: '201509',
      blurb: 'leave your partner; swing > swing transitions',
      choreo: {
        a1: [
          'circle L 3/4',
          '(with N, raven in the lead) slice L, lady roll neighbor lark away on the way back',
        ],
        a2: [
          'ravens chain across (to shadow)',
          'ravens allemande R 1 1/2',
        ],
        b1: [
          'swing N1 (the one you yearned with)',
          'swing N2',
        ],
        b2: [
          'ravens pull by on R diag. (4)',
          'swing P (12)',
        ],
      },
    },

    {
      title: 'Gluten-Free Petronella',
      formation: 'becket L',
      difficulty: 'accessible',
      starts: '',
      notes: 'written winter \'16 as an alternative to Chris Ricciotti’s "Greenfield Petronella"; I wanted to preserve the balance-y feel of the dance and the CA twirl –> new neighbor swing, but wanted a single progression. (This variation has a Nevada twirl instead–just a California twirl that starts with the lark on the right/raven on the left.) First called at Mt. Airy in May \'16.',
      date_written: '201611',
      blurb: 'lots of ring balances, partner twirl into new neighbor swing',
      video_link: '',
      choreo: {
        a1: [
          'balance the ring and spin right',
          'balance the ring and lark roll neighbor raven away (with a half-sashay)'
        ],
        a2: [
          'balance the ring and Nevada twirl partner (to face new Ns)',
          'swing this new N'
        ],
        b1: [
          'ravens chain (to P)',
          'half hey (ravens passing R)',
        ],
        b2: [
          'partner balance and swing'
        ]
      }
    },

    {
      title: 'Happy Jew Queer',
      hide: true,
      formation: 'becket L, 2x prog.',
      difficulty: 'expert',
      starts: '',
      notes: 'written for Zoë Madonna around New Years 2016 because she wanted a dance with a roll-away into a swing, and workshopped by some lovely dancers at NEFFA ‘16. All roll-aways include a half-sashay. At the beginning of the dance, shadow #1 is beyond your partner, shadow #2 is beyond them. Encourage dancers to take their time with the promenade in A1, as promenades out of a courtesy turn take less time than usual. In A1, chain with the neighbors straight across (these will be new neighbors).',
      date_written: '201601',
      blurb: 'a disorientintly smooth dance with double-shadow interaction and rollaway into a swing',
      choreo: {
        a1: [
          'ravens chain across (to N)',
          '(w/ N) promenade across (to raven\'s home side)',
        ],
        a2: [
          'circle R 3/4 and ravens roll partner away',
          'ravens chain on L diagonal (to next N)',
        ],
        b1: [
          'ravens chain on R diagonal (to shadow #2)',
          'circle L 1x with shadow #1 (turn away from the one you just chained with)',
        ],
        b2: [
          'larks roll shadow away (4)',
            'partner swing (12)',
        ],
      },
    },

    {
      title: 'Hellooo Nurse!',
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      video_link: 'https://www.youtube.com/watch?v=VEhwfwwCndE',
      notes: 'written January 2017, called shortly thereafter at Brooklyn Contra. I wanted a dance with a larks\' right-hand chain to a neighbor that was otherwise dead easy, and this is what I came up with. (There are lots of great dances with a larks\' right-hand chain to their partner, but chaining to a neighbor lets dancers practice the move with lots of different folks.) Note that the allemande in B2 is with your CURRENT neighbor, i.e. the one you starred with (this is the biggest point of confusion for experienced dancers used to looking for new neighbors out of a left-hand star).',
      date_written: '201701',
      blurb: 'larks\' right-hand chain to N in an otherwise dead-easy dance',
      choreo: {
        a1: [
          'neighbor balance and swing',
        ],
        a2: [
          'larks allemande L 1 1/2',
          'partner swing',
        ],
        b1: [
          'long lines forward, on the way back larks roll partner away with a half-sashay',
          'larks right-hand chain to N',
        ],
        b2: [
          'left-hand star 1x',
          'current neighbor allemande L 1 1/2',
        ],
      },
    },

    {
      title: 'I\'ll Hold You In My Arms',
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      notes: 'Written March 2019 to pair with DJ Flourish\'s mix <a href="https://www.mixcloud.com/DJ_Flourish/4-in-my-arms-mix/">In My Arms</a> -- I wanted Petronellas in the B but needed a dance besides Tica Tica Timing.',
      date_written: '20190330',
      blurb: 'Easy Petronellas-in-the-B dance',
      video_link: '',
      choreo: {
        a1: [
          '(new) larks allemande L 1 1/4',
          'partner swing',
        ],
        a2: [
          'long lines forward and back',
          'ravens chain (to N)',
        ],
        b1: [
          'balance the ring and spin right (2x)',
        ],
        b2: [
          'neighbor balance and swing (and look on slight left diagonal for new larks)',
        ]
      }
    },

    {
      title: 'Life in Boxes',
      formation: 'improper',
      difficulty: 'advanced',
      starts: '',
      notes: 'written summer ‘16 while packing up my life to move, first called at Concord Thursday Jan. ‘17. N1 = current neighbor (start the dance with them), N0 = previous (the one you swing), N-1 = previous previous neighbor. Hardest part is the off-beat balance and box; warn the dancers and/or ask the band for an extra kick on the balance at the end of A1.',
      date_written: '201606',
      blurb: 'visiting neighbors up and down the line; lots of gnat-boxing',
      video_link: 'https://www.youtube.com/watch?v=Pdjr-8WMw4s',
      choreo: {
        a1: [
          'w/ N1, balance (4) & box the gnat (4)',
          'pull by N1 by R (2), N0 by L (2), right-hand balance N-1 (4)',
        ],
        a2: [
          'N-1 box the gnat (4), pull by to swing N0',
        ],
        b1: [
          'circle L 3/4',
          'P swing (on lark\'s home side)',
        ],
        b2: [
          'circle L 3/4',
          'N0 right-hand balance & pull by, N1 allemande L 1/2 (you\'ll swing them next time through the dance) and give RH to next (new N1)',
        ],
      },
    },

    {
      title: 'Message from the Future',
      formation: 'becket L',
      difficulty: 'advanced',
      starts: '',
      notes: 'written summer 2014 (while I was on vacation in Europe and my sweetie at the time was in Australia–I believe the title was in reference to time differences?), first called January 2016 at the Downtown Amherst contradance. Teaching note: emphasize that the chain in A1 is to your neighbor (there’s a lot of circling and not-quite-square phrases and it’s useful to have that point of reference).',
      date_written: '201506',
      blurb: 'lots of eye contact and flowing motion',
      video_link: 'https://www.youtube.com/watch?v=Gj1FlDrlbB8',
      choreo: {
        a1: [
          'ravens chain to neighbor',
          'mad robin, ravens in front first (i.e. CCW)',
        ],
        a2: [
          'ravens pass R to start a 3/4 hey (LR, PL, GR, NL, LR, PL)',
          'when larks meet in the middle for the second time, walk-around R 1x',
        ],
        b1: [
          'partner walk-around and swing (opposite home side)',
        ],
        b2: [
          'circle L 1/2 and slide L to new neighbors (6)',
          'with these new neighbors, circle L all the way (10)',
        ],
      },
    },

    {
      title: 'Muppets and Mazels',
      formation: 'becket R',
      difficulty: 'advanced',
      starts: '',
      notes: 'For best results, don\'t clap after the second Petronella spin -- just keep spinning into the new neighbor seesaw. (To line up with next neighbor, ravens spin wide/larks stop a little short). Written March 2019 as a wedding gift for the utterly delightful Michal Richardson and Josh Marantz (so that Michal could spin as much as possible).',
      date_written: '20190329',
      blurb: 'Petronellas and lots of spinning',
      video_link: '',
      choreo: {
        a1: [
          'give and take (larks take your N home)',
          'neighbor swing',
        ],
        a2: [
          'balance the ring and spin right',
          'balance the ring and spin right, spinning extra to face new neighbors',
        ],
        b1: [
          'new neighbor seesaw 1 1/4',
          'larks allemande R 1 1/2',
        ],
        b2: [
          'partner balance and swing',
        ]
      }
    },

    {
      title: 'Neighbor, Neighbor On the Wall',
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      notes: 'Written for a workshop at YDW \'17 to practice communication with neighbors.',
      date_written: '201709',
      blurb: 'two swings with same neighbor',
      video_link: '',
      choreo: {
        a1: [
          'long lines forward and back',
          '(new) neighbor swing',
        ],
        a2: [
          'ravens chain (to P)',
          'half hey (ravens pass R)',
        ],
        b1: [
          'partner balance and swing',
        ],
        b2: [
          'larks allemande L 1 1/2',
          '(same) neighbor swing',
        ]
      },
    },


    {
      title: 'Pink Martini',
      formation: 'becket R',
      difficulty: 'advanced',
      starts: '',
      notes: 'at beginning, shadow is beyond your partner. Depending on tune bounciness, can call B2 as either balance and swing or walk-around and swing (or leave it as dancers\' choice). Coming back into the dance at the middle of A1 or the middle of B1, dancers should reenter WRONG (i.e., raven on the left, lark on the right). Written in summer 2015 for Kate Fais on the occasion of her dying her hair pink, and first called January 2016 at the Youth Trad Song Weekend contradance.',
      date_written: '201507',
      blurb: 'stompy fun; Petronella turns (incl. Petronella turn to swing a new N) and a little shadow time',
      video_link: '',
      choreo: {
        a1: [
          'balance the ring and spin right, spinning extra to face new neighbors',
          'swing new neighbor',
        ],
        a2: [
          'balance the ring and spin right (2x)',
        ],
        b1: [
          'balance ring and larks roll neighbor raven away with a half-sashay',
          'larks pull by R (2), allemande shadow L 1x-ish (6)',
        ],
        b2: [
          'look for partner, [balance/walk-around] and swing',
        ],
      },
    },

    {
      title: 'Poly Wanna Corner?',
      formation: 'improper',
      difficulty: 'expert',
      starts: '',
      notes: 'Active roles alternate; directions in brackets are for [ ravens / larks ] active, respectively. In the transition into CC, one of the actives will have an awkward hand transition – it’s up to the neighbor gating them to pass their right hand into the allemande. In CC, one of your corners is your partner, don’t be alarmed. C2 chain is always done by the actives (by the hand they\'re used to chaining by: RH for ravens, LH for larks).',
      date_written: '201809', // originally Fall 2017
      blurb: 'AABBCC dance with same-role contra corners',
      video_link: '',
      choreo: {
        a1: [
          'neighbor balance and swing, end facing down the hall',
        ],
        a2: [
          'down the hall four in line, [ right / left ] side turn as couple/other side turn alone (puts the [ ravens / larks ] (actives) in the middle)',
          'come back, [ larks / ravens ] (on the outside) gate their neighbor up and around to face across'
        ],
        b1: [
          '[ ravens / larks ] turn same role contra-corners',
        ],
        b2: [
          'same role balance and swing',
        ],
        c1: [
          '(roll out of swing for) partner balance and swing',
        ],
        c2: [
          '[ ravens / larks ] [ RH / LH ] chain across',
          '[ left / right ] hand star 1x to new neighbors',
        ]
      }
    },

    {
      title: 'Star Trek: the Next Generation',
      formation: 'becket R',
      difficulty: 'advanced',
      starts: '',
      notes: 'A loving re-imagination of Mike Richardson\'s <a href="https://www.cambridgefolk.org.uk/contra/dances/mike_richardson/star_trek.html" target="_blank">Star Trek</a>, premiered at Brooklyn Contra in March 2019. Before the B2 star, note direction of progression (i.e. to the RIGHT); dancers walk along the set single file in this direction.',
      date_written: '201812',
      blurb: 'Mike Richardson\'s <a href="https://www.cambridgefolk.org.uk/contra/dances/mike_richardson/star_trek.html" target="_blank">Star Trek</a>, re-imagined.',
      video_link: '',
      choreo: {
        a1: [
          'hands-across left-hand star 1x',
          'larks LH chain (to N)',
        ],
        a2: [
          'full hey (larks pass L) and ravens ricochet',
        ],
        b1: [
          'P walk-around and swing',
        ],
        b2: [
          'promenade across',
          'left-hand star 1x and walk along the set (ravens in the lead) to progress',
        ]
      }
    },

    {
      title: 'Too Many Joshes',
      hide: true,
      formation: 'improper',
      difficulty: 'expert',
      starts: 'Starts with a wavy line of larks in the center',
      notes: 'Written for Michal Richardson, a nod to the state of the NYC contradance scene. The constraints given were "lots of action for the larks, as confusing and counter-intuitive as possible while still being a good dance."',
      date_written: '201602',
      blurb: 'larks chaining by ALL THE HANDS!',
      video_link: '',
      choreo: {
        a1: [
          'larks balance L then R, allemande L 3/4',
          'neighbor swing',
        ],
        a2: [
          'ravens allemande R 1 1/2',
          'partner swing',
        ],
        b1: [
          'larks chain by L (to N)',
          'circle L 3/4',
        ],
        b2: [
          'larks chain by R (to N)',
          'larks allemande R 1 1/4 to a long wave (taking L with a new lark)',
        ],
      },
    },

    {
      title: 'Train Delay',
      formation: 'becket L',
      difficulty: 'accessible',
      starts: '',
      notes: 'written on a stuck train to Princeton, NJ, late 2014, and first called March 2015 in Silver Spring, MD. In the second half of B1, pull by R at the start of the do-si-do for some extra momentum.',
      date_written: '201412',
      blurb: 'an accessible and energetic shadow dance (also a good closer)',
      video_link: 'https://www.youtube.com/watch?v=QsFkcDFBOsM',
      choreo: {
        a1: [
          '(slide left to) circle L 3/4',
          'neighbor swing',
        ],
        a2: [
          'ravens chain to partner',
          'left-hand star 1x',
        ],
        b1: [
          'w/ shadow, balance and box the gnat',
          'do-si-do shadow 1 1/2',
        ],
        b2: [
          'partner balance and swing',
        ],
      },
    },

    {
      title: 'Train to Trenton',
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      notes: 'written on (surprise) a train to Trenton (en route to Contracopia) fall ‘16, first called soon after at Princeton. Satisfying hey-like figure along the sides at end/beginning, a promenade that actually flows (b/c it comes out of a courtesy turn), and a promenade –> circle R transition. Promenade may take much less time than dancers are used to b/c of the momentum coming out of a courtesy turn, but this leaves time for a leisurely circle R and pass-through. Emphasize to dancers that the first move of B1 is a cross (no hands!) and NOT a chain.',
      date_written: '201611',
      blurb: 'slick, smooth, extremely flowy; promenade and circle R transitions that I actually feel good about',
      video_link: '',
      choreo: {
        a1: [
          'N walk-around & swing',
        ],
        a2: [
          'circle L 3/4',
          'P swing',
        ],
        b1: [
          'ravens cross (passing R), N walk-around L 1x',
          'ravens chain (to P)',
        ],
        b2: [
          'promenade across (w/ P)',
          'circle R 3/4 & pass thru. up/down by the L shoulder',
        ],
      },
    },

    {
      title: 'Treasure of the Soda Bar',
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      notes: 'A1 is from James Hutson’s “Treasure of the Sierra Madre”. This dance was tested at Soda Bar in Brooklyn, hence the title, and first called at Glen Echo FND in August 2016.',
      date_written: '201606',
      blurb: 'square through dance with A1 taken from James Hutson\'s Treasure of the Sierra Madre',
      video_link: 'https://www.youtube.com/watch?v=17BOcvKaQzA',
      choreo: {
        a1: [
          'neighbor RH balance and box the gnat',
          'larks allemande L 1 1/2',
        ],
        a2: [
          'half hey (pass P by R on the side)',
          'partner swing',
        ],
        b1: [
          'circle L 3/4',
          'neighbor swing',
        ],
        b2: [
          'square through (RH to P across, balance and pull by across, pull by L with N on side, repeat, look along side for a new N)',
        ],
      },
    },
    {
      title: 'Violet Ice',
      formation: 'becket L',
      difficulty: 'advanced',
      notes: 'Timing in the A is mushy; both the mad robin and the pousette take about 6 counts, so the mad robin starts a little before A2, and the 5/8 hey finishes just about at the end of the A2. Encourage dancers to follow the movement rather than trying to fit it into the music (i.e. DON\'T do the English dance thing of trying to make the moves fill the phrase), and use B1 to get everyone back together. This dance allows for almost constant eye contact with partner. Inspired by Will Mentor\'s "Lavender Snow", premiered at LCFD Spring Dance Camp 2018. The two-hand turn in B2 was a later addition, suggested by Shoshana Silverman (fall 2022).',
      date_written: '201805',
      blurb: 'mad robin / pousette. Smooth and English-y, lots of eye contact with partner',
      choreo: {
        a1: [
          'circle L 3/4',
          'half pousette w/ P (larks backing up first)',
        ],
        a2: [
          'mad robin (larks in front first)',
          '5/8 hey (larks L, PR, ravens L, NR, larks L)',
        ],
        b1: [
          'P walk-around and swing',
        ],
        b2: [
          'circle L all the way',
          'P two-hand turn 1x (4)',
          'open up to face across, slide L to meet new Ns (4)',
        ]
      }
    },
    {
      title: 'Where Gnome Ann Has Gone Before',
      formation: 'becket R',
      difficulty: 'advanced',
      starts: '',
      notes: 'all roll-aways include a half-sashay. Loosely inspired by Don Flaherty\'s "Clipper" and premiered at Brooklyn Contra on 12/15/17. The title is a reference to <a href="https://xkcd.com/1704/">this xkcd</a>.',
      date_written: '201712',
      blurb: 'circles + roll-aways flowing nicely together, with rolls for both roles',
      video_link: '',
      choreo: {
        a1: [
          'ravens cross the set (by R sh.) to swing neighbor'
        ],
        a2: [
          'circle L all the way (8)',
          '(across the set) larks roll partner away (4)',
          'w/ partner, zig L and zag R to meet new neighbors'
        ],
        b1: [
          '(with new neighbors) circle R 1/2 (4)',
          '(on the side) ravens roll their neighbor away (4)',
          'ravens allemande R 1 1/2'
        ],
        b2: [
          'partner balance and swing'
        ]
      }
    },
  ];

  insert_blurbs(dances);
  insert_dances(dances);
});
