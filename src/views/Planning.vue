<template>
  <div>
		<div class="page-title">
			<h3>Plan</h3>
			<h4>{{ info.bill }} UAH</h4>
		</div>
		<Loader v-if="loading" />
		<p v-else-if="!categories.length" class="center">Category list empty. <router-link to="/categories">Add new category</router-link></p>
		<section v-else>
			<div v-for="c in categories" :key="c.id">
				<p>
					<strong>{{ c.title }}</strong>
					{{ c.spend || 0 }}₴ from {{ c.limit || 0 }}₴
				</p>
				<div class="progress" >
					<div
							class="determinate"
							:class="[c.progressColor]"
							:style="{ width: c.progressPercent + '%' }"
					></div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { mapGetters } from 'vuex';
	import { Category, Record } from '@/types';
	import Loader from './../components/Loader.vue';

	export default defineComponent({
		name: "planning",
		data() {
			return {
				loading: true,
				categories: [] as Category[],
			}
		},

		computed: {
			...mapGetters(['info']),
		},

		async mounted() {
			const records = await this.$store.dispatch('fetchRecords');
			const categories = await this.$store.dispatch('fetchCategories');

			this.categories = categories.map((c: Category) => {
				const spend = records
					.filter((r: Record) => r.categoryId == c.id)
					.filter((r: Record) => r.type === 'outcome')
					.reduce((total: number, record: Record) => {
						return total += record.amount
					}, 0);

					const percent = 100 * spend / c.limit;
					const progressPercent = percent > 100 ? 100 : percent;
					const progressColor = percent >= 70 ? 'red' : percent > 35 ? 'yellow' : 'green';

					return { ...c, progressPercent, progressColor, spend }
			});
			this.loading = false;
		},

		components: {
			Loader
		}
	});
</script>
