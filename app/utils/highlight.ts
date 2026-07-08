export function highlightVue(code: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  html = html.replace(
    /(&quot;.+?&quot;|&#39;.+?&#39;)/g,
    '<span style="color:var(--c-syntax-string)">$1</span>',
  )

  html = html.replace(
    /(&lt;!--[\s\S]*?--&gt;)/g,
    '<span style="color:var(--c-syntax-comment)">$1</span>',
  )

  html = html.replace(
    /(&lt;)(\/?)([\w-]+)/g,
    (_, lt, slash, name) =>
      `${lt}${slash}<span style="color:var(--c-syntax-tag)">${name}</span>`,
  )

  html = html.replace(
    /(\/?&gt;)/g,
    '<span style="color:var(--c-syntax-tag)">$1</span>',
  )

  html = html.replace(
    /(\s)([\w@:.-]+)(=)/g,
    (_, space, name, eq) =>
      `${space}<span style="color:var(--c-syntax-attr)">${name}</span>${eq}`,
  )

  return html
}
