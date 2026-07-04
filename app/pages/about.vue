<template>
  <div class="max-w-200 mx-auto px-5 pt-10 pb-20">
    <div class="mb-12">
      <h1 class="text-3xl font-bold">{{ $t('about.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('about.subtitle') }}</p>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('about.origin.title') }}</h2>
      <p class="text-muted leading-relaxed mb-3">{{ $t('about.origin.text') }}</p>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('about.inspiration.title') }}</h2>
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

    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('about.solution.title') }}</h2>
      <p class="text-muted leading-relaxed mb-3">{{ $t('about.solution.text') }}</p>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('about.usedBy.title') }}</h2>
      <p class="text-muted leading-relaxed">
        {{ $t('about.usedBy.text') }}
        <a href="https://verbatims.cc" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">verbatims.cc</a>.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
</script>
