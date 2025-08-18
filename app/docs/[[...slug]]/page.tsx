import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  } from "@/components/layouts/page";
import { getMDXComponents } from "@/mdx-components";
import { NotFound } from "@/components/not-found";
// import { TableOfContent } from "@/components/table-of-content";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;  
  const page = source.getPage(params.slug);
  if (!page) return <NotFound />;
  const hasToc = page.data.toc && page.data.toc.length > 0;
  const MDX = page.data.body;
  return (
    <DocsPage
      // todo: add last updated
      toc={hasToc ? page.data.toc : []}
      lastUpdate={page.data.lastModified ? new Date(page.data.lastModified) : new Date()}
      editOnGithub={{
        owner: "DeDevsClub",
        repo: "dedevs-docs",
        sha: "main",
        path: `content/docs/${page.file.path}`,
      }}
      tableOfContent={{ 
        enabled: hasToc, 
        style: 'clerk',
        // component: <TableOfContent />
        // header: <h1>{page.data.title}</h1>,
        // footer: <h2>{page.data.title}</h2>,
      }}
      full={true}
      // container={{ className: "flex flex-col w-full" }}
      // container={{ className: "w-full" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
      
    </DocsPage>
  );  
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) return <NotFound />;

  return {
    title: page.data.title,
    description: page.data.description,
    // tags: page.data.tags,
    // lastUpdate: page.data.lastModified ? new Date(page.data.lastModified) : undefined,
  };
}
