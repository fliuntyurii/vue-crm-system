<template>
  <div>
		<div class="page-title">
			<h3>Record</h3>
		</div>

		<Loader v-if="loading" />
		
		<p v-else-if="!categories.length" class="center">Category list empty. <router-link to="/categories">Add new category</router-link></p>
	
		<form v-else class="form" @submit.prevent="submitHandler">
			<div class="input-field" >
				<select ref="select" v-model="category">
					<option
						v-for="c in categories"
						:key="c.id"
						:value="c.id"
					>
						{{ c.title }}
					</option>
				</select>
				<label>Choose category</label>
			</div>
	
			<p>
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						value="income"
						v-model="type"
					/>
					<span>Income</span>
				</label>
			</p>
			<p>
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						value="outcome"
						v-model="type"
					/>
					<span>Outcome</span>
				</label>
			</p>
	
			<div class="input-field">
				<input
					id="amount"
					type="number"
					v-model.number="state.amount"
					:class="{ invalid: (v$.amount?.$invalid && v$.amount?.$dirty) }"
				>
				<label for="amount">Sum</label>
				<span 
					class="helper-text invalid"
					v-if="v$.amount?.$invalid && v$.amount?.$dirty"
				>
					Invalid amount
				</span>
			</div>
	
			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model="state.description"
					:class="{ invalid: (v$.description?.$invalid && v$.description?.$dirty) }"
				>
				<label for="description">Description</label>
				<span
					class="helper-text invalid"
					v-if="v$.description?.$invalid && v$.description?.$dirty"
				>
					Invalid description
				</span>
			</div>
	
			<button class="btn waves-effect waves-light" type="submit">
				Create
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { mapGetters } from 'vuex';
	import { useVuelidate } from '@vuelidate/core';
  import { minValue, required, minLength } from '@vuelidate/validators';
  import { reactive , computed } from '@vue/reactivity';
	import Loader from './../components/Loader.vue';
	import { Category, Record } from '@/types';

	declare const M: any;

	type State = {
		amount: number,
		description: string
	}

	export default defineComponent({
		name: "record",
		data() {
			return {
				loading: true,
				categories: [] as Category[],
				select: null as any,
				category: null as string | null | undefined,
				type: 'outcome',
			}
		},

		setup () {
			const state: State = reactive({
        amount: 0,
				description: "",
      });

			const rules = computed(() => {
        return {
          amount: { required, minValue: minValue(1) },
          description: { required, minLength: minLength(3) }
        }
      });

			const v$ = useVuelidate(rules, state);
      return {
        state,
        v$
      }
		},

		async mounted() {
			this.categories = await this.$store.dispatch('fetchCategories');
			this.loading = false;

			if(this.categories.length) {
				this.category = this.categories[0].id
			}
			
			setTimeout(() => {
				this.select = M.FormSelect.init(this.$refs.select);
				M.updateTextFields();
			}, 0);
		},

		destroyed() {
			if(this.select && this.select?.destroy) {
				this.select.destroy();
			}
		},

		computed: {
			...mapGetters(['info']),
			canCreateRecord() {
				if(this.type == 'income' || this.info.bill >= this.state.amount) {
					return true;
				}
				return false;				
			}
		},

		methods: {
			async submitHandler() {
				if (this.v$.$invalid) {
          this.v$.$touch();
          return;
        } 
				if (this.canCreateRecord) {
					try {
						const recordData: Record = {
							categoryId: this.category,
							amount: this.state.amount,
							description: this.state.description,
							type: this.type,
							date: new Date().toJSON(),
						}
						await this.$store.dispatch('createRecord', recordData);

						const bill = this.type === 'income'
							? this.info.bill + this.state.amount
							: this.info.bill - this.state.amount;
						
						await this.$store.dispatch('updateInfo', { bill })
						M.toast({ html: "Success." });

						this.state.amount = 0;
						this.state.description = "";
						this.v$.reset();

					} catch (error) {}
				} else {
					M.toast({ html: "Have not enough money in your account." });
				}
        const formData = {
          amount: this.state.amount,
          description: this.state.description,
        }
			}
		},

		components: {
			Loader
		}
	});
</script>
