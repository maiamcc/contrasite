// TODO: reorder technical notes vs context notes (and can but <br>'s in notes)

$(function() {
  var SECTIONS = ['a1', 'a2', 'b1', 'b2'];
    
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
      new_blurb.find('.dance-blurb').text(dance.blurb);

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
      notes: 'Written for Brooklyn Contra on 8/4/17, which is Obama\'s birthday, hence the title. Smooth dance with a hey-like figure up/down the set and a satisfying promenade > circle right transition.',
      date_written: '201708',
      blurb: 'smooth, hey-like figure up/down the set, satisfying promenade > circle right transition',
      choreo: {
	      a1: [
	        'N walk-around (R sh.) and swing',
	      ],
	      a2: [
          'gents allemande L 1 1/2',
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
      formation: 'becket L',
      difficulty: 'advanced',
      starts: '',
      notes: 'written May 2015, premiered at CDNY March 2016, B section rewritten and called at YDW \'17. So named because this dance is full of fake-outs.',
      date_written: '201505',
      blurb: 'smooth line-weaving dance with lots of fake-outs',
      choreo: {
	a1: [
	  'circle L 3/4 (in a ring with N1)',
	  '(gents in lead) zig L, zag R, zig L (passing N2 to meet N3)',
	],
	a2: [
	  'walk-around N3 by R 1x',
	  'turn back to swing N2 (your new N1–dance restarts in hands-4 with them)',
	],
	b1: [
    'circle L 1/2 and ladies swap places by R shoulder',
    'P walk-around',
	],
	b2: [
	  'gents start half hey (by L) to home side',
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
          '(with N, lady in the lead) slice L, lady roll neighbor gent away on the way back',
        ],
        a2: [
          'ladies chain across (to shadow)',
          'ladies allemande R 1 1/2',
        ],
        b1: [
          'swing N1 (the one you yearned with)',
          'swing N2',
        ],
        b2: [
          'ladies pull by on R diag. (4)',
          'swing P (12)',
        ],
      },
    },

    {
      title: 'Happy Jew Queer',
      formation: 'becket L, 2x prog.',
      difficulty: 'expert',
      starts: '',
      notes: 'written for Zoë Madonna around New Years 2016 because she wanted a dance with a roll-away into a swing, and workshopped by some lovely dancers at NEFFA ‘16. All roll-aways include a half-sashay. At the beginning of the dance, shadow #1 is beyond your partner, shadow #2 is beyond them. Encourage dancers to take their time with the promenade in A1, as promenades out of a courtesy turn take less time than usual. In A1, chain with the neighbors straight across (these will be new neighbors).',
      date_written: '201601',
      blurb: 'a disorientintly smooth dance with double-shadow interaction and rollaway into a swing',
      choreo: {
        a1: [
          'ladies chain across (to N)',
          '(w/ N) promenade across (to lady\'s home side)',
        ],
        a2: [
          'circle R 3/4 and ladies roll partner away',
          'ladies chain on L diagonal (to next N)',
        ],
        b1: [
          'ladies chain on R diagonal (to shadow #2)',
          'circle L 1x with shadow #1 (turn away from the one you just chained with)',
        ],
        b2: [
          'gents roll shadow away (4)',
            'partner swing (12)',
        ],
      },
    },

    {
      title: 'Hellooo Nurse!',
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      notes: 'written January 2017, called shortly thereafter at Brooklyn Contra. I wanted a dance with a gents\' right-hand chain to a neighbor that was otherwise dead easy, and this is what I came up with. (There are lots of great dances with a gents\' right-hand chain to their partner, but chaining to a neighbor lets dancers practice the move with lots of different folks.) Note that the allemande in B2 is with your CURRENT neighbor, i.e. the one you starred with (this is the biggest point of confusion for experienced dancers used to looking for new neighbors out of a left-hand star).',
      date_written: '201701',
      blurb: 'gents\' right-hand chain to N in an otherwise dead-easy dance',
      choreo: {
        a1: [
          'neighbor balance and swing',
        ],
        a2: [
          'gents allemande L 1 1/2',
          'partner swing',
        ],
        b1: [
          'long lines forward, on the way back gents roll partner away with a half-sashay',
          'gents right-hand chain to N',
        ],
        b2: [
          'left-hand star 1x',
          'current neighbor allemande L 1 1/2',
        ],
      },
    },

    {
      title: 'Life in Boxes',
      formation: 'reverse indecent',
      difficulty: 'advanced',
      starts: '',
      notes: 'written summer ‘16 while packing up my life to move, first called at Concord Thursday Jan. ‘17. N1 = current neighbor, N2 = next neighbor, N0 = previous. Hardest part is the off-beat balance and box; warn the dancers and/or ask the band for an extra kick on the balance at the end of A1. This dance is technically reverse indecent, but teach improper and start/end the walkthrough with the very end of B2 (current N allemande L 1/2).',
      date_written: '201606',
      blurb: 'visiting past and future neighbors; lots of gnat-boxing',
      video_link: 'https://www.youtube.com/watch?v=Pdjr-8WMw4s',
      choreo: {
        a1: [
          'w/ N2, balance (4) & box the gnat (4)',
          'pull by N2 by R (2), N1 by L (2), right-hand balance N0 (4)',
        ],
        a2: [
          'N0 box the gnat (4), pull by to swing N1',
        ],
        b1: [
          'circle L 3/4',
          'P swing (on gent\'s home side)',
        ],
        b2: [
          'circle L 3/4',
          'current N right-hand balance & pull by, new N allemande L 1/2 (this is your new N1)',
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
          'ladies chain to neighbor',
          'mad robin, ladies in front first (i.e. CCW)',
        ],
        a2: [
          'ladies pass R to start a 3/4 hey (LR, PL, GR, NL, LR, PL)',
          'when gents meet in the middle for the second time, walk-around R 1x',
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
          'ladies chain (to P)',
          'half hey (ladies pass R)',
        ],
        b1: [
          'partner balance and swing',
        ],
        b2: [
          'gents allemande L 1 1/2',
          '(same) neighbor swing',
        ]
      },
    },


    {
      title: 'Pink Martini',
      formation: 'becket R',
      difficulty: 'advanced',
      starts: '',
      notes: 'at beginning, shadow is beyond your partner. Depending on tune bounciness, can call B2 as either balance and swing or walk-around and swing (or leave it as dancers\' choice). Coming back into the dance at the middle of A1 or the middle of B1, dancers should reenter WRONG (i.e., lady on the left, gent on the right). Written in summer 2015 for Kate Fais on the occasion of her dying her hair pink, and first called January 2016 at the Youth Trad Song Weekend contradance.',
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
          'balance ring and gents roll neighbor lady away with a half-sashay',
          'gents pull by R (2), allemande shadow L 1x-ish (6)',
        ],
        b2: [
          'look for partner, [balance/walk-around] and swing',
        ],
      },
    },

    {
      title: 'Too Many Joshes',
      hide: true,
      formation: 'improper',
      difficulty: 'expert',
      starts: 'Starts with a wavy line of gents in the center',
      notes: 'Written for Michal Richardson, a nod to the state of the NYC contradance scene. The constraints given were "lots of action for the gents, as confusing and counter-intuitive as possible while still being a good dance."',
      date_written: '201602',
      blurb: 'gents chaining by ALL THE HANDS!',
      video_link: '',
      choreo: {
        a1: [
          'gents balance L then R, allemande L 3/4',
          'neighbor swing',
        ],
        a2: [
          'ladies allemande R 1 1/2',
          'partner swing',
        ],
        b1: [
          'gents chain by L (to N)',
          'circle L 3/4',
        ],
        b2: [
          'gents chain by R (to N)',
          'gents allemande R 1 1/4 to a long wave (taking L with a new gent)',
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
          'ladies chain to partner',
          'left-hand star 1x',
        ],
        b1: [
          'w/ shadow, balance and box the gnat',
          'do-si-do shadow 1 1/2',
        ],
        b2: [
          'partner b&s',
        ],
      },
    },

    {
      title: 'Train to Trenton',
      hide: true,
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      notes: 'written on (surprise) a train to Trenton (en route to Contracopia) fall ‘16, first called soon after at Princeton. Satisfying hey-like figure along the sides at end/beginning, a promenade that actually flows (b/c it comes out of a courtesy turn), and a promenade –> circle R transition. Promenade may take much less time than dancers are used to b/c of the momentum coming out of a courtesy turn, but this leaves time for a leisurely circle R and pass-through.',
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
          'ladies cross (passing R), N walk-around L 1x',
          'ladies chain (to P)',
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
      video_link: '',
      choreo: {
        a1: [
          'neighbor RH balance and box the gnat',
          'gents allemande L 1 1/2',
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
      notes: 'in B2, "ladies flip" by turning over R sh. to face the same direction as their P. Timing in the A is mushy (pousette takes less than 8 beats so mad robin starts before the beginning of A2)–encourage dancers to follow the movement rather than trying to fit it into the music, and use B1 to get everyone back together. This dance allows for almost constant eye contact with partner. Inspired by Will Mentor\'s "Lavender Snow", premiered at LCFD Spring Dance Camp 2018.',
      date_written: '201805',
      blurb: 'pousette, mad robin, lots of eye contact with partner',
      choreo: {
        a1: [
          'circle L 3/4',
          'half pousette w/ P (gents backing up first)',
        ],
        a2: [
          'mad robin (gents in front first)',
          '5/8 hey (gents L, PR, ladies L, NR, gents L)',
        ],
        b1: [
          'P walk-around and swing',
        ],
        b2: [
          'circle L all the way',
          'P allemande R 1x (4)',
          'ladies flip to face in, partners slide L to meet new Ns (4)',
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
          'ladies cross the set (by R sh.) to swing neighbor'
        ],
        a2: [
          'circle L all the way (8)',
          '(across the set) gents roll partner away (4)',
          'w/ partner, zig L and zag R to meet new neighbors'
        ],
        b1: [
          '(with new neighbors) circle R 1/2 (4)',
          '(on the side) ladies roll their neighbor away (4)',
          'ladies allemande R 1 1/2'
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
