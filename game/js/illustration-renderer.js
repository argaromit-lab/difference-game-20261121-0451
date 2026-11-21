// Dossier-facing renderer module. The authored SVG renderer remains the single art source.
import {renderOriginalWorld} from './original-worlds.js';
import {renderNewWorld} from './storybook-worlds.js';
export function sceneMarkup(chapter,changed=false,prefix='art'){return chapter<3?renderOriginalWorld(chapter,changed,prefix):renderNewWorld(chapter,changed,prefix);}
