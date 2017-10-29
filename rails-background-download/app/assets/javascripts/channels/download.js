function subscribeDownloadChannel(uuid, callback) {
  App.download = App.cable.subscriptions.create(
    { channel: "DownloadChannel", uuid: uuid },
    {
      connected: function() {
        callback();
      },

      disconnected: function() {},

      received: function(data) {
        var blob = new Blob([data.csv], {
          type: "text/csv;charset=utf-8"
        });
        saveAs(blob, "books.csv");

        $("#download_books")
          .html("Download Books")
          .removeAttr("disabled");

        App.download.unsubscribe();
        App.cable.disconnect();
        delete App.download;
      }
    }
  );
}
