$(document).on("click", ".btn-info", function() {
	$("#site-display").empty();
	let link = $(this).attr("href");
	let object = $("<object>");
	object.attr("id", "browser");
	object.attr("data", link);
	$("#site-display").append(object);
});

$(document).on("click", "#comment-closer", function() {
	$(this)
		.parents("#dropdown")
		.attr("class", "dropdown-menu text-center");
});

$(document).submit("#submit", function(event) {
	let id = $(event.target)
		.closest("div")
		.find("#_id")
		.val();
	let name = $(event.target)
		.closest("form")
		.find("#name")
		.val();
	let message = $(event.target)
		.closest("form")
		.find("#text-area")
		.val();

	event.preventDefault();

	$.ajax({
		url: "/news/comment",
		type: "post",
		data: {
			_id: id,
			name: name,
			message: message
		},
		error: function(jXHR, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});

	let comment = $("<form>");
	comment.attr("class", "text-left comment");
	comment.attr("method", "post");
	comment.attr("action", "/news/delete-comment?_method=DELETE");
	let inputId = $("<input>");
	inputId.attr("type", "hidden");
	inputId.attr("id", "_id");
	inputId.attr("name", "_id");
	inputId.attr("value", id);
	let inputName = $("<input>");
	inputName.attr("type", "hidden");
	inputName.attr("name", "name");
	inputName.attr("value", name);
	let inputMessage = $("<input>");
	inputMessage.attr("type", "hidden");
	inputMessage.attr("name", "message");
	inputMessage.attr("value", message);
	let comName = $("<div>");
	comName.attr("id", "name");
	comName.attr("name", "name");
	comName.attr("value", name);
	comName.text("Name: " + name);
	let comMessage = $("<div>");
	comMessage.attr("id", "message");
	comMessage.attr("name", "message");
	comMessage.attr("value", message);
	comMessage.text("Message: " + message);
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
	$(event.target)
		.closest("div")
		.find("#comments")
		.prepend(comment);
	$(event.target)
		.closest("div")
		.attr("class", "dropdown-menu text-center show");
	$(event.target)
		.find("#name")
		.val("");
	$(event.target)
		.find("#text-area")
		.val("");
});

$(document).on("click", "#delete-btn", function(event) {
	let id = $(event.target)
		.closest("div")
		.find("#_id")
		.attr("value");
	let name = $(event.target)
		.closest("div")
		.find("#name")
		.attr("value");
	let message = $(event.target)
		.closest("div")
		.find("#message")
		.attr("value");
	event.preventDefault();
	$.ajax({
		method: "delete",
		url: "/news/delete-comment",
		data: { _id: id, name: name, message: message },
		error: function(jXHR, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
	$(event.target)
		.closest("form")
		.remove();
});
