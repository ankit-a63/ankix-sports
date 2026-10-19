import { CricketMatch, MatchDetailData, SeriesItem, StandingsTournament } from '../types/cricket';

// ANKIX SPORTS - Verified Reference Cricket Data for UI & Offline Testing
// Clearly marked as Reference/Demo data when active.

export const SAMPLE_MATCHES: CricketMatch[] = [
  {
    id: 'match-ind-aus-2026',
    name: 'India vs Australia, 3rd T20I (Border-Gavaskar Trophy Series)',
    matchType: 't20',
    status: 'India need 38 runs in 22 balls',
    venue: 'Wankhede Stadium, Mumbai',
    date: '2026-10-19',
    dateTimeGMT: '2026-10-19T13:30:00Z',
    teams: ['India', 'Australia'],
    series_id: 'series-bgt-t20-2026',
    seriesName: 'India vs Australia T20I Series 2026',
    isLive: true,
    isUpcoming: false,
    isCompleted: false,
    category: 'live',
    matchStarted: true,
    matchEnded: false,
    tossWinner: 'India',
    tossChoice: 'bowl',
    score: [
      {
        r: 188,
        w: 6,
        o: 20.0,
        inning: 'Australia Inning 1'
      },
      {
        r: 151,
        w: 4,
        o: 16.2,
        inning: 'India Inning 1'
      }
    ]
  },
  {
    id: 'match-eng-sa-2026',
    name: 'England vs South Africa, 1st ODI',
    matchType: 'odi',
    status: 'South Africa 114/2 (21.4 ov) - Rain interruption (DLS in play)',
    venue: 'Lord\'s Cricket Ground, London',
    date: '2026-10-19',
    dateTimeGMT: '2026-10-19T10:00:00Z',
    teams: ['England', 'South Africa'],
    series_id: 'series-eng-sa-2026',
    seriesName: 'South Africa Tour of England 2026',
    isLive: true,
    isUpcoming: false,
    isCompleted: false,
    category: 'live',
    matchStarted: true,
    matchEnded: false,
    tossWinner: 'England',
    tossChoice: 'bowl',
    score: [
      {
        r: 114,
        w: 2,
        o: 21.4,
        inning: 'South Africa Inning 1'
      }
    ]
  },
  {
    id: 'match-csk-rcb-2026',
    name: 'Chennai Super Kings vs Royal Challengers Bengaluru, Match 1',
    matchType: 't20',
    status: 'Match starts at 7:30 PM IST',
    venue: 'MA Chidambaram Stadium, Chennai',
    date: '2026-10-21',
    dateTimeGMT: '2026-10-21T14:00:00Z',
    teams: ['Chennai Super Kings', 'Royal Challengers Bengaluru'],
    series_id: 'series-ipl-2026',
    seriesName: 'Indian Premier League 2026',
    isLive: false,
    isUpcoming: true,
    isCompleted: false,
    category: 'upcoming',
    matchStarted: false,
    matchEnded: false
  },
  {
    id: 'match-mi-kkr-2026',
    name: 'Mumbai Indians vs Kolkata Knight Riders, Match 2',
    matchType: 't20',
    status: 'Match scheduled for Thursday',
    venue: 'Wankhede Stadium, Mumbai',
    date: '2026-10-22',
    dateTimeGMT: '2026-10-22T14:00:00Z',
    teams: ['Mumbai Indians', 'Kolkata Knight Riders'],
    series_id: 'series-ipl-2026',
    seriesName: 'Indian Premier League 2026',
    isLive: false,
    isUpcoming: true,
    isCompleted: false,
    category: 'upcoming',
    matchStarted: false,
    matchEnded: false
  },
  {
    id: 'match-gt-rr-2026',
    name: 'Gujarat Titans vs Rajasthan Royals, Match 3',
    matchType: 't20',
    status: 'Match scheduled for Friday',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    date: '2026-10-23',
    dateTimeGMT: '2026-10-23T14:00:00Z',
    teams: ['Gujarat Titans', 'Rajasthan Royals'],
    series_id: 'series-ipl-2026',
    seriesName: 'Indian Premier League 2026',
    isLive: false,
    isUpcoming: true,
    isCompleted: false,
    category: 'upcoming',
    matchStarted: false,
    matchEnded: false
  },
  {
    id: 'match-ind-pak-final-2026',
    name: 'India vs Pakistan, Asia Cup Final',
    matchType: 't20',
    status: 'India won by 5 wickets (with 3 balls remaining)',
    venue: 'Dubai International Cricket Stadium, Dubai',
    date: '2026-10-16',
    dateTimeGMT: '2026-10-16T14:00:00Z',
    teams: ['India', 'Pakistan'],
    series_id: 'series-asia-cup-2026',
    seriesName: 'Men\'s Asia Cup 2026',
    isLive: false,
    isUpcoming: false,
    isCompleted: true,
    category: 'completed',
    matchStarted: true,
    matchEnded: true,
    tossWinner: 'India',
    tossChoice: 'bowl',
    matchWinner: 'India',
    score: [
      {
        r: 169,
        w: 9,
        o: 20.0,
        inning: 'Pakistan Inning 1'
      },
      {
        r: 173,
        w: 5,
        o: 19.3,
        inning: 'India Inning 1'
      }
    ]
  },
  {
    id: 'match-aus-nz-2026',
    name: 'Australia vs New Zealand, 2nd Chappell-Hadlee ODI',
    matchType: 'odi',
    status: 'Australia won by 42 runs',
    venue: 'Melbourne Cricket Ground (MCG), Melbourne',
    date: '2026-10-14',
    dateTimeGMT: '2026-10-14T03:30:00Z',
    teams: ['Australia', 'New Zealand'],
    series_id: 'series-chappell-hadlee-2026',
    seriesName: 'Chappell-Hadlee Trophy 2026',
    isLive: false,
    isUpcoming: false,
    isCompleted: true,
    category: 'completed',
    matchStarted: true,
    matchEnded: true,
    tossWinner: 'Australia',
    tossChoice: 'bat',
    matchWinner: 'Australia',
    score: [
      {
        r: 304,
        w: 7,
        o: 50.0,
        inning: 'Australia Inning 1'
      },
      {
        r: 262,
        w: 10,
        o: 46.4,
        inning: 'New Zealand Inning 1'
      }
    ]
  }
];

