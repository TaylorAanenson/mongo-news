// // Pulls data from the API
// $.ajax({
//     url:'http://localhost:3000/news',
//     dataType: 'jsonp',
//     jsonp: 'jsonp',
//     success: function (data) {
//         console.log('success', data);
//     },
//     error: function (XMLHttpRequest, textStatus, errorThrown){
//         console.log('error', errorThrown);
//     }
// })

let fetchTimer = setInterval("fetcher()", 1000);

const fetcher = () => {
	fetch("/news")
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (i in data) {
				// let title = JSON.stringify(data[i].title);
				// let arr = [];
				// arr.push(data);
				// let a = arr.filter(function(item,pos){
				//     return arr.indexOf(item) === pos;
				// })
				// console.log(a);
				// if (indexOf(data[i].title) === -1){
				//     console.log(true);
				// }
				console.log(
					data[i]._id,
					data[i].title,
					data[i].link,
					data[i].src,
					data[i].time,
					data[i].location
				);
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
        // comBtn.attr("class", "btn-group dropright");
        comBtn.attr("id", "show-comments-btn");
				comBtn.attr("class", "btn btn-secondary dropdown-toggle");
				comBtn.attr("data-toggle", "dropdown");
				comBtn.attr("aria-haspopup", "true");
				comBtn.attr("aria-expanded", "false");
				comBtn.text("Comments");
				let dropDiv = $("<div>");
				dropDiv.attr("id", "dropdown");
        dropDiv.attr("class", "dropdown-menu text-center");
        // dropDiv.attr("data_id", data[i]._id);
        dropDiv.text("Comments");
        let comCloseBtn = $('<button>');
        comCloseBtn.attr('id','comment-closer');
        comCloseBtn.attr('class','btn btn-danger');
        comCloseBtn.text('x');
        dropDiv.prepend(comCloseBtn);
				let comments = $("<div>");
				comments.attr("id", "comments");
				for (j in data[i].comments) {
					let comment = $("<div>");
					comment.attr("class", "text-left comment");
					let comName = $("<div>");
					comName.text("Name: " + data[i].comments[j].name);
					let comMessage = $("<div>");
					comMessage.text("Message: " + data[i].comments[j].message);
					console.log(data[i].comments[j].name, data[i].comments[j].message);
          // comments.text(data[i].comments[j].name,data[i].comments[j].message);
          let deleteBtn = $('<button>');
          deleteBtn.attr('id','delete-btn');
          deleteBtn.attr('class','btn btn-warning');
          deleteBtn.attr("value", data[i]._id);
          deleteBtn.text('delete comment');
					comment.append(comName, comMessage, deleteBtn);
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
				// document.querySelector('.container').innerHTML(data[i].body);
				clearInterval(fetchTimer);
			}
		});
};

// const fetcher = async () => {
//     const response = await fetch('/news');
//     const json = await response.json();
//     console.log(json);
// }
// fetcher();
