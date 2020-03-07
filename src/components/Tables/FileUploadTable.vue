<template>
	<div class="file-upload-table">
		<div class="title">
			<label>파일 업로드</label>
			<md-button class="md-provence md-sm button-upload" :disabled="noFiles" @click="uploadAll">모두 업로드</md-button>
		</div>

		<md-field>
			<label>파일을 선택하세요.</label>
			<md-file v-model="newFileNames" @md-change="onFileSelected($event)" multiple />
		</md-field>
	</div>
</template>

<script>
export default {
	name: "FileUploadTable",
	computed: {
		// 모두 업로드 버튼의 disable 설정. 파일이 선택된 경우에만 true.
		noFiles: function() {
			return (this.newFileNames == null || this.newFileNames == "");
		}
	},
	data: () => ({
		newFileNames: null,
		newFiles: [],
		uploadedFileIDs: []	// 업로드가 완료된 파일의 ID의 Array
	}),
	methods: {
		// 파일이 선택된 이벤트 발생 시
		onFileSelected(evt) {
			for (var i=0; i<evt.length; i++) {
				this.newFiles.push(evt[i]);
			}
		},
		// 현재 선택된 파일들을 모두 업로드
		uploadAll() {
			var vm = this;

			if (this.newFileNames == null || this.newFileNames == "") {
				alert("파일을 선택해주세요.");
				return;
			}
			var files = this.newFiles;

			// Form Data 생성
			const formData = new FormData();
			files.forEach(element => {
				formData.append("target_files", element);
			});

			// 파일 업로드 요청
			var token = localStorage.getItem("accessToken");
			const url = "http://api.dasom.io/uploads";
			this.$http.post(url, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"Authorization": token
				}
			}).then(res => {
				console.log("성공:", res);
				var uploads = res.data.data.uploads;
				uploads.forEach(element => {
					vm.uploadedFileIDs.push(element.file_id);
				});
				vm.$emit("upload-completed", vm.uploadedFileIDs);
				alert("파일 업로드 완료.");
			}).catch(err => {
				console.log(err);
				alert("파일 업로드 에러 발생! ", err);
			});
		},
	}
}
</script>

<style lang="scss" scoped>
.file-upload-table {
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