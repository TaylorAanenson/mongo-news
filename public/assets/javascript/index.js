// const Nightmare = require("nightmare");
// const nightmare = Nightmare({ show: true });

$(document).on("click", ".btn-info", function() {
	$("#site-display").empty();
	let link = $(this).attr("href");
	let object = $("<object>");
	//   nightmare
	//     .goto(link)
	//     // .evaluate(() => document.querySelector('.VDXfz').href)
	//     .end()
	//     .then(console.log)
	//     .catch(error => {
	//       console.error('Search failed:', error);
	//     });
	object.attr("id", "browser");
	object.attr("data", link);
	$("#site-display").append(object);
	console.log(link);
});

// $(document).on("click", "#show-comments-btn",this, function() {
//     $('#news-container').attr('style','overflow: visible;');
// });

$(document).on("click", "#comment-closer", function() {
    // let elem = $(this);
	// $('#news-container').attr('style','overflow: auto;');
    $(this).parents("#dropdown").attr("class", "dropdown-menu text-center");
    // console.log(a);
});

// $(document).ready(function(){

$(document).submit("#submit", function(event) {
    // let elem = $(this);
    console.log(event);
    // console.log(elem);
	// let name = $('#name').val();
	// let message = $('#text-area').val();
	// event.preventDefault();
	// $.ajax({
	//     url: '/news/comment',
	//     type: 'POST',
	//     data:
	//     {
	//         name: $('#name').val(),
	//         message: $('#text-area').val()
	//     },
	//     success: function (data){
	//         console.log(data);
	//     },
	//     error: function(jXHR,textStatus,errorThrown){
	//         console.log(errorThrown);
	//     }
	// });
	// return false;
	// console.log(message,name);
    // let thing = $('.article',this);

    // $.ajax({
    //     url: '/',
    //     type: 'get',
    //     success: function (data){
    //         console.log(data);
    //     },
    //     error: function(jXHR,textStatus,errorThrown){
    //         console.log(errorThrown);
    //     }
    // })

	let comment = $("<div>");
	comment.attr("class", "text-left comment");
	let comName = $("<div>");
	comName.text("Name: " + $(event.target).closest("div").find('#name').val());
	let comMessage = $("<div>");
    comMessage.text("Message: " + $(event.target).closest("div").find('#text-area').val());
    let deleteBtn = $('<button>');
    deleteBtn.attr('id','delete-btn');
    deleteBtn.attr('class','btn btn-warning');
    let id = $(event.target).closest("div").find('#_id').val();
    deleteBtn.attr("value", id);
    deleteBtn.text('delete comment');
	comment.append(comName, comMessage, deleteBtn);
	let a = $(event.target).closest("div").find('#comments').prepend(comment);
    let b = $(event.target).closest('div').attr("class", "dropdown-menu text-center show");
    console.log(a,b);
	let timer = setInterval("clearer()", 100);
	clearer = () => {
		let c = $(event.target).find("#name").val("");
        let d = $(event.target).find("#text-area").val("");
        clearInterval(timer);
        console.log(c,d);
    };
    // event.stopPropagation();
});

// })

$(document).on("click", "#delete-btn", function(event) {
    let a = $(this).attr('value');
    console.log(a);
});

// $(document).on("click", "#news-container", function(event) {
// $('#dropdown').attr('class','dropdown-menu text-center');
// });

// $('#site-display').ready(function(event){
//     console.log(event);
//     if ($('#browser').text() === ''){
//         alert('sorry :(');
//     }
// })

// nightmare
//     .goto('https://news.google.com')
//     .evaluate(() => document.querySelector('.VDXfz').href)
//     .end()
//     .then(console.log)
//     .catch(error => {
//         console.error('Search failed:', error)
//     })
