<template>
  <div>
    <section class="text-center px-5 pt-20 pb-10 max-w-240 mx-auto">
      <h1 class="text-5xl font-extrabold leading-tight tracking-tight mb-4">
        {{ $t('gallery.hero.title') }}<br />
        <span class="bg-gradient-to-r from-primary to-[#FF8A5C] bg-clip-text text-transparent">{{ $t('gallery.hero.highlight') }}</span>
      </h1>
      <p class="text-muted text-lg mb-10">{{ $t('gallery.hero.subtitle') }}</p>
    </section>

    <section v-for="v in variantSections" :key="v.name" class="px-5 py-10 max-w-240 mx-auto">
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-2">{{ v.title }}</h2>
        <p class="text-muted text-sm mb-4">{{ v.description }}</p>
        <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border overflow-x-auto">
          <code class="text-sm font-mono whitespace-pre shrink-0">&lt;Avatar name="Mahalia Jackson" variant="{{ v.name }}" :colors="[{{ v.colors.map(c => `'${c}'`).join(', ') }}]" /&gt;</code>
          <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copySnippet(v.name, v.colors)">{{ $t('gallery.copy') }}</button>
        </div>
      </div>

      <div class="flex gap-3 flex-wrap mb-8">
        <div v-for="name in sampleNames" :key="name" class="flex flex-col items-center gap-1.5">
          <img :src="avatarUrl(name, v.name, 64, false, v.colors)" :alt="name" width="64" height="64" class="rounded-full bg-surface" />
          <span class="text-xs text-muted">{{ name.split(' ')[0] }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Social Feed -->
        <div class="rounded-2xl p-5 bg-surface border border-border">
          <div class="flex items-center gap-3 mb-3">
            <img :src="avatarUrl('Mahalia Jackson', v.name, 40, false, v.colors)" alt="" width="40" height="40" class="rounded-full shrink-0" />
            <div class="min-w-0">
              <p class="text-sm font-semibold m-0 truncate"><strong>Mahalia Jackson</strong> uploaded a new photo</p>
              <p class="text-xs text-muted m-0">2 hours ago</p>
            </div>
          </div>
          <div class="w-full h-32 rounded-xl bg-gradient-to-br from-primary/20 to-[#FF8A5C]/20 mb-3" />
          <div class="flex items-center gap-2 mb-3">
            <div class="flex -space-x-2">
              <img v-for="n in feedLikers" :key="n" :src="avatarUrl(n, v.name, 28, false, v.colors)" alt="" width="28" height="28" class="rounded-full border-2 border-surface" />
            </div>
            <span class="text-xs text-muted">5 friends liked this</span>
          </div>
          <div class="flex gap-2">
            <button class="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]">&#9825; Like</button>
            <button class="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]">Comment</button>
          </div>
        </div>

        <!-- Comments -->
        <div class="rounded-2xl p-5 bg-surface border border-border">
          <div class="flex items-start gap-3 mb-4">
            <img :src="avatarUrl('Margaret Bourke', v.name, 36, false, v.colors)" alt="" width="36" height="36" class="rounded-full shrink-0 mt-0.5" />
            <div class="rounded-xl p-3 bg-[var(--c-bg)] flex-1">
              <p class="text-sm font-semibold m-0 mb-1">Margaret Bourke</p>
              <p class="text-sm text-muted m-0">I need a hobby so I think I'm gonna start calling the phone numbers on missing cat posters and just "meow" at whoever answers</p>
            </div>
          </div>
          <div class="flex gap-3 text-xs text-muted mb-4 pl-12">
            <button class="bg-transparent border-none text-muted cursor-pointer text-xs hover:text-[var(--c-text)]">Reply</button>
            <button class="bg-transparent border-none text-muted cursor-pointer text-xs hover:text-[var(--c-text)]">React</button>
          </div>
          <div class="flex flex-col gap-2.5 pl-12">
            <div v-for="n in commenters" :key="n" class="flex items-center gap-2.5">
              <img :src="avatarUrl(n, v.name, 28, false, v.colors)" alt="" width="28" height="28" class="rounded-full shrink-0" />
              <span class="text-xs text-muted truncate">{{ n }}</span>
            </div>
          </div>
        </div>

        <!-- Profile Card -->
        <div class="rounded-2xl p-5 bg-surface border border-border">
          <div class="flex items-center gap-4 mb-4">
            <img :src="avatarUrl('Alicia Dickerson', v.name, 56, false, v.colors)" alt="" width="56" height="56" class="rounded-full shrink-0" />
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
        <div class="rounded-2xl bg-surface border border-border overflow-hidden">
          <div class="h-24 bg-gradient-to-r from-primary/30 to-[#FF8A5C]/30" />
          <div class="px-5 pb-5 -mt-10 text-center">
            <img :src="avatarUrl('Mary Edwards', v.name, 80, false, v.colors)" alt="" width="80" height="80" class="rounded-full border-4 border-surface mx-auto mb-3" />
            <p class="text-sm font-semibold m-0 mb-0.5">Mary Edwards</p>
            <p class="text-xs text-muted m-0 mb-3">1.2M followers &middot; 451 following</p>
            <button class="px-6 py-1.5 rounded-full border border-border bg-surface text-sm text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]">Follow</button>
          </div>
        </div>

        <!-- Chat List -->
        <div class="rounded-2xl p-5 bg-surface border border-border">
          <p class="text-sm font-bold m-0 mb-4">Chat</p>
          <div class="flex flex-col gap-0">
            <div v-for="(user, i) in chatUsers" :key="user.name" class="flex items-center gap-3 py-2.5" :class="i < chatUsers.length - 1 ? 'border-b border-border' : ''">
              <img :src="avatarUrl(user.name, v.name, 40, false, v.colors)" alt="" width="40" height="40" class="rounded-full shrink-0" />
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
        <div class="rounded-2xl p-5 bg-surface border border-border">
          <p class="text-sm font-bold m-0 mb-4">Mutual followers</p>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="n in mutualFollowers" :key="n" class="flex flex-col items-center gap-2 p-3 rounded-xl border border-border">
              <img :src="avatarUrl(n, v.name, 48, false, v.colors)" alt="" width="48" height="48" class="rounded-full" />
              <span class="text-sm font-semibold">{{ n }}</span>
              <button class="px-4 py-1 rounded-full border border-border bg-surface text-xs text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]">Follow</button>
            </div>
          </div>
        </div>

        <!-- Share Grid -->
        <div class="rounded-2xl p-5 bg-surface border border-border md:col-span-2 lg:col-span-1">
          <p class="text-sm font-bold m-0 mb-4">Share</p>
          <div class="grid grid-cols-4 gap-3">
            <div v-for="n in shareNames" :key="n" class="flex flex-col items-center gap-1.5">
              <img :src="avatarUrl(n, v.name, 48, false, v.colors)" alt="" width="48" height="48" class="rounded-full" />
              <span class="text-xs text-muted">{{ n.split(' ')[0] }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()

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

const shareNames = ['Ma', 'Julia', 'Irene', 'Babe', 'Lyda', 'Annie', 'Maud', 'Betty']

function avatarUrl(n: string, v: string, s: number, sq: boolean, colors?: string[]): string {
  const base = `/api/avatar/${encodeURIComponent(n)}`
  const p = new URLSearchParams({ variant: v, size: String(s) })
  if (sq) p.set('square', 'true')
  if (colors && colors.length) p.set('colors', colors.join(','))
  return `${base}?${p}`
}

function copySnippet(variant: string, colors: string[]) {
  const code = `<Avatar name="Mahalia Jackson" variant="${variant}" :colors="[${colors.map(c => `'${c}'`).join(', ')}]" />`
  navigator.clipboard.writeText(code)
}
</script>
