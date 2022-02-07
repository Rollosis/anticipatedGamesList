$('#selectTable').change(function() {
    if ($(this).val() == 'roope' || $(this).val() == 'laura') {
      $('#formGroup').css('display', 'initial');
    } else {
      $('#formGroup').css('display', 'none');
    }
  });

  $('#deleteTable').change(function() {
      if ($(this).val() == 'lauraDelete') {
        $('#deleteLabel').css('display', 'initial');
        $('#deleteL').css('display', 'initial');
        $('#deleteR').css('display', 'none');
      } else if ($(this).val() == 'roopeDelete') {
        $('#deleteLabel').css('display', 'initial');
        $('#deleteL').css('display', 'none');
        $('#deleteR').css('display', 'initial');
      } else {
        $('#deleteLabel').css('display', 'none');
        $('#deleteL').css('display', 'none');
        $('#deleteR').css('display', 'none');
      }
    });

    $('#updateTable').change(function() {
        if ($(this).val() == 'lauraUpdate') {
          $('#deleteLabel').css('display', 'initial');
          $('#deleteL').css('display', 'initial');
          $('#deleteR').css('display', 'none');
        } else if ($(this).val() == 'roopeUpdate') {
          $('#deleteLabel').css('display', 'initial');
          $('#deleteL').css('display', 'none');
          $('#deleteR').css('display', 'initial');
        } else {
          $('#deleteLabel').css('display', 'none');
          $('#deleteL').css('display', 'none');
          $('#deleteR').css('display', 'none');
        }
      });

      // function deleteConfirm() {
      //   if (confirm("Do you really want to delete this game from the list?")) {
      //     return false;
      //   }
      //   this.form.submit();
      // }
