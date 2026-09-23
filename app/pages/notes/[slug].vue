<script setup lang="ts">
import { getNoteBySlug } from '~/data/notes';
import NoteDetailPage from '~/components/notes/NoteDetailPage.vue';

const route = useRoute();

const note = getNoteBySlug(String(route.params.slug ?? ''));

if (!note) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Note not found',
  });
}
</script>

<template>
  <NoteDetailPage :note="note" />
</template>
