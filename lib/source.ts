import { docs } from '@/.source';
import { InferMetaType, InferPageType, loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import { attachFile, createOpenAPI } from 'fumadocs-openapi/server';

const lucideIcons = {
  LuNewspaper: icons.Newspaper,
  LuBookOpen: icons.BookOpen,
  LuFileText: icons.FileText,
  LuFile: icons.File,
  LuFileCode: icons.FileCode,
  LuFileCode2: icons.FileCode2,
  LuRocket: icons.Rocket,
};

export const docsSource = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    if (icon in lucideIcons)
      return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
  },
});

export const openApiSource = loader({
  baseUrl: '/docs/openapi',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    if (icon in lucideIcons)
      return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
  },
});

export const openapi = createOpenAPI({
  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    if (icon in lucideIcons)
      return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
  },
  pageTree: {
    attachFile,
  }
});



// export const source = loader({
//   baseUrl: '/docs',
//   icon(icon) {
//     if (icon && icon in icons)
//       return createElement(icons[icon as keyof typeof icons]);
//   },
//   source: docs.toFumadocsSource(),
//   pageTree: {
//     attachFile,
//   },
// });

// export const blog = loader({
//   baseUrl: '/blog',
//   source: createMDXSource(blogPosts),
// });


export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;