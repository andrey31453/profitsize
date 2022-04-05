Vue.component('button-counter', {
	data: function () {
		return { count: 0 }
	},
	template: `
		<button @click='count++'>
			Cчетчик кликов {{ count }}
		</button>`,
})
