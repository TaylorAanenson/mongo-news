const express = require("express");
const app = express();
const router = express.Router();
const mongojs = require("mongojs");
// const Nightmare = require("nightmare");
// const nightmare = Nightmare({ show: true });
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const logger = require("morgan");
app.use(logger("dev"));

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const databaseUrl = "news";
const collections = ["articles"];
const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
	console.log("Database Error: " + error);
});

// News Now Doc Generator
const docMaker = (title, link, src, time, location) => {
	db.articles.find({ title: title }, function(err, docs) {
		if (err) throw err;
		if (docs.length == 0 && title !== "") {
			db.articles.insert({
				title: title,
				link: link,
				src: src,
				time: time,
				location: location,
				comments: []
			}),
				function(err, inserted) {
					if (err) throw err;
				};
		} else
			for (i in docs) {
				if (docs.length !== 0 && docs[i].title !== title && title !== "") {
					db.articles.insert({
						title: title,
						link: link,
						src: src,
						time: time,
						location: location,
						comments: []
					}),
						function(err, inserted) {
							if (err) throw err;
						};
				}
			}
	});
};

// const linkChecker = link => {
// 	nightmare
// 		.goto(link)
// 		.evaluate(() => document.querySelector("header"))
// 		.end()
// 		.then(console.log)
// 		.catch(error => {
// 			console.error("Search failed:", error);
// 		});
// };

// Get request from home page
router.get("/", function(req, res) {
	// News Now Scraper
	request("http://www.newsnow.co.uk/h/World+News?type=ln", function(
		error,
		response,
		body
	) {
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
			docMaker(title, link, src, time, location);
		});
	});

	db.articles
		.find({})
		.sort({ _id: -1 })
		.limit(50, function(err, found) {
			if (err) throw err;
			res.json(found);
		});
});

router.post("/comment", urlencodedParser, function(req, res) {
	db.articles.findAndModify(
		{
			query: { _id: mongojs.ObjectId(req.body._id) },
			update: {
				$push: {
					comments: {
						name: req.body.name,
						message: req.body.message
					}
				}
			}
		},
		function(err, doc, lastErrorObject) {
			console.log(err, lastErrorObject);
		}
	);
});

router.delete("/delete-comment", urlencodedParser, function(req, res) {
	db.articles.update(
		{ _id: mongojs.ObjectId(req.body._id) },
		{ $pull: { comments: { name: req.body.name, message: req.body.message } } },
		function(err, doc, lastErrorObject) {
			console.log(err, lastErrorObject);
		}
	);
});

module.exports = router;
