<template>

	<n-gradient-text
	    gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
		style='margin-top: 20px;'
	>
	   <b>为中华民族复兴而写代码</b>
	</n-gradient-text>
	
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { NGradientText } from 'naive-ui';

@Options({
	name: 'HomePage',
	components: {
		NGradientText
	},
})

export default class HomePage extends Vue {}
</script>
