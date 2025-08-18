'use client';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useState } from 'react';
import { TagsList, TagsListItem } from './search-dialogs';

export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n(); // (optional) for i18n
  const [tag, setTag] = useState<string | undefined>(undefined);
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    locale,
    tag,
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        {query.data !== 'empty' && query.data && (
          <SearchDialogList items={query.data} />
        )}
        <SearchDialogFooter className="flex flex-row">
          <TagsList tag={tag} onTagChange={(tag) => setTag(tag)}>
            <TagsListItem value={''}>All</TagsListItem>
            <TagsListItem value="club">Club</TagsListItem>
            <TagsListItem value="design">Design</TagsListItem>
            <TagsListItem value="vibes">Vibes</TagsListItem>
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
      <SearchDialogFooter>
        <SearchDialogClose />
      </SearchDialogFooter>
    </SearchDialog>
  );
}