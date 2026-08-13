export function useBreadcrumb(items: { name: string; path?: string }[]) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.path ? `https://tronche.cc${item.path}` : undefined,
  }))

  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    }),
  }
}
