let fetchTimer = setInterval("fetcher()", 1000);

fetcher = () => {
  fetch("/news/latest")
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
        let btn = $("<button>");
        btn.text("Show inside");
        btn.attr("class", "btn btn-info btn-block");
        btn.attr("href", data[i].link);
        div.append(a, "<br>", src, " | ", time, " ", loc, btn);
        $("#latest-news-container").append(div);
        $("#latest-browser").attr("data", data[0].link);
        // document.querySelector('.container').innerHTML(data[i].body);
        clearInterval(fetchTimer);
      }
    });
};