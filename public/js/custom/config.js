async function config() {
  if (activeUser.user.token) {
    $.ajaxSetup({
      contentType: "application/json",
      processData: false,
      // async : false,
      beforeSend: async function (xhr, data) {
        if ( this.headers && this.headers.authorization) {
        } else {
          xhr.setRequestHeader("Authorization", activeUser.user.token);
        }
      },
      complete: function () {},
    });

    $(document).ajaxError(async function myErrorHandler(
      event,
      xhr,
      ajaxOptions,
      thrownError
    ) {
      if (xhr.status === 403) {
        $("#refreshSessionModal").modal("show");
      }
    });
  } else {
    $.ajaxSetup({
      contentType: "application/json",
      processData: false,
      beforeSend: function (xhr) {},
      complete: function () {},
    });
  }
}

config();