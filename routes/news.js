const express = require("express");
const app = express();
const router = express.Router();
const mongojs = require("mongojs");
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const logger = require("morgan");
app.use(logger("dev"));

const path = require("path");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

// const path = require('path');

const databaseUrl = "news";
const collections = ["articles"];
const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
	console.log("Database Error: " + error);
});

// // BBC Doc Generator
// const bbcDocs = (title,link,body,img,delayedImg,time,location) => {
//     db.articles.find({title:title},function (err,docs){
//         // console.log(err,docs,title);
//         if(err) throw err;
//         if (docs.length === 0 && title !== ''){
//             db.articles.insert({
//                 title: title,
//                 link: 'https://www.bbc.com'+link,
//                 src: src,
//                 body: body,
//                 img: img,
//                 delayedImg: delayedImg,
//                 time: time,
//                 location: location
//             }),
//             function(err,inserted){
//                 if(err) throw err;
//                 console.log(inserted);
//             }
//         }else for (i in docs){
//             // console.log(docs[i].title);
//             if (docs.length > 0 && docs[i].title !== title && title !== ''){
//                 db.articles.insert({
//                     title: title,
//                     link: 'https://www.bbc.com'+link,
//                     body: body,
//                     img: img,
//                     delayedImg: delayedImg,
//                     time: time,
//                     location: location
//                 }),
//                 function(err,inserted){
//                     if(err) throw err;
//                     console.log(inserted);
//                 }
//             }
//         }
//     })
// }

// News Now Doc Generator
const topDocMaker = (title, link, src, time, location) => {
	db.articles.find({ title: title }, function(err, docs) {
		// console.log(err,docs,title);
		if (err) throw err;
		if (docs.length == 0 && title !== "") {
			db.articles.insert({
				title: title,
				link: link,
				src: src,
				time: time,
				location: location,
				comments: []
				// tags: [tags]
			}),
				function(err, inserted) {
					if (err) throw err;
					console.log(inserted);
				};
		} else
			for (i in docs) {
				// console.log(doc.title);
				if (docs.length !== 0 && docs[i].title !== title && title !== "") {
					db.articles.insert({
						title: title,
						link: link,
						src: src,
						time: time,
						location: location,
						comments: []
						// tags: [tags]
					}),
						function(err, inserted) {
							if (err) throw err;
							console.log(inserted);
						};
				}
			}
	});
};

// // News Now Doc Generator
// const latestDocMaker = (title, link, src, time, location) => {
//   db.articles.find({ title: title }, function(err, docs) {
//     // console.log(err,docs,title);
//     if (err) throw err;
//     if (docs.length === 0 && title !== "") {
//       db.articles.insert({
//         title: title,
//         link: link,
//         src: src,
//         time: time,
//         location: location,
//         latest: true
//         // tags: [tags]
//       }),
//         function(err, inserted) {
//           if (err) throw err;
//           console.log(inserted);
//         };
//     } else
//       for (i in docs) {
//         // console.log(docs[i].title);
//         if (docs.length > 0 && docs[i].title !== title && title !== "") {
//           db.articles.insert({
//             title: title,
//             link: link,
//             src: src,
//             time: time,
//             location: location,
//             latest: true
//             // tags: [tags]
//           }),
//             function(err, inserted) {
//               if (err) throw err;
//               console.log(inserted);
//             };
//         }
//       }
//   });
// };

const linkChecker = link => {
	nightmare
		.goto(link)
		.evaluate(() => document.querySelector("header"))
		.end()
		.then(console.log)
		.catch(error => {
			console.error("Search failed:", error);
		});
};

// Get request from home page
router.get("/", function(req, res) {
	// BBC Scraper
	// request('https://www.bbc.com/news/world',function(error,response,body){
	//     // console.log('body:', body);

	//     const $ = cheerio.load(body);

	//     $('.faux-block-link').each(function(i,element){
	//         let title = $(element).find('.title-link__title-text').text();
	//         let link = $(element).find('a').attr('href');
	//         let body = $(element).find('p').text();
	//         let img = $(element).find('img').attr('src');
	//         let delayedImg = $(element).find('.js-delayed-image-load').attr('data-src');
	//         let time = $(element).find($('.date')).attr('data-seconds');
	//         let location = $(element).find($('.mini-info-list')).find('a').text();
	//         // let link = $(element).children('h3').find('a').attr('href');

	//         bbcDocs(title,link,body,img,delayedImg,time,location);

	//     })
	// })

	// request('https://www.bbc.com/news/world/africa',function(error,response,body){
	//     // console.log('body:', body);

	//     const $ = cheerio.load(body);

	//     $('.faux-block-link').each(function(i,element){
	//         let title = $(element).find('.title-link__title-text').text();
	//         let link = $(element).find('a').attr('href');
	//         let body = $(element).find('p').text();
	//         let img = $(element).find('img').attr('src');
	//         let delayedImg = $(element).find('.js-delayed-image-load').attr('data-src');
	//         let time = $(element).find($('.date')).attr('data-seconds');
	//         let location = $(element).find($('.mini-info-list')).find('a').text();
	//         // let link = $(element).children('h3').find('a').attr('href');

	//         bbcDocs(title,link,body,img,delayedImg,time,location);

	//     })
	// })

	// nightmare
	//     .goto('https://news.google.com')
	//     .evaluate(() => document.querySelector('.VDXfz').href)
	//     .end()
	//     .then(console.log)
	//     .catch(error => {
	//         console.error('Search failed:', error)
	//       })

	// News Now Scraper
	request("http://www.newsnow.co.uk/h/World+News?type=ln", function(
		error,
		response,
		body
	) {
		// console.log('body:', body);

		const $ = cheerio.load(body);

		$(".hl").each(function(i, element) {
			let title = $(element)
				.find(".hll")
				.text();
			let link = $(element)
				.find(".hll")
				.attr("href");
			let src = $(element)
				.find(".src-part")
				.text();
			let time = $(element)
				.find(".time")
				.text();
			let location = $(element)
				.find(".f")
				.attr("c");
			// let tags = $(element).find('.favtags').find('a').text();
			// let tagsLink = $(element).find('.favtags').nextAll().attr('href');
			// let body = $(element).find('p').text();
			// let img = $(element).find('img').attr('src');
			// let delayedImg = $(element).find('.js-delayed-image-load').attr('data-src');

			// let location = $(element).find($('.mini-info-list')).find('a').text();
			// let link = $(element).children('h3').find('a').attr('href');

			// topDocMaker(title,link,body,img,delayedImg,time,location);
			//   console.log(tags);
			//   linkChecker(link);
			topDocMaker(title, link, src, time, location);
		});
	});

	db.articles.find({}).sort({ _id: -1 }).limit(50, function(err, found) {
		if (err) console.log(err);
		res.json(found);
	});
});

