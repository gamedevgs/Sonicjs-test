$(document).ready(async function () {
    $('#sel1').change(function () {
        let contentType = $(this).val();
        var filter = encodeURI(`{"where":{"data.contentType":"${contentType}"}}`);
        let apiFullUrl = `/api/content?filter=${filter}`
        $.ajax({
            url: apiFullUrl, // gửi ajax đến file result.php
            type: "get",
            success: function (result) {
                renderBod(result)
            }
        });
    });
});

renderBod = (data) => {
    let html = ''
    if (data.length != 0) {
        data.map((v, k) => {
            html += `<tr>
            <td><a href="/admin/content/edit/${v.data.contentType}/${v.id}">${v.data.title}</a></td>
            <td>${v.data.contentType}</td>
            <td>${v.data.createdOnFormatted}</td>
            <td class='text-right'>
              <a href="/admin/content/edit/${v.data.contentType}/${v.id}"
                class="btn btn-sm btn-primary rmargin">Edit</a>
              <a tabindex="0" class="btn btn-sm btn-danger" role="button" data-html="true" data-toggle="popover"
                data-trigger="focus" aria-label="Delete ${v.data.title}"
                title="Delete <b>${v.data.title}</b> Forever?" data-content="<a href='/content/${v.id}'
                class='btn btn-sm btn-danger rmargin'>Confirm Delete</a>
                ">Delete</a>
            </td>
          </tr>`
        })
    }
    $('#content_body').html(html)
}
