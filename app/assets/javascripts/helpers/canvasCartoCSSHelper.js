define([
  'moment',
  'text!map/cartocss/default_canvas_style.cartocss'
], function(moment, defaultCss) {

  var canvasCartoCSSHelper = {

    generateDaily: function(columnName, startDate, endDate) {
      startDate = moment(startDate);
      endDate = moment(endDate);

      var rules = [];

      var currDate = startDate.clone().startOf('day');
      while(currDate.diff(endDate) < 1) {
        var formattedDate = currDate.format('YYYY-MM-DD');

        var dayOfYear = currDate.dayOfYear();
        if (dayOfYear > 255) {
          rules.push("stop(" + dayOfYear + ", rgba(0, " + (dayOfYear % 255) + ", 0, 1))");
        } else {
          rules.push("stop(" + dayOfYear + ", rgba(" + dayOfYear + ", 0, 0, 1))");
        }

        currDate = currDate.add('days', 1);
      }

      var css = [
        "#layer {",
          defaultCss.replace(/(\r\n|\n|\r)/gm,""),
          "raster-colorizer-stops:", rules.join(" "), ";",
        "}"
      ].join(" ");

      return css;
    }

  };

  return canvasCartoCSSHelper;

});
