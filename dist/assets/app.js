{
	const body = document.querySelector('body')
	const styleUpdate = () => {
		body.insertAdjacentHTML(
			'beforeend',
			`
		<style>
			*, ::after, ::before {
				-webkit-transition:
								width 100ms linear,
								max-width 100ms linear,
								height 100ms linear,
								max-height 100ms linear,
								color 100ms linear,
								border 100ms linear,
								box-shadow 100ms linear,
								background 100ms linear,
								margin 100ms linear,
								padding 100ms linear,
								transform 100ms linear,
								opacity 100ms linear,
								left 100ms linear,
								top 100ms linear,
								bottom 100ms linear,
								right 100ms linear,
								z-index 100ms linear,
								fill 100ms linear;
				-moz-transition:
								width 100ms linear,
								max-width 100ms linear,
								height 100ms linear,
								max-height 100ms linear,
								color 100ms linear,
								border 100ms linear,
								box-shadow 100ms linear,
								background 100ms linear,
								margin 100ms linear,
								padding 100ms linear,
								transform 100ms linear,
								opacity 100ms linear,
								left 100ms linear,
								top 100ms linear,
								bottom 100ms linear,
								right 100ms linear,
								z-index 100ms linear,
								fill 100ms linear;
				-o-transition:
								width 100ms linear,
								max-width 100ms linear,
								height 100ms linear,
								max-height 100ms linear,
								color 100ms linear,
								border 100ms linear,
								box-shadow 100ms linear,
								background 100ms linear,
								margin 100ms linear,
								padding 100ms linear,
								transform 100ms linear,
								opacity 100ms linear,
								left 100ms linear,
								top 100ms linear,
								bottom 100ms linear,
								right 100ms linear,
								z-index 100ms linear,
								fill 100ms linear;
				-ms-transition:
								width 100ms linear,
								max-width 100ms linear,
								height 100ms linear,
								max-height 100ms linear,
								color 100ms linear,
								border 100ms linear,
								box-shadow 100ms linear,
								background 100ms linear,
								margin 100ms linear,
								padding 100ms linear,
								transform 100ms linear,
								opacity 100ms linear,
								left 100ms linear,
								top 100ms linear,
								bottom 100ms linear,
								right 100ms linear,
								z-index 100ms linear,
								fill 100ms linear;
				transition: width 100ms linear,
								max-width 100ms linear,
								height 100ms linear,
								max-height 100ms linear,
								color 100ms linear,
								border 100ms linear,
								box-shadow 100ms linear,
								background 100ms linear,
								margin 100ms linear,
								padding 100ms linear,
								transform 100ms linear,
								opacity 100ms linear,
								left 100ms linear,
								top 100ms linear,
								bottom 100ms linear,
								right 100ms linear,
								z-index 100ms linear,
								fill 100ms linear;
			}
		</style>
	`
		)
	}
	window.addEventListener('load', styleUpdate)
}

Vue.component('todo-item', {
	// props
	props: ['item', 'show_items'],

	// emit
	emit: ['change_completed'],

	// template
	template: `
		<div
			class="todo__item"
			:class="{'--checked': item.completed}"
			v-if="item.id < show_items"
			@click="$emit('change_completed')"
		>
			<div class="todo__item__button">
				<svg viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.38462 9.61538C4.28205 9.61504 4.18064 9.5931 4.08669 9.55091C3.99274 9.50871 3.90827 9.44718 3.83852 9.37012L0.20278 5.40768C0.0668714 5.2593 -0.00593442 5.06167 0.000378846 4.85829C0.00350486 4.75759 0.0259611 4.6585 0.0664653 4.56668C0.10697 4.47487 0.164728 4.39213 0.236444 4.32318C0.30816 4.25424 0.392429 4.20044 0.484439 4.16486C0.576448 4.12928 0.674397 4.11262 0.772693 4.11582C0.97121 4.12229 1.15909 4.20929 1.295 4.35767L4.37714 7.7223L10.6686 0.671147C10.7325 0.589693 10.8119 0.522471 10.902 0.47361C10.9921 0.424749 11.0911 0.395281 11.1927 0.387016C11.2944 0.37875 11.3966 0.391862 11.4931 0.425546C11.5896 0.459229 11.6784 0.512773 11.754 0.58289C11.8296 0.653006 11.8904 0.738214 11.9327 0.83328C11.975 0.928346 11.9978 1.03126 11.9999 1.13571C12.0019 1.24016 11.9831 1.34393 11.9445 1.44065C11.906 1.53737 11.8486 1.62501 11.7758 1.69816L4.93821 9.36246C4.86912 9.44091 4.78494 9.50387 4.69096 9.5474C4.59698 9.59092 4.49523 9.61407 4.39211 9.61538H4.38462Z"
					/>
				</svg>
			</div>
			<div class="todo__item__text">
				<div class="todo__item__title">{{ item.title }}</div>
				<div
					class="todo__item__description"
					v-if="item.show_description"
				>
					{{ item.title }}
				</div>
			</div>
		</div>
	`,
})

Vue.component('todo-list', {
	// data
	data() {
		return {
			items: [],
			show_items: 10,
		}
	},

	// template
	template: `
		<section class="todo">
			<div class="__container">
				<div class="todo__wrapper">
					<!-- binding -->
					<div class="todo__binding --second"></div>
					<div class="todo__binding --first"></div>
					<!-- /binding -->

					<!-- content -->
					<div class="todo__content">
						<!-- header -->
						<div class="todo__header">
							<div class="todo__header-title">Todo list</div>
							<div
								class="todo__header-button"
								@click="show_items = show_items + 5"
							>
								Add
							</div>
						</div>
						<!-- /header -->

						<!-- list -->
						<div class="todo__list">

						<!-- item -->
							<todo-item
								v-for="item in items"
								@key="item.id"
								:item="item"
								:show_items="show_items"
								@change_completed="item.completed = !item.completed"
							>
							</todo-item>
							<!-- /item -->

						</div>
						<!-- /list -->
					</div>
					<!-- /content -->
				</div>
			</div>
		</section>
	`,

	// methods
	methods: {
		data_treatment(data) {
			data.forEach((item) => {
				item.show_description = Math.random() > 0.75 ? true : false
			})

			return data
		},

		async get_items() {
			this.items = await fetch(
				'https://jsonplaceholder.typicode.com/todos'
			)
				.then((response) => response.json())
				.then((response) => this.data_treatment(response))
		},
	},

	// beforeMount
	beforeMount() {
		this.get_items()
	},
})

new Vue({
	el: '#app',
})
