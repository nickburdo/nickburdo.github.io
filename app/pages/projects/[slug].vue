<script setup lang="ts">
import { getProjectBySlug } from '~/data/projects';
import ProjectDetailPage from '~/components/projects/ProjectDetailPage.vue';

const route = useRoute();

const project = getProjectBySlug(String(route.params.slug ?? ''));

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  });
}
</script>

<template>
  <ProjectDetailPage :project="project" />
</template>