// router.get("/latest", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/latest.html"));

//   // BBC Scraper
//   // request('https://www.bbc.com/news/world',function(error,response,body){
//   //     // console.log('body:', body);

//   //     const $ = cheerio.load(body);

//   //     $('.faux-block-link').each(function(i,element){
//   //         let title = $(element).find('.title-link__title-text').text();
//   //         let link = $(element).find('a').attr('href');
//   //         let body = $(element).find('p').text();
//   //         let img = $(element).find('img').attr('src');
//   //         let delayedImg = $(element).find('.js-delayed-image-load').attr('data-src');
//   //         let time = $(element).find($('.date')).attr('data-seconds');
//   //         let location = $(element).find($('.mini-info-list')).find('a').text();
//   //         // let link = $(element).children('h3').find('a').attr('href');

//   //         bbcDocs(title,link,body,img,delayedImg,time,location);

//   //     })
//   // })

//   // request('https://www.bbc.com/news/world/africa',function(error,response,body){
//   //     // console.log('body:', body);

//   //     const $ = cheerio.load(body);

//   //     $('.faux-block-link').each(function(i,element){
//   //         let title = $(element).find('.title-link__title-text').text();
//   //         let link = $(element).find('a').attr('href');
//   //         let body = $(element).find('p').text();
//   //         let img = $(element).find('img').attr('src');
//   //         let delayedImg = $(element).find('.js-delayed-image-load').attr('data-src');
//   //         let time = $(element).find($('.date')).attr('data-seconds');
//   //         let location = $(element).find($('.mini-info-list')).find('a').text();
//   //         // let link = $(element).children('h3').find('a').attr('href');

//   //         bbcDocs(title,link,body,img,delayedImg,time,location);

//   //     })
//   // })

//   // nightmare
//   //     .goto('https://news.google.com')
//   //     .evaluate(() => document.querySelector('.VDXfz').href)
//   //     .end()
//   //     .then(console.log)
//   //     .catch(error => {
//   //         console.error('Search failed:', error)
//   //       })

//   // News Now Scraper
//   request("http://www.newsnow.co.uk/h/World+News?type=ln", function(
//     error,
//     response,
//     body
//   ) {
//     // console.log('body:', body);

//     const $ = cheerio.load(body);

//     $(".hl").each(function(i, element) {
//       let title = $(element)
//         .find(".hll")
//         .text();
//       let link = $(element)
//         .find(".hll")
//         .attr("href");
//       let src = $(element)
//         .find(".src-part")
//         .text();
//       let time = $(element)
//         .find(".time")
//         .text();
//       let location = $(element)
//         .find(".f")
//         .attr("c");
//       // let tags = $(element).find('.favtags').find('a').text();
//       // let tagsLink = $(element).find('.favtags').nextAll().attr('href');
//       // let body = $(element).find('p').text();
//       // let img = $(element).find('img').attr('src');
//       // let delayedImg = $(element).find('.js-delayed-image-load').attr('data-src');

//       // let location = $(element).find($('.mini-info-list')).find('a').text();
//       // let link = $(element).children('h3').find('a').attr('href');

//       // latestDocMaker(title,link,body,img,delayedImg,time,location);
//       // console.log(tags);
//       latestDocMaker(title, link, src, time, location);
//     });
//   });

//   db.articles.find({latest: true}).sort({time: 1}, function(err, found) {
//     if (err) console.log(err);
//     res.json(found);
//   });
// });

router.post("/comment", urlencodedParser, function(req, res) {
	//   let a = ObjectId('"'+req.body._id+'"');
	// console.log(req.body);
	// let b = db.articles.findAndModify({_id: "ObjectId("+'"'+req.body._id+'"'+")"},function(err,found){
	//     console.log(found);
	// })
	db.articles.findAndModify(
		{
			query: { _id: mongojs.ObjectId(req.body._id) },
			update: {
				$push: {
					comments: {
            _id: req.body._id,
						name: req.body.name,
						message: req.body.message
					}
				}
			}
		},
		function(err, doc, lastErrorObject) {
			console.log(err, doc, lastErrorObject);
		}
  );
  
	// request.post({url: '/comment', form: {key:'value'}},function(err,httpResponse,body){
	//     console.log(body);
  // })
  
	// db.articles.find({ _id: mongojs.ObjectId(req.body._id) }, function(
	// 	err,
	// 	found
	// ) {
	// 	if (err) console.log(err);
  //   res.json(found[0].comments);
  // });

  // console.log(res);
  
});

module.exports = router;