export const SAMPLE_MATCH_DETAILS: Record<string, MatchDetailData> = {
  'match-ind-aus-2026': {
    id: 'match-ind-aus-2026',
    name: 'India vs Australia, 3rd T20I',
    matchType: 't20',
    status: 'India need 38 runs in 22 balls',
    venue: 'Wankhede Stadium, Mumbai',
    date: '2026-10-19',
    dateTimeGMT: '2026-10-19T13:30:00Z',
    teams: ['India', 'Australia'],
    series_id: 'series-bgt-t20-2026',
    seriesName: 'India vs Australia T20I Series 2026',
    isLive: true,
    isUpcoming: false,
    isCompleted: false,
    category: 'live',
    matchStarted: true,
    matchEnded: false,
    tossWinner: 'India',
    tossChoice: 'bowl',
    umpires: ['Nitin Menon', 'Richard Illingworth'],
    referee: 'Javagal Srinath',
    score: [
      {
        r: 188,
        w: 6,
        o: 20.0,
        inning: 'Australia Inning 1'
      },
      {
        r: 151,
        w: 4,
        o: 16.2,
        inning: 'India Inning 1'
      }
    ],
    scorecard: [
      {
        inning: 'Australia Inning 1',
        batting: [
          {
            batsman: { id: 'p1', name: 'Travis Head' },
            dismissal: 'c Shubman Gill b Jasprit Bumrah',
            'dismissal-text': 'c Shubman Gill b Jasprit Bumrah',
            r: 58,
            b: 28,
            '4s': 7,
            '6s': 3,
            sr: 207.14
          },
          {
            batsman: { id: 'p2', name: 'Mitchell Marsh (c)' },
            dismissal: 'b Kuldeep Yadav',
            'dismissal-text': 'b Kuldeep Yadav',
            r: 34,
            b: 22,
            '4s': 3,
            '6s': 2,
            sr: 154.55
          },
          {
            batsman: { id: 'p3', name: 'Glenn Maxwell' },
            dismissal: 'c & b Hardik Pandya',
            'dismissal-text': 'c & b Hardik Pandya',
            r: 45,
            b: 21,
            '4s': 4,
            '6s': 3,
            sr: 214.28
          },
          {
            batsman: { id: 'p4', name: 'Marcus Stoinis' },
            dismissal: 'not out',
            'dismissal-text': 'not out',
            r: 28,
            b: 14,
            '4s': 2,
            '6s': 2,
            sr: 200.00
          },
          {
            batsman: { id: 'p5', name: 'Tim David' },
            dismissal: 'c Rishabh Pant b Arshdeep Singh',
            'dismissal-text': 'c Rishabh Pant b Arshdeep Singh',
            r: 12,
            b: 9,
            '4s': 1,
            '6s': 0,
            sr: 133.33
          }
        ],
        bowling: [
          {
            bowler: { id: 'b1', name: 'Jasprit Bumrah' },
            o: 4.0,
            m: 0,
            r: 28,
            w: 2,
            nb: 0,
            wd: 1,
            eco: 7.00
          },
          {
            bowler: { id: 'b2', name: 'Arshdeep Singh' },
            o: 4.0,
            m: 0,
            r: 42,
            w: 1,
            nb: 1,
            wd: 2,
            eco: 10.50
          },
          {
            bowler: { id: 'b3', name: 'Kuldeep Yadav' },
            o: 4.0,
            m: 0,
            r: 31,
            w: 2,
            nb: 0,
            wd: 1,
            eco: 7.75
          },
          {
            bowler: { id: 'b4', name: 'Hardik Pandya' },
            o: 4.0,
            m: 0,
            r: 39,
            w: 1,
            nb: 0,
            wd: 0,
            eco: 9.75
          },
          {
            bowler: { id: 'b5', name: 'Axar Patel' },
            o: 4.0,
            m: 0,
            r: 44,
            w: 0,
            nb: 0,
            wd: 1,
            eco: 11.00
          }
        ],
        extras: { r: 11, b: 2, lb: 3, w: 5, nb: 1, p: 0 },
        totals: { R: 188, O: 20.0, W: 6, RR: 9.40 }
      },
      {
        inning: 'India Inning 1',
        batting: [
          {
            batsman: { id: 'p6', name: 'Rohit Sharma' },
            dismissal: 'c Starc b Hazlewood',
            'dismissal-text': 'c Starc b Hazlewood',
            r: 41,
            b: 22,
            '4s': 5,
            '6s': 2,
            sr: 186.36
          },
          {
            batsman: { id: 'p7', name: 'Yashasvi Jaiswal' },
            dismissal: 'c Wade b Cummins',
            'dismissal-text': 'c Wade b Cummins',
            r: 24,
            b: 14,
            '4s': 3,
            '6s': 1,
            sr: 171.43
          },
          {
            batsman: { id: 'p8', name: 'Suryakumar Yadav (c)' },
            dismissal: 'c Maxwell b Zampa',
            'dismissal-text': 'c Maxwell b Zampa',
            r: 46,
            b: 25,
            '4s': 4,
            '6s': 3,
            sr: 184.00
          },
          {
            batsman: { id: 'p9', name: 'Rishabh Pant (wk)' },
            dismissal: 'b Zampa',
            'dismissal-text': 'b Zampa',
            r: 16,
            b: 12,
            '4s': 1,
            '6s': 1,
            sr: 133.33
          },
          {
            batsman: { id: 'p10', name: 'Hardik Pandya' },
            dismissal: 'not out',
            'dismissal-text': 'batting',
            r: 18,
            b: 10,
            '4s': 1,
            '6s': 1,
            sr: 180.00
          },
          {
            batsman: { id: 'p11', name: 'Rinku Singh' },
            dismissal: 'not out',
            'dismissal-text': 'batting',
            r: 4,
            b: 3,
            '4s': 0,
            '6s': 0,
            sr: 133.33
          }
        ],
        bowling: [
          {
            bowler: { id: 'b6', name: 'Mitchell Starc' },
            o: 3.2,
            m: 0,
            r: 34,
            w: 0,
            nb: 0,
            wd: 2,
            eco: 10.20
          },
          {
            bowler: { id: 'b7', name: 'Josh Hazlewood' },
            o: 4.0,
            m: 0,
            r: 29,
            w: 1,
            nb: 0,
            wd: 0,
            eco: 7.25
          },
          {
            bowler: { id: 'b8', name: 'Pat Cummins' },
            o: 3.0,
            m: 0,
            r: 31,
            w: 1,
            nb: 0,
            wd: 1,
            eco: 10.33
          },
          {
            bowler: { id: 'b9', name: 'Adam Zampa' },
            o: 4.0,
            m: 0,
            r: 38,
            w: 2,
            nb: 0,
            wd: 1,
            eco: 9.50
          },
          {
            bowler: { id: 'b10', name: 'Marcus Stoinis' },
            o: 2.0,
            m: 0,
            r: 18,
            w: 0,
            nb: 0,
            wd: 0,
            eco: 9.00
          }
        ],
        extras: { r: 6, b: 1, lb: 2, w: 3, nb: 0, p: 0 },
        totals: { R: 151, O: 16.2, W: 4, RR: 9.24 }
      }
    ]
  }
};

