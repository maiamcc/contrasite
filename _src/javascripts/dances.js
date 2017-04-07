$(function() {
  function slugify_title(title) {
    return title.replace(/ /g,'').toLowerCase();
  }

  function make_choreo_html(choreo) {
    return 'choreography!';
  }

  function insert_dances(dances) {
    var template = $('#dance-template');
    var dance_container = $('#dance-container');
    dances.forEach(function(dance) {
      var new_dance = template.clone();
      new_dance.attr('id', slugify_title(dance.title));
      console.log(dance.title);
      
      template.find('.dance-title').text(dance.title);
      template.find('.dance-formation').text(dance.formation);
      // template.find('.dance-difficulty').text(dance.difficulty);
      template.find('.dance-notes').text(dance.notes); 
      
      if (dance.starts) {
        // put in the thing and unhide
        // template.find('.dance-starts').text(dance.starts);    
      }
      if (dance.video_link) {
        // put in the thing and make it pretty
        // template.find('.dance-video_link').text(dance.video_link);
      }
           
      template.find('.dance-choreo').html(make_choreo_html(dance.choreo));
       
      // unhide elem.
      new_dance.css('display', '');

      // add to DOM
      dance_container.append(new_dance);
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
      title: 'Faking Communion',
      formation: 'becket L',
      difficulty: '"interesting"',
      starts: '',
      notes: 'written May 2015, premiered at CDNY March 2016. So named because this dance is full of fake-outs. The part that trips everyone up is the star in B1–it doesn\'t turn as far as you expect. When teaching, emphasize that it\'s the GENTS\' responsability to end the star by turning back to spiral P.',
      date_written: '201505',
      choreo: {
	a1: [
	  'circle L 3/4 (in a ring with N1)',
	  '(gents in lead) zig L, zag R, zig L (passing N2 to meet N3)',
	],
	a2: [
	  'spiral N3 by R 1x',
	  'turn back to swing N2 (your new N1–dance restarts in hands-4 with them)',
	],
	b1: [
	  'star L 3/4 (until opposite home with P)',
	  'gents turn back over R sh to spiral P 1 3/4',
	],
	b2: [
	  'gents start half hey (by L) to home side',
	  'P swing',
	],
      },
    },

    {
      title: 'Gimmie the Good Stuff',
      formation: 'becket L',
      difficulty: 'gnarly',
      starts: '',
      notes: 'written fall 2015 at The Good Stuff diner, beta tested by CDNY dancers. With the swing>swing transitions, encourage dancers to roll out of one swing and straight into the next. End effects: make sure you\'re waiting out on the correct diagonal (to come in in A1, wait on the left diag., to come in at B2, on the right).',
      date_written: '201509',
      choreo: {
	a1: [
	  'circle L 3/4',
	  '(with N, lady in the lead) slice L, lady roll neighbor gent away on the way back',
	],
	a2: [
	  'ladies chain across (to shadow)',
	  'ladies alle. R 1 1/2',
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
      formation: 'becket L, 2x. prog.',
      difficulty: 'gnarly',
      starts: '',
      notes: 'written for Zoë Madonna around New Years 2016 because she wanted a dance with a roll-away into a swing, and workshopped by some lovely dancers at NEFFA ‘16. All roll-aways include a half-sashay. At the beginning of the dance, shadow #1 is beyond your partner, shadow #2 is beyond them. Emphasize that the circle right in A2 must be fast so that partner rollaway can happen and leave the ladies ready to chain at the next phrase (perhaps prompting the circle early, as promenades out of a courtesy turn take less than 8 beats). In A1, chain with the neighbors straight across (these will be new neighbors).',
      date_written: '201601',
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
      notes: 'written January 2017, called shortly thereafter at Brooklyn Contra. I wanted a dance with a gents\' right-hand chain that was otherwise dead easy, and this is what I came up with. Note that the allemande in B2 is with your CURRENT neighbor, i.e. the one you starred with (this is the biggest point of confusion for experienced dancers used to looking for new neighbors out of a left-hand star).',
      date_written: '201701',
      choreo: {
	a1: [
	  'neighbor balance and swing',
	],
	a2: [
	  'gents alle. L 1 1/2',
	  'partner swing',
	],
	b1: [
	  'long lines forward, on the way back gents roll partner away with a half-sashay',
	  'gents right-hand chain to N',
	],
	b2: [
	  'left-hand star 1x',
	  'current neighbor alle. L 1 1/2',
	],
      },
    },

    {
      title: 'Life in Boxes II',
      formation: 'improper',
      difficulty: 'gnarly',
      starts: '',
      notes: 'written summer ‘16 while packing up my life to move, first called at Concord Thursday Jan. ‘17. N1 = current neighbor, N2 = next neighbor, N0 = previous. This dance is technically reverse indecent, but teach improper and start/end the walkthrough with the very end of B2 (current N alle. L 1/2).',
      date_written: '201606',
      choreo: {
	a1: [
	  'w/ N2, bal. (4) & box the gnat (4)',
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
	  'current N alle. R 1/2, new N alle. L 1/2 (this is your new N1)',
	],
      },
    },

    {
      title: 'Message from the Future',
      formation: 'becket L',
      difficulty: '"interesting"',
      starts: '',
      notes: 'written summer 2014 (while I was on vacation in Europe and my sweetie at the time was in Australia--I believe the title was in reference to time differences?), first called January 2016 at the Downtown Amherst contradance. Teaching note: emphasize that the chain in A1 is to your neighbor (there’s a lot of circling and not-quite-square phrases and it’s useful to have that point of reference).',
      date_written: '201506',
      video_link: 'https://www.youtube.com/watch?v=Gj1FlDrlbB8',
      choreo: {
	a1: [
	  'ladies chain to neighbor',
	  'mad robin, ladies in front first (i.e. CCW)',
	],
	a2: [
	  'ladies pass R to start a 3/4 hey (LR, PL, GR, NL, LR, PL)',
	  'when gents meet in the middle for the second time, spiral R 1x',
	],
	b1: [
	  'partner spiral and swing (opposite home side)',
	],
	b2: [
	  'circle L 1/2 and slide L to new neighbors (6)',
	  'with these new neighbors, circle L all the way (10)',
	],
      },
    },

    {
      title: 'Pink Martini',
      formation: 'becket R',
      difficulty: '"interesting"',
      starts: '',
      notes: 'locate your shadow at the start of the dance: look along your side of the set past your partner, shadow will be the first opposite-role person you see. Coming back into the dance at the middle of A1 or the middle of B1, dancers should reenter SWAPPED (i.e., lady on the left, gent on the right). Written in summer 2015 for Kate Fais on the occasion of her dying her hair pink, and first called January 2016 at the Youth Trad Song Weekend contradance.',
      date_written: '201507',
      video_link: '',
      choreo: {
	A1: [
	  'bal. the ring and spin right, spinning extra to face new neighbors',
	  'swing new neighbor',
	],
	A2: [
	  'bal. the ring and spin right (2x)',
	],
	B1: [
	  'bal. ring and gents roll neighbor lady away with a half-sashay',
	  'gents pull by R (2), allemande shadow L 1x-ish (6)',
	],
	B2: [
	  'look for partner, spiral and swing',
	],
      },
    },

    {
      title: 'Too Many Joshes',
      formation: 'improper',
      difficulty: 'gnarly',
      starts: 'Starts with a wavy line of gents in the center',
      notes: '',
      date_written: '201602',
      video_link: '',
      choreo: {
	a1: [
	  'gents bal. L then R, allemande L 3/4',
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
      formation: 'becket R',
      difficulty: 'accessible',
      starts: '',
      notes: 'written on a stuck train to Princeton, NJ, late 2014, and first called March 2015 in Silver Spring, MD. In the second half of B1, pull by R at the start of the do-si-do for some extra momentum.',
      date_written: '201412',
      video_link: '',
      choreo: {
	a1: [
	  '(ladies look on R diagonal for a new lady) ladies allemande R 1 1/2',
	  'neighbor swing',
	],
	a2: [
	  'ladies chain to partner',
	  'left-hand star 1x',
	],
	b1: [
	  'w/ shadow, bal. and box the gnat',
	  'do-si-do shadow 1 1/2',
	],
	b2: [
	  'partner b&s',
	],
      },
    },

    {
      title: 'Train to Trenton',
      formation: 'improper',
      difficulty: 'accessible',
      starts: '',
      notes: 'written on (surprise) a train to Trenton (en route to Contracopia) fall ‘16, first called soon after at Princeton. Satisfying hey-like figure along the sides at end/beginning, a promenade that actually flows (b/c it comes out of a courtesy turn), and a promenade –> circle R transition. Promenade may take much less time than dancers are used to b/c of the momentum coming out of a courtesy turn, but this leaves time for a leisurely circle R and pass-through.',
      date_written: '201611',
      video_link: '',
      choreo: {
	a1: [
	  'N spiral & swing',
	],
	a2: [
	  'circle L 3/4',
	  'P swing',
	],
	b1: [
	  'ladies cross (passing R), N spiral L 1x',
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
      video_link: '',
      choreo: {
	a1: [
	  'neighbor RH bal. and box the gnat',
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
	  'square through (RH to P across, bal. and pull by across, pull by L with N on side, repeat, look along side for a new N)',
	],
      },
    },
  ];

  console.log('hi there!');
  insert_dances(dances);
});
