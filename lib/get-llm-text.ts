import type { Page } from './source';

// Returns a plain-text snippet for a docs page suitable for LLM ingestion
export async function getLLMText(page: Page): Promise<string> {
  const title = page.data.title ?? '';
  const description = page.data.description ?? '';
  const url = page.url ?? '';

  return [`# ${title}`.trim(), description, url].filter(Boolean).join('\n\n');
}
