<template>
	<div>
		<div class="message">
			{{ message }}
		</div>
		Enter your username: <input v-model="name" />
		<div v-if="error" class="error">Please enter a username with at least seven letters.</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		message: string;
		username: string;
	}>(),
	{
		message: "",
		username: ""
	}
);

const name = computed(() => props.username);

const error = computed(() => {
	return props.username.trim().length < 7;
});
</script>
