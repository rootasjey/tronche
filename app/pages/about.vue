<template>
  <div class="max-w-200 mx-auto px-5 pt-10 pb-24">
    <div class="fade-in" style="animation-delay: 0ms">
      <h1 class="text-3xl font-bold font-heading">{{ $t('about.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('about.subtitle') }}</p>
    </div>

    <div class="flex justify-center items-center gap-5 flex-wrap my-10 fade-in" style="animation-delay: 100ms">
      <div v-for="(v, i) in variants" :key="v" class="flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]" @click="goToPlayground(v, variantColors[i])">
        <div class="w-16 h-16 rounded-full overflow-hidden shadow-lg transition-transform duration-200 hover:scale-110">
          <img :src="avatarUrl('tronche', v, 64, false, variantColors[i])" :alt="v" width="64" height="64" class="w-full h-full block" />
        </div>
        <span class="text-xs font-medium text-muted capitalize">{{ v }}</span>
      </div>
    </div>

    <section class="mb-12 fade-in" style="animation-delay: 150ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('about.origin.title') }}</h2>
      <p class="text-muted leading-relaxed">{{ $t('about.origin.text') }}</p>
    </section>

    <section class="mb-12 fade-in" style="animation-delay: 200ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('about.inspiration.title') }}</h2>
      <p class="text-muted leading-relaxed mb-3">{{ $t('about.inspiration.text') }}</p>
      <p class="text-muted leading-relaxed mb-3">{{ $t('about.inspiration.limitations') }}</p>
      <ul class="list-disc pl-5 text-muted leading-relaxed space-y-1.5">
        <li>{{ $t('about.inspiration.limit1') }}</li>
        <li>{{ $t('about.inspiration.limit2') }}</li>
        <li>{{ $t('about.inspiration.limit3') }}</li>
        <li>{{ $t('about.inspiration.limit4') }}</li>
      </ul>
      <p class="text-muted leading-relaxed mt-3">
        {{ $t('about.inspiration.source') }}
        <a href="https://boringavatars.com/api-service" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">boringavatars.com/api-service</a>.
      </p>
    </section>

    <section class="mb-12 fade-in" style="animation-delay: 250ms">
      <div class="rounded-2xl p-6 bg-surface border border-border">
        <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('about.solution.title') }}</h2>
        <p class="text-muted leading-relaxed mb-4">{{ $t('about.solution.text') }}</p>
        <div class="flex gap-3 flex-wrap">
          <NuxtLink to="/gallery" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold no-underline hover:bg-primary-600 transition-colors">
            {{ $t('about.solution.seeGallery') }} &rarr;
          </NuxtLink>
          <NuxtLink to="/docs" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm font-semibold text-muted no-underline hover:text-[var(--c-text)] hover:border-[var(--c-text)] transition-colors">
            {{ $t('about.solution.readDocs') }} &rarr;
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="mb-12 fade-in" style="animation-delay: 300ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('about.usedBy.title') }}</h2>
      <p class="text-muted leading-relaxed">
        {{ $t('about.usedBy.text') }}
        <a href="https://verbatims.cc" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">verbatims.cc</a>.
      </p>
    </section>

    <section class="fade-in" style="animation-delay: 350ms">
      <div class="rounded-2xl p-8 text-center bg-surface border border-border">
        <h2 class="text-2xl font-bold font-heading mb-3">{{ $t('about.cta.title') }}</h2>
        <p class="text-muted mb-6 max-w-md mx-auto leading-relaxed">{{ $t('about.cta.text') }}</p>
        <NuxtLink to="/register" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold no-underline hover:bg-primary-600 transition-colors">
          {{ $t('about.cta.button') }} &rarr;
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const route = useRoute()

useHead({
  title: `${$t('about.title')} | Tronche`,
  meta: [
    { name: 'description', content: 'Learn about Tronche — an open-source SVG avatar generator inspired by Boring Avatars. Find out why we built it and how it improves on existing solutions.' },
    { property: 'og:title', content: `${$t('about.title')} | Tronche` },
    { property: 'og:description', content: 'Learn about Tronche — an open-source SVG avatar generator inspired by Boring Avatars. Find out why we built it and how it improves on existing solutions.' },
    { property: 'og:image', content: '/images/tronche-og.jpeg' },
    { property: 'og:url', content: `https://tronche.app${route.path}` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${$t('about.title')} | Tronche` },
    { name: 'twitter:description', content: 'Learn about Tronche — an open-source SVG avatar generator inspired by Boring Avatars. Find out why we built it and how it improves on existing solutions.' },
    { name: 'twitter:image', content: '/images/tronche-og.jpeg' },
  ],
  link: [
    { rel: 'canonical', href: `https://tronche.app${route.path}` },
  ],
})

const variants = ['beam', 'pixel', 'sunset', 'ring', 'bauhaus', 'marble']

const variantColors = [
  '#E07A5F,#3D405B,#81B29A,#F4D06F,#D8A47F',
  '#FF6B6B,#4ECDC4,#45B7D1,#96CEB4,#FFEAA7',
  '#ff6b6b,#ee5a24,#f0932b,#ffbe76,#badc58',
  '#6c5ce7,#a29bfe,#fd79a8,#fdcb6e,#e17055',
  '#ffe3b3,#ff9a52,#ff5252,#c91e5a,#3d2922',
  '#5b1d99,#0074b4,#00b34c,#ffd41f,#fc6e3d',
]

function goToPlayground(variant: string, colors: string) {
  navigateTo({
    path: '/playground',
    query: { name: 'tronche', variant, colors },
  })
}

function avatarUrl(n: string, v: string, s: number, sq: boolean, colors?: string): string {
  const base = `/api/avatar/${encodeURIComponent(n || '?')}`
  const p = new URLSearchParams({ variant: v, size: String(s) })
  if (sq) p.set('square', 'true')
  if (colors) p.set('colors', colors)
  return `${base}?${p}`
}
</script>

<style scoped>
.fade-in {
  animation: fade-up 0.5s ease both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
