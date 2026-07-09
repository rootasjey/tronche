<template>
  <div>
    <section class="text-center px-5 pt-20 pb-10 max-w-240 mx-auto">
      <h1 class="text-5xl font-heading font-extrabold leading-tight tracking-tight mb-4">
        <span class="block">{{ $t('gallery.hero.title') }}</span>
        <span class="text-primary italic">{{ $t('gallery.hero.highlight') }}</span>
      </h1>
      <p class="text-muted text-lg">{{ $t('gallery.hero.subtitle') }}</p>
    </section>

    <section v-for="v in variantSections" :key="v.name" class="px-5 py-10 max-w-240 mx-auto section-reveal" :style="{ '--reveal-delay': `${variantSections.indexOf(v) * 0.15}s` }">
      <div class="mb-6">
        <h2 class="text-2xl font-bold font-heading mb-2">{{ v.title }}</h2>
        <p class="text-muted text-sm">{{ v.description }}</p>
      </div>

      <div class="flex gap-3 overflow-x-auto md:overflow-x-visible pb-2 mb-8">
        <div v-for="name in sampleNames" :key="name" class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer transition-transform duration-200 hover:scale-[1.1] active:scale-[0.99]" @click="goToPlayground(name, v.name, v.colors.join(','))">
          <img :src="avatarUrl(name, v.name, 64, false, v.colors)" :alt="name" width="64" height="64" class="rounded-full bg-surface" />
          <span class="text-xs text-muted">{{ name.split(' ')[0] }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Social Feed -->
        <div class="rounded-2xl p-5 bg-surface border border-border card-reveal" style="--card-delay: 0s;">
          <div class="flex items-center gap-3 mb-3">
            <img :src="avatarUrl('Mahalia Jackson', v.name, 40, false, v.colors)" alt="" width="40" height="40" class="rounded-full shrink-0 cursor-pointer" @click="goToPlayground('Mahalia Jackson', v.name, v.colors.join(','))" />
            <div class="min-w-0">
              <p class="text-sm font-semibold m-0 truncate"><strong>Mahalia Jackson</strong> uploaded a new photo</p>
              <p class="text-xs text-muted m-0">2 hours ago</p>
            </div>
          </div>
          <img v-if="feedPhoto" :src="feedPhoto.thumbnailUrl" :alt="feedPhoto.name" class="w-full h-32 rounded-xl object-cover mb-3" loading="lazy" />
          <div v-else class="w-full h-32 rounded-xl bg-gradient-to-br from-primary/20 to-[#FF8A5C]/20 mb-3" />
          <div class="flex items-center gap-2 mb-3">
            <div class="flex -space-x-2">
              <img v-for="n in feedLikers" :key="n" :src="avatarUrl(n, v.name, 28, false, v.colors)" alt="" width="28" height="28" class="rounded-full border-2 border-surface cursor-pointer" @click="goToPlayground(n, v.name, v.colors.join(','))" />
            </div>
            <span class="text-xs text-muted">5 friends liked this</span>
          </div>
          <div class="flex gap-2">
            <button class="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]">&#9825; Like</button>
            <button class="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]">Comment</button>
          </div>
        </div>

        <!-- Comments -->
        <div class="rounded-2xl p-5 bg-surface border border-border card-reveal" style="--card-delay: 0.05s;">
          <div class="flex items-start gap-3 mb-4">
            <img :src="avatarUrl('Margaret Bourke', v.name, 36, false, v.colors)" alt="" width="36" height="36" class="rounded-full shrink-0 mt-0.5 cursor-pointer" @click="goToPlayground('Margaret Bourke', v.name, v.colors.join(','))" />
            <div class="rounded-xl p-3 bg-[var(--c-bg)] flex-1">
              <p class="text-sm font-semibold m-0 mb-1">Margaret Bourke</p>
              <p class="text-sm text-muted m-0">I need a hobby so I think I'm gonna start calling the phone numbers on missing cat posters and just "meow" at whoever answers</p>
            </div>
          </div>
          <img v-if="commentImage" :src="commentImage.url" :alt="commentImage.name" class="w-full h-28 rounded-xl object-cover mb-3" loading="lazy" />
          <div class="flex gap-3 text-xs text-muted mb-4 pl-12">
            <button class="bg-transparent border-none text-muted cursor-pointer text-xs hover:text-[var(--c-text)]">Reply</button>
            <button class="bg-transparent border-none text-muted cursor-pointer text-xs hover:text-[var(--c-text)]">React</button>
          </div>
          <div class="flex flex-col gap-2.5 pl-12">
            <div v-for="n in commenters" :key="n" class="flex items-center gap-2.5">
              <img :src="avatarUrl(n, v.name, 28, false, v.colors)" alt="" width="28" height="28" class="rounded-full shrink-0 cursor-pointer" @click="goToPlayground(n, v.name, v.colors.join(','))" />
              <span class="text-xs text-muted truncate">{{ n }}</span>
            </div>
          </div>
        </div>

        <!-- Profile Card -->
        <div class="rounded-2xl p-5 bg-surface border border-border card-reveal" style="--card-delay: 0.1s;">
          <div class="flex items-center gap-4 mb-4">
            <img :src="avatarUrl('Alicia Dickerson', v.name, 56, false, v.colors)" alt="" width="56" height="56" class="rounded-full shrink-0 cursor-pointer" @click="goToPlayground('Alicia Dickerson', v.name, v.colors.join(','))" />
            <div class="grid grid-cols-3 gap-2 text-center flex-1">
              <div>
                <p class="text-lg font-bold m-0">143</p>
                <p class="text-xs text-muted m-0">Posts</p>
              </div>
              <div>
                <p class="text-lg font-bold m-0">1.2M</p>
                <p class="text-xs text-muted m-0">Followers</p>
              </div>
              <div>
                <p class="text-lg font-bold m-0">452</p>
                <p class="text-xs text-muted m-0">Following</p>
              </div>
            </div>
          </div>
          <p class="text-sm font-semibold m-0 mb-0.5">Alicia Dickerson</p>
          <p class="text-xs text-muted m-0 mb-3">Designer | Frontend developer</p>
          <button class="w-full px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold border-none cursor-pointer hover:bg-primary-600 transition-colors">Follow</button>
        </div>

        <!-- Profile Header -->
        <div class="rounded-2xl bg-surface border border-border overflow-hidden card-reveal" style="--card-delay: 0.15s;">
          <img v-if="coverPhoto" :src="coverPhoto.thumbnailUrl" :alt="coverPhoto.name" class="w-full h-24 object-cover" loading="lazy" />
          <div v-else class="h-24 bg-gradient-to-r from-primary/30 to-[#FF8A5C]/30" />
          <div class="px-5 pb-5 -mt-10 text-center">
            <img :src="avatarUrl('Mary Edwards', v.name, 80, false, v.colors)" alt="" width="80" height="80" class="rounded-full border-4 border-surface mx-auto mb-3 cursor-pointer" @click="goToPlayground('Mary Edwards', v.name, v.colors.join(','))" />
            <p class="text-sm font-semibold m-0 mb-0.5">Mary Edwards</p>
            <p class="text-xs text-muted m-0 mb-3">1.2M followers &middot; 451 following</p>
            <button class="px-6 py-1.5 rounded-full border border-border bg-surface text-sm text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]">Follow</button>
          </div>
        </div>

        <!-- Chat List -->
        <div class="rounded-2xl p-5 bg-surface border border-border card-reveal" style="--card-delay: 0.2s;">
          <p class="text-sm font-bold m-0 mb-4">Chat</p>
          <div class="flex flex-col gap-0">
            <div v-for="(user, i) in chatUsers" :key="user.name" class="flex items-center gap-3 py-2.5" :class="i < chatUsers.length - 1 ? 'border-b border-border' : ''">
              <img :src="avatarUrl(user.name, v.name, 40, false, v.colors)" alt="" width="40" height="40" class="rounded-full shrink-0 cursor-pointer" @click="goToPlayground(user.name, v.name, v.colors.join(','))" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold truncate">{{ user.name }}</span>
                  <span v-if="user.active" class="text-[10px] px-1.5 py-0.5 rounded-full bg-[#22c55e]/15 text-[#22c55e] font-semibold">Active</span>
                </div>
                <p class="text-xs text-muted m-0">@{{ user.handle }}</p>
              </div>
              <span class="text-xs text-muted shrink-0">{{ user.time }}</span>
            </div>
          </div>
        </div>

        <!-- Mutual Followers -->
        <div class="rounded-2xl p-5 bg-surface border border-border card-reveal" style="--card-delay: 0.25s;">
          <p class="text-sm font-bold m-0 mb-4">Mutual followers</p>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="n in mutualFollowers" :key="n" class="flex flex-col items-center gap-2 p-3 rounded-xl border border-border">
              <img :src="avatarUrl(n, v.name, 48, false, v.colors)" alt="" width="48" height="48" class="rounded-full cursor-pointer" @click="goToPlayground(n, v.name, v.colors.join(','))" />
              <span class="text-sm font-semibold">{{ n }}</span>
              <button class="px-4 py-1 rounded-full border border-border bg-surface text-xs text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]">Follow</button>
            </div>
          </div>
        </div>

      </div>

      <div class="mt-6 code-block">
        <div class="code-block-header">
          <span class="code-block-label">{{ v.name }}</span>
          <button class="copy-btn" :class="{ copied: copiedVariant === v.name }" @click="copySnippet(v.name, v.colors, $event)">{{ copiedVariant === v.name ? 'Copied!' : $t('gallery.copy') }}</button>
        </div>
        <div v-html="$highlight(snippetCode(v), 'vue')"></div>
      </div>
    </section>

    <section class="px-5 pb-20 max-w-240 mx-auto">
      <div class="rounded-2xl p-8 text-center bg-surface border border-border section-reveal" style="--reveal-delay: 0s;">
        <h2 class="text-2xl font-bold font-heading mb-3">{{ $t('gallery.cta.title') }}</h2>
        <p class="text-muted mb-6 max-w-md mx-auto leading-relaxed">{{ $t('gallery.cta.subtitle') }}</p>
        <div class="flex justify-center gap-3 flex-wrap">
          <NuxtLink to="/docs" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold no-underline hover:bg-primary-600 transition-colors">
            {{ $t('gallery.cta.docs') }} &rarr;
          </NuxtLink>
          <NuxtLink to="/playground" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted no-underline hover:text-[var(--c-text)] hover:border-[var(--c-text)] transition-colors">
            {{ $t('gallery.cta.api') }} &rarr;
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const copiedVariant = ref<string | null>(null)
const { data: zimaData } = await useFetch('/api/zimablue/images')
const zimaImages = computed(() => zimaData.value?.data ?? [])

const feedPhoto = computed(() => zimaImages.value[0] ?? null)
const coverPhoto = computed(() => zimaImages.value[1] ?? null)
const commentImage = computed(() => zimaImages.value[2] ?? null)

const variantSections = [
  {
    name: 'beam',
    title: 'Beam duotone',
    description: 'Expressive faces with duotone color schemes',
    colors: ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  },
  {
    name: 'pixel',
    title: 'Pixel punk',
    description: '8×8 pixel art with vibrant palettes',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  },
  {
    name: 'sunset',
    title: 'Sunset glow',
    description: 'Warm color gradients reminiscent of a sunset',
    colors: ['#ff6b6b', '#ee5a24', '#f0932b', '#ffbe76', '#badc58'],
  },
  {
    name: 'ring',
    title: 'Ring ripple',
    description: 'Concentric circles with layered colors',
    colors: ['#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055'],
  },
  {
    name: 'bauhaus',
    title: 'Bauhaus moholy',
    description: 'Geometric shapes inspired by the Bauhaus movement',
    colors: ['#ffe3b3', '#ff9a52', '#ff5252', '#c91e5a', '#3d2922'],
  },
  {
    name: 'marble',
    title: 'Marble pop',
    description: 'Blurry organic shapes with gaussian blur and mix-blend-mode overlay',
    colors: ['#5b1d99', '#0074b4', '#00b34c', '#ffd41f', '#fc6e3d'],
  },
]

const sampleNames = [
  'Mary', 'Amelia', 'Sarah', 'Margaret', 'Lucy',
  'Mahalia', 'Maya', 'Eunice', 'Carrie', 'Elizabeth',
]

const feedLikers = ['Eunice Kennedy', 'Carrie Chapman', 'Elizabeth Peratrovich', 'Alicia Dickerson', 'Mary Edwards']

const commenters = ['Eunice Kennedy', 'Carrie Chapman', 'Elizabeth Peratrovich']

const chatUsers = [
  { name: 'Margaret Bourke', handle: 'margaret', time: '3 min', active: true },
  { name: 'Eunice Kennedy', handle: 'eunice', time: '10 min', active: false },
  { name: 'Carrie Chapman', handle: 'carrie', time: '17 min', active: true },
  { name: 'Elizabeth Peratrovich', handle: 'elizabeth', time: '24 min', active: false },
  { name: 'Alicia Dickerson', handle: 'alicia', time: '31 min', active: true },
]

const mutualFollowers = ['Willa', 'Coretta', 'Harriet', 'Fabiola']

function goToPlayground(name: string, variant: string, colors: string) {
  navigateTo({
    path: '/playground',
    query: { name, variant, colors },
  })
}

function avatarUrl(n: string, v: string, s: number, sq: boolean, colors?: string[]): string {
  const base = `/api/avatar/${encodeURIComponent(n)}`
  const p = new URLSearchParams({ variant: v, size: String(s) })
  if (sq) p.set('square', 'true')
  if (colors && colors.length) p.set('colors', colors.join(','))
  return `${base}?${p}`
}

function snippetCode(v: { name: string; colors: string[] }): string {
  return `<Avatar name="Mahalia Jackson" variant="${v.name}" :colors="[${v.colors.map(c => `'${c}'`).join(', ')}]" />`
}

function copySnippet(variant: string, colors: string[], e: Event) {
  navigator.clipboard.writeText(snippetCode({ name: variant, colors }))
  copiedVariant.value = variant
  sparkle(e.target as HTMLElement)
  setTimeout(() => { copiedVariant.value = null }, 2000)
}
</script>

<style scoped>
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-reveal {
  animation: fadeSlideUp 0.6s ease both;
  animation-delay: var(--reveal-delay, 0s);
}

.card-reveal {
  animation: fadeSlideUp 0.5s ease both;
  animation-delay: var(--card-delay, 0s);
}
</style>
