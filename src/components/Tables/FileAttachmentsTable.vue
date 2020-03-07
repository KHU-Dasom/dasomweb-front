<template>
	<div class="file-attachments-table">
		<div class="title">
			<label>첨부파일</label>
			<!--<md-button class="md-provence md-sm button-upload" :disabled="noFiles" @click="uploadAll">모두 업로드</md-button>-->
		</div>

		<md-field>
		</md-field>
	</div>
</template>

<script>
export default {
	name: "FileAttachmentsTable",
	data: () => ({
		files: null
	}),
	props: {

	}
}
</script>

<style lang="scss" scoped>
.file-attachments-table {
	position: relative;
	max-width: 55rem;
	margin: 0 auto;

	.title {
		margin-top: 1rem;
		
		label {
			font-size: 1.3rem;
			display: inline-block;
			vertical-align: middle;
			margin-right: 10px;
		}
		.button-upload {
			display: inline-block;
			vertical-align: middle;
		}
	}

	.md-file {
		width: 80%;
		max-width: 500px;
	}
}
</style>