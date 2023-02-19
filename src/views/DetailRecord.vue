<template>
	<div>
		<Loader v-if="loading"/>
		<div v-else-if="record">
			<div>
				<div class="breadcrumb-wrap">
					<router-link to="/history" class="breadcrumb">History</router-link>
					<a @click.prevent class="breadcrumb">
						{{ record.type === 'income' ? 'Income' : 'Outcome' }}
					</a>
				</div>
				<div class="row">
					<div class="col s12 m6">
						<div 
							class="card"
							:class="{
								'red': record.type === 'outcome',
								'green': record.type === 'income'
							}"
						>
							<div class="card-content white-text">
								<p>Description: {{ record.description }}</p>
								<p>Sum: {{ record.amount }}₴</p>
								<p>Category: {{ record.categoryName }}</p>
		
								<small> {{ record.date }}</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<p v-else class="center">Record doesn't exist.</p>
	</div>
</template>

<script lang="ts">
	import Loader from '@/components/Loader.vue';
import { defineComponent } from 'vue'

	export default defineComponent({
		name: "details",
		data() {
			return {
				loading: true,
				record: null as any
			}
		},

		async mounted() {
			const id = this.$route.params.id;
			const record = await this.$store.dispatch('fetchRecordById', id);
			const category = await this.$store.dispatch('fetchCategoryById', id);

			this.record = {
				...record,

			}
			this.loading = false;
		},

		components: {
    Loader
}
	});
</script>
