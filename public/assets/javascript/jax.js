// Pulls data from the API
let fetchTimer = setInterval("fetcher()", 1000);

const fetcher = () => {
	fetch("/news")
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (i in data) {
				let div = $("<div>");
				div.attr("class", "article");
				let a = $("<a>");
				a.text(data[i].title);
				a.attr("href", data[i].link);
				a.attr("target", "_blank");
				let src = $("<span>");
				src.text(data[i].src);
				let time = $("<span>");
				time.text(data[i].time);
				let loc = $("<span>");
				loc.text(data[i].location);
				let br = $("<br>");
				let btn = $("<button>");
				btn.text("Show inside");
				btn.attr("class", "btn btn-info btn-block");
				btn.attr("href", data[i].link);
				let comDiv = $("<div>");
				comDiv.attr("class", "btn-group dropright");
				let comBtn = $("<button>");
				comBtn.attr("type", "button");
				comBtn.attr("id", "show-comments-btn");
				comBtn.attr("class", "btn btn-secondary dropdown-toggle");
				comBtn.attr("data-toggle", "dropdown");
				comBtn.attr("aria-haspopup", "true");
				comBtn.attr("aria-expanded", "false");
				comBtn.text("Comments");
				let dropDiv = $("<div>");
				dropDiv.attr("id", "dropdown");
				dropDiv.attr("class", "dropdown-menu text-center");
				dropDiv.text("Comments");
				let comCloseBtn = $("<button>");
				comCloseBtn.attr("id", "comment-closer");
				comCloseBtn.attr("class", "btn btn-danger");
				comCloseBtn.text("x");
				dropDiv.prepend(comCloseBtn);
				let comments = $("<div>");
				comments.attr("id", "comments");
				for (j in data[i].comments) {
					let comment = $("<form>");
					comment.attr("class", "text-left comment");
					comment.attr("method", "post");
					comment.attr("action", "/news/delete-comment?_method=DELETE");
					let inputId = $("<input>");
					inputId.attr("type", "hidden");
					inputId.attr("id", "_id");
					inputId.attr("name", "_id");
					inputId.attr("value", data[i]._id);
					let inputName = $("<input>");
					inputName.attr("type", "hidden");
					inputName.attr("name", "name");
					inputName.attr("value", data[i].comments[j].name);
					let inputMessage = $("<input>");
					inputMessage.attr("type", "hidden");
					inputMessage.attr("name", "message");
					inputMessage.attr("value", data[i].comments[j].message);
					let comName = $("<div>");
					comName.attr("id", "name");
					comName.attr("name", "name");
					comName.attr("value", data[i].comments[j].name);
					comName.text("Name: " + data[i].comments[j].name);
					let comMessage = $("<div>");
					comMessage.attr("id", "message");
					comMessage.attr("name", "message");
					comMessage.attr("value", data[i].comments[j].message);
					comMessage.text("Message: " + data[i].comments[j].message);
					let deleteBtn = $("<button>");
					deleteBtn.attr("id", "delete-btn");
					deleteBtn.attr("class", "btn btn-warning");
					deleteBtn.attr("type", "button");
					deleteBtn.text("delete");
					comment.append(
						inputId,
						inputName,
						inputMessage,
						comName,
						comMessage,
						deleteBtn
					);
					comments.prepend(comment);
				}
				let form = $("<form>");
				form.attr("method", "post");
				form.attr("action", "/news/comment");
				form.attr("id", "comment-form");
				form.attr("class", "dropdown-item");
				let id = $("<input>");
				id.attr("id", "_id");
				id.attr("name", "_id");
				id.attr("value", data[i]._id);
				let name = $("<input>");
				name.attr("type", "text");
				name.attr("id", "name");
				name.attr("class", "form-control");
				name.attr("name", "name");
				name.attr("placeholder", "Name");
				name.attr("required", "true");
				let text = $("<textarea>");
				text.attr("id", "text-area");
				text.attr("class", "form-control");
				text.attr("name", "message");
				text.attr("rows", "2");
				text.attr("placeholder", "Comment");
				text.attr("required", "true");
				let submit = $("<button>");
				submit.attr("type", "submit");
				submit.attr("id", "submit");
				submit.attr("class", "btn btn-primary btn-block");
				submit.text("Post");
				form.append(id, name, text, submit);
				dropDiv.append(comments, form);
				comDiv.append(comBtn, dropDiv);
				div.append(a, "<br>", src, " | ", time, " ", loc, br, btn, comDiv);
				$("#news-container").append(div);
				$("#browser").attr("data", data[0].link);
				clearInterval(fetchTimer);
			}
		});
};