export const SAMPLE_SERIES: SeriesItem[] = [
  {
    id: 'series-ipl-2026',
    name: 'Indian Premier League 2026',
    startDate: 'Mar 22',
    endDate: 'May 28',
    odi: 0,
    t20: 74,
    test: 0,
    matches: 74,
    squads: 10
  },
  {
    id: 'series-bgt-t20-2026',
    name: 'India vs Australia T20I Series 2026',
    startDate: 'Oct 15',
    endDate: 'Oct 24',
    odi: 0,
    t20: 5,
    test: 0,
    matches: 5,
    squads: 2
  },
  {
    id: 'series-eng-sa-2026',
    name: 'South Africa Tour of England 2026',
    startDate: 'Oct 18',
    endDate: 'Nov 12',
    odi: 3,
    t20: 3,
    test: 3,
    matches: 9,
    squads: 2
  },
  {
    id: 'series-asia-cup-2026',
    name: 'Men\'s Asia Cup 2026',
    startDate: 'Sep 28',
    endDate: 'Oct 16',
    odi: 0,
    t20: 13,
    test: 0,
    matches: 13,
    squads: 6
  }
];

export const SAMPLE_STANDINGS: StandingsTournament = {
  tournamentId: 'series-ipl-2026',
  tournamentName: 'Indian Premier League',
  season: '2026',
  standings: [
    {
      pos: 1,
      team: 'Kolkata Knight Riders',
      teamShort: 'KKR',
      played: 14,
      won: 9,
      lost: 3,
      tied: 0,
      noResult: 2,
      points: 20,
      netRunRate: '+1.428',
      form: ['W', 'W', 'NR', 'W', 'W']
    },
    {
      pos: 2,
      team: 'Sunrisers Hyderabad',
      teamShort: 'SRH',
      played: 14,
      won: 8,
      lost: 5,
      tied: 0,
      noResult: 1,
      points: 17,
      netRunRate: '+0.414',
      form: ['W', 'NR', 'W', 'L', 'W']
    },
    {
      pos: 3,
      team: 'Rajasthan Royals',
      teamShort: 'RR',
      played: 14,
      won: 8,
      lost: 5,
      tied: 0,
      noResult: 1,
      points: 17,
      netRunRate: '+0.273',
      form: ['NR', 'L', 'L', 'L', 'L']
    },
    {
      pos: 4,
      team: 'Royal Challengers Bengaluru',
      teamShort: 'RCB',
      played: 14,
      won: 7,
      lost: 7,
      tied: 0,
      noResult: 0,
      points: 14,
      netRunRate: '+0.459',
      form: ['W', 'W', 'W', 'W', 'W']
    },
    {
      pos: 5,
      team: 'Chennai Super Kings',
      teamShort: 'CSK',
      played: 14,
      won: 7,
      lost: 7,
      tied: 0,
      noResult: 0,
      points: 14,
      netRunRate: '+0.392',
      form: ['L', 'W', 'L', 'W', 'L']
    },
    {
      pos: 6,
      team: 'Gujarat Titans',
      teamShort: 'GT',
      played: 14,
      won: 5,
      lost: 7,
      tied: 0,
      noResult: 2,
      points: 12,
      netRunRate: '-1.063',
      form: ['NR', 'NR', 'W', 'L', 'L']
    },
    {
      pos: 7,
      team: 'Mumbai Indians',
      teamShort: 'MI',
      played: 14,
      won: 4,
      lost: 10,
      tied: 0,
      noResult: 0,
      points: 8,
      netRunRate: '-0.318',
      form: ['L', 'L', 'L', 'W', 'L']
    }
  ]
};
