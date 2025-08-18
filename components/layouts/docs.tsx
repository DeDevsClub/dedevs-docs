import { Fragment, type HTMLAttributes, useMemo } from 'react';
import { type BaseLayoutProps, getLinks } from './shared';
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarPageTree,
  SidebarViewport,
} from '../layout/sidebar';
import { TreeContextProvider } from 'fumadocs-ui/contexts/tree';
import { cn } from '../../lib/cn';
import { buttonVariants } from '../ui/button';
import { ChevronDown, Languages, Sidebar as SidebarIcon } from 'lucide-react';
import { BaseLinkItem, type LinkItemType } from './links';
import { LanguageToggle } from '../layout/language-toggle';
import { ThemeToggle } from '../layout/theme-toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import {
  getSidebarTabsFromOptions,
  SidebarLinkItem,
  type SidebarOptions,
} from './docs/shared';
import type { PageTree } from 'fumadocs-core/server';
import {
  LayoutBody,
  LayoutTab,
  LayoutTabs,
  Navbar,
  NavbarSidebarTrigger,
} from './notebook-client';
import { NavProvider } from 'fumadocs-ui/contexts/layout';
import { type Option, RootToggle } from '../layout/root-toggle';
import Link from 'fumadocs-core/link';
import {
  LargeSearchToggle,
  SearchToggle,
} from '../layout/search-toggle';
import { HideIfEmpty } from 'fumadocs-core/hide-if-empty';

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  tabMode?: 'sidebar' | 'navbar';

  nav?: BaseLayoutProps['nav'] & {
    mode?: 'top' | 'auto';
  };

  sidebar?: Partial<SidebarOptions>;

  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function DocsLayout(props: DocsLayoutProps) {
  const {
    tabMode = 'navbar',
    nav: { transparentMode, ...nav } = {},
    sidebar: {
      tabs: tabOptions,
      banner: sidebarBanner,
      footer: sidebarFooter,
      components: sidebarComponents,
      ...sidebar
    } = {},
    i18n = false,
    themeSwitch = { 
        enabled: true,
        mode: 'light-dark',
    },
  } = props;

  const navMode = nav.mode ?? 'auto';
  const links = getLinks(props.links ?? [], props.githubUrl);
  const tabs = useMemo(
    () => getSidebarTabsFromOptions(tabOptions, props.tree) ?? [],
    [tabOptions, props.tree],
  );

  const variables = cn(
    '[--fd-nav-height:48px] md:[--fd-sidebar-width:286px] md:[--fd-nav-height:56px] xl:[--fd-toc-width:286px]',
    tabs.length > 0 && tabMode === 'navbar' && 'lg:[--fd-nav-height:104px]',
  );

  const sidebarHeader = (
    <div className="flex justify-between max-md:hidden">
      <Link
        href={nav.url ?? '/'}
        className="inline-flex items-center gap-2.5 font-medium"
      >
        {nav.title}
      </Link>
      {(sidebar.collapsible ?? true) && (
        <SidebarCollapseTrigger
          className={cn(
            buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'mt-px mb-auto text-fd-muted-foreground',
            }),
          )}
        >
          <SidebarIcon />
        </SidebarCollapseTrigger>
      )}
    </div>
  );

  return (
    <TreeContextProvider tree={props.tree}>
      <NavProvider transparentMode={transparentMode}>
        <LayoutBody
          {...props.containerProps}
          className={cn(variables, props.containerProps?.className, 'md:my-8')}
        >
          <Sidebar
            {...sidebar}
            className={cn(
              navMode === 'top'
                ? 'md:bg-transparent'
                : 'md:[--fd-nav-height:0px]',
              sidebar.className,
            )}
          >
            <HideIfEmpty as={Fragment}>
              <SidebarHeader>
                {navMode === 'auto' && sidebarHeader}
                {nav.children}
                {sidebarBanner}
                {tabMode === 'sidebar' && tabs.length > 0 ? (
                  <RootToggle className="mb-2" options={tabs} />
                ) : null}
                {tabMode === 'navbar' && tabs.length > 0 && (
                  <RootToggle options={tabs} className="lg:hidden" />
                )}
              </SidebarHeader>
            </HideIfEmpty>
            <SidebarViewport>
              {links
                .filter((item) => item.type !== 'icon')
                .map((item, i) => (
                  <SidebarLinkItem
                    key={i}
                    item={item}
                    className={cn(
                      'lg:hidden',
                      i === links.length - 1 && 'mb-4',
                    )}
                  />
                ))}

              <SidebarPageTree components={sidebarComponents} />
            </SidebarViewport>
            <HideIfEmpty as={Fragment}>
              <SidebarFooter className="flex flex-row items-center justify-end">
                <div className="flex items-center flex-1 empty:hidden lg:hidden">
                  {links
                    .filter((item) => item.type === 'icon')
                    .map((item, i) => (
                      <BaseLinkItem
                        key={i}
                        item={item}
                        className={cn(
                          buttonVariants({
                            size: 'icon',
                            variant: 'ghost',
                            className: 'text-fd-muted-foreground',
                          }),
                        )}
                        aria-label={item.label}
                      >
                        {item.icon}
                      </BaseLinkItem>
                    ))}
                </div>
                {i18n ? (
                  <LanguageToggle className="me-auto md:hidden">
                    <Languages className="size-4.5 text-fd-muted-foreground" />
                  </LanguageToggle>
                ) : null}
                {themeSwitch.enabled !== false &&
                  (themeSwitch.component ?? (
                    <ThemeToggle
                      className="md:hidden"
                      mode={themeSwitch?.mode ?? 'light-dark'}
                    />
                  ))}
                {sidebarFooter}
              </SidebarFooter>
            </HideIfEmpty>
          </Sidebar>
          <DocsNavbar
            {...props}
            links={links}
            tabs={tabMode == 'navbar' ? tabs : []}
            themeSwitch={{
              enabled: true,
            }}
          />
          {props.children}
        </LayoutBody>
      </NavProvider>
    </TreeContextProvider>
  );
}

