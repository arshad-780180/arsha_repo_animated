import { projectsData } from './projects';
import { certifications } from './certifications';
import { profile } from './profile';

const p = (id) => projectsData.find((x) => x.id === id);
const cert = (needle) => certifications.find((c) => c.name.includes(needle));

// Each showcase section holds three vertical, reel-style cards.
// `captions` play one after another on the card like on-screen reel text.
export const showcases = [
  {
    id: 'data-science',
    title: 'Data Science',
    cards: [
      { kind: 'project', project: p('flowcast'), captions: ['FLOWCAST', 'PREDICTS', 'TRAVEL TIMES'] },
      { kind: 'project', project: p('keralalm-tiny'), captions: ['KERALALM', 'TINY', 'MALAYALAM AI'] },
      { kind: 'cert', cert: cert('Joy of Computing'), captions: ['NPTEL', 'ELITE', 'PYTHON'] },
    ],
  },
  {
    id: 'apps',
    title: 'Apps & Web',
    cards: [
      { kind: 'project', project: p('cyberguard'), captions: ['CYBERGUARD', 'AI RISK', 'ANALYZER'] },
      { kind: 'project', project: p('janavedi'), captions: ['JANAVEDHI', 'CIVIC', 'TECH'] },
      { kind: 'project', project: p('money-manager'), captions: ['MONEY', 'MANAGER', 'SYNCED'] },
    ],
  },
  {
    id: 'qa',
    title: 'Testing & QA',
    cards: [
      { kind: 'qa', title: `${profile.role} · ${profile.company}`, checks: ['Test case design', 'Test execution', 'Defect validation', 'Quality assurance'], captions: ['QA', 'ANALYST', 'INTERN'] },
      { kind: 'cert', cert: cert('hack'), captions: ['HACKATHON', '2025', 'IEEE MACE'] },
      { kind: 'cert', cert: cert('Git, GitHub'), captions: ['GIT', 'GITHUB', 'WORKSHOP'] },
    ],
  },
];
