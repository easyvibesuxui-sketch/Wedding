import { botanical } from './botanical';
import { celestial } from './celestial';
import { deco } from './deco';
import { editorial } from './editorial';
import { kraft } from './kraft';
import { midnight } from './midnight';
import { ribbon } from './ribbon';
import { riviera } from './riviera';
import { tbilisi } from './tbilisi';
import { TEMPLATE_IDS, type TemplateDef, type TemplateId } from './types';
import { vineyard } from './vineyard';

const TEMPLATES: Record<TemplateId, TemplateDef> = {
  vineyard,
  riviera,
  tbilisi,
  midnight,
  botanical,
  deco,
  editorial,
  celestial,
  ribbon,
  kraft,
};

export function getTemplate(id: TemplateId): TemplateDef {
  return TEMPLATES[id];
}

/** In gallery order. */
export const ALL_TEMPLATES: TemplateDef[] = TEMPLATE_IDS.map((id) => TEMPLATES[id]);