function DocsNavbar({
  links,
  tabs,
  searchToggle = {},
  themeSwitch = {},
  ...props
}: DocsLayoutProps & {
  links: LinkItemType[];
  tabs: Option[];
}) {
  const navMode = props.nav?.mode ?? 'auto';
  const sidebarCollapsible = props.sidebar?.collapsible ?? true;
  const nav = (
    <Link
      href={props.nav?.url ?? '/'}
      className={cn(
        'inline-flex items-center gap-2.5 font-semibold empty:hidden',
        navMode === 'auto' && 'md:hidden',
      )}
    >
      {props.nav?.title}
    </Link>
  );

  return (
    <Navbar mode={navMode}>
      <div
        className={cn(
          'flex border-b px-4 flex-1',
          navMode === 'auto' && 'md:px-6',
        )}
      >
        <div
          className={cn(
            'flex flex-row items-center',
            navMode === 'top' && 'flex-1 pe-4',
          )}
        >
          {sidebarCollapsible && navMode === 'auto' ? (
            <SidebarCollapseTrigger
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  size: 'icon',
                }),
                'text-fd-muted-foreground -ms-1.5 me-2 data-[collapsed=false]:hidden max-md:hidden',
              )}
            >
              <SidebarIcon />
            </SidebarCollapseTrigger>
          ) : null}
          {nav}
        </div>
        {/* SEARCH TOGGLE */}
        {searchToggle.enabled !== false &&
          (searchToggle.components?.lg ?? (
            <LargeSearchToggle
              hideIfDisabled
              className={cn(
                'w-full my-auto max-md:hidden',
                navMode === 'top'
                  ? 'rounded-xl max-w-sm ps-2.5'
                  : 'max-w-[240px]',
              )}
            />
          ))}
          {/* NAVBAR CHILDREN */}
        <div className="flex flex-1 flex-row items-center justify-end">
          <div className="flex flex-row items-center gap-6 px-4 empty:hidden max-lg:hidden justify-end w-full">
            {/* LINKS */}
            {links
              .filter((item) => item.type !== 'icon')
              .map((item, i) => (
                <NavbarLinkItem
                  key={i}
                  item={item}
                  className="text-sm text-muted-foreground transition-colors"
                />
              ))}
          </div>
          {/* NAVBAR CHILDREN */}
          {props.nav?.children}
          {/* SEARCH TOGGLE */}
          {searchToggle.enabled !== false &&
            (searchToggle.components?.sm ?? (
              <SearchToggle hideIfDisabled className="p-2 md:hidden" />
            ))}
          {/* SIDEBAR TRIGGER */}
          <NavbarSidebarTrigger className="p-2 -me-1.5 md:hidden" />
          {/* ICONS */}
          {links
            .filter((item) => item.type === 'icon')
            .map((item, i) => (
              <BaseLinkItem
                key={i}
                item={item}
                className={cn(
                  buttonVariants({ size: 'icon', variant: 'ghost' }),
                  'text-muted-foreground max-lg:hidden',
                )}
                aria-label={item.label}
              >
                {item.icon}
              </BaseLinkItem>
            ))}
          {/* LANGUAGE TOGGLE */}
          {props.i18n ? (
            <LanguageToggle className="max-md:hidden">
              <Languages className="size-4.5 text-muted-foreground" />
            </LanguageToggle>
          ) : null}
          {/* THEME TOGGLE */}
          {themeSwitch.enabled !== false &&
            (themeSwitch.component ?? (
              <ThemeToggle
                className="flex ms-2 max-md:hidden"
                mode={themeSwitch.mode ?? 'light-dark'}
              />
            ))}
          {/* SIDEBAR COLLAPSE TRIGGER */}
          {sidebarCollapsible && navMode === 'top' ? (
            <SidebarCollapseTrigger
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  size: 'icon',
                }),
                'ms-2 text-muted-foreground rounded-full max-md:hidden',
              )}
            >
              <SidebarIcon />
            </SidebarCollapseTrigger>
          ) : null}
        </div>
      </div>
      {/* TABS */}
      {tabs.length > 0 ? (
        <LayoutTabs className="px-6 border-b h-10 max-lg:hidden">
          {tabs.map((tab) => (
            <LayoutTab key={tab.url} {...tab} />
          ))}
        </LayoutTabs>
      ) : null}
    </Navbar>
  );
}

function NavbarLinkItem({
  item,
  ...props
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
  if (item.type === 'menu') {
    return (
      <Popover>
        <PopoverTrigger
          {...props}
          className={cn('inline-flex items-center gap-1.5', props.className)}
        >
          {item.text}
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          {item.items.map((child, i) => {
            if (child.type === 'custom')
              return <Fragment key={i}>{child.children}</Fragment>;

            return (
              <BaseLinkItem
                key={i}
                item={child}
                className="inline-flex items-center gap-2 rounded-md p-2 text-start hover:bg-fd-accent hover:text-fd-accent-foreground data-[active=true]:text-fd-primary [&_svg]:size-4"
              >
                {child.icon}
                {child.text}
              </BaseLinkItem>
            );
          })}
        </PopoverContent>
      </Popover>
    );
  }

  if (item.type === 'custom') return item.children;

  return (
    <BaseLinkItem item={item} {...props}>
      {item.text}
    </BaseLinkItem>
  );
}

export { Navbar, NavbarSidebarTrigger };
