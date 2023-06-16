var providersTable;
var providersApprovalTable;

var old = alert;

alert = function() {
  console.log(new Error().stack);
};

const terms = () => {
        terms_of_service = $('#terms_of_service').summernote({
            height: 300, // Set the height of the editor
            toolbar: [
            // Customize the toolbar buttons if needed
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']]
            ]
    });
}
const privacy = () => {
    privacyTable = $('#privacyTable').summernote({
        height: 300, // Set the height of the editor
        toolbar: [
        // Customize the toolbar buttons if needed
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview']]
        ]
    });
}
const about = () => {
    aboutUss = $('#aboutUss').summernote({
        height: 300, // Set the height of the editor
        toolbar: [
        // Customize the toolbar buttons if needed
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview']]
        ]
    });
}


$(document).ready(function () {

    terms();
    // about();
    privacy();
});

const dateFilter = (value) => {
    console.log(value);
    const startDate = value.split('-')[0];
    const endDate = value.split('-')[1];
    if (new Date(startDate) <= new Date(endDate)) {
        console.log('correct');
    } else {
        swal({
            text: 'please select correct date'
        });
    }
}



